import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { auth, products, cart, orders, vendors } from './api'
import './App.css'

const formatQAR = (amount) => `QAR ${Number(amount).toLocaleString('en-QA')}`

const conditionLabel = (c) => {
  if (c === 'NEW') return { text: '🟢 New', bg: '#d1fae5', color: '#065f46' }
  if (c === 'LIKE_NEW') return { text: '🟡 Like New', bg: '#fef9c3', color: '#854d0e' }
  if (c === 'GOOD') return { text: '🟠 Good', bg: '#fed7aa', color: '#9a3412' }
  if (c === 'FAIR') return { text: '🔴 Fair', bg: '#fee2e2', color: '#991b1b' }
  return { text: '🟢 New', bg: '#d1fae5', color: '#065f46' }
}

function Navbar({ user, cartCount, onLogout }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Mobi<span style={{color:'#f97316'}}>Mart</span>
        <span style={{fontSize:11, color:'#94a3b8', fontWeight:400, marginLeft:8}}>by JASPR Trading</span>
      </Link>
      <div style={styles.navLinks}>
        <Link to="/products" style={styles.navLink}>Shop</Link>
        {user ? (
          <>
            {user.role === 'ADMIN' && <Link to="/admin" style={{...styles.navLink, color:'#f97316'}}>⚙️ Admin</Link>}
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
      <p style={{color:'#f97316', fontSize:14, fontWeight:600, marginBottom:8, letterSpacing:1}}>by JASPR Trading</p>
      <h1 style={styles.heroTitle}>Qatar's #1 Mobile Marketplace</h1>
      <p style={styles.heroSub}>Shop new & used phones and accessories from verified vendors</p>
      <Link to="/products" style={styles.heroBtn}>Shop Now →</Link>
    </div>
  )
}

function Products() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [earnings, setEarnings] = useState(null)
const [iban, setIban] = useState('')
const [ibanMsg, setIbanMsg] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    products.getCategories().then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = { search }
    if (selectedCategory) params.categoryId = selectedCategory
    products.getAll(params).then(r => { setItems(r.data); setLoading(false) })
  }, [search, selectedCategory])

  const filtered = items.filter(p => {
    if (priceRange.min && p.price < parseFloat(priceRange.min)) return false
    if (priceRange.max && p.price > parseFloat(priceRange.max)) return false
    if (selectedCondition && p.condition !== selectedCondition) return false
    return true
  })

  const clearFilters = () => {
    setSelectedCategory(''); setPriceRange({ min: '', max: '' })
    setSearch(''); setSelectedCondition('')
  }

  return (
    <div style={styles.page}>
      <input style={styles.search} placeholder="Search phones, accessories..." value={search} onChange={e => setSearch(e.target.value)} />

      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap', alignItems:'center'}}>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, background:'#fff', cursor:'pointer', minWidth:160}}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={selectedCondition} onChange={e => setSelectedCondition(e.target.value)}
          style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, background:'#fff', cursor:'pointer', minWidth:140}}>
          <option value="">All Conditions</option>
          <option value="NEW">🟢 New</option>
          <option value="LIKE_NEW">🟡 Like New</option>
          <option value="GOOD">🟠 Good</option>
          <option value="FAIR">🔴 Fair</option>
        </select>

        <input style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, width:120}}
          placeholder="Min price" type="number" value={priceRange.min}
          onChange={e => setPriceRange({...priceRange, min: e.target.value})} />
        <span style={{color:'#666'}}>—</span>
        <input style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, width:120}}
          placeholder="Max price" type="number" value={priceRange.max}
          onChange={e => setPriceRange({...priceRange, max: e.target.value})} />

        {(selectedCategory || priceRange.min || priceRange.max || search || selectedCondition) && (
          <button onClick={clearFilters}
            style={{padding:'10px 16px', borderRadius:8, border:'1px solid #ddd', background:'#f8f9fa', cursor:'pointer', fontSize:14, color:'#666'}}>
            ✕ Clear filters
          </button>
        )}

        <span style={{color:'#888', fontSize:14, marginLeft:'auto'}}>
          {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </span>
      </div>

      {categories.length > 0 && (
        <div style={{display:'flex', gap:8, marginBottom:20, flexWrap:'wrap'}}>
          <button onClick={() => setSelectedCategory('')}
            style={{padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer', fontSize:13, fontWeight:500,
              background: selectedCategory === '' ? '#f97316' : '#f8f9fa', color: selectedCategory === '' ? '#fff' : '#555'}}>
            All
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(selectedCategory === c.id ? '' : c.id)}
              style={{padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer', fontSize:13, fontWeight:500,
                background: selectedCategory === c.id ? '#f97316' : '#f8f9fa', color: selectedCategory === c.id ? '#fff' : '#555'}}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {loading ? <p>Loading...</p> : filtered.length === 0 ? (
        <div style={{textAlign:'center', padding:60}}>
          <p style={{fontSize:40, marginBottom:16}}>🔍</p>
          <p style={{color:'#666', marginBottom:16}}>No products found</p>
          <button onClick={clearFilters} style={styles.heroBtn}>Clear Filters</button>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => {
            const cond = conditionLabel(p.condition)
            return (
              <div key={p.id} style={styles.card}>
                <div style={styles.cardImg}>
                  {p.images?.[0] ? <img src={p.images[0].startsWith('http') ? p.images[0] : `http://localhost:3000${p.images[0]}`} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📱'}
                </div>
                <div style={styles.cardBody}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                    <p style={styles.cardVendor}>{p.vendor?.storeName} · {p.category?.name}</p>
                    <span style={{padding:'2px 8px', borderRadius:4, fontSize:11, fontWeight:600, background: cond.bg, color: cond.color}}>{cond.text}</span>
                  </div>
                  <h3 style={styles.cardName}>{p.name}</h3>
                  <p style={styles.cardPrice}>{formatQAR(p.price)}</p>
                  <Link to={`/products/${p.id}`} style={styles.cardBtn}>View Details</Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.login(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      navigate('/')
    } catch { setError('Invalid email or password') }
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
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.register(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      navigate('/')
    } catch { setError('Registration failed. Email may already exist.') }
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

function Cart({ onCartUpdate }) {
  const [cartData, setCartData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadCart = () => {
    cart.get().then(r => {
      setCartData(r.data)
      setLoading(false)
      const total = r.data.items.reduce((sum, i) => sum + i.quantity, 0)
      if (onCartUpdate) onCartUpdate(total)
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadCart() }, [])

  const handleUpdate = async (productId, qty) => {
    if (qty < 1) return
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
                  <button onClick={() => item.quantity === 1 ? handleRemove(item.productId) : handleUpdate(item.productId, item.quantity - 1)} style={styles.qtyBtn}>−</button>
                  <span style={{fontWeight:500, minWidth:20, textAlign:'center'}}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.productId, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <p style={{color:'#f97316', fontWeight:500, minWidth:90, textAlign:'right'}}>{formatQAR(item.product.price * item.quantity)}</p>
                <button onClick={() => handleRemove(item.productId)} style={styles.removeBtn}>✕</button>
              </div>
            </div>
          ))}
          <div style={styles.cartTotal}>
            <h3 style={{marginBottom:16}}>Total: {formatQAR(cartData.total)}</h3>
            <button onClick={() => navigate('/checkout')} style={styles.submitBtn}>Proceed to Checkout →</button>
          </div>
        </>
      )}
    </div>
  )
}

function Checkout() {
  const [form, setForm] = useState({ name: '', street: '', city: 'Doha', country: 'Qatar', phone: '' })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [cardForm, setCardForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [cartData, setCartData] = useState({ items: [], total: 0 })
  const [loadingCart, setLoadingCart] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cart.get().then(r => { setCartData(r.data); setLoadingCart(false) })
  }, [])

  const formatCardNumber = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
    return clean
  }

  const handlePlaceOrder = async () => {
    if (!form.name || !form.street || !form.phone) { setError('Please fill in all required shipping fields (*)'); return }
    if (paymentMethod === 'card' && (!cardForm.cardName || !cardForm.cardNumber || !cardForm.expiry || !cardForm.cvv)) { setError('Please fill in all card details'); return }
    setPlacing(true); setError('')
    try {
      const res = await orders.place({ shippingAddress: form })
      navigate(`/orders/${res.data.order.id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order.')
      setPlacing(false)
    }
  }

  return (
    <div style={{...styles.page, maxWidth:900}}>
      <h2 style={{marginBottom:8}}>Checkout</h2>
      <p style={{color:'#666', marginBottom:32}}>Fill in your delivery details to place your order</p>
      {error && <p style={styles.error}>{error}</p>}
      <div style={{display:'flex', gap:40, flexWrap:'wrap'}}>
        <div style={{flex:1, minWidth:280}}>
          <h3 style={{marginBottom:16, fontSize:18}}>📦 Shipping Address</h3>
          <input style={styles.input} placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input style={styles.input} placeholder="Street Address *" value={form.street} onChange={e => setForm({...form, street: e.target.value})} />
          <input style={styles.input} placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input style={styles.input} placeholder="Country" value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
          <input style={styles.input} placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <h3 style={{marginBottom:16, marginTop:8, fontSize:18}}>💳 Payment Method</h3>
          <div onClick={() => setPaymentMethod('cod')} style={{padding:'14px 16px', border: paymentMethod === 'cod' ? '2px solid #f97316' : '2px solid #eee', borderRadius:8, marginBottom:12, background: paymentMethod === 'cod' ? '#fff7ed' : '#fff', cursor:'pointer'}}>
            <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
              <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <span>🚚 Cash on Delivery</span>
            </label>
          </div>
          <div onClick={() => setPaymentMethod('card')} style={{border: paymentMethod === 'card' ? '2px solid #f97316' : '2px solid #eee', borderRadius:8, marginBottom:24, background: paymentMethod === 'card' ? '#fff7ed' : '#fff', cursor:'pointer', overflow:'hidden'}}>
            <div style={{padding:'14px 16px'}}>
              <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span>💳 Credit / Debit Card</span>
              </label>
            </div>
            {paymentMethod === 'card' && (
              <div style={{padding:'0 16px 16px', borderTop:'1px solid #f0e0d0'}} onClick={e => e.stopPropagation()}>
                <input style={{...styles.input, marginTop:12}} placeholder="Cardholder Name" value={cardForm.cardName} onChange={e => setCardForm({...cardForm, cardName: e.target.value})} />
                <input style={{...styles.input, letterSpacing:2}} placeholder="1234 5678 9012 3456" value={cardForm.cardNumber} onChange={e => setCardForm({...cardForm, cardNumber: formatCardNumber(e.target.value)})} maxLength={19} />
                <div style={{display:'flex', gap:12}}>
                  <input style={{...styles.input, flex:1}} placeholder="MM/YY" value={cardForm.expiry} onChange={e => setCardForm({...cardForm, expiry: formatExpiry(e.target.value)})} maxLength={5} />
                  <input style={{...styles.input, flex:1}} placeholder="CVV" type="password" value={cardForm.cvv} onChange={e => setCardForm({...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0,4)})} maxLength={4} />
                </div>
                <p style={{fontSize:12, color:'#999'}}>🔒 Demo only — no real payment charged</p>
              </div>
            )}
          </div>
          <button onClick={handlePlaceOrder} disabled={placing} style={{...styles.submitBtn, opacity: placing ? 0.7 : 1}}>
            {placing ? 'Placing Order...' : paymentMethod === 'card' ? '💳 Place Order' : '✅ Place Order'}
          </button>
        </div>
        <div style={{width:280}}>
          <h3 style={{marginBottom:16, fontSize:18}}>🧾 Order Summary</h3>
          <div style={{background:'#f8f9fa', borderRadius:12, padding:20}}>
            {loadingCart ? <p style={{color:'#666', fontSize:14}}>Loading...</p> : cartData.items.length === 0 ? <p style={{color:'#666', fontSize:14}}>No items</p> : (
              <>
                {cartData.items.map(item => (
                  <div key={item.id} style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14}}>
                    <span style={{flex:1, marginRight:8}}>{item.product.name} × {item.quantity}</span>
                    <span style={{fontWeight:600}}>{formatQAR(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div style={{borderTop:'1px solid #ddd', paddingTop:12, display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:16}}>
                  <span>Total</span>
                  <span style={{color:'#f97316'}}>{formatQAR(cartData.total)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    orders.getOne(id).then(r => { setOrder(r.data); setLoading(false) }).catch(() => { setError('Could not load order'); setLoading(false) })
  }, [id])

  if (loading) return <p style={{padding:40}}>Loading order...</p>
  if (error) return <p style={{padding:40, color:'#ef4444'}}>{error}</p>
  if (!order) return <p style={{padding:40}}>Order not found</p>

  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }

  return (
    <div style={{...styles.page, maxWidth:700}}>
      <div style={{textAlign:'center', padding:'40px 0 32px'}}>
        <div style={{fontSize:64, marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:28, marginBottom:8}}>Order Placed Successfully!</h2>
        <p style={{color:'#666'}}>Order ID: <span style={{fontFamily:'monospace', background:'#f8f9fa', padding:'2px 8px', borderRadius:4}}>{order.id?.slice(0,8)}...</span></p>
      </div>
      <div style={{background:'#f8f9fa', borderRadius:12, padding:24, marginBottom:24}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16}}><span style={{color:'#666'}}>Status</span><span style={{fontWeight:700, color: statusColor[order.status]}}>{order.status}</span></div>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16}}><span style={{color:'#666'}}>Total</span><span style={{fontWeight:700, color:'#f97316', fontSize:18}}>{formatQAR(order.totalAmount)}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'#666'}}>Delivery to</span><span style={{fontWeight:500, textAlign:'right'}}>{order.shippingAddress?.street}, {order.shippingAddress?.city}</span></div>
      </div>
      <h3 style={{marginBottom:16}}>Items Ordered</h3>
      {order.orderItems?.map(item => (
        <div key={item.id} style={styles.cartItem}>
          <div style={{fontSize:28}}>📱</div>
          <div style={{flex:1, marginLeft:16}}>
            <p style={{fontWeight:500}}>{item.product?.name}</p>
            <p style={{color:'#666', fontSize:14}}>{item.vendor?.storeName} · Qty: {item.quantity}</p>
          </div>
          <p style={{color:'#f97316', fontWeight:600}}>{formatQAR(item.unitPrice * item.quantity)}</p>
        </div>
      ))}
      <div style={{display:'flex', gap:12, marginTop:32}}>
        <Link to="/orders" style={{...styles.submitBtn, textDecoration:'none', textAlign:'center', flex:1, display:'block', padding:'14px 0'}}>📦 My Orders</Link>
        <Link to="/products" style={{...styles.submitBtn, textDecoration:'none', textAlign:'center', flex:1, display:'block', padding:'14px 0', background:'#1e3a5f'}}>🛍️ Continue Shopping</Link>
      </div>
    </div>
  )
}

function Orders({ user }) {
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [payoutsData, setPayoutsData] = useState(null)
  const [payoutMsg, setPayoutMsg] = useState('')

  const loadOrders = () => {
    orders.getAll().then(r => { setOrderList(r.data); setLoading(false) })
  }

  useEffect(() => { loadOrders() }, [])

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId)
    try {
      await orders.updateStatus(orderId, status)
      loadOrders()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status')
    }
    setUpdatingId(null)
  }

  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }
  const nextStatus = { PENDING:'CONFIRMED', CONFIRMED:'SHIPPED', SHIPPED:'DELIVERED' }

  if (loading) return <p style={{padding:40}}>Loading orders...</p>

  return (
    <div style={styles.page}>
      <h2 style={{marginBottom:24}}>My Orders</h2>
      {orderList.length === 0 ? (
        <div style={{textAlign:'center', padding:60}}>
          <p style={{marginBottom:20}}>No orders yet</p>
          <Link to="/products" style={styles.heroBtn}>Start Shopping</Link>
        </div>
      ) : orderList.map(order => (
        <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
            <div>
              <Link to={`/orders/${order.id}`} style={{fontWeight:600, marginBottom:4, color:'#1e3a5f', textDecoration:'none'}}>Order #{order.id?.slice(0,8)}...</Link>
              <p style={{color:'#666', fontSize:14, marginTop:4}}>{new Date(order.createdAt).toLocaleDateString('en-QA', {day:'numeric', month:'short', year:'numeric'})}</p>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
              <p style={{color:'#f97316', fontWeight:700, fontSize:18}}>{formatQAR(order.totalAmount)}</p>
              <span style={{background: statusColor[order.status] + '20', color: statusColor[order.status], padding:'4px 12px', borderRadius:20, fontSize:13, fontWeight:600}}>{order.status}</span>
              {user?.role === 'VENDOR' && nextStatus[order.status] && (
                <button onClick={() => handleStatusUpdate(order.id, nextStatus[order.status])} disabled={updatingId === order.id}
                  style={{padding:'6px 14px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, opacity: updatingId === order.id ? 0.7 : 1}}>
                  {updatingId === order.id ? '...' : `Mark ${nextStatus[order.status]}`}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductDetail({ user }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [toast, setToast] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState('')

  const loadReviews = () => {
    products.getReviews(id).then(r => setReviews(r.data)).catch(() => {})
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    products.getOne(id).then(r => { setProduct(r.data); setLoading(false) })
    loadReviews()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = async () => {
    if (added) return
    try {
      await cart.add({ productId: id, quantity: 1 })
      setAdded(true); setToast(true)
      setTimeout(() => setToast(false), 2500)
      setTimeout(() => setAdded(false), 3000)
    } catch { alert('Please login to add to cart') }
  }

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) { setReviewError('Please write a comment'); return }
    setSubmitting(true); setReviewError(''); setReviewSuccess('')
    try {
      await products.addReview(id, reviewForm)
      setReviewSuccess('✅ Review submitted successfully!')
      setReviewForm({ rating: 5, comment: '' })
      loadReviews()
      products.getOne(id).then(r => setProduct(r.data))
    } catch (err) {
      setReviewError(err.response?.data?.error || 'Failed to submit review')
    }
    setSubmitting(false)
  }

  const handleDeleteReview = async () => {
    if (!window.confirm('Delete your review?')) return
    try {
      await products.deleteReview(id)
      setReviewSuccess('Review deleted')
      loadReviews()
      products.getOne(id).then(r => setProduct(r.data))
    } catch (err) {
      setReviewError(err.response?.data?.error || 'Failed to delete review')
    }
  }

  const renderStars = (rating, interactive = false, onRate = null) => (
    <div style={{display:'flex', gap:4}}>
      {[1,2,3,4,5].map(star => (
        <span key={star} onClick={() => interactive && onRate && onRate(star)}
          style={{fontSize: interactive ? 28 : 16, cursor: interactive ? 'pointer' : 'default', color: star <= rating ? '#f97316' : '#ddd', transition:'color 0.1s'}}>★</span>
      ))}
    </div>
  )

  if (loading) return <p style={{padding:40}}>Loading...</p>
  if (!product) return <p style={{padding:40}}>Product not found</p>

  const imgSrc = product.images?.[0] ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:3000${product.images[0]}`) : null
  const userReview = reviews.find(r => r.userId === user?.id)
  const cond = conditionLabel(product.condition)

  return (
    <div style={{...styles.page, maxWidth:800}}>
      {toast && <div style={{position:'fixed', top:80, right:24, background:'#10b981', color:'#fff', padding:'14px 24px', borderRadius:12, fontWeight:600, zIndex:999}}>✓ Added to Cart!</div>}

      <div style={{display:'flex', gap:40, flexWrap:'wrap', marginBottom:40}}>
        <div style={{width:200, height:200, background:'#f8f9fa', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, overflow:'hidden'}}>
          {imgSrc ? <img src={imgSrc} alt={product.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📱'}
        </div>
        <div style={{flex:1}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
            <p style={{color:'#888'}}>{product.vendor?.storeName} · {product.category?.name}</p>
            <span style={{padding:'2px 10px', borderRadius:6, fontSize:13, fontWeight:600, background: cond.bg, color: cond.color}}>{cond.text}</span>
          </div>
          <h1 style={{fontSize:28, marginBottom:8}}>{product.name}</h1>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
            {renderStars(Math.round(product.avgRating || 0))}
            <span style={{color:'#666', fontSize:14}}>
              {product.avgRating > 0 ? `${product.avgRating} / 5` : 'No ratings yet'}
              {reviews.length > 0 && ` (${reviews.length} review${reviews.length !== 1 ? 's' : ''})`}
            </span>
          </div>
          <p style={{color:'#f97316', fontSize:32, fontWeight:700, marginBottom:16}}>{formatQAR(product.price)}</p>
          <p style={{color:'#555', lineHeight:1.7, marginBottom:24}}>{product.description}</p>
          <p style={{color:'#888', marginBottom:20}}>In stock: {product.stockQty} units</p>
          <button onClick={handleAddToCart} disabled={added} style={{...styles.submitBtn, width:'auto', padding:'14px 32px', background: added ? '#10b981' : '#f97316', opacity: added ? 0.85 : 1, cursor: added ? 'default' : 'pointer', transition:'background 0.3s'}}>
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div style={{borderTop:'1px solid #eee', paddingTop:32}}>
        <h2 style={{marginBottom:24}}>Customer Reviews</h2>
        {user && !userReview && (
          <div style={{background:'#f8f9fa', borderRadius:12, padding:24, marginBottom:32}}>
            <h3 style={{marginBottom:16, fontSize:18}}>✍️ Write a Review</h3>
            {reviewError && <p style={{color:'#ef4444', marginBottom:12}}>{reviewError}</p>}
            {reviewSuccess && <p style={{color:'#10b981', marginBottom:12}}>{reviewSuccess}</p>}
            <div style={{marginBottom:16}}>
              <p style={{marginBottom:8, fontWeight:500}}>Your Rating</p>
              {renderStars(reviewForm.rating, true, (star) => setReviewForm({...reviewForm, rating: star}))}
            </div>
            <textarea style={{...styles.input, height:100, resize:'vertical'}} placeholder="Share your experience..." value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
            <button onClick={handleSubmitReview} disabled={submitting} style={{...styles.submitBtn, opacity: submitting ? 0.7 : 1}}>
              {submitting ? 'Submitting...' : '⭐ Submit Review'}
            </button>
            <p style={{color:'#999', fontSize:12, marginTop:8}}>* Only customers who received this product can review it</p>
          </div>
        )}
        {userReview && (
          <div style={{background:'#fff7ed', border:'1px solid #f97316', borderRadius:12, padding:20, marginBottom:24}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <p style={{fontWeight:600, marginBottom:4}}>Your Review</p>
                {renderStars(userReview.rating)}
                <p style={{color:'#555', marginTop:8}}>{userReview.comment}</p>
              </div>
              <button onClick={handleDeleteReview} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:13}}>🗑️ Delete</button>
            </div>
          </div>
        )}
        {!user && (
          <div style={{background:'#f8f9fa', borderRadius:12, padding:20, marginBottom:24, textAlign:'center'}}>
            <p style={{color:'#666', marginBottom:12}}>Login to leave a review</p>
            <Link to="/login" style={{...styles.submitBtn, textDecoration:'none', display:'inline-block', padding:'10px 24px', width:'auto'}}>Login</Link>
          </div>
        )}
        {reviews.length === 0 ? (
          <p style={{color:'#888', textAlign:'center', padding:32}}>No reviews yet. Be the first to review!</p>
        ) : reviews.map(review => (
          <div key={review.id} style={{borderBottom:'1px solid #eee', paddingBottom:20, marginBottom:20}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
              <div>
                <p style={{fontWeight:600, marginBottom:4}}>👤 {review.user?.name}</p>
                {renderStars(review.rating)}
              </div>
              <p style={{color:'#aaa', fontSize:13}}>{new Date(review.createdAt).toLocaleDateString('en-QA', {day:'numeric', month:'short', year:'numeric'})}</p>
            </div>
            <p style={{color:'#555', marginTop:8, lineHeight:1.6}}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [allOrders, setAllOrders] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allVendors, setAllVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes, usersRes, vendorsRes, payoutsRes] = await Promise.all([
        orders.adminGetStats(), orders.adminGetAll(), orders.adminGetUsers(), orders.adminGetVendors(), vendors.adminGetPayouts()
      ])
      setStats(statsRes.data); setAllOrders(ordersRes.data); setAllUsers(usersRes.data); setAllVendors(vendorsRes.data); setPayoutsData(payoutsRes.data)
    } catch (err) { console.error('Admin load error:', err) }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId)
    try { await orders.updateStatus(orderId, status); await loadData() }
    catch (err) { alert(err.response?.data?.error || 'Failed to update') }
    setUpdatingId(null)
  }

  const handleMarkPaid = async (vendorId, amount) => {
    const note = prompt('Add a note (optional):') || ''
    try {
      await vendors.adminMarkPaid({ vendorId, amount, note })
      setPayoutMsg('✅ Payout marked as paid!')
      loadData()
      setTimeout(() => setPayoutMsg(''), 3000)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to mark payout')
    }
  }
  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }
  const roleColor = { CUSTOMER:'#6b7280', VENDOR:'#8b5cf6', ADMIN:'#ef4444' }
  const tabBtn = (key, label) => (
    <button onClick={() => setTab(key)} style={{padding:'10px 20px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:14, background: tab === key ? '#f97316' : '#f8f9fa', color: tab === key ? '#fff' : '#333'}}>{label}</button>
  )

  if (loading) return <p style={{padding:40}}>Loading admin dashboard...</p>

  return (
    <div style={styles.page}>
      <div style={{background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', borderRadius:16, padding:32, marginBottom:32, color:'#fff'}}>
        <h2 style={{fontSize:28, marginBottom:4}}>⚙️ Admin Dashboard</h2>
        <p style={{color:'#94a3b8'}}>Manage your MobiMart by JASPR Trading marketplace</p>
      </div>
      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap'}}>
        {tabBtn('overview', '📊 Overview')}
        {tabBtn('orders', '📦 All Orders')}
        {tabBtn('users', '👥 Users')}
        {tabBtn('vendors', '🏪 Vendors')}
        {tabBtn('payouts', '💰 Payouts')}
      </div>

      {tab === 'overview' && stats && (
        <div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16, marginBottom:32}}>
            {[
              { label:'Total Orders', value: stats.totalOrders, icon:'📦', color:'#f97316' },
              { label:'Total Revenue', value: formatQAR(stats.totalRevenue || 0), icon:'💰', color:'#10b981' },
              { label:'Platform Fees', value: formatQAR(stats.totalPlatformFee || 0), icon:'🏦', color:'#f97316' },
              { label:'Total Users', value: stats.totalUsers, icon:'👥', color:'#3b82f6' },
              { label:'Total Vendors', value: stats.totalVendors, icon:'🏪', color:'#8b5cf6' },
              { label:'Active Products', value: stats.totalProducts, icon:'📱', color:'#f43f5e' },
            ].map(stat => (
              <div key={stat.label} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <p style={{fontSize:32, marginBottom:8}}>{stat.icon}</p>
                <p style={{fontSize:28, fontWeight:700, color: stat.color}}>{stat.value}</p>
                <p style={{color:'#666', fontSize:14}}>{stat.label}</p>
              </div>
            ))}
          </div>
          <h3 style={{marginBottom:16}}>Recent Orders</h3>
          {stats.recentOrders?.map(order => (
            <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:16, marginBottom:12, background:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontWeight:600}}>Order #{order.id?.slice(0,8)}...</p>
                <p style={{color:'#666', fontSize:13}}>{order.user?.name} · {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <p style={{fontWeight:700, color:'#f97316'}}>{formatQAR(order.totalAmount)}</p>
                <span style={{background: statusColor[order.status] + '20', color: statusColor[order.status], padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:600}}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'orders' && (
        <div>
          <h3 style={{marginBottom:16}}>All Orders ({allOrders.length})</h3>
          {allOrders.map(order => (
            <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12}}>
                <div>
                  <p style={{fontWeight:600, marginBottom:4}}>Order #{order.id?.slice(0,8)}...</p>
                  <p style={{color:'#666', fontSize:13}}>👤 {order.user?.name} ({order.user?.email})</p>
                  <p style={{color:'#666', fontSize:13}}>📅 {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p style={{color:'#666', fontSize:13}}>📦 {order.orderItems?.length} item(s) · 📍 {order.shippingAddress?.city}</p>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{fontWeight:700, color:'#f97316', fontSize:18, marginBottom:8}}>{formatQAR(order.totalAmount)}</p>
                  <span style={{background: statusColor[order.status] + '20', color: statusColor[order.status], padding:'4px 12px', borderRadius:20, fontSize:13, fontWeight:600, display:'block', marginBottom:8}}>{order.status}</span>
                  <select value={order.status} onChange={e => handleStatusUpdate(order.id, e.target.value)} disabled={updatingId === order.id}
                    style={{padding:'6px 10px', borderRadius:8, border:'1px solid #ddd', fontSize:13, cursor:'pointer', background:'#fff'}}>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && (
        <div>
          <h3 style={{marginBottom:16}}>All Users ({allUsers.length})</h3>
          <div style={{border:'1px solid #eee', borderRadius:12, overflow:'hidden'}}>
            {allUsers.map((u, i) => (
              <div key={u.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', background: i % 2 === 0 ? '#fff' : '#f8f9fa', borderBottom:'1px solid #eee'}}>
                <div>
                  <p style={{fontWeight:600}}>{u.name}</p>
                  <p style={{color:'#666', fontSize:13}}>{u.email} {u.phone ? `· ${u.phone}` : ''}</p>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <p style={{color:'#aaa', fontSize:12}}>{new Date(u.createdAt).toLocaleDateString()}</p>
                  <span style={{background: roleColor[u.role] + '20', color: roleColor[u.role], padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:600}}>{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'vendors' && (
        <div>
          <h3 style={{marginBottom:16}}>All Vendors ({allVendors.length})</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16}}>
            {allVendors.map(vendor => (
              <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
                  <div>
                    <p style={{fontWeight:700, fontSize:16, marginBottom:4}}>🏪 {vendor.storeName}</p>
                    <p style={{color:'#666', fontSize:13}}>{vendor.user?.name}</p>
                    <p style={{color:'#aaa', fontSize:12}}>{vendor.user?.email}</p>
                  </div>
                  <span style={{background: vendor.isVerified ? '#d1fae5' : '#fef3c7', color: vendor.isVerified ? '#065f46' : '#92400e', padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:600}}>
                    {vendor.isVerified ? '✅ Verified' : '⏳ Pending'}
                  </span>
                </div>
                <p style={{color:'#555', fontSize:13, marginBottom:12}}>{vendor.description || 'No description'}</p>
                <div style={{display:'flex', gap:16}}>
                  <div style={{textAlign:'center'}}>
                    <p style={{fontWeight:700, color:'#f97316'}}>{vendor._count?.products || 0}</p>
                    <p style={{color:'#666', fontSize:12}}>Products</p>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <p style={{fontWeight:700, color:'#3b82f6'}}>{vendor._count?.orderItems || 0}</p>
                    <p style={{color:'#666', fontSize:12}}>Orders</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'payouts' && payoutsData && (
        <div>
          {payoutMsg && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{payoutMsg}</div>}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16, marginBottom:32}}>
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
              <p style={{fontSize:28, marginBottom:8}}>🏦</p>
              <p style={{fontSize:22, fontWeight:700, color:'#10b981'}}>{formatQAR(payoutsData.summary?.totalPlatformRevenue || 0)}</p>
              <p style={{color:'#666', fontSize:14}}>Total Platform Revenue</p>
            </div>
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
              <p style={{fontSize:28, marginBottom:8}}>⏳</p>
              <p style={{fontSize:22, fontWeight:700, color:'#f97316'}}>{formatQAR(payoutsData.summary?.totalPendingPayouts || 0)}</p>
              <p style={{color:'#666', fontSize:14}}>Total Pending Payouts</p>
            </div>
          </div>
          <h3 style={{marginBottom:16}}>Vendor Payout Summary</h3>
          {payoutsData.vendors?.map(vendor => (
            <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12}}>
                <div>
                  <p style={{fontWeight:700, fontSize:16, marginBottom:4}}>🏪 {vendor.storeName}</p>
                  <p style={{color:'#666', fontSize:13}}>{vendor.ownerName} · {vendor.ownerEmail}</p>
                  <p style={{color:'#aaa', fontSize:12}}>IBAN: {vendor.ibanNumber || 'Not provided'}</p>
                  <p style={{color:'#aaa', fontSize:12}}>Commission: {(vendor.commissionRate * 100).toFixed(0)}%</p>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{display:'flex', gap:12, marginBottom:12, flexWrap:'wrap'}}>
                    <div style={{textAlign:'center', background:'#f8f9fa', padding:'8px 12px', borderRadius:8}}>
                      <p style={{fontWeight:700, color:'#1e3a5f', fontSize:14}}>{formatQAR(vendor.totalSales)}</p>
                      <p style={{color:'#666', fontSize:11}}>Total Sales</p>
                    </div>
                    <div style={{textAlign:'center', background:'#fff7ed', padding:'8px 12px', borderRadius:8}}>
                      <p style={{fontWeight:700, color:'#f97316', fontSize:14}}>{formatQAR(vendor.totalPlatformFee)}</p>
                      <p style={{color:'#666', fontSize:11}}>Platform Fee</p>
                    </div>
                    <div style={{textAlign:'center', background:'#d1fae5', padding:'8px 12px', borderRadius:8}}>
                      <p style={{fontWeight:700, color:'#065f46', fontSize:14}}>{formatQAR(vendor.totalEarnings)}</p>
                      <p style={{color:'#666', fontSize:11}}>Vendor Earning</p>
                    </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:12, justifyContent:'flex-end'}}>
                    <div style={{textAlign:'right'}}>
                      <p style={{fontSize:13, color:'#666'}}>Paid: {formatQAR(vendor.totalPaid)}</p>
                      <p style={{fontSize:15, fontWeight:700, color: vendor.pendingPayout > 0 ? '#ef4444' : '#10b981'}}>Pending: {formatQAR(vendor.pendingPayout)}</p>
                    </div>
                    {vendor.pendingPayout > 0 && (
                      <button onClick={() => handleMarkPaid(vendor.id, vendor.pendingPayout)} style={{padding:'8px 16px', background:'#10b981', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>✅ Mark Paid</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function VendorDashboard() {
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('products')
  const [form, setForm] = useState({ name: '', description: '', price: '', stockQty: '', categoryId: '', condition: 'NEW' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageTab, setImageTab] = useState('upload')
  const [imageUrl, setImageUrl] = useState('')
  const [excelFile, setExcelFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [categories, setCategories] = useState([])

  const loadStore = () => {
    vendors.getMyStore().then(r => { setStore(r.data); setLoading(false) }).catch(() => { setLoading(false) })
  }
  const loadEarnings = () => {
    vendors.getMyEarnings().then(r => { setEarnings(r.data); setIban(r.data.vendor?.ibanNumber || '') }).catch(() => {})
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => { loadStore(); loadEarnings() }, [])
  useEffect(() => {
    products.getCategories().then(r => setCategories(r.data)).catch(() => {})
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const resetImageFields = () => {
    setImageFile(null); setImagePreview(null); setImageUrl(''); setImageTab('upload')
  }

  const handleSaveIban = async () => {
    try {
      await vendors.updateIban({ ibanNumber: iban })
      setIbanMsg('✅ IBAN saved successfully!')
      setTimeout(() => setIbanMsg(''), 3000)
    } catch {
      setIbanMsg('❌ Failed to save IBAN')
    }
  }
  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.stockQty) { setError('Name, price and stock are required'); return }
    setSaving(true); setError(''); setMessage('')
    try {
      let finalImageUrl = null
      if (imageTab === 'upload' && imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        const imgRes = await vendors.uploadImage(formData)
        finalImageUrl = imgRes.data.imageUrl
      } else if (imageTab === 'url' && imageUrl) {
        finalImageUrl = imageUrl
      }
      if (editingId) {
        await products.update(editingId, {
          ...form,
          price: parseFloat(form.price),
          stockQty: parseInt(form.stockQty),
          isActive: true,
          ...(finalImageUrl && { images: [finalImageUrl] })
        })
        setMessage('✅ Product updated successfully!')
      } else {
        await products.create({
          ...form,
          price: parseFloat(form.price),
          stockQty: parseInt(form.stockQty),
          images: finalImageUrl ? [finalImageUrl] : []
        })
        setMessage('✅ Product added successfully!')
      }
      setForm({ name: '', description: '', price: '', stockQty: '', categoryId: '', condition: 'NEW' })
      resetImageFields(); setEditingId(null); loadStore(); setTab('products')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product')
    }
    setSaving(false)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stockQty: String(product.stockQty),
      categoryId: product.categoryId || '',
      condition: product.condition || 'NEW'
    })
    setEditingId(product.id); setTab('add'); setMessage(''); setError('')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this product?')) return
    await products.remove(id); loadStore()
  }

  const handleBulkUpload = async () => {
    if (!excelFile) { setError('Please select an Excel file'); return }
    setSaving(true); setError(''); setMessage('')
    try {
      const formData = new FormData()
      formData.append('excel', excelFile)
      const res = await vendors.bulkUpload(formData)
      setMessage(`✅ ${res.data.message}`)
      setExcelFile(null); loadStore()
    } catch (err) {
      setError(err.response?.data?.error || 'Bulk upload failed')
    }
    setSaving(false)
  }

  if (loading) return <p style={{padding:40}}>Loading store...</p>

  if (!store) return (
    <div style={{...styles.page, maxWidth:500}}>
      <h2 style={{marginBottom:24}}>Create Your Store</h2>
      <CreateStore onCreated={loadStore} />
    </div>
  )

  const tabBtn = (key, label) => (
    <button onClick={() => { setTab(key); setMessage(''); setError('') }}
      style={{padding:'10px 24px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:14,
        background: tab === key ? '#f97316' : '#f8f9fa', color: tab === key ? '#fff' : '#333'}}>
      {label}
    </button>
  )

  return (
    <div style={styles.page}>
      <div style={{background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', borderRadius:16, padding:32, marginBottom:32, color:'#fff'}}>
        <h2 style={{fontSize:28, marginBottom:8}}>🏪 {store.storeName}</h2>
        <p style={{color:'#94a3b8'}}>{store.description}</p>
        <div style={{display:'flex', gap:24, marginTop:20}}>
          <div style={{display:'flex', gap:24, marginTop:20}}>
            <div style={{background:'rgba(255,255,255,0.1)', padding:'12px 20px', borderRadius:10}}>
              <p style={{fontSize:24, fontWeight:700}}>{store.products?.length || 0}</p>
              <p style={{fontSize:12, color:'#94a3b8'}}>Products</p>
            </div>
            {earnings && (
              <div style={{background:'rgba(255,255,255,0.1)', padding:'12px 20px', borderRadius:10}}>
                <p style={{fontSize:24, fontWeight:700}}>{formatQAR(earnings.summary?.pendingPayout || 0)}</p>
                <p style={{fontSize:12, color:'#94a3b8'}}>Pending Payout</p>
              </div>
            )}
          </div>
      </div>

      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap'}}>
        {tabBtn('products', '📦 My Products')}
        {tabBtn('add', editingId ? '✏️ Edit Product' : '➕ Add Product')}
        {tabBtn('bulk', '📊 Bulk Upload')}
        {tabBtn('earnings', '💰 My Earnings')}
      </div>

      {message && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{message}</div>}
      {error && <div style={{background:'#fee2e2', color:'#991b1b', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{error}</div>}

      {tab === 'products' && (
        <div>
          {store.products?.length === 0 ? (
            <div style={{textAlign:'center', padding:60, background:'#f8f9fa', borderRadius:12}}>
              <p style={{fontSize:40, marginBottom:16}}>📦</p>
              <p style={{color:'#666', marginBottom:20}}>No products yet</p>
              <button onClick={() => setTab('add')} style={styles.submitBtn}>Add Your First Product</button>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16}}>
              {store.products.map(p => {
                const imgSrc = p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : `http://localhost:3000${p.images[0]}`) : null
                const cond = conditionLabel(p.condition)
                return (
                  <div key={p.id} style={{border:'1px solid #eee', borderRadius:12, overflow:'hidden', background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                    <div style={{height:140, background:'#f8f9fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, overflow:'hidden'}}>
                      {imgSrc ? <img src={imgSrc} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📱'}
                    </div>
                    <div style={{padding:16}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                        <h3 style={{fontSize:15, fontWeight:600}}>{p.name}</h3>
                        <span style={{padding:'2px 8px', borderRadius:4, fontSize:11, fontWeight:600, background: cond.bg, color: cond.color}}>{cond.text}</span>
                      </div>
                      <p style={{color:'#f97316', fontWeight:700, marginBottom:4}}>{formatQAR(p.price)}</p>
                      <p style={{color:'#666', fontSize:13, marginBottom:12}}>Stock: {p.stockQty} units</p>
                      <div style={{display:'flex', gap:8}}>
                        <button onClick={() => handleEdit(p)} style={{flex:1, padding:'8px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13}}>✏️ Edit</button>
                        <button onClick={() => handleDelete(p.id)} style={{flex:1, padding:'8px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:8, cursor:'pointer', fontSize:13}}>🗑️ Remove</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {tab === 'add' && (
        <div style={{maxWidth:600}}>
          <h3 style={{marginBottom:24}}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <input style={styles.input} placeholder="Product Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <textarea style={{...styles.input, height:100, resize:'vertical'}} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <div style={{display:'flex', gap:12}}>
            <input style={{...styles.input, flex:1}} placeholder="Price (QAR) *" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            <input style={{...styles.input, flex:1}} placeholder="Stock Qty *" type="number" value={form.stockQty} onChange={e => setForm({...form, stockQty: e.target.value})} />
          </div>
          <select style={styles.input} value={form.categoryId || ''} onChange={e => setForm({...form, categoryId: e.target.value})}>
            <option value="">Select Category (optional)</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={styles.input} value={form.condition || 'NEW'} onChange={e => setForm({...form, condition: e.target.value})}>
            <option value="NEW">🟢 New</option>
            <option value="LIKE_NEW">🟡 Like New</option>
            <option value="GOOD">🟠 Good</option>
            <option value="FAIR">🔴 Fair/Acceptable</option>
          </select>

          <div style={{marginBottom:12}}>
            <p style={{fontWeight:600, marginBottom:8, fontSize:14}}>Product Image</p>
            <div style={{display:'flex', gap:8, marginBottom:12}}>
              <button onClick={() => setImageTab('upload')} style={{flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer', background: imageTab === 'upload' ? '#f97316' : '#f8f9fa', color: imageTab === 'upload' ? '#fff' : '#333', fontWeight:600, fontSize:13}}>📁 Upload File</button>
              <button onClick={() => setImageTab('url')} style={{flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer', background: imageTab === 'url' ? '#f97316' : '#f8f9fa', color: imageTab === 'url' ? '#fff' : '#333', fontWeight:600, fontSize:13}}>🌐 Image URL</button>
            </div>
            {imageTab === 'upload' ? (
              <div style={{border:'2px dashed #ddd', borderRadius:12, padding:24, textAlign:'center', cursor:'pointer'}} onClick={() => document.getElementById('imgInput').click()}>
                {imagePreview ? <img src={imagePreview} alt="preview" style={{maxHeight:150, maxWidth:'100%', borderRadius:8}} /> : (
                  <><p style={{fontSize:32, marginBottom:8}}>📷</p><p style={{color:'#666'}}>Click to upload</p><p style={{color:'#aaa', fontSize:12}}>JPG, PNG supported</p></>
                )}
                <input id="imgInput" type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange} />
              </div>
            ) : (
              <div>
                <input style={styles.input} placeholder="Paste image URL..." value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImagePreview(e.target.value) }} />
                {imageUrl && <img src={imageUrl} alt="preview" style={{maxHeight:150, maxWidth:'100%', borderRadius:8, border:'1px solid #eee'}} onError={e => { e.target.style.display='none' }} />}
              </div>
            )}
            {(imagePreview || imageUrl) && <button onClick={resetImageFields} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', marginTop:8, fontSize:13}}>✕ Remove image</button>}
          </div>

          <div style={{display:'flex', gap:12}}>
            <button onClick={handleAddProduct} disabled={saving} style={{...styles.submitBtn, flex:1, opacity: saving ? 0.7 : 1}}>
              {saving ? 'Saving...' : editingId ? '✅ Update Product' : '✅ Add Product'}
            </button>
            {editingId && <button onClick={() => { setEditingId(null); setForm({ name:'', description:'', price:'', stockQty:'', categoryId:'', condition:'NEW' }); resetImageFields(); setTab('products') }} style={{...styles.submitBtn, flex:1, background:'#6b7280'}}>Cancel</button>}
          </div>
        </div>
      )}

      {tab === 'bulk' && (
        <div style={{maxWidth:600}}>
          <h3 style={{marginBottom:8}}>📊 Bulk Upload via Excel</h3>
          <p style={{color:'#666', marginBottom:24}}>Upload multiple products at once</p>
          <div style={{background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:12, padding:20, marginBottom:24}}>
            <h4 style={{marginBottom:8, color:'#1e40af'}}>📋 Excel Format</h4>
            <div style={{background:'#fff', borderRadius:8, padding:12, fontFamily:'monospace', fontSize:13}}>
              <span style={{background:'#dbeafe', padding:'2px 8px', borderRadius:4, marginRight:8}}>Name</span>
              <span style={{background:'#dbeafe', padding:'2px 8px', borderRadius:4, marginRight:8}}>Description</span>
              <span style={{background:'#dbeafe', padding:'2px 8px', borderRadius:4, marginRight:8}}>Price</span>
              <span style={{background:'#dbeafe', padding:'2px 8px', borderRadius:4, marginRight:8}}>Stock</span>
              <span style={{background:'#e0e7ff', padding:'2px 8px', borderRadius:4, marginRight:8}}>CategoryId</span>
              <span style={{background:'#e0e7ff', padding:'2px 8px', borderRadius:4}}>Condition</span>
            </div>
            <p style={{fontSize:12, color:'#666', marginTop:8}}>Condition values: NEW, LIKE_NEW, GOOD, FAIR</p>
          </div>
          <div style={{border:'2px dashed #ddd', borderRadius:12, padding:40, textAlign:'center', marginBottom:16, cursor:'pointer', background: excelFile ? '#f0fdf4' : '#fff'}} onClick={() => document.getElementById('excelInput').click()}>
            <p style={{fontSize:40, marginBottom:8}}>📊</p>
            {excelFile ? <><p style={{color:'#065f46', fontWeight:600}}>{excelFile.name}</p><p style={{color:'#666', fontSize:13}}>Click to change</p></> : <><p style={{color:'#666', fontWeight:500}}>Click to select Excel file</p><p style={{color:'#aaa', fontSize:12}}>.xlsx and .xls supported</p></>}
            <input id="excelInput" type="file" accept=".xlsx,.xls" style={{display:'none'}} onChange={e => setExcelFile(e.target.files[0])} />
          </div>
          <button onClick={handleBulkUpload} disabled={saving || !excelFile} style={{...styles.submitBtn, opacity: saving || !excelFile ? 0.7 : 1}}>
            {saving ? 'Uploading...' : '📤 Upload Products'}
          </button>
        </div>
      )}
      {tab === 'earnings' && (
        <div>
          {earnings ? (
            <>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:16, marginBottom:32}}>
                {[
                  { label:'Total Sales', value: formatQAR(earnings.summary?.totalSales || 0), icon:'🛒', color:'#1e3a5f' },
                  { label:'Platform Fee (10%)', value: formatQAR(earnings.summary?.totalPlatformFee || 0), icon:'🏦', color:'#f97316' },
                  { label:'Your Earnings', value: formatQAR(earnings.summary?.totalEarnings || 0), icon:'💰', color:'#10b981' },
                  { label:'Total Paid', value: formatQAR(earnings.summary?.totalPaid || 0), icon:'✅', color:'#3b82f6' },
                  { label:'Pending Payout', value: formatQAR(earnings.summary?.pendingPayout || 0), icon:'⏳', color:'#ef4444' },
                ].map(stat => (
                  <div key={stat.label} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                    <p style={{fontSize:28, marginBottom:8}}>{stat.icon}</p>
                    <p style={{fontSize:20, fontWeight:700, color: stat.color}}>{stat.value}</p>
                    <p style={{color:'#666', fontSize:13}}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div style={{background:'#f8f9fa', borderRadius:12, padding:20, marginBottom:24}}>
                <h3 style={{marginBottom:12, fontSize:16}}>🏦 Your Bank IBAN</h3>
                <p style={{color:'#666', fontSize:13, marginBottom:12}}>Add your IBAN so admin can transfer your earnings</p>
                <div style={{display:'flex', gap:12}}>
                  <input style={{...styles.input, flex:1, marginBottom:0}} placeholder="QA57DOHB00001234567890ABCDEFG" value={iban} onChange={e => setIban(e.target.value)} />
                  <button onClick={handleSaveIban} style={{...styles.submitBtn, width:'auto', padding:'12px 20px'}}>Save</button>
                </div>
                {ibanMsg && <p style={{color: ibanMsg.includes('✅') ? '#10b981' : '#ef4444', marginTop:8, fontSize:13}}>{ibanMsg}</p>}
              </div>

              <h3 style={{marginBottom:16}}>📋 Order History</h3>
              {earnings.orderItems?.length === 0 ? (
                <p style={{color:'#888', textAlign:'center', padding:32}}>No orders yet</p>
              ) : earnings.orderItems?.map(item => (
                <div key={item.id} style={{border:'1px solid #eee', borderRadius:10, padding:16, marginBottom:12, background:'#fff'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8}}>
                    <div>
                      <p style={{fontWeight:600}}>{item.product?.name}</p>
                      <p style={{color:'#666', fontSize:13}}>Order #{item.order?.id?.slice(0,8)}... · Qty: {item.quantity}</p>
                      <p style={{color:'#aaa', fontSize:12}}>{new Date(item.order?.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <p style={{color:'#666', fontSize:13}}>Sale: {formatQAR(item.unitPrice * item.quantity)}</p>
                      <p style={{color:'#f97316', fontSize:13}}>Fee: -{formatQAR(item.platformFee)}</p>
                      <p style={{color:'#10b981', fontWeight:700}}>You get: {formatQAR(item.vendorEarning)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : <p style={{padding:40, color:'#666'}}>Loading earnings...</p>}
        </div>
      )}
    </div>
  )
}

function CreateStore({ onCreated }) {
  const [form, setForm] = useState({ storeName: '', description: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleCreate = async () => {
    if (!form.storeName) { setError('Store name is required'); return }
    setSaving(true)
    try {
      await vendors.createStore(form)
      onCreated()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create store')
      setSaving(false)
    }
  }

  return (
    <div>
      {error && <p style={styles.error}>{error}</p>}
      <input style={styles.input} placeholder="Store Name *" value={form.storeName} onChange={e => setForm({...form, storeName: e.target.value})} />
      <textarea style={{...styles.input, height:100, resize:'vertical'}} placeholder="Store Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <button onClick={handleCreate} disabled={saving} style={{...styles.submitBtn, opacity: saving ? 0.7 : 1}}>
        {saving ? 'Creating...' : '🏪 Create My Store'}
      </button>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.me().then(r => setUser(r.data)).catch(() => localStorage.removeItem('token'))
    }
  }, [])

  useEffect(() => {
    if (user) {
      cart.get().then(r => {
        const total = r.data.items.reduce((sum, i) => sum + i.quantity, 0)
        setCartCount(total)
      }).catch(() => {})
    } else {
      setCartCount(0)
    }
  }, [user])

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
        <Route path="/products/:id" element={<ProductDetail user={user} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onLogin={setUser} />} />
        <Route path="/cart" element={<Cart onCartUpdate={setCartCount} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
  cardImg: { height:140, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, background:'#f8f9fa', overflow:'hidden' },
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