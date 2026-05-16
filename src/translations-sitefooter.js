// ────────────────────────────────────────────────────────────────────────
//  translations-sitefooter.js
//
//  Translation keys for the SiteFooter component (shown on every page).
//
//  HOW TO USE:
//  Spread into translations.js:
//    import { siteFooterEN, siteFooterAR } from './translations-sitefooter'
//    EN: { ..., ...siteFooterEN }
//    AR: { ..., ...siteFooterAR }
//
//  Arabic translations: Modern Standard Arabic (MSA), RTL-safe.
//  Last updated: May 2026
// ────────────────────────────────────────────────────────────────────────

const siteFooterEN = {
  // ── Brand ────────────────────────────────────────────────────────────
  siteFooterTag:          'by JASPR Trading',
  siteFooterDesc:         "Qatar's #1 mobile marketplace. Verified vendors, secure delivery, real customer support.",

  // ── Column headings ──────────────────────────────────────────────────
  siteFooterShopTitle:    'Shop',
  siteFooterHelpTitle:    'Help & Legal',
  siteFooterContactTitle: 'Contact',
  siteFooterContactUs:    'Contact Us',

  // ── Contact block (hardcoded in JSX → now translatable) ──────────────
  siteFooterEmail:        'support@jasprmarket.com',
  siteFooterPhone:        '+974 6614 2417',
  siteFooterAddress:      'Building 220, Street 185, Zone 24\nDoha, State of Qatar',

  // ── Compliance bar ───────────────────────────────────────────────────
  siteFooterOperator:     'Operator',
  siteFooterOperatorName: 'JASPR Trading Contracting and Services',
  siteFooterCR:           'Commercial Registration',
  siteFooterCRNumber:     'CR-223480',
  siteFooterLicence:      'E-Commerce Licence',

  // ── Bottom strip ─────────────────────────────────────────────────────
  siteFooterAccepts:      'We accept',
  siteFooterCopyright:    '© 2026 JASPR Trading Contracting and Services.',
}

const siteFooterAR = {
  // ── Brand ────────────────────────────────────────────────────────────
  siteFooterTag:          'من جاسبر للتجارة',
  siteFooterDesc:         'سوق الجوالات رقم 1 في قطر. بائعون موثوقون، توصيل آمن، دعم عملاء حقيقي.',

  // ── Column headings ──────────────────────────────────────────────────
  siteFooterShopTitle:    'تسوق',
  siteFooterHelpTitle:    'المساعدة والقانونية',
  siteFooterContactTitle: 'تواصل',
  siteFooterContactUs:    'اتصل بنا',

  // ── Contact block ────────────────────────────────────────────────────
  siteFooterEmail:        'support@jasprmarket.com',
  siteFooterPhone:        '2417 6614 974+',
  siteFooterAddress:      'مبنى 220، شارع 185، منطقة 24\nالدوحة، دولة قطر',

  // ── Compliance bar ───────────────────────────────────────────────────
  siteFooterOperator:     'المشغل',
  siteFooterOperatorName: 'جاسبر للتجارة والمقاولات والخدمات',
  siteFooterCR:           'السجل التجاري',
  siteFooterCRNumber:     'CR-223480',
  siteFooterLicence:      'رخصة التجارة الإلكترونية',

  // ── Bottom strip ─────────────────────────────────────────────────────
  siteFooterAccepts:      'وسائل الدفع المقبولة',
  siteFooterCopyright:    '© 2026 جاسبر للتجارة والمقاولات والخدمات.',
}

export { siteFooterEN, siteFooterAR }
