import React from 'react'
import { Link } from 'react-router-dom'

function SiteFooter({ t = (k) => k, language = 'EN' }) {

  return (
  <footer style={s.footer} dir="ltr">

      {/* Trust Row */}
      <div style={s.trustRow}>
        <div style={s.trustItem}>
          <div style={s.icon}>🛡️</div>
          <div>
          <strong>{language === 'AR' ? 'معاملات آمنة' : 'Secure Transactions'}</strong>
          <span>{language === 'AR' ? 'بياناتك محمية' : 'Your data is protected'}</span>
          </div>
        </div>

        <div style={s.trustItem}>
          <div style={s.icon}>🔄</div>
          <div>
          <strong>{language === 'AR' ? 'سوق موثوق' : 'Trusted Marketplace'}</strong>
          <span>{language === 'AR' ? 'بائعون موثقون' : 'Verified vendors'}</span>
          </div>
        </div>

        <div style={s.trustItem}>
          <div style={s.icon}>🏅</div>
          <div>
          <strong>
  {language === 'AR' ? 'سوق موثوق' : 'Trusted Marketplace'}
</strong>

<span>
  {language === 'AR' ? 'بائعون موثقون' : 'Verified vendors'}
</span>
          </div>
        </div>

        <div style={s.trustItem}>
          <div style={s.icon}>🔒</div>
          <div>
          <strong>
  {language === 'AR' ? 'الخصوصية محمية' : 'Privacy Protected'}
</strong>

<span>
  {language === 'AR' ? 'خصوصيتك تهمنا' : 'Your privacy matters'}
</span>
          </div>
        </div>
      </div>

      {/* Simple copyright row */}
      <div style={s.simpleCopyright}>
        <strong>© 2026 JASPR Market.</strong>
        <span>{language === 'AR' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
      </div>

      {/* Bottom Links */}
      <div style={s.bottomLinks}>
        <Link to="/terms" style={s.link}>
  {language === 'AR' ? 'الشروط والأحكام' : 'Terms & Conditions'}
</Link>

<span>|</span>

<Link to="/privacy" style={s.link}>
  {language === 'AR' ? 'سياسة الخصوصية' : 'Privacy Policy'}
</Link>

<span>|</span>

<Link to="/refund-policy" style={s.link}>
  {language === 'AR' ? 'سياسة الاسترجاع' : 'Refund Policy'}
</Link>

<span>|</span>

<Link to="/shipping" style={s.link}>
  {language === 'AR' ? 'سياسة الشحن' : 'Shipping Policy'}
</Link>

<span>|</span>

<Link to="/contact" style={s.link}>
  {language === 'AR' ? 'اتصل بنا' : 'Contact Us'}
</Link>

<span>|</span>

<Link to="/account-deletion" style={s.link}>
  {language === 'AR' ? 'حذف الحساب' : 'Account Deletion'}
</Link>
      </div>
    </footer>
  )
}

const s = {
footer: {
  background: 'linear-gradient(135deg, #061d31 0%, #0b2f4a 45%, #061827 100%)',
  color: '#ffffff',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  marginTop: 36,
  paddingBottom: 84, // space for bottom mobile nav
},

trustRow: {
  maxWidth: 1400,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: 22,
  padding: '24px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.18)',
},

  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 22,
    borderRight: '1px solid rgba(255,255,255,0.25)',
    minHeight: 80,
  },

  icon: {
    fontSize: 30,
    lineHeight: 1,
  },

  trustItemStrong: {},

complianceRow: {
  maxWidth: 1400,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1.3fr 1px 1.2fr 1px 1.4fr 1px 1fr 1px 1fr',
  gap: 22,
  alignItems: 'start',
  padding: '28px 48px',
  borderBottom: '1px solid rgba(255,255,255,0.18)',
},

complianceItem: {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 15,
  lineHeight: 1.4,
},

label: {
  color: '#a7b6c7',
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
},

divider: {
  width: 1,
  height: 72,
  background: 'rgba(255,255,255,0.25)',
},

simpleCopyright: {
  maxWidth: 1400,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
  padding: '18px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.14)',
  color: '#cbd5e1',
  fontSize: 13,
},

bottomLinks: {
  maxWidth: 1500,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 14,
  padding: '22px 20px 30px',
  fontSize: 14,
  borderTop: '1px solid rgba(255,255,255,0.12)',
},

  link: {
    color: '#ffffff',
    textDecoration: 'none',
  },
}

export default SiteFooter