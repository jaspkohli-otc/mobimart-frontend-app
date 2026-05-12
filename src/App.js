import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { auth, products, cart, orders, vendors } from './api'
import './App.css'
import translations from './translations';
import Terms from './pages/Terms'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import RefundPolicy from './pages/RefundPolicy'
import Shipping from './pages/Shipping'
import Contact from './pages/Contact'
import SiteFooter from './components/SiteFooter'
import ScrollToTop from './components/ScrollToTop'
const formatQAR = (amount) => `QAR ${Number(amount).toLocaleString('en-QA')}`

const conditionLabel = (c) => {
  if (c === 'NEW') return { text: 'New', bg: '#d1fae5', color: '#065f46' }
  if (c === 'LIKE_NEW') return { text: 'Like New', bg: '#fef9c3', color: '#854d0e' }
  if (c === 'GOOD') return { text: 'Good', bg: '#fed7aa', color: '#9a3412' }
  if (c === 'FAIR') return { text: 'Fair', bg: '#fee2e2', color: '#991b1b' }
  return { text: 'New', bg: '#d1fae5', color: '#065f46' }
}

function Navbar({ user, cartCount, onLogout, language, setLanguage, t }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Mobi<span style={{color:'#f97316'}}>Mart</span>
        <span style={{fontSize:11, color:'#94a3b8', fontWeight:400, marginLeft:8}}>by JASPR Trading</span>
      </Link>
      <div style={styles.navLinks}>
        <Link to="/products" style={styles.navLink}>{t('shop')}</Link>
        {user ? (
          <>
            {user.role === 'ADMIN' && <Link to="/admin" style={{...styles.navLink, color:'#f97316'}}>{t('admin')}</Link>}
            {user.role === 'VENDOR' && <Link to="/vendor" style={styles.navLink}>{t('myStore')}</Link>}
            <Link to="/cart" style={styles.navLink}>{t('cart')} {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}</Link>
            <Link to="/orders" style={styles.navLink}>{t('myOrders')}</Link>
            <button onClick={onLogout} style={styles.logoutBtn}>{t('logout')}</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>{t('login')}</Link>
            <Link to="/register" style={styles.registerBtn}>{t('register')}</Link>
          </>
        )}
        <button onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')} style={{background:'none', border:'1px solid white', color:'white', padding:'4px 10px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold', fontSize:'14px', marginLeft:'12px'}}>{language === 'EN' ? 'AR' : 'EN'}</button>
      </div>
    </nav>
  )
}

function Products({ t = (k) => k, language = 'EN' }) {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
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
    setSelectedCategory('')
    setPriceRange({ min: '', max: '' })
    setSearch('')
    setSelectedCondition('')
  }

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh'}}>

      {/* Hero Banner */}
      <div style={{background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', padding:'40px 32px', marginBottom:32, position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexWrap:'wrap', opacity:0.06, pointerEvents:'none', overflow:'hidden', alignContent:'flex-start'}}>
          {['📱','💻','🎧','⌨️','🖱️','📷','🔋','🎮','⌚','🖥️','📡','💾'].map((emoji, i) => (
            Array.from({length:8}).map((_, j) => (
              <span key={i+'-'+j} style={{fontSize:44, padding:'10px 14px', display:'inline-block'}}>{emoji}</span>
            ))
          ))}
        </div>
        <div style={{position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto'}}>
          <p style={{color:'#f97316', fontSize:13, fontWeight:600, letterSpacing:2, marginBottom:8, textTransform:'uppercase'}}>by JASPR Trading</p>
          <h1 style={{fontSize:36, fontWeight:800, color:'#fff', marginBottom:10, lineHeight:1.2}}>{t('heroTitle')}</h1>
          <p style={{color:'#94a3b8', fontSize:16, marginBottom:24}}>{t('heroSub')}</p>
          <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
            {[['📱','500+','Products'],['🏪','50+','Vendors'],['⭐','4.8','Avg Rating'],['🚚','Free','Delivery']].map(([icon,val,label]) => (
              <div key={label} style={{background:'rgba(255,255,255,0.08)', borderRadius:10, padding:'12px 20px', textAlign:'center'}}>
                <div style={{fontSize:20}}>{icon}</div>
                <div style={{color:'#f97316', fontWeight:800, fontSize:18}}>{val}</div>
                <div style={{color:'#94a3b8', fontSize:11}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'0 32px 32px'}}>
      <input style={{...styles.search, background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} placeholder={t('searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} />
      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap', alignItems:'center'}}>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, background:'#fff', cursor:'pointer', minWidth:160}}>
          <option value="">{t('allCategories')}</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={selectedCondition} onChange={e => setSelectedCondition(e.target.value)}
          style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, background:'#fff', cursor:'pointer', minWidth:140}}>
          <option value="">{t('allConditions')}</option>
          <option value="NEW">{t('conditionNew')}</option>
          <option value="LIKE_NEW">{t('conditionLikeNew')}</option>
          <option value="GOOD">{t('conditionGood')}</option>
          <option value="FAIR">{t('conditionFair')}</option>
        </select>
        <input style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, width:120}}
          placeholder={t('minPrice')} type="number" value={priceRange.min}
          onChange={e => setPriceRange({...priceRange, min: e.target.value})} />
        <span style={{color:'#666'}}>{t('to')}</span>
        <input style={{padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:14, width:120}}
          placeholder={t('maxPrice')} type="number" value={priceRange.max}
          onChange={e => setPriceRange({...priceRange, max: e.target.value})} />
        {(selectedCategory || priceRange.min || priceRange.max || search || selectedCondition) && (
          <button onClick={clearFilters}
            style={{padding:'10px 16px', borderRadius:8, border:'1px solid #ddd', background:'#f8f9fa', cursor:'pointer', fontSize:14, color:'#666'}}>
            {t('clearFilters')}
          </button>
        )}
        <span style={{color:'#888', fontSize:14, marginLeft:'auto'}}>
          {loading ? t('loading') : `${filtered.length} ${t('found')}`}
        </span>
      </div>
      {categories.length > 0 && (
        <div style={{display:'flex', gap:8, marginBottom:20, flexWrap:'wrap'}}>
          <button onClick={() => setSelectedCategory('')}
            style={{padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer', fontSize:13, fontWeight:500,
              background: selectedCategory === '' ? '#f97316' : '#f8f9fa', color: selectedCategory === '' ? '#fff' : '#555'}}>
            {t('all')}
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
      <div style={{
  textAlign: 'center',
  padding: '80px 24px',
  background: '#fff',
  borderRadius: 24,
  boxShadow: '0 12px 32px rgba(15,25,35,0.08)',
  border: '1px solid #eef0f3',
  maxWidth: 620,
  margin: '40px auto'
}}>
  <div style={{ fontSize: 54, marginBottom: 16 }}>🛒</div>
  <h3 style={{ fontSize: 26, color: '#0f1923', marginBottom: 10 }}>
    {t('noProducts')}
  </h3>
  <p style={{ color: '#667085', marginBottom: 24 }}>
    Try changing your filters or check back soon for new verified products.
  </p>
  <button onClick={clearFilters} style={{
    ...styles.heroBtn,
    padding: '14px 28px',
    borderRadius: 14
  }}>
    {t('clearFilters')}
  </button>
</div>
       : (
        <div style={styles.grid}>
          {filtered.map(p => {
            const cond = conditionLabel(p.condition)
            const imgSrc = p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : `http://localhost:3000${p.images[0]}`) : null
            const avgRating = Math.round(p.avgRating || 0)
            return (
              <div key={p.id} style={{border:'1px solid #eef0f3', borderRadius:24, overflow:'hidden', background:'#fff', boxShadow:'0 10px 30px rgba(15,25,35,0.08)', transition:'all .3s ease', cursor:'pointer'}}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.07)' }}>
                {/* Image */}
                <div style={{height:180, background:'#f8f9fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:64, overflow:'hidden', position:'relative'}}>
                  {imgSrc ? <img src={imgSrc} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📱'}
                  <span style={{position:'absolute', top:10, left:10, padding:'3px 8px', borderRadius:6, fontSize:11, fontWeight:700, background: cond.bg, color: cond.color}}>{cond.text}</span>
                </div>
                {/* Body */}
                <div style={{padding:'14px 16px'}}>
                  <p style={{fontSize:11, color:'#aaa', marginBottom:4, textTransform:'uppercase', letterSpacing:0.5}}>{p.vendor?.storeName} · {p.category?.name}</p>
                  <h3 style={{fontSize:15, fontWeight:700, color:'#0f1923', marginBottom:8, lineHeight:1.4, minHeight:40}}>{p.name}</h3>
                  {/* Stars */}
                  <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:10}}>
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{fontSize:13, color: s <= avgRating ? '#f97316' : '#e5e7eb'}}>★</span>
                    ))}
                    {p.reviewCount > 0 && <span style={{fontSize:11, color:'#aaa', marginLeft:2}}>({p.reviewCount})</span>}
                  </div>
                  {/* Price */}
                  <p style={{fontSize:20, fontWeight:800, color:'#f97316', marginBottom:12}}>{formatQAR(p.price)}</p>
                  <Link to={`/products/${p.id}`} style={{display:'block', textAlign:'center', background:'#0f1923', color:'#fff', padding:'10px 16px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:600, letterSpacing:0.3}}>
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
      </div>
    </div>
  )
}

function Login({ onLogin, t = (k) => k }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.login(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      window.location.href = '/'
    } catch { setError(t('invalidCredentials')) }
  }

  return (
    <div style={styles.formPage}>
      <div style={styles.formBox}>
        <h2 style={styles.formTitle}>{t('welcomeBack')}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder={t('email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} type="password" placeholder={t('password')} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button style={styles.submitBtn} onClick={handleSubmit}>{t('login')}</button>
        <p style={{textAlign:'center', marginTop:12}}>{t('noAccount')} <Link to="/register">{t('register')}</Link></p>
      </div>
    </div>
  )
}

function Register({ onLogin, t = (k) => k }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'CUSTOMER' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await auth.register(form)
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.user)
      window.location.href = '/'
    } catch { setError(t('registrationFailed')) }
  }

  return (
    <div style={styles.formPage}>
      <div style={styles.formBox}>
        <h2 style={styles.formTitle}>{t('createAccount')}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder={t('fullName')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={styles.input} placeholder={t('email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} type="password" placeholder={t('password')} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <input style={styles.input} placeholder={t('phone')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <select style={styles.input} value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="CUSTOMER">{t('customer')}</option>
          <option value="VENDOR">{t('vendor')}</option>
        </select>
        {form.role === 'VENDOR' && (
          <div style={{background:'#fff7ed', border:'1px solid #f97316', borderRadius:8, padding:12, marginBottom:12, fontSize:13, color:'#92400e'}}>
            ⚠️ {t('vendorPendingNote')}
          </div>
        )}
        <button style={styles.submitBtn} onClick={handleSubmit}>{t('createAccount')}</button>
        <p style={{textAlign:'center', marginTop:12}}>{t('haveAccount')} <Link to="/login">{t('login')}</Link></p>
      </div>
    </div>
  )
}

function Cart({ onCartUpdate, t = (k) => k }) {
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

  useEffect(() => { loadCart() }, []) // eslint-disable-line

  const handleUpdate = async (productId, qty) => {
    if (qty < 1) return
    await cart.update(productId, { quantity: qty })
    loadCart()
  }

  const handleRemove = async (productId) => {
    await cart.remove(productId)
    loadCart()
  }

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>

  return (
    <div style={styles.page}>
      <h2 style={{marginBottom:24}}>{t('yourCart')}</h2>
      {cartData.items.length === 0 ? (
        <div style={{textAlign:'center', padding:60}}>
          <p style={{marginBottom:20}}>{t('cartEmpty')}</p>
          <Link to="/products" style={styles.heroBtn}>{t('shopNow')}</Link>
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
                  <button onClick={() => item.quantity === 1 ? handleRemove(item.productId) : handleUpdate(item.productId, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                  <span style={{fontWeight:500, minWidth:20, textAlign:'center'}}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.productId, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <p style={{color:'#f97316', fontWeight:500, minWidth:90, textAlign:'right'}}>{formatQAR(item.product.price * item.quantity)}</p>
                <button onClick={() => handleRemove(item.productId)} style={styles.removeBtn}>X</button>
              </div>
            </div>
          ))}
          <div style={styles.cartTotal}>
            <h3 style={{marginBottom:16}}>{t('total')}: {formatQAR(cartData.total)}</h3>
            <button onClick={() => navigate('/checkout')} style={styles.submitBtn}>{t('proceedToCheckout')}</button>
          </div>
        </>
      )}
    </div>
  )
}

function Checkout({ t = (k) => k }) {
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
    if (!form.name || !form.street || !form.phone) { setError(t('fillShipping')); return }
    setPlacing(true); setError('')
    try {
      const res = await orders.place({ shippingAddress: form })
      navigate(`/orders/${res.data.order.id}`)
    } catch (err) {
      setError(err.response?.data?.error || t('orderFailed'))
      setPlacing(false)
    }
  }

  return (
    <div style={{...styles.page, maxWidth:900}}>
      <h2 style={{marginBottom:8}}>{t('checkout')}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={{display:'flex', gap:40, flexWrap:'wrap'}}>
        <div style={{flex:1, minWidth:280}}>
          <h3 style={{marginBottom:16, fontSize:18}}>{t('shippingAddress')}</h3>
          <input style={styles.input} placeholder={t('fullName')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input style={styles.input} placeholder={t('streetAddress')} value={form.street} onChange={e => setForm({...form, street: e.target.value})} />
          <input style={styles.input} placeholder={t('city')} value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input style={styles.input} placeholder={t('country')} value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
          <input style={styles.input} placeholder={t('phoneNumber')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <h3 style={{marginBottom:16, fontSize:18}}>{t('paymentMethod')}</h3>
          <div onClick={() => setPaymentMethod('cod')} style={{padding:'14px 16px', border: paymentMethod === 'cod' ? '2px solid #f97316' : '2px solid #eee', borderRadius:8, marginBottom:12, background: paymentMethod === 'cod' ? '#fff7ed' : '#fff', cursor:'pointer'}}>
            <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
              <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <span>{t('cashOnDelivery')}</span>
            </label>
          </div>
          <div onClick={() => setPaymentMethod('card')} style={{border: paymentMethod === 'card' ? '2px solid #f97316' : '2px solid #eee', borderRadius:8, marginBottom:24, background: paymentMethod === 'card' ? '#fff7ed' : '#fff', cursor:'pointer', overflow:'hidden'}}>
            <div style={{padding:'14px 16px'}}>
              <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span>{t('creditDebitCard')}</span>
              </label>
            </div>
            {paymentMethod === 'card' && (
              <div style={{padding:'0 16px 16px', borderTop:'1px solid #f0e0d0'}} onClick={e => e.stopPropagation()}>
                <input style={{...styles.input, marginTop:12}} placeholder={t('cardholderName')} value={cardForm.cardName} onChange={e => setCardForm({...cardForm, cardName: e.target.value})} />
                <input style={{...styles.input}} placeholder="1234 5678 9012 3456" value={cardForm.cardNumber} onChange={e => setCardForm({...cardForm, cardNumber: formatCardNumber(e.target.value)})} maxLength={19} />
                <div style={{display:'flex', gap:12}}>
                  <input style={{...styles.input, flex:1}} placeholder="MM/YY" value={cardForm.expiry} onChange={e => setCardForm({...cardForm, expiry: formatExpiry(e.target.value)})} maxLength={5} />
                  <input style={{...styles.input, flex:1}} placeholder="CVV" type="password" value={cardForm.cvv} onChange={e => setCardForm({...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0,4)})} maxLength={4} />
                </div>
              </div>
            )}
          </div>
          <button onClick={handlePlaceOrder} disabled={placing} style={{...styles.submitBtn, opacity: placing ? 0.7 : 1}}>
            {placing ? t('placingOrder') : t('placeOrder')}
          </button>
        </div>
        <div style={{width:280}}>
          <h3 style={{marginBottom:16, fontSize:18}}>{t('orderSummary')}</h3>
          <div style={{background:'#f8f9fa', borderRadius:12, padding:20}}>
            {loadingCart ? <p>{t('loading')}</p> : cartData.items.map(item => (
              <div key={item.id} style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14}}>
                <span style={{flex:1, marginRight:8}}>{item.product.name} x {item.quantity}</span>
                <span style={{fontWeight:600}}>{formatQAR(item.product.price * item.quantity)}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid #ddd', paddingTop:12, display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:16}}>
              <span>{t('total')}</span>
              <span style={{color:'#f97316'}}>{formatQAR(cartData.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderDetail({ t = (k) => k }) {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    orders.getOne(id).then(r => { setOrder(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [id])

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>
  if (!order) return <p style={{padding:40}}>{t('orderNotFound')}</p>

  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }

  return (
    <div style={{...styles.page, maxWidth:700}}>
      <div style={{textAlign:'center', padding:'40px 0 32px'}}>
        <div style={{fontSize:64, marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:28, marginBottom:8}}>{t('orderSuccess')}</h2>
        <p style={{color:'#666'}}>{t('orderId')}: <span style={{fontFamily:'monospace', background:'#f8f9fa', padding:'2px 8px', borderRadius:4}}>{order.id?.slice(0,8)}...</span></p>
      </div>
      <div style={{background:'#f8f9fa', borderRadius:12, padding:24, marginBottom:24}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16}}><span style={{color:'#666'}}>{t('status')}</span><span style={{fontWeight:700, color: statusColor[order.status]}}>{order.status}</span></div>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16}}><span style={{color:'#666'}}>{t('total')}</span><span style={{fontWeight:700, color:'#f97316', fontSize:18}}>{formatQAR(order.totalAmount)}</span></div>
        <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'#666'}}>{t('deliveryTo')}</span><span style={{fontWeight:500}}>{order.shippingAddress?.street}, {order.shippingAddress?.city}</span></div>
      </div>
      <h3 style={{marginBottom:16}}>{t('itemsOrdered')}</h3>
      {order.orderItems?.map(item => (
        <div key={item.id} style={styles.cartItem}>
          <div style={{fontSize:28}}>📱</div>
          <div style={{flex:1, marginLeft:16}}>
            <p style={{fontWeight:500}}>{item.product?.name}</p>
            <p style={{color:'#666', fontSize:14}}>{t('qty')}: {item.quantity}</p>
          </div>
          <p style={{color:'#f97316', fontWeight:600}}>{formatQAR(item.unitPrice * item.quantity)}</p>
        </div>
      ))}
      <div style={{display:'flex', gap:12, marginTop:32}}>
        <button onClick={() => navigate('/orders')} style={{...styles.submitBtn, flex:1}}>{t('myOrders')}</button>
        <button onClick={() => navigate('/products')} style={{...styles.submitBtn, flex:1, background:'#1e3a5f'}}>{t('continueShopping')}</button>
      </div>
    </div>
  )
}

function Orders({ user, t = (k) => k }) {
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const navigate = useNavigate()

  const loadOrders = () => {
    orders.getAll().then(r => { setOrderList(r.data); setLoading(false) })
  }

  useEffect(() => { loadOrders() }, [])

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId)
    try { await orders.updateStatus(orderId, status); loadOrders() }
    catch (err) { alert(err.response?.data?.error || t('updateFailed')) }
    setUpdatingId(null)
  }

  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }
  const nextStatus = { PENDING:'CONFIRMED', CONFIRMED:'SHIPPED', SHIPPED:'DELIVERED' }

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>

  return (
    <div style={styles.page}>
      <h2 style={{marginBottom:24}}>{t('myOrders')}</h2>
      {orderList.length === 0 ? (
        <div style={{textAlign:'center', padding:60}}>
          <p style={{marginBottom:20}}>{t('noOrders')}</p>
          <Link to="/products" style={styles.heroBtn}>{t('startShopping')}</Link>
        </div>
      ) : orderList.map(order => (
        <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
            <div>
              <p onClick={() => navigate(`/orders/${order.id}`)} style={{fontWeight:600, color:'#1e3a5f', cursor:'pointer'}}>{t('order')} #{order.id?.slice(0,8)}...</p>
              <p style={{color:'#666', fontSize:14, marginTop:4}}>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
              <p style={{color:'#f97316', fontWeight:700, fontSize:18}}>{formatQAR(order.totalAmount)}</p>
              <span style={{background: statusColor[order.status] + '20', color: statusColor[order.status], padding:'4px 12px', borderRadius:20, fontSize:13, fontWeight:600}}>{order.status}</span>
              {user?.role === 'VENDOR' && nextStatus[order.status] && (
                <button onClick={() => handleStatusUpdate(order.id, nextStatus[order.status])} disabled={updatingId === order.id}
                  style={{padding:'6px 14px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13}}>
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

function ProductDetail({ user, t = (k) => k }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [showCartModal, setShowCartModal] = useState(false)
  const [selectedImg, setSelectedImg] = useState(0)
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState('')

  const loadReviews = () => {
    products.getReviews(id).then(r => setReviews(r.data)).catch(() => {})
  }

  useEffect(() => {
    products.getOne(id).then(r => { setProduct(r.data); setLoading(false) })
    loadReviews()
  }, [id]) // eslint-disable-line

  const handleAddToCart = async () => {
    if (added) return
    try {
      await cart.add({ productId: id, quantity: qty })
      setAdded(true)
      setShowCartModal(true)
      setTimeout(() => setAdded(false), 3000)
    } catch { alert(t('loginToAdd')) }
  }

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) { setReviewError(t('writeComment')); return }
    setSubmitting(true); setReviewError(''); setReviewSuccess('')
    try {
      await products.addReview(id, reviewForm)
      setReviewSuccess(t('reviewSubmitted'))
      setReviewForm({ rating: 5, comment: '' })
      loadReviews()
      products.getOne(id).then(r => setProduct(r.data))
    } catch (err) { setReviewError(err.response?.data?.error || t('reviewFailed')) }
    setSubmitting(false)
  }

  const handleDeleteReview = async () => {
    if (!window.confirm(t('deleteReviewConfirm'))) return
    try {
      await products.deleteReview(id)
      loadReviews()
      products.getOne(id).then(r => setProduct(r.data))
    } catch (err) { setReviewError(err.response?.data?.error || t('deleteFailed')) }
  }

  const renderStars = (rating, interactive = false, onRate = null) => (
    <div style={{display:'flex', gap:4}}>
      {[1,2,3,4,5].map(star => (
        <span key={star} onClick={() => interactive && onRate && onRate(star)}
          style={{fontSize: interactive ? 28 : 16, cursor: interactive ? 'pointer' : 'default', color: star <= rating ? '#f97316' : '#ddd'}}>
          &#9733;
        </span>
      ))}
    </div>
  )

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>
  if (!product) return <p style={{padding:40}}>{t('productNotFound')}</p>

  const images = product.images?.length > 0 ? product.images : [null]
  const getImgSrc = (img) => img ? (img.startsWith('http') ? img : `http://localhost:3000${img}`) : null
  const userReview = reviews.find(r => r.userId === user?.id)
  const cond = conditionLabel(product.condition)
  const avgRating = Math.round(product.avgRating || 0)
  const ratingCounts = [5,4,3,2,1].map(star => reviews.filter(r => r.rating === star).length)

  const cartModal = showCartModal && (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',borderRadius:16,padding:40,maxWidth:400,width:'90%',textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:16}}>✅</div>
        <h3 style={{marginBottom:8,fontSize:22}}>{t('addedToCart')}</h3>
        <p style={{color:'#666',marginBottom:24}}>{t('itemAddedToCart')}</p>
        <div style={{display:'flex',gap:12}}>
          <button onClick={()=>setShowCartModal(false)} style={{flex:1,padding:'12px',border:'2px solid #f97316',borderRadius:8,background:'#fff',color:'#f97316',fontWeight:600,cursor:'pointer'}}>{t('continueShopping')}</button>
          <button onClick={()=>{setShowCartModal(false);window.location.href='/checkout'}} style={{flex:1,padding:'12px',border:'none',borderRadius:8,background:'#f97316',color:'#fff',fontWeight:600,cursor:'pointer'}}>{t('goToCheckout')}</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{...styles.page, maxWidth:1000}}>
      {cartModal}

      {/* Main product grid */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:40, flexWrap:'wrap'}}>

        {/* Left — Images */}
        <div>
          <div style={{width:'100%', aspectRatio:'1', background:'#f8f9fa', borderRadius:12, border:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'center', fontSize:100, overflow:'hidden', marginBottom:12}}>
            {getImgSrc(images[selectedImg])
              ? <img src={getImgSrc(images[selectedImg])} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
              : '📱'}
          </div>
          {images.length > 1 && (
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {images.map((img, i) => (
                <div key={i} onClick={() => setSelectedImg(i)}
                  style={{width:60, height:60, borderRadius:8, border: selectedImg === i ? '2px solid #f97316' : '1px solid #eee', background:'#f8f9fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, overflow:'hidden', cursor:'pointer'}}>
                  {getImgSrc(img) ? <img src={getImgSrc(img)} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : '📱'}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div>
          <span style={{display:'inline-block', padding:'3px 10px', borderRadius:6, fontSize:12, fontWeight:600, background: cond.bg, color: cond.color, marginBottom:10}}>{cond.text}</span>
          <h1 style={{fontSize:22, fontWeight:600, lineHeight:1.4, marginBottom:8, color:'#0f1923'}}>{product.name}</h1>
          <p style={{color:'#888', fontSize:13, marginBottom:10}}>
            {t('soldBy')} <span style={{color:'#f97316', fontWeight:600}}>{product.vendor?.storeName}</span> &nbsp;·&nbsp; {product.category?.name}
          </p>

          {/* Stars */}
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
            {renderStars(avgRating)}
            <span style={{color:'#f97316', fontSize:14, fontWeight:600}}>{product.avgRating > 0 ? product.avgRating.toFixed(1) : ''}</span>
            <span style={{color:'#888', fontSize:13}}>{reviews.length > 0 ? `${reviews.length} ${t('reviews')}` : t('noRatings')}</span>
          </div>

          {/* Price */}
          <div style={{display:'flex', alignItems:'baseline', gap:10, marginBottom:4}}>
            <span style={{fontSize:32, fontWeight:700, color:'#f97316'}}>{formatQAR(product.price)}</span>
          </div>
          <p style={{fontSize:12, color:'#888', marginBottom:16}}>{t('inclVAT')}</p>

          <div style={{height:1, background:'#eee', marginBottom:16}} />

          {/* Specs */}
          <div style={{marginBottom:16}}>
            {[
              [t('condition'), cond.text],
              [t('inStock'), `${product.stockQty} ${t('units')}`],
              [t('category'), product.category?.name],
            ].map(([label, val]) => (
              <div key={label} style={{display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #f3f3f3', fontSize:14}}>
                <span style={{color:'#888'}}>{label}</span>
                <span style={{fontWeight:600, color: label === t('inStock') ? '#10b981' : '#0f1923'}}>{val}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <p style={{color:'#555', lineHeight:1.8, fontSize:14, marginBottom:16}}>{product.description}</p>
          )}

          {/* Qty */}
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
            <span style={{fontSize:14, color:'#666'}}>{t('qty')}:</span>
            <button onClick={() => setQty(q => Math.max(1, q-1))} style={{width:32, height:32, borderRadius:8, border:'1px solid #ddd', background:'#f8f9fa', cursor:'pointer', fontSize:18, fontWeight:600}}>−</button>
            <span style={{fontSize:16, fontWeight:600, minWidth:24, textAlign:'center'}}>{qty}</span>
            <button onClick={() => setQty(q => Math.min(product.stockQty, q+1))} style={{width:32, height:32, borderRadius:8, border:'1px solid #ddd', background:'#f8f9fa', cursor:'pointer', fontSize:18, fontWeight:600}}>+</button>
          </div>

          {/* Buttons */}
          <button onClick={handleAddToCart} disabled={added}
            style={{width:'100%', padding:'14px', background: added ? '#10b981' : '#f97316', color:'#fff', border:'none', borderRadius:10, fontSize:16, fontWeight:700, cursor: added ? 'default' : 'pointer', marginBottom:10, transition:'background 0.2s'}}>
            {added ? `✓ ${t('addedToCart')}` : t('addToCart')}
          </button>

          {/* Delivery & Trust */}
          <div style={{background:'#f8f9fa', borderRadius:10, padding:14, marginTop:4}}>
            {[
              ['🚚', t('freeDelivery')],
              ['🛡️', t('buyerProtection')],
              ['↩️', t('easyReturns')],
            ].map(([icon, text]) => (
              <div key={text} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#555', padding:'4px 0'}}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{display:'flex', gap:16, marginTop:12, flexWrap:'wrap'}}>
            {[
              ['✅', t('verifiedSeller')],
              ['⚡', t('shipsIn24h')],
              ['📍', t('shipsQatar')],
            ].map(([icon, text]) => (
              <div key={text} style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#666'}}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{borderTop:'2px solid #f3f3f3', paddingTop:32}}>
        <h2 style={{fontSize:20, fontWeight:700, marginBottom:24, color:'#0f1923'}}>{t('customerReviews')}</h2>

        {/* Rating summary */}
        {reviews.length > 0 && (
          <div style={{display:'flex', gap:32, alignItems:'center', marginBottom:28, background:'#f8f9fa', borderRadius:12, padding:24, flexWrap:'wrap'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:48, fontWeight:700, color:'#f97316', lineHeight:1}}>{product.avgRating?.toFixed(1) || '0'}</div>
              <div style={{marginTop:6}}>{renderStars(avgRating)}</div>
              <div style={{fontSize:13, color:'#888', marginTop:4}}>{reviews.length} {t('reviews')}</div>
            </div>
            <div style={{flex:1, minWidth:160}}>
              {[5,4,3,2,1].map((star, i) => (
                <div key={star} style={{display:'flex', alignItems:'center', gap:8, marginBottom:5}}>
                  <span style={{fontSize:12, color:'#888', minWidth:28}}>{star} ★</span>
                  <div style={{flex:1, height:6, background:'#e5e7eb', borderRadius:3, overflow:'hidden'}}>
                    <div style={{height:'100%', background:'#f97316', borderRadius:3, width: reviews.length > 0 ? `${(ratingCounts[i]/reviews.length)*100}%` : '0%'}} />
                  </div>
                  <span style={{fontSize:12, color:'#888', minWidth:16}}>{ratingCounts[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Write review */}
        {user && !userReview && (
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:24, marginBottom:24}}>
            <h3 style={{marginBottom:16, fontSize:16, fontWeight:600}}>{t('writeReview')}</h3>
            {reviewError && <p style={{color:'#ef4444', marginBottom:12, fontSize:14}}>{reviewError}</p>}
            {reviewSuccess && <p style={{color:'#10b981', marginBottom:12, fontSize:14}}>{reviewSuccess}</p>}
            <p style={{marginBottom:8, fontWeight:600, fontSize:14}}>{t('yourRating')}</p>
            {renderStars(reviewForm.rating, true, (star) => setReviewForm({...reviewForm, rating: star}))}
            <textarea style={{...styles.input, height:100, resize:'vertical', marginTop:12}} placeholder={t('shareExperience')} value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
            <button onClick={handleSubmitReview} disabled={submitting} style={{...styles.submitBtn, opacity: submitting ? 0.7 : 1}}>
              {submitting ? t('submitting') : t('submitReview')}
            </button>
          </div>
        )}

        {/* User's own review */}
        {userReview && (
          <div style={{background:'#fff7ed', border:'1px solid #f97316', borderRadius:12, padding:20, marginBottom:20}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <p style={{fontWeight:600, marginBottom:6}}>{t('yourReview')}</p>
                {renderStars(userReview.rating)}
                <p style={{color:'#555', marginTop:8, fontSize:14}}>{userReview.comment}</p>
              </div>
              <button onClick={handleDeleteReview} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:13}}>{t('delete')}</button>
            </div>
          </div>
        )}

        {/* All reviews */}
        {reviews.length === 0 ? (
          <div style={{textAlign:'center', padding:40, color:'#888'}}>
            <p style={{fontSize:32, marginBottom:8}}>💬</p>
            <p>{t('noReviews')}</p>
          </div>
        ) : reviews.map(review => (
          <div key={review.id} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                  <div style={{width:34, height:34, borderRadius:'50%', background:'#f97316', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700}}>
                    {review.user?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p style={{fontWeight:600, fontSize:14}}>{review.user?.name}</p>
                    <span style={{fontSize:11, background:'#d1fae5', color:'#065f46', padding:'1px 6px', borderRadius:4}}>✓ {t('verifiedBuyer')}</span>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p style={{color:'#aaa', fontSize:12}}>{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <p style={{color:'#555', fontSize:14, lineHeight:1.7, marginTop:8}}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function KYCDocumentsTab({ t = (k) => k }) {
  const [vendors, setVendors] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [reviewNote, setReviewNote] = React.useState({})
  const [msg, setMsg] = React.useState('')
  const [expandedVendor, setExpandedVendor] = React.useState(null)

  const token = localStorage.getItem('token')
  const API = process.env.REACT_APP_API_URL

  const loadDocs = () => {
    fetch(`${API}/vendors/admin/documents`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setVendors(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  React.useEffect(() => { loadDocs() }, []) // eslint-disable-line

  const handleReview = async (docId, status) => {
    try {
      const res = await fetch(`${API}/vendors/admin/documents/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, note: reviewNote[docId] || '' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg(data.vendorFullyApproved
        ? '✅ Document approved — Vendor is now fully verified!'
        : `Document ${status.toLowerCase()} successfully`)
      setTimeout(() => setMsg(''), 4000)
      loadDocs()
    } catch (err) {
      setMsg('Failed to update document')
    }
  }

  const docTypeLabel = {
    CR_COPY: 'CR Copy',
    TRADE_LICENSE: 'Trade License',
    SIGNATORY_QID: 'Signatory QID',
    CONTRACT_COPY: 'Contract Copy'
  }

  const statusBadge = (status) => ({
    PENDING: { bg: '#fff7ed', color: '#92400e', text: '⏳ Pending' },
    APPROVED: { bg: '#d1fae5', color: '#065f46', text: '✅ Approved' },
    REJECTED: { bg: '#fee2e2', color: '#991b1b', text: '❌ Rejected' }
  }[status] || { bg: '#f3f4f6', color: '#666', text: status })

  if (loading) return <p style={{padding:40, color:'#666'}}>Loading...</p>

  return (
    <div>
      {msg && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16, fontWeight:600}}>{msg}</div>}

      {vendors.length === 0 ? (
        <p style={{color:'#888', textAlign:'center', padding:40}}>No vendor documents submitted yet</p>
      ) : vendors.map(vendor => {
        const hasDocs = vendor.documents?.length > 0
        const requiredTypes = ['CR_COPY', 'TRADE_LICENSE', 'SIGNATORY_QID']
        const allApproved = requiredTypes.every(type =>
          vendor.documents?.some(d => d.docType === type && d.status === 'APPROVED')
        )
        const hasPending = vendor.documents?.some(d => d.status === 'PENDING')
        const isExpanded = expandedVendor === vendor.id

        return (
          <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, marginBottom:16, overflow:'hidden', background:'#fff'}}>
            <div
              onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
              style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', cursor:'pointer', background: allApproved ? '#f0fdf4' : hasPending ? '#fff7ed' : '#fafafa'}}
            >
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <span style={{fontSize:24}}>🏪</span>
                <div>
                  <p style={{fontWeight:700, fontSize:15, marginBottom:2}}>{vendor.storeName}</p>
                  <p style={{color:'#666', fontSize:13}}>{vendor.user?.name} · {vendor.user?.email}</p>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <span style={{padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700,
                  background: allApproved ? '#d1fae5' : hasPending ? '#fff7ed' : '#f3f4f6',
                  color: allApproved ? '#065f46' : hasPending ? '#92400e' : '#666'}}>
                  {allApproved ? '✅ KYC Complete' : hasPending ? `⏳ ${vendor.documents?.filter(d=>d.status==='PENDING').length} Pending` : hasDocs ? '❌ Action Needed' : '📭 No Docs'}
                </span>
                <span style={{color:'#999', fontSize:18}}>{isExpanded ? '▲' : '▼'}</span>
              </div>
            </div>

            {isExpanded && (
              <div style={{padding:'0 20px 20px'}}>
                {!hasDocs ? (
                  <p style={{color:'#888', padding:'20px 0', textAlign:'center'}}>No documents uploaded yet</p>
                ) : (
                  <>
                    {(vendor.ibanNumber || vendor.bankName) && (
                      <div style={{background:'#f8f9fa', borderRadius:10, padding:16, marginTop:16, marginBottom:8}}>
                        <p style={{fontWeight:700, fontSize:13, marginBottom:8, color:'#1e3a5f'}}>🏦 Bank Details</p>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, fontSize:13, color:'#555'}}>
                          {vendor.accountHolderName && <p>Holder: {vendor.accountHolderName}</p>}
                          {vendor.bankName && <p>Bank: {vendor.bankName}</p>}
                          {vendor.ibanNumber && <p>IBAN: {vendor.ibanNumber}</p>}
                          {vendor.accountNumber && <p>Account: {vendor.accountNumber}</p>}
                          {vendor.bankBranch && <p>Branch: {vendor.bankBranch}</p>}
                        </div>
                      </div>
                    )}

                    {vendor.documents.map(doc => {
                      const badge = statusBadge(doc.status)
                      return (
                        <div key={doc.id} style={{border:'1px solid #f0f0f0', borderRadius:10, padding:16, marginTop:12}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8}}>
                            <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                              <span style={{fontSize:28}}>📄</span>
                              <div>
                                <p style={{fontWeight:600, fontSize:14, marginBottom:2}}>{doc.docName}</p>
                                <p style={{color:'#888', fontSize:12}}>{docTypeLabel[doc.docType] || doc.docType} · Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                                {doc.note && <p style={{color:'#ef4444', fontSize:12, marginTop:4}}>Note: {doc.note}</p>}
                              </div>
                            </div>
                            <div style={{display:'flex', alignItems:'center', gap:8}}>
                              <span style={{padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:600, background: badge.bg, color: badge.color}}>
                                {badge.text}
                              </span>
                              <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                                style={{background:'#1e3a5f', color:'#fff', padding:'6px 12px', borderRadius:6, fontSize:12, textDecoration:'none', fontWeight:600}}>
                                View Doc
                              </a>
                            </div>
                          </div>

                          {doc.status === 'PENDING' && (
                            <div style={{marginTop:12, paddingTop:12, borderTop:'1px solid #f0f0f0'}}>
                              <input
                                style={{width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid #ddd', fontSize:13, boxSizing:'border-box', marginBottom:8}}
                                placeholder="Rejection note (required if rejecting)"
                                value={reviewNote[doc.id] || ''}
                                onChange={e => setReviewNote({...reviewNote, [doc.id]: e.target.value})}
                              />
                              <div style={{display:'flex', gap:8}}>
                                <button onClick={() => handleReview(doc.id, 'APPROVED')}
                                  style={{flex:1, padding:'8px', background:'#10b981', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>
                                  ✅ Approve
                                </button>
                                <button onClick={() => handleReview(doc.id, 'REJECTED')}
                                  style={{flex:1, padding:'8px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>
                                  ❌ Reject
                                </button>
                              </div>
                            </div>
                          )}

                          {doc.status !== 'PENDING' && (
                            <div style={{marginTop:8}}>
                              <button
                                onClick={() => handleReview(doc.id, doc.status === 'APPROVED' ? 'REJECTED' : 'APPROVED')}
                                style={{padding:'6px 14px', background:'#f8f9fa', border:'1px solid #ddd', borderRadius:6, cursor:'pointer', fontSize:12, color:'#555'}}>
                                {doc.status === 'APPROVED' ? 'Revoke Approval' : 'Approve Instead'}
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
function AdminDashboard({ t = (k) => k }) {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [allOrders, setAllOrders] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allVendors, setAllVendors] = useState([])
  const [payoutsData, setPayoutsData] = useState(null)
  const [payoutMsg, setPayoutMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [approvingId, setApprovingId] = useState(null)
  const [subForm, setSubForm] = useState({ vendorId:'', type:'SETUP', amount:1000, note:'' })
  const [subMsg, setSubMsg] = useState('')
  const [kycVendors, setKycVendors] = useState([])

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes, usersRes, vendorsRes] = await Promise.all([
        orders.adminGetStats(),
        orders.adminGetAll(),
        orders.adminGetUsers(),
        orders.adminGetVendors()
      ])
      setStats(statsRes.data)
      setAllOrders(ordersRes.data)
      setAllUsers(usersRes.data)
      setAllVendors(vendorsRes.data)
      try {
        const payoutsRes = await vendors.adminGetPayouts()
        setPayoutsData(payoutsRes.data)
      } catch(e) { console.log('payouts error', e) }
    try {
      const kycRes = await fetch('/api/vendors/admin/documents', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setKycVendors(await kycRes.json())
    } catch(e) {}
    } catch (err) { console.error('Admin load error:', err) }
    setLoading(false)
  }

  useEffect(() => { loadData() }, []) // eslint-disable-line

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId)
    try { await orders.updateStatus(orderId, status); await loadData() }
    catch (err) { alert(err.response?.data?.error || t('updateFailed')) }
    setUpdatingId(null)
  }

  const handleMarkPaid = async (vendorId, amount) => {
    const note = prompt(t('addNote')) || ''
    try {
      await vendors.adminMarkPaid({ vendorId, amount, note })
      setPayoutMsg(t('payoutMarked'))
      loadData()
      setTimeout(() => setPayoutMsg(''), 3000)
    } catch (err) { alert(err.response?.data?.error || t('payoutFailed')) }
  }

  const handleVerifyDoc = async (docId, verified) => {
    try {
      const note = !verified ? prompt('Rejection reason (optional):') || '' : ''
      await fetch('/api/vendors/admin/verify-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ docId, verified, note })
      })
      const kycRes = await fetch('/api/vendors/admin/documents', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setKycVendors(await kycRes.json())
    } catch { alert('Failed to update document') }
  }

const handleVendorApproval = async (vendorId, status, note = '') => {
  setApprovingId(vendorId)
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`https://mobimart-backend-production.up.railway.app/api/vendors/admin/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ vendorId, status, note })
    })
    if (!res.ok) throw new Error('Failed')
    await loadData()
  } catch (err) { alert('Failed to update vendor status') }
  setApprovingId(null)
}

  const handleAddSubscription = async () => {
    if (!subForm.vendorId) { alert('Select a vendor'); return }
    try {
      await fetch('/api/vendors/admin/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(subForm)
      })
      setSubMsg('Subscription added!')
      setTimeout(() => setSubMsg(''), 3000)
      await loadData()
    } catch (err) { alert('Failed to add subscription') }
  }

  const statusColor = { PENDING:'#f97316', CONFIRMED:'#3b82f6', SHIPPED:'#8b5cf6', DELIVERED:'#10b981', CANCELLED:'#ef4444' }
  const roleColor = { CUSTOMER:'#6b7280', VENDOR:'#8b5cf6', ADMIN:'#ef4444' }
  const tabBtn = (key, label) => (
    <button onClick={() => setTab(key)} style={{padding:'10px 20px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:14, background: tab === key ? '#f97316' : '#f8f9fa', color: tab === key ? '#fff' : '#333'}}>{label}</button>
  )

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>

  return (
    <div style={styles.page}>
      <div style={{background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', borderRadius:16, padding:32, marginBottom:32, color:'#fff'}}>
        <h2 style={{fontSize:28, marginBottom:4}}>{t('adminDashboard')}</h2>
        <p style={{color:'#94a3b8'}}>{t('adminSubtitle')}</p>
      </div>
      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap'}}>
        {tabBtn('overview', t('overview'))}
        {tabBtn('orders', t('allOrders'))}
        {tabBtn('users', t('users'))}
        {tabBtn('vendors', t('vendors'))}
        {tabBtn('approvals', t('approvals'))}
        {tabBtn('kyc', t('kycDocuments'))}
        {tabBtn('subscriptions', t('subscriptions'))}
        {tabBtn('payouts', t('payouts'))}
      </div>

      {tab === 'overview' && stats && (
        <div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16, marginBottom:32}}>
            {[
              { label: t('totalOrders'), value: stats.totalOrders, icon:'📦', color:'#f97316' },
              { label: t('totalRevenue'), value: formatQAR(stats.totalRevenue || 0), icon:'💰', color:'#10b981' },
              { label: t('platformFees'), value: formatQAR(stats.totalPlatformFee || 0), icon:'🏦', color:'#f97316' },
              { label: t('totalUsers'), value: stats.totalUsers, icon:'👥', color:'#3b82f6' },
              { label: t('totalVendors'), value: stats.totalVendors, icon:'🏪', color:'#8b5cf6' },
              { label: t('activeProducts'), value: stats.totalProducts, icon:'📱', color:'#f43f5e' },
            ].map(stat => (
              <div key={stat.label} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
                <p style={{fontSize:32, marginBottom:8}}>{stat.icon}</p>
                <p style={{fontSize:28, fontWeight:700, color: stat.color}}>{stat.value}</p>
                <p style={{color:'#666', fontSize:14}}>{stat.label}</p>
              </div>
            ))}
          </div>
          <h3 style={{marginBottom:16}}>{t('recentOrders')}</h3>
          {stats.recentOrders?.map(order => (
            <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:16, marginBottom:12, background:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontWeight:600}}>{t('order')} #{order.id?.slice(0,8)}...</p>
                <p style={{color:'#666', fontSize:13}}>{order.user?.name}</p>
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
          <h3 style={{marginBottom:16}}>{t('allOrders')} ({allOrders.length})</h3>
          {allOrders.map(order => (
            <div key={order.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
              <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
                <div>
                  <p style={{fontWeight:600}}>{t('order')} #{order.id?.slice(0,8)}...</p>
                  <p style={{color:'#666', fontSize:13}}>{order.user?.name} ({order.user?.email})</p>
                  <p style={{color:'#666', fontSize:13}}>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{fontWeight:700, color:'#f97316', fontSize:18, marginBottom:8}}>{formatQAR(order.totalAmount)}</p>
                  <select value={order.status} onChange={e => handleStatusUpdate(order.id, e.target.value)} disabled={updatingId === order.id}
                    style={{padding:'6px 10px', borderRadius:8, border:'1px solid #ddd', fontSize:13, cursor:'pointer'}}>
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
          <h3 style={{marginBottom:16}}>{t('users')} ({allUsers.length})</h3>
          <div style={{border:'1px solid #eee', borderRadius:12, overflow:'hidden'}}>
            {allUsers.map((u, i) => (
              <div key={u.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', background: i % 2 === 0 ? '#fff' : '#f8f9fa', borderBottom:'1px solid #eee'}}>
                <div>
                  <p style={{fontWeight:600}}>{u.name}</p>
                  <p style={{color:'#666', fontSize:13}}>{u.email}</p>
                </div>
                <span style={{background: roleColor[u.role] + '20', color: roleColor[u.role], padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:600}}>{u.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'vendors' && (
        <div>
          <h3 style={{marginBottom:16}}>{t('vendors')} ({allVendors.length})</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16}}>
            {allVendors.map(vendor => (
              <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, background:'#fff'}}>
                <p style={{fontWeight:700, fontSize:16, marginBottom:4}}>🏪 {vendor.storeName}</p>
                <p style={{color:'#666', fontSize:13}}>{vendor.user?.name}</p>
                <p style={{color:'#aaa', fontSize:12}}>{vendor.user?.email}</p>
                <div style={{display:'flex', gap:16, marginTop:12}}>
                  <div style={{textAlign:'center'}}>
                    <p style={{fontWeight:700, color:'#f97316'}}>{vendor._count?.products || 0}</p>
                    <p style={{color:'#666', fontSize:12}}>{t('products')}</p>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <p style={{fontWeight:700, color:'#3b82f6'}}>{vendor._count?.orderItems || 0}</p>
                    <p style={{color:'#666', fontSize:12}}>{t('orders')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'approvals' && (
        <div>
          <h3 style={{marginBottom:16}}>{t('vendorApprovals')}</h3>
          {allVendors.filter(v => v.status === 'PENDING').length === 0 && (
            <div style={{textAlign:'center', padding:40, color:'#888'}}>
              <p style={{fontSize:32, marginBottom:8}}>✅</p>
              <p>{t('noPendingVendors')}</p>
            </div>
          )}
          {allVendors.map(vendor => (
            <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
              <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
                <div>
                  <p style={{fontWeight:700, fontSize:16}}>🏪 {vendor.storeName}</p>
                  <p style={{color:'#666', fontSize:13}}>{vendor.user?.name} · {vendor.user?.email}</p>
                  <p style={{color:'#aaa', fontSize:12}}>📞 {vendor.user?.phone || 'No phone'}</p>
                  <p style={{fontSize:13, marginTop:6}}>
                    Registered: {new Date(vendor.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
                  <span style={{
                    padding:'4px 12px', borderRadius:20, fontSize:13, fontWeight:600,
                    background: vendor.status === 'APPROVED' ? '#d1fae5' : vendor.status === 'REJECTED' ? '#fee2e2' : '#fff7ed',
                    color: vendor.status === 'APPROVED' ? '#065f46' : vendor.status === 'REJECTED' ? '#991b1b' : '#92400e'
                  }}>{vendor.status}</span>
                  {vendor.status === 'PENDING' && (
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={() => handleVendorApproval(vendor.id, 'APPROVED')} disabled={approvingId === vendor.id}
                        style={{padding:'8px 16px', background:'#10b981', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>
                        ✓ {t('approve')}
                      </button>
                      <button onClick={() => { const note = prompt('Rejection reason (optional):') || ''; handleVendorApproval(vendor.id, 'REJECTED', note) }} disabled={approvingId === vendor.id}
                        style={{padding:'8px 16px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>
                        ✗ {t('reject')}
                      </button>
                    </div>
                  )}
                  {vendor.status === 'APPROVED' && (
                    <button onClick={() => { const note = prompt('Rejection reason:') || ''; handleVendorApproval(vendor.id, 'REJECTED', note) }}
                      style={{padding:'6px 12px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:8, cursor:'pointer', fontSize:12}}>
                      Revoke
                    </button>
                  )}
                  {vendor.status === 'REJECTED' && (
                    <button onClick={() => handleVendorApproval(vendor.id, 'APPROVED')}
                      style={{padding:'6px 12px', background:'#d1fae5', color:'#065f46', border:'none', borderRadius:8, cursor:'pointer', fontSize:12}}>
                      Re-approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'kyc' && (
        <div>
          <h3 style={{marginBottom:4}}>{t('kycDocuments')}</h3>
          <p style={{color:'#888', fontSize:14, marginBottom:24}}>{t('kycNote')}</p>
          {kycVendors.length === 0 ? (
            <p style={{color:'#888', textAlign:'center', padding:40}}>{t('noVendors')}</p>
          ) : kycVendors.map(vendor => (
            <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:20, background:'#fff'}}>
              {/* Vendor Header */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, flexWrap:'wrap', gap:8}}>
                <div>
                  <p style={{fontWeight:700, fontSize:16}}>🏪 {vendor.storeName}</p>
                  <p style={{color:'#666', fontSize:13}}>{vendor.user?.name} · {vendor.user?.email}</p>
                  <p style={{color:'#aaa', fontSize:12}}>📞 {vendor.user?.phone || 'No phone'}</p>
                </div>
                <span style={{padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600,
                  background: vendor.status === 'APPROVED' ? '#d1fae5' : vendor.status === 'REJECTED' ? '#fee2e2' : '#fff7ed',
                  color: vendor.status === 'APPROVED' ? '#065f46' : vendor.status === 'REJECTED' ? '#991b1b' : '#92400e'}}>
                  {vendor.status}
                </span>
              </div>

              {/* Bank Details */}
              <div style={{background:'#f8f9fa', borderRadius:10, padding:16, marginBottom:16}}>
                <p style={{fontWeight:600, fontSize:14, marginBottom:10}}>🏦 {t('bankingDetails')}</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:13}}>
                  {[
                    [t('accountHolderName'), vendor.accountHolderName],
                    [t('bankName'), vendor.bankName],
                    [t('ibanNumber'), vendor.ibanNumber],
                    [t('accountNumber'), vendor.accountNumber],
                    [t('bankBranch'), vendor.bankBranch],
                  ].map(([label, val]) => (
                    <div key={label} style={{background:'#fff', padding:'8px 12px', borderRadius:8, border:'1px solid #eee'}}>
                      <p style={{color:'#888', fontSize:11, marginBottom:2}}>{label}</p>
                      <p style={{fontWeight:600, color: val ? '#0f1923' : '#ccc'}}>{val || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <p style={{fontWeight:600, fontSize:14, marginBottom:10}}>📄 {t('uploadedDocuments')} ({vendor.documents?.length || 0})</p>
              {!vendor.documents?.length ? (
                <p style={{color:'#aaa', fontSize:13, fontStyle:'italic'}}>{t('noDocuments')}</p>
              ) : vendor.documents.map(doc => (
                <div key={doc.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #f3f3f3'}}>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <span style={{fontSize:20}}>📄</span>
                    <div>
                      <p style={{fontWeight:600, fontSize:13}}>{doc.docName}</p>
                      <p style={{color:'#888', fontSize:11}}>{doc.docType.replace(/_/g,' ')} · {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                      {doc.note && <p style={{color:'#ef4444', fontSize:11}}>{doc.note}</p>}
                    </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <a href={doc.docUrl} target="_blank" rel="noopener noreferrer"
                      style={{color:'#f97316', fontSize:12, fontWeight:600, textDecoration:'none'}}>View →</a>
                    {!doc.verified ? (
                      <button onClick={() => handleVerifyDoc(doc.id, true)}
                        style={{padding:'5px 12px', background:'#10b981', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600}}>
                        ✓ Verify
                      </button>
                    ) : (
                      <button onClick={() => handleVerifyDoc(doc.id, false)}
                        style={{padding:'5px 12px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:6, cursor:'pointer', fontSize:12}}>
                        Unverify
                      </button>
                    )}
                    <span style={{padding:'3px 8px', borderRadius:10, fontSize:11, fontWeight:600,
                      background: doc.verified ? '#d1fae5' : '#fff7ed',
                      color: doc.verified ? '#065f46' : '#92400e'}}>
                      {doc.verified ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'subscriptions' && (
        <div>
          {subMsg && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{subMsg}</div>}
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:24, marginBottom:32}}>
            <h3 style={{marginBottom:16}}>{t('addSubscription')}</h3>
            <div style={{display:'flex', gap:12, flexWrap:'wrap', alignItems:'flex-end'}}>
              <select value={subForm.vendorId} onChange={e => setSubForm({...subForm, vendorId: e.target.value})}
                style={{...styles.input, marginBottom:0, minWidth:200}}>
                <option value="">{t('selectVendor')}</option>
                {allVendors.filter(v => v.status === 'APPROVED').map(v => (
                  <option key={v.id} value={v.id}>{v.storeName}</option>
                ))}
              </select>
              <select value={subForm.type} onChange={e => {
                const amounts = { SETUP: 1000, MONTHLY: 250, ANNUAL: 500 }
                setSubForm({...subForm, type: e.target.value, amount: amounts[e.target.value]})
              }} style={{...styles.input, marginBottom:0}}>
                <option value="SETUP">Setup Fee — QAR 1,000</option>
                <option value="MONTHLY">Monthly — QAR 250</option>
                <option value="ANNUAL">Annual Renewal — QAR 500</option>
              </select>
              <input style={{...styles.input, marginBottom:0, width:120}} type="number" value={subForm.amount}
                onChange={e => setSubForm({...subForm, amount: parseFloat(e.target.value)})} />
              <input style={{...styles.input, marginBottom:0, flex:1}} placeholder="Note (optional)"
                value={subForm.note} onChange={e => setSubForm({...subForm, note: e.target.value})} />
              <button onClick={handleAddSubscription} style={{...styles.submitBtn, width:'auto', padding:'12px 20px', marginBottom:0}}>
                {t('addSubscription')}
              </button>
            </div>
          </div>
          <h3 style={{marginBottom:16}}>{t('subscriptionPricing')}</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16, marginBottom:32}}>
            {[
              { label:'Setup Fee', amount:'QAR 1,000', icon:'🚀', desc:'One-time store setup', color:'#3b82f6' },
              { label:'Monthly Fee', amount:'QAR 250', icon:'📅', desc:'Per month subscription', color:'#f97316' },
              { label:'Annual Renewal', amount:'QAR 500', icon:'🔄', desc:'Yearly renewal discount', color:'#10b981' },
            ].map(item => (
              <div key={item.label} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20, textAlign:'center'}}>
                <p style={{fontSize:32, marginBottom:8}}>{item.icon}</p>
                <p style={{fontSize:22, fontWeight:800, color: item.color}}>{item.amount}</p>
                <p style={{fontWeight:600, marginBottom:4}}>{item.label}</p>
                <p style={{color:'#888', fontSize:13}}>{item.desc}</p>
              </div>
            ))}
          </div>
          <h3 style={{marginBottom:16}}>{t('subscriptionHistory')}</h3>
          {allVendors.filter(v => v.status === 'APPROVED').map(vendor => (
            vendor.subscriptions?.length > 0 && (
              <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
                <p style={{fontWeight:700, marginBottom:12}}>🏪 {vendor.storeName}</p>
                {vendor.subscriptions.map(sub => (
                  <div key={sub.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f3f3f3', fontSize:14}}>
                    <span style={{color:'#666'}}>{sub.type} — {new Date(sub.createdAt).toLocaleDateString()}</span>
                    <span style={{fontWeight:600, color:'#10b981'}}>QAR {sub.amount}</span>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      )}

      {tab === 'payouts' && (
        <div>
          {payoutMsg && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{payoutMsg}</div>}
          {payoutsData ? (
            <>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16, marginBottom:32}}>
                <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
                  <p style={{fontSize:28, marginBottom:8}}>🏦</p>
                  <p style={{fontSize:22, fontWeight:700, color:'#10b981'}}>{formatQAR(payoutsData.summary?.totalPlatformRevenue || 0)}</p>
                  <p style={{color:'#666', fontSize:14}}>{t('totalPlatformRevenue')}</p>
                </div>
                <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
                  <p style={{fontSize:28, marginBottom:8}}>⏳</p>
                  <p style={{fontSize:22, fontWeight:700, color:'#f97316'}}>{formatQAR(payoutsData.summary?.totalPendingPayouts || 0)}</p>
                  <p style={{color:'#666', fontSize:14}}>{t('totalPendingPayouts')}</p>
                </div>
              </div>
              <h3 style={{marginBottom:16}}>{t('vendorPayoutSummary')}</h3>
              {payoutsData.vendors?.map(vendor => (
                <div key={vendor.id} style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:16, background:'#fff'}}>
                  <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
                    <div>
                      <p style={{fontWeight:700, fontSize:16, marginBottom:4}}>🏪 {vendor.storeName}</p>
                      <p style={{color:'#666', fontSize:13}}>{vendor.ownerName} - {vendor.ownerEmail}</p>
                      <p style={{color:'#aaa', fontSize:12}}>IBAN: {vendor.ibanNumber || t('notProvided')}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{display:'flex', gap:12, marginBottom:12, flexWrap:'wrap'}}>
                        <div style={{textAlign:'center', background:'#f8f9fa', padding:'8px 12px', borderRadius:8}}>
                          <p style={{fontWeight:700, color:'#1e3a5f', fontSize:14}}>{formatQAR(vendor.totalSales)}</p>
                          <p style={{color:'#666', fontSize:11}}>{t('totalSales')}</p>
                        </div>
                        <div style={{textAlign:'center', background:'#fff7ed', padding:'8px 12px', borderRadius:8}}>
                          <p style={{fontWeight:700, color:'#f97316', fontSize:14}}>{formatQAR(vendor.totalPlatformFee)}</p>
                          <p style={{color:'#666', fontSize:11}}>{t('platformFee')}</p>
                        </div>
                        <div style={{textAlign:'center', background:'#d1fae5', padding:'8px 12px', borderRadius:8}}>
                          <p style={{fontWeight:700, color:'#065f46', fontSize:14}}>{formatQAR(vendor.totalEarnings)}</p>
                          <p style={{color:'#666', fontSize:11}}>{t('vendorEarning')}</p>
                        </div>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:12, justifyContent:'flex-end'}}>
                        <div>
                          <p style={{fontSize:13, color:'#666'}}>{t('paid')}: {formatQAR(vendor.totalPaid)}</p>
                          <p style={{fontSize:15, fontWeight:700, color: vendor.pendingPayout > 0 ? '#ef4444' : '#10b981'}}>{t('pending')}: {formatQAR(vendor.pendingPayout)}</p>
                        </div>
                        {vendor.pendingPayout > 0 && (
                          <button onClick={() => handleMarkPaid(vendor.id, vendor.pendingPayout)} style={{padding:'8px 16px', background:'#10b981', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600}}>{t('markPaid')}</button>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : <p style={{padding:40, color:'#666'}}>{t('loading')}</p>}
        </div>
      )}
    {tab === 'kyc' && <KYCDocumentsTab t={t} />}
    </div>
  )
}


function VendorDashboard({ t = (k) => k }) {
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
  const [earnings, setEarnings] = useState(null)
  const [iban, setIban] = useState('')
  const [ibanMsg, setIbanMsg] = useState('')
  const [docs, setDocs] = useState([])
  const [docUploading, setDocUploading] = useState(false)
  const [docMsg, setDocMsg] = useState('')
  const [docType, setDocType] = useState('CR_COPY')
  const [docFile, setDocFile] = useState(null)
  const [bankForm, setBankForm] = useState({ ibanNumber:'', bankName:'', accountHolderName:'', accountNumber:'', bankBranch:'' })
  const [bankMsg, setBankMsg] = useState('')

  const loadStore = () => {
    vendors.getMyStore().then(r => {
      setStore(r.data)
      setLoading(false)
      // Pre-fill bank form from store data
      if (r.data) {
        setBankForm({
          ibanNumber: r.data.ibanNumber || '',
          bankName: r.data.bankName || '',
          accountHolderName: r.data.accountHolderName || '',
          accountNumber: r.data.accountNumber || '',
          bankBranch: r.data.bankBranch || '',
        })
      }
    }).catch(() => setLoading(false))
  }

const loadDocs = () => {
  fetch('https://mobimart-backend-production.up.railway.app/api/vendors/documents', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(r => r.json()).then(data => {
    if (Array.isArray(data)) setDocs(data)
    else setDocs([])
  }).catch(() => setDocs([]))
}

  const loadEarnings = () => {
    vendors.getMyEarnings().then(r => {
      setEarnings(r.data)
      setIban(r.data.vendor?.ibanNumber || '')
    }).catch(() => {})
  }

  useEffect(() => { loadStore(); loadEarnings(); loadDocs() }, []) // eslint-disable-line

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
      setIbanMsg(t('ibanSaved'))
      setTimeout(() => setIbanMsg(''), 3000)
    } catch { setIbanMsg(t('ibanFailed')) }
  }

  const handleUploadDoc = async () => {
    if (!docFile) { setDocMsg('Please select a file'); return }
    setDocUploading(true); setDocMsg('')
    try {
      const formData = new FormData()
      formData.append('document', docFile)
      formData.append('docType', docType)
      formData.append('docName', docFile.name)
      const res = await fetch(`https://mobimart-backend-production.up.railway.app/api/vendors/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData
      })
      if (!res.ok) throw new Error('Upload failed')
      setDocMsg('Document uploaded successfully!')
      setDocFile(null)
      loadDocs()
    } catch (err) { setDocMsg('Upload failed. Please try again.') }
    setDocUploading(false)
  }

  const handleSaveBankDetails = async () => {
    try {
      const res = await fetch('/api/vendors/bank-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(bankForm)
      })
      if (!res.ok) throw new Error('Failed')
      setBankMsg('Bank details saved successfully!')
      setTimeout(() => setBankMsg(''), 3000)
    } catch { setBankMsg('Failed to save bank details.') }
  }

  const handleAddProduct = async () => {
    if (!form.name || !form.price || !form.stockQty) { setError(t('productRequired')); return }
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
        await products.update(editingId, { ...form, price: parseFloat(form.price), stockQty: parseInt(form.stockQty), isActive: true, ...(finalImageUrl && { images: [finalImageUrl] }) })
        setMessage(t('productUpdated'))
      } else {
        await products.create({ ...form, price: parseFloat(form.price), stockQty: parseInt(form.stockQty), images: finalImageUrl ? [finalImageUrl] : [] })
        setMessage(t('productAdded'))
      }
      setForm({ name: '', description: '', price: '', stockQty: '', categoryId: '', condition: 'NEW' })
      resetImageFields(); setEditingId(null); loadStore(); setTab('products')
    } catch (err) { setError(err.response?.data?.error || t('saveFailed')) }
    setSaving(false)
  }

  const handleEdit = (product) => {
    setForm({ name: product.name, description: product.description, price: String(product.price), stockQty: String(product.stockQty), categoryId: product.categoryId || '', condition: product.condition || 'NEW' })
    setEditingId(product.id); setTab('add'); setMessage(''); setError('')
  }

  const handleDelete = async (id) => {
    if (!window.confirm(t('removeProductConfirm'))) return
    await products.remove(id); loadStore()
  }

  const handleBulkUpload = async () => {
    if (!excelFile) { setError(t('selectExcel')); return }
    setSaving(true); setError(''); setMessage('')
    try {
      const formData = new FormData()
      formData.append('excel', excelFile)
      const res = await vendors.bulkUpload(formData)
      setMessage(res.data.message)
      setExcelFile(null); loadStore()
    } catch (err) { setError(err.response?.data?.error || t('bulkFailed')) }
    setSaving(false)
  }

  if (loading) return <p style={{padding:40}}>{t('loading')}</p>

  // Show pending approval notice
  if (store && store.status === 'PENDING') return (
    <div style={{...styles.page, maxWidth:600, textAlign:'center', paddingTop:80}}>
      <div style={{fontSize:64, marginBottom:24}}>⏳</div>
      <h2 style={{fontSize:24, fontWeight:700, marginBottom:12, color:'#0f1923'}}>{t('pendingApproval')}</h2>
      <p style={{color:'#666', fontSize:16, marginBottom:16}}>{t('pendingApprovalMsg')}</p>
      <div style={{background:'#fff7ed', border:'1px solid #f97316', borderRadius:12, padding:20, fontSize:14, color:'#92400e'}}>
        {t('subscriptionInfo')}
      </div>
    </div>
  )

  if (store && store.status === 'REJECTED') return (
    <div style={{...styles.page, maxWidth:600, textAlign:'center', paddingTop:80}}>
      <div style={{fontSize:64, marginBottom:24}}>❌</div>
      <h2 style={{fontSize:24, fontWeight:700, marginBottom:12, color:'#ef4444'}}>{t('storeRejected')}</h2>
      <p style={{color:'#666', marginBottom:12}}>{t('storeRejectedMsg')}</p>
      {store.rejectionNote && <p style={{background:'#fee2e2', borderRadius:8, padding:12, color:'#991b1b', fontSize:14}}>{store.rejectionNote}</p>}
    </div>
  )

  if (!store) return (
    <div style={{...styles.page, maxWidth:500}}>
      <h2 style={{marginBottom:24}}>{t('createStore')}</h2>
      <CreateStore onCreated={loadStore} t={t} />
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
          <div style={{background:'rgba(255,255,255,0.1)', padding:'12px 20px', borderRadius:10}}>
            <p style={{fontSize:24, fontWeight:700}}>{store.products?.length || 0}</p>
            <p style={{fontSize:12, color:'#94a3b8'}}>{t('products')}</p>
          </div>
          {earnings && (
            <div style={{background:'rgba(255,255,255,0.1)', padding:'12px 20px', borderRadius:10}}>
              <p style={{fontSize:24, fontWeight:700}}>{formatQAR(earnings.summary?.pendingPayout || 0)}</p>
              <p style={{fontSize:12, color:'#94a3b8'}}>{t('pendingPayout')}</p>
            </div>
          )}
        </div>
      </div>

      <div style={{display:'flex', gap:12, marginBottom:24, flexWrap:'wrap'}}>
        {tabBtn('products', t('myProducts'))}
        {tabBtn('add', editingId ? t('editProduct') : t('addProduct'))}
        {tabBtn('bulk', t('bulkUpload'))}
        {tabBtn('documents', t('myDocuments'))}
        {tabBtn('banking', t('bankingDetails'))}
        {tabBtn('earnings', t('myEarnings'))}
      </div>

      {message && <div style={{background:'#d1fae5', color:'#065f46', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{message}</div>}
      {error && <div style={{background:'#fee2e2', color:'#991b1b', padding:'12px 16px', borderRadius:8, marginBottom:16}}>{error}</div>}

      {tab === 'products' && (
        <div>
          {store.products?.length === 0 ? (
            <div style={{textAlign:'center', padding:60, background:'#f8f9fa', borderRadius:12}}>
              <p style={{color:'#666', marginBottom:20}}>{t('noProducts')}</p>
              <button onClick={() => setTab('add')} style={styles.submitBtn}>{t('addFirstProduct')}</button>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16}}>
              {store.products.map(p => {
                const imgSrc = p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : `http://localhost:3000${p.images[0]}`) : null
                const cond = conditionLabel(p.condition)
                return (
                  <div key={p.id} style={{border:'1px solid #eee', borderRadius:12, overflow:'hidden', background:'#fff'}}>
                    <div style={{height:140, background:'#f8f9fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, overflow:'hidden'}}>
                      {imgSrc ? <img src={imgSrc} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📱'}
                    </div>
                    <div style={{padding:16}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                        <h3 style={{fontSize:15, fontWeight:600}}>{p.name}</h3>
                        <span style={{padding:'2px 8px', borderRadius:4, fontSize:11, fontWeight:600, background: cond.bg, color: cond.color}}>{cond.text}</span>
                      </div>
                      <p style={{color:'#f97316', fontWeight:700, marginBottom:4}}>{formatQAR(p.price)}</p>
                      <p style={{color:'#666', fontSize:13, marginBottom:12}}>{t('stock')}: {p.stockQty}</p>
                      <div style={{display:'flex', gap:8}}>
                        <button onClick={() => handleEdit(p)} style={{flex:1, padding:'8px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontSize:13}}>{t('edit')}</button>
                        <button onClick={() => handleDelete(p.id)} style={{flex:1, padding:'8px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:8, cursor:'pointer', fontSize:13}}>{t('remove')}</button>
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
          <h3 style={{marginBottom:24}}>{editingId ? t('editProduct') : t('addNewProduct')}</h3>
          <input style={styles.input} placeholder={t('productName')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <textarea style={{...styles.input, height:100, resize:'vertical'}} placeholder={t('description')} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <div style={{display:'flex', gap:12}}>
            <input style={{...styles.input, flex:1}} placeholder={t('priceQAR')} type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            <input style={{...styles.input, flex:1}} placeholder={t('stockQty')} type="number" value={form.stockQty} onChange={e => setForm({...form, stockQty: e.target.value})} />
          </div>
          <select style={styles.input} value={form.categoryId || ''} onChange={e => setForm({...form, categoryId: e.target.value})}>
            <option value="">{t('selectCategory')}</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select style={styles.input} value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}>
            <option value="NEW">{t('conditionNew')}</option>
            <option value="LIKE_NEW">{t('conditionLikeNew')}</option>
            <option value="GOOD">{t('conditionGood')}</option>
            <option value="FAIR">{t('conditionFair')}</option>
          </select>
          <div style={{marginBottom:12}}>
            <p style={{fontWeight:600, marginBottom:8, fontSize:14}}>{t('productImage')}</p>
            <div style={{display:'flex', gap:8, marginBottom:12}}>
              <button onClick={() => setImageTab('upload')} style={{flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer', background: imageTab === 'upload' ? '#f97316' : '#f8f9fa', color: imageTab === 'upload' ? '#fff' : '#333', fontWeight:600}}>{t('uploadFile')}</button>
              <button onClick={() => setImageTab('url')} style={{flex:1, padding:'8px', borderRadius:8, border:'none', cursor:'pointer', background: imageTab === 'url' ? '#f97316' : '#f8f9fa', color: imageTab === 'url' ? '#fff' : '#333', fontWeight:600}}>{t('imageUrl')}</button>
            </div>
            {imageTab === 'upload' ? (
              <div style={{border:'2px dashed #ddd', borderRadius:12, padding:24, textAlign:'center', cursor:'pointer'}} onClick={() => document.getElementById('imgInput').click()}>
                {imagePreview ? <img src={imagePreview} alt="preview" style={{maxHeight:150, maxWidth:'100%', borderRadius:8}} /> : <p style={{color:'#666'}}>{t('clickToUpload')}</p>}
                <input id="imgInput" type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange} />
              </div>
            ) : (
              <div>
                <input style={styles.input} placeholder={t('pasteImageUrl')} value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImagePreview(e.target.value) }} />
                {imageUrl && <img src={imageUrl} alt="preview" style={{maxHeight:150, maxWidth:'100%', borderRadius:8}} onError={e => { e.target.style.display='none' }} />}
              </div>
            )}
            {(imagePreview || imageUrl) && <button onClick={resetImageFields} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', marginTop:8}}>{t('removeImage')}</button>}
          </div>
          <div style={{display:'flex', gap:12}}>
            <button onClick={handleAddProduct} disabled={saving} style={{...styles.submitBtn, flex:1, opacity: saving ? 0.7 : 1}}>
              {saving ? t('saving') : editingId ? t('updateProduct') : t('addProduct')}
            </button>
            {editingId && <button onClick={() => { setEditingId(null); setForm({ name:'', description:'', price:'', stockQty:'', categoryId:'', condition:'NEW' }); resetImageFields(); setTab('products') }} style={{...styles.submitBtn, flex:1, background:'#6b7280'}}>{t('cancel')}</button>}
          </div>
        </div>
      )}

      {tab === 'bulk' && (
        <div style={{maxWidth:600}}>
          <h3 style={{marginBottom:8}}>{t('bulkUpload')}</h3>
          <p style={{color:'#666', marginBottom:24}}>{t('bulkColumns')}</p>
          <div style={{border:'2px dashed #ddd', borderRadius:12, padding:40, textAlign:'center', marginBottom:16, cursor:'pointer'}} onClick={() => document.getElementById('excelInput').click()}>
            {excelFile ? <p style={{color:'#065f46', fontWeight:600}}>{excelFile.name}</p> : <p style={{color:'#666'}}>{t('selectExcelFile')}</p>}
            <input id="excelInput" type="file" accept=".xlsx,.xls" style={{display:'none'}} onChange={e => setExcelFile(e.target.files[0])} />
          </div>
          <button onClick={handleBulkUpload} disabled={saving || !excelFile} style={{...styles.submitBtn, opacity: saving || !excelFile ? 0.7 : 1}}>
            {saving ? t('uploading') : t('uploadProducts')}
          </button>
        </div>
      )}

      {tab === 'documents' && (
        <div style={{maxWidth:700}}>
          <h3 style={{marginBottom:8, fontSize:18, fontWeight:700}}>{t('myDocuments')}</h3>
          <p style={{color:'#888', fontSize:14, marginBottom:24}}>{t('documentsNote')}</p>

          {/* Upload Section */}
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:24, marginBottom:24}}>
            <h4 style={{marginBottom:16, fontWeight:600}}>{t('uploadDocument')}</h4>
            {docMsg && <div style={{padding:'10px 14px', borderRadius:8, marginBottom:16, background: docMsg.includes('success') ? '#d1fae5' : '#fee2e2', color: docMsg.includes('success') ? '#065f46' : '#991b1b', fontSize:14}}>{docMsg}</div>}
            <select style={styles.input} value={docType} onChange={e => setDocType(e.target.value)}>
              <option value="CR_COPY">{t('crCopy')}</option>
              <option value="TRADE_LICENSE">{t('tradeLicense')}</option>
              <option value="SIGNATORY_QID">{t('signatoryQID')}</option>
              <option value="OTHER">{t('otherDoc')}</option>
            </select>
            <div style={{border:'2px dashed #ddd', borderRadius:12, padding:24, textAlign:'center', cursor:'pointer', marginBottom:12}}
              onClick={() => document.getElementById('docInput').click()}>
              {docFile
                ? <p style={{color:'#065f46', fontWeight:600}}>📎 {docFile.name}</p>
                : <div><p style={{fontSize:32, marginBottom:8}}>📄</p><p style={{color:'#888'}}>{t('clickToUploadDoc')}</p><p style={{color:'#aaa', fontSize:12, marginTop:4}}>PDF, JPG, PNG — max 10MB</p></div>
              }
              <input id="docInput" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:'none'}} onChange={e => setDocFile(e.target.files[0])} />
            </div>
            <button onClick={handleUploadDoc} disabled={docUploading || !docFile}
              style={{...styles.submitBtn, opacity: docUploading || !docFile ? 0.7 : 1}}>
              {docUploading ? t('uploading') : t('uploadDocument')}
            </button>
          </div>

          {/* Uploaded Documents */}
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:24}}>
            <h4 style={{marginBottom:16, fontWeight:600}}>{t('uploadedDocuments')}</h4>
            {docs.length === 0 ? (
              <p style={{color:'#888', textAlign:'center', padding:24}}>{t('noDocuments')}</p>
            ) : docs.map(doc => (
              <div key={doc.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid #f3f3f3'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <span style={{fontSize:24}}>📄</span>
                  <div>
                    <p style={{fontWeight:600, fontSize:14}}>{doc.docName}</p>
                    <p style={{color:'#888', fontSize:12}}>{doc.docType.replace('_', ' ')} · {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <span style={{padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:600,
                    background: doc.verified ? '#d1fae5' : '#fff7ed',
                    color: doc.verified ? '#065f46' : '#92400e'}}>
                    {doc.verified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                  <a href={doc.docUrl} target="_blank" rel="noopener noreferrer"
                    style={{color:'#f97316', fontSize:13, textDecoration:'none', fontWeight:600}}>View →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'banking' && (
        <div style={{maxWidth:600}}>
          <h3 style={{marginBottom:8, fontSize:18, fontWeight:700}}>{t('bankingDetails')}</h3>
          <p style={{color:'#888', fontSize:14, marginBottom:24}}>{t('bankingNote')}</p>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:24}}>
            {bankMsg && <div style={{padding:'10px 14px', borderRadius:8, marginBottom:16, background: bankMsg.includes('success') ? '#d1fae5' : '#fee2e2', color: bankMsg.includes('success') ? '#065f46' : '#991b1b', fontSize:14}}>{bankMsg}</div>}
            <div style={{display:'grid', gap:0}}>
              <label style={{fontSize:13, fontWeight:600, color:'#555', marginBottom:4}}>{t('accountHolderName')} *</label>
              <input style={styles.input} placeholder="e.g. Mohammed Al-Rashidi" value={bankForm.accountHolderName} onChange={e => setBankForm({...bankForm, accountHolderName: e.target.value})} />
              <label style={{fontSize:13, fontWeight:600, color:'#555', marginBottom:4}}>{t('bankName')} *</label>
              <input style={styles.input} placeholder="e.g. Qatar National Bank (QNB)" value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} />
              <label style={{fontSize:13, fontWeight:600, color:'#555', marginBottom:4}}>{t('ibanNumber')} *</label>
              <input style={styles.input} placeholder="QA57 DOHB 0000 1234 5678 90AB CDEF" value={bankForm.ibanNumber} onChange={e => setBankForm({...bankForm, ibanNumber: e.target.value})} />
              <label style={{fontSize:13, fontWeight:600, color:'#555', marginBottom:4}}>{t('accountNumber')}</label>
              <input style={styles.input} placeholder="Account number" value={bankForm.accountNumber} onChange={e => setBankForm({...bankForm, accountNumber: e.target.value})} />
              <label style={{fontSize:13, fontWeight:600, color:'#555', marginBottom:4}}>{t('bankBranch')}</label>
              <input style={styles.input} placeholder="e.g. West Bay Branch, Doha" value={bankForm.bankBranch} onChange={e => setBankForm({...bankForm, bankBranch: e.target.value})} />
            </div>
            <button onClick={handleSaveBankDetails} style={styles.submitBtn}>{t('saveBankDetails')}</button>
          </div>
          <div style={{background:'#fff7ed', border:'1px solid #f97316', borderRadius:10, padding:14, marginTop:16, fontSize:13, color:'#92400e'}}>
            🔒 {t('bankingSecurityNote')}
          </div>
        </div>
      )}

      {tab === 'earnings' && (
        <div>
          {earnings ? (
            <>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:16, marginBottom:32}}>
                {[
                  { label: t('totalSales'), value: formatQAR(earnings.summary?.totalSales || 0), icon:'🛒', color:'#1e3a5f' },
                  { label: t('platformFee'), value: formatQAR(earnings.summary?.totalPlatformFee || 0), icon:'🏦', color:'#f97316' },
                  { label: t('yourEarnings'), value: formatQAR(earnings.summary?.totalEarnings || 0), icon:'💰', color:'#10b981' },
                  { label: t('totalPaid'), value: formatQAR(earnings.summary?.totalPaid || 0), icon:'✅', color:'#3b82f6' },
                  { label: t('pendingPayout'), value: formatQAR(earnings.summary?.pendingPayout || 0), icon:'⏳', color:'#ef4444' },
                ].map(stat => (
                  <div key={stat.label} style={{background:'#fff', border:'1px solid #eee', borderRadius:12, padding:20}}>
                    <p style={{fontSize:28, marginBottom:8}}>{stat.icon}</p>
                    <p style={{fontSize:20, fontWeight:700, color: stat.color}}>{stat.value}</p>
                    <p style={{color:'#666', fontSize:13}}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div style={{background:'#f8f9fa', borderRadius:12, padding:20, marginBottom:24}}>
                <h3 style={{marginBottom:12, fontSize:16}}>{t('yourBankIban')}</h3>
                <div style={{display:'flex', gap:12}}>
                  <input style={{...styles.input, flex:1, marginBottom:0}} placeholder="QA57DOHB..." value={iban} onChange={e => setIban(e.target.value)} />
                  <button onClick={handleSaveIban} style={{...styles.submitBtn, width:'auto', padding:'12px 20px'}}>{t('save')}</button>
                </div>
                {ibanMsg && <p style={{color:'#10b981', marginTop:8, fontSize:13}}>{ibanMsg}</p>}
              </div>
              <h3 style={{marginBottom:16}}>{t('orderHistory')}</h3>
              {earnings.orderItems?.length === 0 ? (
                <p style={{color:'#888', textAlign:'center', padding:32}}>{t('noOrders')}</p>
              ) : earnings.orderItems?.map(item => (
                <div key={item.id} style={{border:'1px solid #eee', borderRadius:10, padding:16, marginBottom:12, background:'#fff'}}>
                  <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8}}>
                    <div>
                      <p style={{fontWeight:600}}>{item.product?.name}</p>
                      <p style={{color:'#666', fontSize:13}}>{t('order')} #{item.order?.id?.slice(0,8)}... - {t('qty')}: {item.quantity}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <p style={{color:'#666', fontSize:13}}>{t('sale')}: {formatQAR(item.unitPrice * item.quantity)}</p>
                      <p style={{color:'#f97316', fontSize:13}}>{t('fee')}: -{formatQAR(item.platformFee)}</p>
                      <p style={{color:'#10b981', fontWeight:700}}>{t('youGet')}: {formatQAR(item.vendorEarning)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : <p style={{padding:40, color:'#666'}}>{t('loading')}</p>}
        </div>
      )}
    </div>
  )
}

function CreateStore({ onCreated, t = (k) => k }) {
  const [form, setForm] = useState({ storeName: '', description: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleCreate = async () => {
    if (!form.storeName) { setError(t('storeNameRequired')); return }
    setSaving(true)
    try {
      await vendors.createStore(form)
      onCreated()
    } catch (err) {
      setError(err.response?.data?.error || t('createStoreFailed'))
      setSaving(false)
    }
  }

  return (
    <div>
      {error && <p style={styles.error}>{error}</p>}
      <input style={styles.input} placeholder={t('storeName')} value={form.storeName} onChange={e => setForm({...form, storeName: e.target.value})} />
      <textarea style={{...styles.input, height:100, resize:'vertical'}} placeholder={t('storeDescription')} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <button onClick={handleCreate} disabled={saving} style={{...styles.submitBtn, opacity: saving ? 0.7 : 1}}>
        {saving ? t('creating') : t('createMyStore')}
      </button>
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN')
  const t = (key) => translations[language][key] || key
  useEffect(() => {
    if (language === 'AR') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
    localStorage.setItem('language', language)
  }, [language])
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0) // eslint-disable-line

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
    window.location.href = '/'
  }

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} language={language} setLanguage={setLanguage} t={t} />
      <Routes>
        <Route path="/" element={<Home t={t} language={language} />} />
        <Route path="/products" element={<Products t={t} language={language} />} />
        <Route path="/products/:id" element={<ProductDetail user={user} t={t} />} />
        <Route path="/login" element={<Login onLogin={setUser} t={t} />} />
        <Route path="/register" element={<Register onLogin={setUser} t={t} />} />
        <Route path="/cart" element={<Cart onCartUpdate={setCartCount} t={t} />} />
        <Route path="/checkout" element={<Checkout t={t} />} />
        <Route path="/orders" element={<Orders user={user} t={t} />} />
        <Route path="/orders/:id" element={<OrderDetail t={t} />} />
        <Route path="/vendor" element={<VendorDashboard t={t} />} />
        <Route path="/admin" element={<AdminDashboard t={t} />} />
        <Route path="/terms" element={<Terms t={t} language={language} />} />
        <Route path="/privacy" element={<Privacy t={t} language={language} />} />
        <Route path="/refund-policy" element={<RefundPolicy t={t} language={language} />} />
        <Route path="/shipping" element={<Shipping t={t} language={language} />} />
        <Route path="/contact" element={<Contact t={t} language={language} />} />
      </Routes>
      <SiteFooter t={t} language={language} />
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
  hero: { minHeight:'48vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)', color:'#fff', textAlign:'center', padding:32 },
  heroTitle: { fontSize:34, fontWeight:700, marginBottom:16 },
  heroSub: { fontSize:16, color:'#94a3b8', marginBottom:32 },
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
