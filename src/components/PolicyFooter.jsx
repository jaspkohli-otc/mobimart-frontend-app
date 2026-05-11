import React from 'react'
import { Link } from 'react-router-dom'

// Shared compliance footer block.
// Used by Terms, Privacy, RefundPolicy, Shipping, Contact pages.
// Displays operator info, customer care, legal links, CR-223480.
// Required by Hukoomi e-commerce licence on all consumer-facing pages.
function PolicyFooter({ t = (k) => k }) {
  return (
    <footer style={s.footer}>
      <div style={s.footerGrid}>
        <div style={s.footerBlock}>
          <strong style={s.footerLabel}>{t('legalFooterOperator')}</strong>
          JASPR Trading Contracting and Services<br />
          Building 220, Street 185, Zone 24<br />
          Doha, State of Qatar
        </div>
        <div style={s.footerBlock}>
          <strong style={s.footerLabel}>{t('legalFooterCare')}</strong>
          <a href="mailto:support@jasprmarket.com" style={s.footerLink}>support@jasprmarket.com</a><br />
          +974 6614 2417<br />
          {t('legalFooterHours')}
        </div>
        <div style={s.footerBlock}>
          <strong style={s.footerLabel}>{t('legalFooterLegal')}</strong>
          <Link to="/terms" style={s.footerLink}>{t('legalFooterTerms')}</Link><br />
          <Link to="/privacy" style={s.footerLink}>{t('legalFooterPrivacy')}</Link><br />
          <Link to="/refund-policy" style={s.footerLink}>{t('legalFooterRefund')}</Link><br />
          <Link to="/shipping" style={s.footerLink}>{t('legalFooterShipping')}</Link>
        </div>
      </div>
      <div style={s.footerCR}>
        {t('legalFooterCRLine1')} <strong>CR-223480</strong> · {t('legalFooterCRLine2')} <em>({t('legalFooterPending')})</em><br />
        © 2026 JASPR Trading Contracting and Services. {t('legalFooterRights')}
      </div>
    </footer>
  )
}

const s = {
  footer: { marginTop: 80, paddingTop: 32, borderTop: '1px solid #e5e7eb', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 13, color: '#6b7280', lineHeight: 1.6 },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 24 },
  footerBlock: { color: '#6b7280' },
  footerLabel: { display: 'block', color: '#0f1923', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.12em', marginBottom: 6, fontWeight: 600 },
  footerLink: { color: '#6b7280', textDecoration: 'none' },
  footerCR: { textAlign: 'center', paddingTop: 24, borderTop: '1px solid #e5e7eb' },
}

export default PolicyFooter
