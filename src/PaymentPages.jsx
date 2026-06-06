import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { payments } from './api'

export function PaymentSuccess({ t = (k) => k, language = 'EN' }) {
  const ar = language === 'AR'
  const [state, setState] = useState('verifying')
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get('paymentId') || params.get('Id')
    if (!paymentId) { setState('error'); return }

    payments.verify(paymentId)
      .then(r => {
        setDetails(r.data)
        setState(r.data.success ? 'success' : 'failed')
        // Auto-attempt to return to app after 2 seconds
        if (r.data.success) {
          const orderId = r.data.orderId
          setTimeout(() => {
            // Try deep link first — if app is installed it will open automatically
            const deepLink = orderId
              ? `com.jasprmarket.app://orders/${orderId}`
              : `com.jasprmarket.app://orders`
            window.location.href = deepLink
          }, 2000)
        }
      })
      .catch(() => setState('error'))
  }, [])

  const wrap = {
    maxWidth: 520, margin: '40px auto', padding: '40px 32px',
    background: '#fff', borderRadius: 20,
    border: '1px solid #eef0f3',
    boxShadow: '0 12px 40px rgba(15,25,35,0.10)', textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  }
  const btn = {
    display: 'block', marginTop: 16, padding: '14px 28px',
    background: '#f97316', color: '#fff', borderRadius: 12,
    textDecoration: 'none', fontWeight: 700, fontSize: 16,
    border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center'
  }
  const btnSecondary = {
    ...btn, background: '#1e3a5f', marginTop: 10
  }

  if (state === 'verifying') {
    return (
      <div style={wrap}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>⏳</div>
        <h2 style={{ margin: '0 0 8px' }}>Verifying your payment…</h2>
        <p style={{ color: '#64748b' }}>Please wait a moment.</p>
      </div>
    )
  }

  if (state === 'success') {
    const isOrder = details?.purpose === 'ORDER'
    const orderId = details?.orderId
    const deepLink = orderId
      ? `com.jasprmarket.app://orders/${orderId}`
      : `com.jasprmarket.app://orders`

    return (
      <div style={wrap}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>✅</div>
        <h2 style={{ margin: '0 0 8px', color: '#16a34a', fontSize: 24 }}>Payment Successful!</h2>
        <p style={{ color: '#64748b', marginBottom: 8 }}>
          {isOrder ? 'Your order is confirmed. Thank you!' : 'Your subscription is now active.'}
        </p>
        {details?.amount && (
          <p style={{ fontWeight: 700, fontSize: 20, color: '#0f1923', margin: '12px 0 20px' }}>
            {details.amount} {details.currency || 'KWD'}
          </p>
        )}
        <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>
          Returning you to the app automatically...
        </p>
        {/* Primary: open app */}
        <a href={deepLink} style={btn}>
          📱 Open JASPR Market App
        </a>
        {/* Fallback: stay on website */}
        {isOrder && orderId ? (
          <Link to={`/orders/${orderId}`} style={btnSecondary}>
            View Order on Website
          </Link>
        ) : (
          <Link to="/orders" style={btnSecondary}>
            View My Orders
          </Link>
        )}
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div style={wrap}>
        <div style={{ fontSize: 54, marginBottom: 12 }}>⚠️</div>
        <h2 style={{ margin: '0 0 8px', color: '#dc2626' }}>Payment Not Completed</h2>
        <p style={{ color: '#64748b' }}>The payment did not go through. You have not been charged.</p>
        <a href="com.jasprmarket.app://checkout" style={btn}>
          📱 Return to App
        </a>
      </div>
    )
  }

  return (
    <div style={wrap}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>❓</div>
      <h2 style={{ margin: '0 0 8px' }}>Could Not Verify</h2>
      <p style={{ color: '#64748b' }}>We could not confirm the payment status. If you were charged, please contact support.</p>
      <a href="com.jasprmarket.app://orders" style={btn}>
        📱 Return to App
      </a>
    </div>
  )
}

export function PaymentFailed({ t = (k) => k, language = 'EN' }) {
  useEffect(() => {
    // Auto-attempt to return to app after 2 seconds
    setTimeout(() => {
      window.location.href = 'com.jasprmarket.app://orders'
    }, 2000)
  }, [])

  const wrap = {
    maxWidth: 520, margin: '40px auto', padding: '40px 32px',
    background: '#fff', borderRadius: 20,
    border: '1px solid #eef0f3',
    boxShadow: '0 12px 40px rgba(15,25,35,0.10)', textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  }
  const btn = {
    display: 'block', marginTop: 16, padding: '14px 28px',
    background: '#f97316', color: '#fff', borderRadius: 12,
    textDecoration: 'none', fontWeight: 700, fontSize: 16,
    border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center'
  }

  return (
    <div style={wrap}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>❌</div>
      <h2 style={{ margin: '0 0 8px', color: '#dc2626' }}>Payment Failed</h2>
      <p style={{ color: '#64748b', marginBottom: 16 }}>
        Your payment was not completed. You have not been charged.
      </p>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>
        Returning you to the app automatically...
      </p>
      <a href="com.jasprmarket.app://orders" style={btn}>
        📱 Return to App
      </a>
    </div>
  )
}
