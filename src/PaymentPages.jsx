import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { payments } from './api'

// ============================================================
// PaymentSuccess — MyFatoorah redirects here after a payment.
// The URL looks like /payment-success?paymentId=XXXX&Id=XXXX
// We read paymentId, ask our backend to VERIFY it with MyFatoorah
// (never trust the redirect alone), and show the real result.
// ============================================================
export function PaymentSuccess({ t = (k) => k, language = 'EN' }) {
  const ar = language === 'AR'
  const [state, setState] = useState('verifying') // verifying | success | failed | error
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get('paymentId') || params.get('Id')
    if (!paymentId) { setState('error'); return }

    payments.verify(paymentId)
      .then(r => {
        setDetails(r.data)
        setState(r.data.success ? 'success' : 'failed')
      })
      .catch(() => setState('error'))
  }, [])

  const wrap = {
    maxWidth: 520, margin: '80px auto', padding: '40px 32px',
    background: 'var(--jm-surface, #fff)', borderRadius: 20,
    border: '1px solid var(--jm-border, #eef0f3)',
    boxShadow: '0 12px 40px rgba(15,25,35,0.10)', textAlign: 'center'
  }
  const btn = {
    display: 'inline-block', marginTop: 24, padding: '12px 28px',
    background: '#f97316', color: '#fff', borderRadius: 12,
    textDecoration: 'none', fontWeight: 700
  }

  if (state === 'verifying') {
    return (
      <div style={wrap}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>⏳</div>
        <h2 style={{ margin: '0 0 8px' }}>{ar ? 'جاري التحقق من الدفع…' : 'Verifying your payment…'}</h2>
        <p style={{ color: '#64748b' }}>{ar ? 'يرجى الانتظار لحظة.' : 'Please wait a moment.'}</p>
      </div>
    )
  }

  if (state === 'success') {
    const isOrder = details?.purpose === 'ORDER'
    return (
      <div style={wrap}>
        <div style={{ fontSize: 54, marginBottom: 12 }}>✅</div>
        <h2 style={{ margin: '0 0 8px', color: '#16a34a' }}>{ar ? 'تم الدفع بنجاح' : 'Payment Successful'}</h2>
        <p style={{ color: '#64748b' }}>
          {isOrder
            ? (ar ? 'تم تأكيد دفع طلبك بنجاح.' : 'Your order payment is confirmed. Thank you!')
            : (ar ? 'تم تأكيد عملية الدفع وتفعيل اشتراكك.' : 'Your payment is confirmed and your subscription is active.')}
        </p>
        {details?.amount && (
          <p style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>
            {details.amount} {details.currency || 'KWD'}
          </p>
        )}
        {isOrder && details?.orderId ? (
          <Link to={`/orders/${details.orderId}`} style={btn}>{ar ? 'عرض الطلب' : 'View Order'}</Link>
        ) : (
          <Link to="/vendor" style={btn}>{ar ? 'الذهاب إلى متجري' : 'Go to My Store'}</Link>
        )}
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div style={wrap}>
        <div style={{ fontSize: 54, marginBottom: 12 }}>⚠️</div>
        <h2 style={{ margin: '0 0 8px', color: '#dc2626' }}>{ar ? 'لم يكتمل الدفع' : 'Payment Not Completed'}</h2>
        <p style={{ color: '#64748b' }}>
          {ar ? 'لم تتم عملية الدفع. لم يتم خصم أي مبلغ.' : 'The payment did not go through. You have not been charged.'}
        </p>
        <Link to="/vendor" style={btn}>{ar ? 'حاول مرة أخرى' : 'Try Again'}</Link>
      </div>
    )
  }

  // error
  return (
    <div style={wrap}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>❓</div>
      <h2 style={{ margin: '0 0 8px' }}>{ar ? 'تعذّر التحقق' : 'Could Not Verify'}</h2>
      <p style={{ color: '#64748b' }}>
        {ar ? 'تعذّر تأكيد حالة الدفع. إذا تم خصم المبلغ، تواصل مع الدعم.' : 'We could not confirm the payment status. If you were charged, please contact support.'}
      </p>
      <Link to="/" style={btn}>{ar ? 'العودة للرئيسية' : 'Back to Home'}</Link>
    </div>
  )
}

// ============================================================
// PaymentFailed — MyFatoorah redirects here on the error path.
// ============================================================
export function PaymentFailed({ t = (k) => k, language = 'EN' }) {
  const ar = language === 'AR'
  const wrap = {
    maxWidth: 520, margin: '80px auto', padding: '40px 32px',
    background: 'var(--jm-surface, #fff)', borderRadius: 20,
    border: '1px solid var(--jm-border, #eef0f3)',
    boxShadow: '0 12px 40px rgba(15,25,35,0.10)', textAlign: 'center'
  }
  const btn = {
    display: 'inline-block', marginTop: 24, padding: '12px 28px',
    background: '#f97316', color: '#fff', borderRadius: 12,
    textDecoration: 'none', fontWeight: 700
  }
  return (
    <div style={wrap}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>❌</div>
      <h2 style={{ margin: '0 0 8px', color: '#dc2626' }}>{ar ? 'فشل الدفع' : 'Payment Failed'}</h2>
      <p style={{ color: '#64748b' }}>
        {ar ? 'لم تتم عملية الدفع. لم يتم خصم أي مبلغ. يمكنك المحاولة مرة أخرى.' : 'Your payment was not completed. You have not been charged. You can try again.'}
      </p>
      <Link to="/vendor" style={btn}>{ar ? 'حاول مرة أخرى' : 'Try Again'}</Link>
    </div>
  )
}
