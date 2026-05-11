import React from 'react'
import { Link } from 'react-router-dom'
import PolicyFooter from '../components/PolicyFooter'

function Shipping({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'

  const sections = [
    { id: 'coverage',       key: 'legalShippingTocCoverage' },
    { id: 'timing',         key: 'legalShippingTocTiming' },
    { id: 'cost',           key: 'legalShippingTocCost' },
    { id: 'processing',     key: 'legalShippingTocProcessing' },
    { id: 'tracking',       key: 'legalShippingTocTracking' },
    { id: 'receiving',      key: 'legalShippingTocReceiving' },
    { id: 'failed',         key: 'legalShippingTocFailed' },
    { id: 'address-changes',key: 'legalShippingTocAddress' },
    { id: 'contact',        key: 'legalShippingTocContact' },
  ]

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.doc}>
        <div style={s.meta}>{t('legalEffective')} 9 May 2026 · {t('legalVersion')} 1.0</div>
        <h1 style={s.title}>{t('legalShippingTitle')}</h1>
        <p style={s.lede}>{t('legalShippingLede')}</p>

        <div style={s.infoBox}>
          <strong>{t('legalShippingGlance')}</strong> {t('legalShippingGlanceText')}
        </div>

        <div style={s.toc}>
          <div style={s.tocLabel}>{t('legalContents')}</div>
          <ol style={s.tocList}>
            {sections.map((sec, i) => (
              <li key={sec.id} style={s.tocItem}>
                <a href={`#${sec.id}`} style={s.tocLink}>{i + 1}. {t(sec.key)}</a>
              </li>
            ))}
          </ol>
        </div>

        <Section num="1" id="coverage" title={t('legalShippingCoverageTitle')}>
          <P>{t('legalShippingCoverageIntro')}</P>
          <UL>
            <LI>{t('legalShippingCoverage1')}</LI>
            <LI>{t('legalShippingCoverage2')}</LI>
            <LI>{t('legalShippingCoverage3')}</LI>
            <LI>{t('legalShippingCoverage4')}</LI>
          </UL>
          <P>{t('legalShippingCoverageRemote')}</P>
          <P>{t('legalShippingCoverageNoIntl')}</P>
        </Section>

        <Section num="2" id="timing" title={t('legalShippingTimingTitle')}>
          <P>{t('legalShippingTimingIntro')}</P>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>{t('legalShippingTimingColPlaced')}</th>
                <th style={s.th}>{t('legalShippingTimingColExpected')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={s.td}>{t('legalShippingTimingSunWedPlaced')}</td><td style={s.td}>{t('legalShippingTimingSunWedExpected')}</td></tr>
              <tr><td style={s.td}>{t('legalShippingTimingThuPlaced')}</td><td style={s.td}>{t('legalShippingTimingThuExpected')}</td></tr>
              <tr><td style={s.td}>{t('legalShippingTimingFriSatPlaced')}</td><td style={s.td}>{t('legalShippingTimingFriSatExpected')}</td></tr>
            </tbody>
          </table>
          <P>{t('legalShippingTimingBusiness')}</P>
          <P>{t('legalShippingTimingPeak')}</P>
        </Section>

        <Section num="3" id="cost" title={t('legalShippingCostTitle')}>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>{t('legalShippingCostColValue')}</th>
                <th style={s.th}>{t('legalShippingCostColCost')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={s.td}>{t('legalShippingCostAbove')}</td><td style={s.td}><strong>{t('legalShippingCostAboveValue')}</strong></td></tr>
              <tr><td style={s.td}>{t('legalShippingCostBelow')}</td><td style={s.td}><strong>{t('legalShippingCostBelowValue')}</strong></td></tr>
            </tbody>
          </table>
          <P>{t('legalShippingCostP1')}</P>
        </Section>

        <Section num="4" id="processing" title={t('legalShippingProcessingTitle')}>
          <P>{t('legalShippingProcessingIntro')}</P>
          <ol style={s.ol}>
            <li style={s.li}>{t('legalShippingProcessing1')}</li>
            <li style={s.li}>{t('legalShippingProcessing2')}</li>
            <li style={s.li}>{t('legalShippingProcessing3')}</li>
            <li style={s.li}>{t('legalShippingProcessing4')}</li>
            <li style={s.li}>{t('legalShippingProcessing5')}</li>
          </ol>
        </Section>

        <Section num="5" id="tracking" title={t('legalShippingTrackingTitle')}>
          <P>{t('legalShippingTrackingP1')}</P>
          <UL>
            <LI>{t('legalShippingTracking1')}</LI>
            <LI>{t('legalShippingTracking2')}</LI>
            <LI>{t('legalShippingTracking3')}</LI>
            <LI>{t('legalShippingTracking4')}</LI>
          </UL>
        </Section>

        <Section num="6" id="receiving" title={t('legalShippingReceivingTitle')}>
          <P>{t('legalShippingReceivingIntro')}</P>
          <UL>
            <LI>{t('legalShippingReceiving1')}</LI>
            <LI>{t('legalShippingReceiving2')}</LI>
            <LI>{t('legalShippingReceiving3')}</LI>
          </UL>
          <P>
            {t('legalShippingReceivingIssue')}{' '}
            <Link to="/refund-policy" style={s.link}>{t('legalShippingReceivingRefund')}</Link>
            {t('legalShippingReceivingIssue2')}
          </P>
        </Section>

        <Section num="7" id="failed" title={t('legalShippingFailedTitle')}>
          <P>{t('legalShippingFailedIntro')}</P>
          <UL>
            <LI>{t('legalShippingFailed1')}</LI>
            <LI>{t('legalShippingFailed2')}</LI>
            <LI>{t('legalShippingFailed3')}</LI>
          </UL>
          <P>{t('legalShippingFailedP1')}</P>
        </Section>

        <Section num="8" id="address-changes" title={t('legalShippingAddressTitle')}>
          <P>{t('legalShippingAddressP1')}</P>
        </Section>

        <Section num="9" id="contact" title={t('legalShippingContactTitle')}>
          <P>
            {t('legalShippingContactP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a><br />
            {t('legalShippingContactP2')} <strong>+974 6614 2417</strong><br />
            {t('legalShippingContactP3')}
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
      <h2 id={id} style={s.h2}><span style={s.h2Num}>{num}.</span>{title}</h2>
      {children}
    </section>
  )
}
const P  = ({ children }) => <p style={s.p}>{children}</p>
const UL = ({ children }) => <ul style={s.ul}>{children}</ul>
const LI = ({ children }) => <li style={s.li}>{children}</li>

const s = {
  page: { background: '#fafaf7', minHeight: '100vh', fontFamily: '"Source Serif 4", Georgia, "Times New Roman", serif', color: '#0f1923', fontSize: 17, lineHeight: 1.7 },
  doc: { maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px', background: '#ffffff', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', minHeight: '100vh' },
  meta: { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#6b7280', marginBottom: 16 },
  title: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#0f1923', marginBottom: 24 },
  lede: { fontSize: 19, color: '#1e3a5f', fontStyle: 'italic', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e5e7eb' },
  infoBox: { background: '#fff7ed', borderLeft: '3px solid #f97316', padding: '16px 20px', margin: '24px 0', fontSize: 15, fontFamily: '"Inter", system-ui, sans-serif' },
  toc: { background: '#fafaf7', border: '1px solid #e5e7eb', padding: '20px 24px', marginBottom: 48, fontFamily: '"Inter", system-ui, sans-serif', fontSize: 14 },
  tocLabel: { textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, color: '#6b7280', marginBottom: 12, fontWeight: 600 },
  tocList: { margin: 0, paddingLeft: 0, listStyle: 'none', columns: 2, columnGap: 32 },
  tocItem: { marginBottom: 6, breakInside: 'avoid' },
  tocLink: { color: '#1e3a5f', textDecoration: 'none' },
  h2: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 600, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.015em', color: '#0f1923', marginTop: 56, marginBottom: 16, scrollMarginTop: 24 },
  h2Num: { color: '#f97316', fontWeight: 500, marginRight: 12 },
  p: { marginBottom: 16, color: '#0f1923' },
  ul: { marginLeft: 24, marginBottom: 16, paddingLeft: 0 },
  ol: { marginLeft: 24, marginBottom: 16, paddingLeft: 0 },
  li: { marginBottom: 8 },
  link: { color: '#f97316', textDecoration: 'underline', textUnderlineOffset: 2 },
  table: { width: '100%', borderCollapse: 'collapse', margin: '24px 0', fontSize: 15, fontFamily: '"Inter", system-ui, sans-serif' },
  thead: { background: '#fafaf7' },
  th: { padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#1e3a5f', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' },
}

export default Shipping
