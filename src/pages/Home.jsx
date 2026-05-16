import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ────────────────────────────────────────────────────────────────────────
//  Home — MobiMart landing page (v26 redesign, May 2026)
//
//  Soft-launch homepage for jasprmarket.com.
//  - Top: dismissible "Coming Soon" banner
//  - Hero: dark gradient with headline + CTAs + feature stack
//  - Trust strip: 5 promises
//  - Category grid: 8 categories with Lucide-style SVG icons
//  - Receives `t` and `language` props from App.js (matches existing pattern)
//  - RTL-aware via dir attribute on root
//
//  Image swap-out points are marked with REPLACE_WITH_PHOTO comments.
// ────────────────────────────────────────────────────────────────────────

function Home({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'
  const [showBanner, setShowBanner] = useState(false)

  // Persist banner dismissal across sessions
  useEffect(() => {
    const dismissed = localStorage.getItem('mm_comingsoon_dismissed')
    if (dismissed === 'v1') setShowBanner(false)
  }, [])

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem('mm_comingsoon_dismissed', 'v1')
  }



  // Categories — Lucide-style SVG icons inline (no external dep)
  const categories = [
    { id: 'mobile-phones',   label: t('homeCatMobiles'),    icon: IconPhone,     to: '/products?category=Mobile Phones' },
    { id: 'laptops',         label: t('homeCatLaptops'),    icon: IconLaptop,    to: '/products?category=Laptops' },
    { id: 'accessories',     label: t('homeCatAccessories'),icon: IconEarbuds,   to: '/products?category=Accessories' },
    { id: 'tablets',         label: t('homeCatTablets'),    icon: IconTablet,    to: '/products?category=Tablets' },
    { id: 'smart-watches',   label: t('homeCatWatches'),    icon: IconWatch,     to: '/products?category=Smart Watches' },
    { id: 'chargers',        label: t('homeCatChargers'),   icon: IconCharger,   to: '/products?category=Chargers' },
    { id: 'cases',           label: t('homeCatCases'),      icon: IconCase,      to: '/products?category=Cases' },
    { id: 'headphones',      label: t('homeCatHeadphones'), icon: IconHeadphones,to: '/products?category=Headphones' },
  ]

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Coming Soon banner */}
      {showBanner && (
        <div style={s.banner}>
          <div style={s.bannerInner}>
            <span style={s.bannerEmoji}>🚀</span>
            <span style={s.bannerText}>{t('homeBannerText')}</span>
            <button onClick={dismissBanner} style={s.bannerClose} aria-label="Dismiss">×</button>
          </div>
        </div>
      )}

      {/* Utility strip — trust signals */}
      <div style={s.utilStrip}>
        <div style={s.utilInner}>
          <div style={s.utilLeft}>
            <span style={s.utilItem}>🚚 {t('homeUtilDelivery')}</span>
            <span style={s.utilDot}>·</span>
            <span style={s.utilItem}>🔒 {t('homeUtilPayments')}</span>
            <span style={s.utilDot}>·</span>
            <span style={s.utilItem}>↩ {t('homeUtilReturns')}</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <section style={s.hero}>
        {/* Atmospheric background — Doha skyline silhouette */}
        <div style={s.heroBg}>
          <SkylineSVG />
        </div>

        <div style={s.heroInner}>
          {/* Left — copy and CTAs */}
          <div style={s.heroLeft}>
            <div style={s.heroEyebrow}>{t('homeHeroEyebrow')}</div>
            <h1 style={s.heroTitle}>{t('homeHeroTitle')}</h1>
            <p style={s.heroSub}>{t('homeHeroSub')}</p>

            {/* Inline trust pills */}
            <div style={s.heroPills}>
              <Pill label={t('homeTrustVerified')} />
              <Pill label={t('homeTrustQuality')} />
              <Pill label={t('homeTrustSecure')} />
              <Pill label={t('homeTrustFast')} />
            </div>

            {/* CTAs */}
            <div style={s.heroCTAs}>
              <Link to="/products" style={s.ctaPrimary}>
                {t('homeShopNow')}
                <span style={s.ctaArrow}>→</span>
              </Link>
              <Link to="/register" style={s.ctaSecondary}>
                {t('homeSellDevice')}
              </Link>
            </div>
          </div>

          {/* Right — product showcase + feature cards */}
          <div style={s.heroRight}>
            {/* Phone graphic (replace with real product photo when available) */}
            <div style={s.phoneShowcase}>
              {/* REPLACE_WITH_PHOTO: drop a 600x600 product image here */}
              <PhoneSVG />
            </div>

            {/* Feature cards stacked */}
            <div style={s.featureStack}>
              <FeatureCard icon="🚚" title={t('homeFeatSameDayTitle')} sub={t('homeFeatSameDaySub')} />
              <FeatureCard icon="💵" title={t('homeFeatCODTitle')}     sub={t('homeFeatCODSub')} />
              <FeatureCard icon="↩"  title={t('homeFeatReturnTitle')}  sub={t('homeFeatReturnSub')} />
              <FeatureCard icon="🕐" title={t('homeFeatSupportTitle')} sub={t('homeFeatSupportSub')} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — 5 promises in a single row */}
      <section style={s.trustStrip}>
        <div style={s.trustInner}>
          <TrustItem icon={IconUser}     title={t('homeTrustStripVerifiedTitle')}    sub={t('homeTrustStripVerifiedSub')} />
          <TrustItem icon={IconCheck}    title={t('homeTrustStripQualityTitle')}     sub={t('homeTrustStripQualitySub')} />
          <TrustItem icon={IconLock}     title={t('homeTrustStripSecureTitle')}      sub={t('homeTrustStripSecureSub')} />
          <TrustItem icon={IconReturn}   title={t('homeTrustStripReturnsTitle')}     sub={t('homeTrustStripReturnsSub')} />
          <TrustItem icon={IconTruck}    title={t('homeTrustStripDeliveryTitle')}    sub={t('homeTrustStripDeliverySub')} />
        </div>
      </section>

      {/* Shop by Category */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>{t('homeCategoryTitle')}</h2>
          <Link to="/products" style={s.sectionLink}>
            {t('homeViewAllCats')} <span>→</span>
          </Link>
        </div>
        <div style={s.catGrid}>
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <Link to={cat.to} key={cat.id} style={s.catCard}>
                <div style={s.catIconWrap}>
                  <Icon />
                </div>
                <div style={s.catLabel}>{cat.label}</div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Popular Products teaser → links into Products page */}
      <section style={{...s.section, paddingBottom: 80}}>
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>{t('homePopularTitle')}</h2>
          <Link to="/products" style={s.sectionLink}>
            {t('homeViewAllProducts')} <span>→</span>
          </Link>
        </div>
        <div style={s.popularTeaser}>
          <div style={s.popularInner}>
            <p style={s.popularText}>{t('homePopularComingSoon')}</p>
            <Link to="/products" style={s.ctaPrimary}>
              {t('homeBrowseProducts')}
              <span style={s.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────
//  Small building-block components
// ────────────────────────────────────────────────────────────────────────

const Pill = ({ label }) => (
  <span style={s.pill}>
    <span style={s.pillDot}>●</span> {label}
  </span>
)

const FeatureCard = ({ icon, title, sub }) => (
  <div style={s.featCard}>
    <div style={s.featIcon}>{icon}</div>
    <div>
      <div style={s.featTitle}>{title}</div>
      <div style={s.featSub}>{sub}</div>
    </div>
  </div>
)

const TrustItem = ({ icon: Icon, title, sub }) => (
  <div style={s.trustItem}>
    <div style={s.trustIcon}><Icon /></div>
    <div>
      <div style={s.trustTitle}>{title}</div>
      <div style={s.trustSub}>{sub}</div>
    </div>
  </div>
)

// ────────────────────────────────────────────────────────────────────────
//  Inline SVG icons — Lucide-inspired, single-color, scale via parent
// ────────────────────────────────────────────────────────────────────────

const svgProps = {
  width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
}

const IconPhone = () => (
  <svg {...svgProps}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
)
const IconLaptop = () => (
  <svg {...svgProps}><rect x="2" y="4" width="20" height="13" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
)
const IconEarbuds = () => (
  <svg {...svgProps}><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M2 15v-2a10 10 0 0 1 20 0v2"/></svg>
)
const IconTablet = () => (
  <svg {...svgProps}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
)
const IconWatch = () => (
  <svg {...svgProps}><circle cx="12" cy="12" r="6"/><path d="M12 10v2l1 1"/><path d="M16.5 4.5 18 3"/><path d="M7.5 4.5 6 3"/><path d="M16.5 19.5 18 21"/><path d="M7.5 19.5 6 21"/></svg>
)
const IconCharger = () => (
  <svg {...svgProps}><path d="M11 9 7.5 12.5 11 16"/><path d="m13 8 3.5 3.5L13 15"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
)
const IconCase = () => (
  <svg {...svgProps}><rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="6" r="0.5"/></svg>
)
const IconHeadphones = () => (
  <svg {...svgProps}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
)

const IconUser = () => (
  <svg {...svgProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const IconCheck = () => (
  <svg {...svgProps}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
)
const IconLock = () => (
  <svg {...svgProps}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)
const IconReturn = () => (
  <svg {...svgProps}><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>
)
const IconTruck = () => (
  <svg {...svgProps}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
)

// Hero phone showcase — graphic stand-in until real photo
const PhoneSVG = () => (
  <svg width="280" height="380" viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#2563eb" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Orange glow behind phone */}
    <circle cx="140" cy="200" r="160" fill="url(#glow)" />
    {/* Phone shadow */}
    <ellipse cx="140" cy="365" rx="80" ry="6" fill="#000" opacity="0.4" />
    {/* Phone body */}
    <rect x="70" y="40" width="140" height="300" rx="22" fill="url(#phoneBody)" stroke="#374151" strokeWidth="1" />
    {/* Screen */}
    <rect x="80" y="58" width="120" height="264" rx="14" fill="url(#phoneScreen)" />
    {/* Camera notch */}
    <rect x="125" y="50" width="30" height="6" rx="3" fill="#0f172a" />
    {/* Screen highlight */}
    <rect x="84" y="62" width="40" height="100" rx="10" fill="#ffffff" opacity="0.12" />
    {/* MobiMart watermark on screen */}
    <text x="140" y="200" textAnchor="middle" fontFamily="Inter Tight, system-ui" fontSize="16" fontWeight="700" fill="#fff" opacity="0.9">Mobi<tspan fill="#f97316">Mart</tspan></text>
  </svg>
)

// Doha skyline silhouette behind hero (atmospheric)
const SkylineSVG = () => (
  <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden="true">
    <defs>
      <linearGradient id="skyFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M0,240 L0,180 L60,180 L60,160 L100,160 L100,140 L130,140 L130,150 L170,150 L170,120 L200,120 L200,100 L230,100 L230,130 L280,130 L280,90 L310,90 L310,70 L340,70 L340,110 L380,110 L380,140 L420,140 L420,80 L460,80 L460,60 L490,60 L490,130 L530,130 L530,100 L570,100 L570,150 L610,150 L610,90 L650,90 L650,70 L680,70 L680,120 L720,120 L720,80 L750,80 L750,40 L780,40 L780,90 L820,90 L820,140 L860,140 L860,110 L890,110 L890,80 L930,80 L930,60 L960,60 L960,130 L1000,130 L1000,100 L1040,100 L1040,150 L1080,150 L1080,90 L1120,90 L1120,70 L1160,70 L1160,130 L1200,130 L1200,160 L1240,160 L1240,120 L1280,120 L1280,150 L1320,150 L1320,180 L1380,180 L1380,160 L1440,160 L1440,240 Z"
      fill="#1e293b"
      opacity="0.5"
    />
    <rect x="0" y="0" width="1440" height="240" fill="url(#skyFade)" />
  </svg>
)

// ────────────────────────────────────────────────────────────────────────
//  Styles
// ────────────────────────────────────────────────────────────────────────

const s = {
  page: {
    background: '#ffffff',
    color: '#0f1923',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
  },

  // Banner
  banner: {
    background: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 500,
    padding: '10px 0',
  },
  bannerInner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    position: 'relative',
  },
  bannerEmoji: { fontSize: 18 },
  bannerText: { letterSpacing: '0.01em' },
  bannerClose: {
    position: 'absolute',
    right: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.15)',
    color: '#ffffff',
    border: 'none',
    width: 26,
    height: 26,
    borderRadius: '50%',
    fontSize: 20,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
  },

  // Utility strip (the very thin dark bar with trust signals)
  utilStrip: {
    background: '#0f1923',
    color: '#cbd5e1',
    fontSize: 13,
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  utilInner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  utilLeft: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  utilItem: { color: '#cbd5e1' },
  utilDot: { color: '#475569' },

  // Hero
  hero: {
    background: 'linear-gradient(135deg, #0f1923 0%, #1e3a5f 50%, #0f172a 100%)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    padding: '64px 0 80px',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0.5,
  },
  heroInner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    position: 'relative',
    zIndex: 1,
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroEyebrow: {
    color: '#f97316',
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: '"Inter Tight", system-ui, sans-serif',
    fontSize: 56,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    margin: '0 0 20px',
    color: '#ffffff',
  },
  heroSub: {
    fontSize: 17,
    lineHeight: 1.6,
    color: '#cbd5e1',
    maxWidth: 480,
    margin: '0 0 28px',
  },
  heroPills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 36,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 999,
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: 500,
  },
  pillDot: { color: '#f97316', fontSize: 10 },
  heroCTAs: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: '#f97316',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 15,
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
  },
  ctaArrow: { fontSize: 18, fontWeight: 400 },
  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: 'transparent',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 15,
    border: '1px solid rgba(255,255,255,0.25)',
  },

  heroRight: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 24,
    alignItems: 'center',
  },
  phoneShowcase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  featCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(15,23,42,0.6)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '12px 16px',
    borderRadius: 12,
    minWidth: 220,
  },
  featIcon: {
    fontSize: 22,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(249,115,22,0.15)',
    borderRadius: 10,
  },
  featTitle: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.3,
  },
  featSub: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },

  // Trust strip — bridges hero to content
  trustStrip: {
    background: '#ffffff',
    marginTop: -32,
    position: 'relative',
    zIndex: 2,
  },
  trustInner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '24px 32px',
    background: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.05)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 24,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  trustIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: '#fff7ed',
    color: '#f97316',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  trustTitle: {
    fontWeight: 600,
    fontSize: 14,
    color: '#0f1923',
    lineHeight: 1.3,
  },
  trustSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },

  // Section wrapper
  section: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '64px 24px 0',
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 12,
  },
  sectionTitle: {
    fontFamily: '"Inter Tight", system-ui, sans-serif',
    fontSize: 28,
    fontWeight: 700,
    color: '#0f1923',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  sectionLink: {
    color: '#f97316',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },

  // Category grid
  catGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 16,
  },
  catCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    textDecoration: 'none',
    color: '#0f1923',
    transition: 'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
    minHeight: 130,
  },
  catIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    color: '#0f1923',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
    color: '#0f1923',
  },

  // Popular products teaser
  popularTeaser: {
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    border: '1px solid #fed7aa',
    borderRadius: 16,
    padding: '40px 24px',
    textAlign: 'center',
  },
  popularInner: {
    maxWidth: 480,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  popularText: {
    color: '#9a3412',
    fontSize: 15,
    margin: 0,
    lineHeight: 1.5,
  },
}

export default Home
