import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { auth, products, cart } from './api'
import './App.css'

function Navbar({ user, cartCount, onLogout }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Mobi<span style={{color:'#f97316'}}>Mart</span></Link>
      <div style={styles.navLinks}>
        <Link to="/products" style={styles.navLink}>Shop</Link>
        {user ? (
          <>
          {user.role === 'ADMIN' && <Link to="/admin" style={{...styles.navLink, color:'#f97316'}}>Admin</Link>}
{user.role === 'VENDOR' && <Link to="/vendor" style={styles.navLink}>My Store</Link>}
            <Link to="/cart" style={styles.navLink}>🛒 Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}</Link>
            <Link to="/orders" style={styles.navLink}>My Orders</Link>
            <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div style={styles.hero}>
      <h1 style={styles.heroTitle}>Qatar's #1 Mobile Marketplace</h1>
      <p style={styles.heroSub}>Shop the latest phones & accessories from verified vendors</p>
      <Link to="/products" style={styles.heroBtn}>Shop Now →</Link>
    </div>
  )
}

function Products() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    products.getAll({ search }).then(r => { setItems(r.data); setLoading(false) })
  }, [search])

  return (
    <div style={styles.page}>
      <input
        style={styles.search}
        placeholder="Search phones, accessories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? <p>Loading...</p> : (
        <div style={styles.grid}>
          {items.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardImg}>📱</div>
              <div style={styles.cardBody}>
                <p style={styles.cardVendor}>{p.vendor?.storeName}</p>
                <h3 style={styles.cardName}>{p.name}</h3>
                <p style={styles.cardPrice}>${p.price}</p>
                <Link to={`/products/${p.id}`} style={styles.cardBtn}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()// eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.login(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      window.location.href = '/'
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={styles.formPage}>
      <div style={styles.formBox}>
        <h2 style={styles.formTitle}>Welcome back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button style={styles.submitBtn} onClick={handleSubmit}>Login</button>
        <p style={{textAlign:'center', marginTop:12}}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

function Register({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'CUSTOMER' })
  const [error, setError] = useState('')
  const navigate = useNavigate()// eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.register(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      window.location.href = '/'
    } catch {
      setError('Registration failed. Email may already exist.')
    }
  }

  return (
    <div style={styles.formPage}>
      <div style={styles.formBox}>
        <h2 style={styles.formTitle}>Create account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <input style={styles.input} placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <select style={styles.input} value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="CUSTOMER">Customer</option>
          <option value="VENDOR">Vendor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button style={styles.submitBtn} onClick={handleSubmit}>Create Account</button>
        <p style={{textAlign:'center', marginTop:12}}>Have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

function Cart() {
  const [cartData, setCartData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()// eslint-disable-line

  const loadCart = () => {
    cart.get().then(r => { setCartData(r.data); setLoading(false) })
  }

  useEffect(() => { loadCart() }, [])

  const handleUpdate = async (productId, qty) => {
    if (qty < 1) return  // prevent going below 1 via update
    await cart.update(productId, { quantity: qty })
    loadCart()
  }

  const handleRemove = async (productId) => {
    await cart.remove(productId)
    loadCart()
  }

  if (loading) return <p style={{padding:40}}>Loading cart...</p>

  return (
    <div style={styles.page}>
      <h2 style={{marginBottom:24}}>Your Cart</h2>
      {cartData.items.length === 0 ? (
        <div style={{textAlign:'center', padding:60}}>
          <p style={{marginBottom:20}}>Your cart is empty</p>
          <Link to="/products" style={styles.heroBtn}>Shop Now</Link>
        </div>
      ) : (
        <>
          {cartData.items.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <div style={{fontSize:32}}>📱</div>
              <div style={{flex:1, marginLeft:16}}>
                <p style={{fontWeight:500}}>{item.product.name}</p>
                <p style={{color:'#666', fontSize:14}}>{item.product.vendor?.storeName}</p>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <button
                    onClick={() => item.quantity === 1 ? handleRemove(item.productId) : handleUpdate(item.productId, item.quantity - 1)}
                    style={styles.qtyBtn}
                  >−</button>
                  <span style={{fontWeight:500, minWidth:20, textAlign:'center'}}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.productId, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <p style={{color:'#f97316', fontWeight:500, minWidth:70, textAlign:'right'}}>${(item.product.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemove(item.productId)} style={styles.removeBtn}>✕</button>
              </div>
            </div>
          ))}
          <div style={styles.cartTotal}>
            <h3 style={{marginBottom:16}}>Total: ${cartData.total}</h3>
            <button onClick={() => navigate('/checkout')} style={styles.submitBtn}>Proceed to Checkout →</button>
          </div>
        </>
      )}
    </div>
  )
}

// ✅ FIX 1: useParams imported at top (not via require inside component)
// ✅ FIX 2: handleAddToCart closing brace was missing — fixed
// ✅ FIX 3: Toast popup added for "Added to Cart"
// ✅ FIX 4: Button disabled while in "added" state to prevent double-add
function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    products.getOne(id).then(r => { setProduct(r.data); setLoading(false) })
  }, [id])

  const handleAddToCart = async () => {
    if (added) return  // ✅ prevents double-click adding duplicate
    try {
      await cart.add({ productId: id, quantity: 1 })
      setAdded(true)
      setToast(true)
      // Hide toast after 2.5s
      setTimeout(() => setToast(false), 2500)
      // Reset button after 3s
      setTimeout(() => setAdded(false), 3000)
    } catch {
      alert('Please login to add to cart')
    }
  }  // ✅ this closing brace was MISSING — caused the line 317 error

  if (loading) return <p style={{padding:40}}>Loading...</p>
  if (!product) return <p style={{padding:40}}>Product not found</p>

  return (
    <div style={{...styles.page, maxWidth:800}}>
      {/* ✅ Toast popup notification */}
      {toast && (
        <div style={{
          position:'fixed', top:80, right:24,
          background:'#10b981', color:'#fff',
          padding:'14px 24px', borderRadius:12,
          fontWeight:600, fontSize:15,
          boxShadow:'0 4px 20px rgba(16,185,129,0.4)',
          zIndex:999,
          animation:'fadeIn 0.3s ease'
        }}>
          ✓ Added to Cart!
        </div>
      )}
      <div style={{display:'flex', gap:40, flexWrap:'wrap'}}>
        <div style={{fontSize:120, textAlign:'center', flex:'0 0 200px'}}>📱</div>
        <div style={{flex:1}}>
          <p style={{color:'#888', marginBottom:8}}>{product.vendor?.storeName} · {product.category?.name}</p>
          <h1 style={{fontSize:28, marginBottom:12}}>{product.name}</h1>
          <p style={{color:'#f97316', fontSize:32, fontWeight:700, marginBottom:16}}>${product.price}</p>
          <p style={{color:'#555', lineHeight:1.7, marginBottom:24}}>{product.description}</p>
          <p style={{color:'#888', marginBottom:20}}>In stock: {product.stockQty} units</p>
          <button
            onClick={handleAddToCart}
            disabled={added}  // ✅ disables button while in added state
            style={{
              ...styles.submitBtn,
              width:'auto',
              padding:'14px 32px',
              background: added ? '#10b981' : '#f97316',
              opacity: added ? 0.85 : 1,
              cursor: added ? 'default' : 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0) // eslint-disable-line

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.me().then(r => setUser(r.data)).catch(() => localStorage.removeItem('token'))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onLogin={setUser} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 32px', background:'#0f1923', position:'sticky', top:0, zIndex:100 },
  logo: { color:'#fff', fontSize:22, fontWeight:700, textDecoration:'none' },
  navLinks: { display:'flex', alignItems:'center', gap:24 },
  navLink: { color:'#ccc', textDecoration:'none', fontSize:14 },
  registerBtn: { background:'#f97316', color:'#fff', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:14 },
  logoutBtn: { background:'transparent', border:'1px solid #555', color:'#ccc', padding:'6px 14px', borderRadius:8, cursor:'pointer', fontSize:14 },
  badge: { background:'#ef4444', color:'#fff', borderRadius:10, padding:'1px 6px', fontSize:11, marginLeft:4 },
  hero: { minHeight:'80vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', color:'#fff', textAlign:'center', padding:32 },
  heroTitle: { fontSize:42, fontWeight:700, marginBottom:16 },
  heroSub: { fontSize:18, color:'#94a3b8', marginBottom:32 },
  heroBtn: { background:'#f97316', color:'#fff', padding:'14px 32px', borderRadius:12, textDecoration:'none', fontSize:16, fontWeight:600 },
  page: { maxWidth:1100, margin:'0 auto', padding:32 },
  search: { width:'100%', padding:'12px 16px', borderRadius:10, border:'1px solid #ddd', fontSize:15, marginBottom:24, boxSizing:'border-box' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:20 },
  card: { border:'1px solid #eee', borderRadius:12, overflow:'hidden', background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  cardImg: { height:140, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, background:'#f8f9fa' },
  cardBody: { padding:16 },
  cardVendor: { fontSize:12, color:'#888', marginBottom:4 },
  cardName: { fontSize:15, fontWeight:600, marginBottom:8 },
  cardPrice: { fontSize:18, color:'#f97316', fontWeight:700, marginBottom:12 },
  cardBtn: { display:'block', textAlign:'center', background:'#f97316', color:'#fff', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:14 },
  formPage: { minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8f9fa' },
  formBox: { background:'#fff', padding:40, borderRadius:16, width:400, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' },
  formTitle: { fontSize:24, fontWeight:700, marginBottom:24, textAlign:'center' },
  input: { width:'100%', padding:'12px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, marginBottom:12, boxSizing:'border-box' },
  submitBtn: { width:'100%', padding:14, background:'#f97316', color:'#fff', border:'none', borderRadius:8, fontSize:15, fontWeight:600, cursor:'pointer' },
  error: { color:'#ef4444', fontSize:14, marginBottom:12 },
  cartItem: { display:'flex', alignItems:'center', padding:'16px 0', borderBottom:'1px solid #eee' },
  cartTotal: { marginTop:24, textAlign:'right' },
  qtyBtn: { width:30, height:30, borderRadius:6, border:'1px solid #ddd', background:'#f8f9fa', cursor:'pointer', fontSize:16 },
  removeBtn: { background:'transparent', border:'none', color:'#ef4444', cursor:'pointer', fontSize:16, padding:'4px 8px' },
}

export default App
