import React from 'react'
import { Link } from 'react-router-dom'
import PolicyFooter from '../components/PolicyFooter'

// Terms of Service — JASPR Trading / MobiMart
function Terms({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'
  const sections = [
    'About', 'Accounts', 'Buyers', 'Vendors', 'Listings', 'Orders',
    'Delivery', 'Returns', 'Prohibited', 'IP', 'Liability',
    'Termination', 'Law', 'Changes', 'Contact'
  ]

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.doc}>
        <div style={s.meta}>{t('legalEffective')} 9 May 2026 · {t('legalVersion')} 1.0</div>
        <h1 style={s.title}>{t('legalTermsTitle')}</h1>
        <p style={s.lede}>{t('legalTermsLede')}</p>

        <div style={s.toc}>
          <div style={s.tocLabel}>{t('legalContents')}</div>
          <ol style={s.tocList}>
            {sections.map((sec, i) => (
              <li key={sec} style={s.tocItem}>
                <a href={`#${sec.toLowerCase()}`} style={s.tocLink}>
                  {i + 1}. {t(`legalTermsToc${sec}`)}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <Section num="1" id="about" title={t('legalTermsAboutTitle')}>
          <P>{t('legalTermsAboutP1')}</P>
          <P>{t('legalTermsAboutP2')}</P>
        </Section>

        <Section num="2" id="accounts" title={t('legalTermsAccountsTitle')}>
          <P>{t('legalTermsAccountsP1')}</P>
          <H3>{t('legalTermsEligibilityTitle')}</H3>
          <UL>
            <LI>{t('legalTermsEligibility1')}</LI>
            <LI>{t('legalTermsEligibility2')}</LI>
            <LI>{t('legalTermsEligibility3')}</LI>
          </UL>
          <P>{t('legalTermsAccountsP2')}</P>
        </Section>

        <Section num="3" id="buyers" title={t('legalTermsBuyersTitle')}>
          <P>{t('legalTermsBuyersIntro')}</P>
          <UL>
            <LI>{t('legalTermsBuyers1')}</LI>
            <LI>{t('legalTermsBuyers2')}</LI>
            <LI>{t('legalTermsBuyers3')}</LI>
            <LI>{t('legalTermsBuyers4')}</LI>
          </UL>
        </Section>

        <Section num="4" id="vendors" title={t('legalTermsVendorsTitle')}>
          <P>{t('legalTermsVendorsIntro')}</P>
          <UL>
            <LI>{t('legalTermsVendors1')}</LI>
            <LI>{t('legalTermsVendors2')}</LI>
            <LI>{t('legalTermsVendors3')}</LI>
            <LI>{t('legalTermsVendors4')}</LI>
            <LI>{t('legalTermsVendors5')}</LI>
            <LI>{t('legalTermsVendors6')}</LI>
            <LI>{t('legalTermsVendors7')}</LI>
            <LI>{t('legalTermsVendors8')}</LI>
          </UL>
          <H3>{t('legalTermsVendorPricingTitle')}</H3>
          <P>{t('legalTermsVendorPricingP1')}</P>
        </Section>

        <Section num="5" id="listings" title={t('legalTermsListingsTitle')}>
          <P>{t('legalTermsListingsP1')}</P>
        </Section>

        <Section num="6" id="orders" title={t('legalTermsOrdersTitle')}>
          <P>{t('legalTermsOrdersP1')}</P>
          <P>{t('legalTermsOrdersP2')}</P>
          <UL>
            <LI>{t('legalTermsPayment1')}</LI>
            <LI>{t('legalTermsPayment2')}</LI>
          </UL>
          <P>{t('legalTermsOrdersP3')}</P>
        </Section>

        <Section num="7" id="delivery" title={t('legalTermsDeliveryTitle')}>
          <P>
            {t('legalTermsDeliveryP1')}{' '}
            <Link to="/shipping" style={s.link}>{t('legalTermsDeliveryShippingLink')}</Link>.
          </P>
          <P>{t('legalTermsDeliveryP2')}</P>
        </Section>

        <Section num="8" id="returns" title={t('legalTermsReturnsTitle')}>
          <P>{t('legalTermsReturnsIntro')}</P>
          <UL>
            <LI>{t('legalTermsReturns1')}</LI>
            <LI>{t('legalTermsReturns2')}</LI>
          </UL>
          <P>
            {t('legalTermsReturnsP1')}{' '}
            <Link to="/refund-policy" style={s.link}>{t('legalTermsReturnsRefundLink')}</Link>.
          </P>
        </Section>

        <Section num="9" id="prohibited" title={t('legalTermsProhibitedTitle')}>
          <P>{t('legalTermsProhibitedIntro')}</P>
          <UL>
            <LI>{t('legalTermsProhibited1')}</LI>
            <LI>{t('legalTermsProhibited2')}</LI>
            <LI>{t('legalTermsProhibited3')}</LI>
            <LI>{t('legalTermsProhibited4')}</LI>
            <LI>{t('legalTermsProhibited5')}</LI>
            <LI>{t('legalTermsProhibited6')}</LI>
            <LI>{t('legalTermsProhibited7')}</LI>
            <LI>{t('legalTermsProhibited8')}</LI>
          </UL>
        </Section>

        <Section num="10" id="ip" title={t('legalTermsIPTitle')}>
          <P>{t('legalTermsIPP1')}</P>
        </Section>

        <Section num="11" id="liability" title={t('legalTermsLiabilityTitle')}>
          <P>{t('legalTermsLiabilityP1')}</P>
          <P>{t('legalTermsLiabilityP2')}</P>
        </Section>

        <Section num="12" id="termination" title={t('legalTermsTerminationTitle')}>
          <P>{t('legalTermsTerminationP1')}</P>
        </Section>

        <Section num="13" id="law" title={t('legalTermsLawTitle')}>
          <P>{t('legalTermsLawP1')}</P>
        </Section>

        <Section num="14" id="changes" title={t('legalTermsChangesTitle')}>
          <P>{t('legalTermsChangesP1')}</P>
        </Section>

        <Section num="15" id="contact" title={t('legalTermsContactTitle')}>
          <P>
            {t('legalTermsContactP1')}{' '}
            <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a>{' '}
            {t('legalTermsContactP2')} <strong>+974 6614 2417</strong>.
            {' '}{t('legalTermsContactP3')}{' '}
            <Link to="/contact" style={s.link}>{t('legalTermsContactLink')}</Link>.
          </P>
        </Section>

        <PolicyFooter t={t} />
      </div>
    </div>
  )
}

function Section({ num, id, title, children }) {
  return (
    <section>
      <h2 id={id} style={s.h2}>
        <span style={s.h2Num}>{num}.</span>{title}
      </h2>
      {children}
    </section>
  )
}
const P  = ({ children }) => <p style={s.p}>{children}</p>
const H3 = ({ children }) => <h3 style={s.h3}>{children}</h3>
const UL = ({ children }) => <ul style={s.ul}>{children}</ul>
const LI = ({ children }) => <li style={s.li}>{children}</li>

const s = {
  page: { background: '#fafaf7', minHeight: '100vh', fontFamily: '"Source Serif 4", Georgia, "Times New Roman", serif', color: '#0f1923', fontSize: 17, lineHeight: 1.7 },
  doc: { maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px', background: '#ffffff', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', minHeight: '100vh' },
  meta: { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280', marginBottom: 16 },
  title: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#0f1923', marginBottom: 24 },
  lede: { fontSize: 19, color: '#1e3a5f', fontStyle: 'italic', marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid #e5e7eb' },
  toc: { background: '#fafaf7', border: '1px solid #e5e7eb', padding: '20px 24px', marginBottom: 48, fontFamily: '"Inter", system-ui, sans-serif', fontSize: 14 },
  tocLabel: { textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, color: '#6b7280', marginBottom: 12, fontWeight: 600 },
  tocList: { margin: 0, paddingLeft: 0, listStyle: 'none', columns: 2, columnGap: 32 },
  tocItem: { marginBottom: 6, breakInside: 'avoid' },
  tocLink: { color: '#1e3a5f', textDecoration: 'none' },
  h2: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 600, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.015em', color: '#0f1923', marginTop: 56, marginBottom: 16, scrollMarginTop: 24 },
  h2Num: { color: '#f97316', fontWeight: 500, marginRight: 12 },
  h3: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 600, fontSize: 18, color: '#1e3a5f', marginTop: 32, marginBottom: 12 },
  p: { marginBottom: 16, color: '#0f1923' },
  ul: { marginLeft: 24, marginBottom: 16, paddingLeft: 0 },
  li: { marginBottom: 8 },
  link: { color: '#f97316', textDecoration: 'underline', textUnderlineOffset: 2 },
}

export default Terms
