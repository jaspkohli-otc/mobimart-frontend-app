import React from 'react'
import { Link } from 'react-router-dom'

// ────────────────────────────────────────────────────────────────────────
//  SiteFooter — main site footer shown on every page.
//  Required by Hukoomi e-commerce licence: CR number, contact info,
//  and direct links to all consumer-facing legal policies.
//
//  Usage in App.js:
//    <SiteFooter t={t} language={language} />
//  Place AFTER <Routes> and BEFORE </BrowserRouter>.
// ────────────────────────────────────────────────────────────────────────

function SiteFooter({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'

  return (
    <footer style={s.footer} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.inner}>
        {/* Top row: 4 columns */}
        <div style={s.grid}>
          {/* Brand */}
          <div style={s.col}>
            <div style={s.brand}>
              JASPR <span style={s.brandAccent}>Market</span>
            </div>
            <div style={s.brandTag}>{t('siteFooterTag')}</div>
            <p style={s.brandDesc}>{t('siteFooterDesc')}</p>
          </div>

          {/* Shop */}
          <div style={s.col}>
            <div style={s.colTitle}>{t('siteFooterShopTitle')}</div>
            <Link to="/products" style={s.link}>{t('shop')}</Link>
            <Link to="/cart" style={s.link}>{t('cart')}</Link>
            <Link to="/orders" style={s.link}>{t('myOrders')}</Link>
            <Link to="/login" style={s.link}>{t('login')}</Link>
          </div>

          {/* Help & Legal */}
          <div style={s.col}>
            <div style={s.colTitle}>{t('siteFooterHelpTitle')}</div>
            <Link to="/contact" style={s.link}>{t('siteFooterContactUs')}</Link>
            <Link to="/shipping" style={s.link}>{t('legalFooterShipping')}</Link>
            <Link to="/refund-policy" style={s.link}>{t('legalFooterRefund')}</Link>
            <Link to="/terms" style={s.link}>{t('legalFooterTerms')}</Link>
            <Link to="/privacy" style={s.link}>{t('legalFooterPrivacy')}</Link>
            <Link to="/cookie-policy" style={s.link}>{t('cookiePolicy')}</Link>
            <Link to="/vendor-policy" style={s.link}>{t('vendorPolicy')}</Link>
            <Link to="/account-deletion" style={s.link}>{t('accountDeletionPolicy')}</Link>
          </div>

          {/* Contact */}
          <div style={s.col}>
            <div style={s.colTitle}>{t('siteFooterContactTitle')}</div>
            <a href="mailto:support@jasprmarket.com" style={s.link}>{t('siteFooterEmail')}</a>
            <a href="tel:+97466142417" style={s.link}>{t('siteFooterPhone')}</a>
            <div style={s.smallText}>{t('legalFooterHours')}</div>
            <div style={s.smallText}>
              {t('siteFooterAddress').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
          </div>
        </div>

                {/* Compliance bar — REQUIRED for Hukoomi */}
        <div style={s.compliance}>
          <div style={s.complianceItem}>
            <span style={s.complianceLabel}>
              {t('siteFooterOperator')}:
            </span>{' '}
            {t('siteFooterOperatorName')}
          </div>

          <div style={s.complianceItem}>
            <span style={s.complianceLabel}>
              {t('siteFooterCR')}:
            </span>{' '}
            <strong style={s.complianceValue}>
              {t('siteFooterCRNumber')}
            </strong>
          </div>

          {/* NEW MOI ACTIVITY BLOCK */}
          <div style={s.complianceItem}>
            <span style={s.complianceLabel}>
              MOI CR ACTIVITY:
            </span>{' '}
            <strong style={s.complianceValue}>
              479121
            </strong>

            <div style={{
              marginTop: 4,
              fontSize: 12,
              color: '#cbd5e1',
              lineHeight: 1.4,
            }}>
              Digital Platform for Retail Trade Intermediation
            </div>
          </div>

          <div style={s.complianceItem}>
            <span style={s.complianceLabel}>
              {t('siteFooterLicence')}:
            </span>{' '}
            <em style={s.compliancePending}>
              ({t('legalFooterPending')})
            </em>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={s.bottom}>
          <span>{t('siteFooterCopyright')} {t('legalFooterRights')}</span>
          <span style={s.payments}>
            {t('siteFooterAccepts')}: {t('cashOnDelivery')}
            {/* Once Tap Payments is live: , Visa, Mastercard */}
          </span>
        </div>
      </div>
    </footer>
  )
}

// ──────────────── Inline styles (matches JASPR Market dark navbar palette) ────────────────

const s = {
  footer: {
    background: 'linear-gradient(135deg, #0f1923 0%, #1e3a5f 100%)',
    color: '#94a3b8',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: 14,
    lineHeight: 1.6,
    marginTop: 64, // pushes footer below page content
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '48px 32px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 40,
    marginBottom: 40,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  brand: {
    fontSize: 24,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 4,
  },
  brandAccent: {
    color: '#f97316',
  },
  brandTag: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#94a3b8',
    marginBottom: 12,
  },
  brandDesc: {
    fontSize: 13,
    color: '#94a3b8',
    margin: 0,
    maxWidth: 240,
  },
  colTitle: {
    color: '#f97316',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: 8,
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.15s',
  },
  smallText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 1.5,
  },

  // Compliance bar — the part Hukoomi inspectors will look for
  compliance: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px 32px',
    padding: '16px 0',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontSize: 13,
    marginBottom: 16,
  },
  complianceItem: {
    color: '#cbd5e1',
  },
  complianceLabel: {
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: '0.08em',
    fontWeight: 600,
  },
  complianceValue: {
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  compliancePending: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },

  // Bottom strip — copyright + payments accepted
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 12,
    color: '#64748b',
  },
  payments: {
    color: '#64748b',
  },
}

export default SiteFooter
