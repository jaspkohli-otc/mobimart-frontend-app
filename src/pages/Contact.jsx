import React from 'react'
import PolicyFooter from '../components/PolicyFooter'

function Contact({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.doc}>
        <div style={s.meta}>{t('legalContactMetaCare')}</div>
        <h1 style={s.title}>{t('legalContactTitle')}</h1>
        <p style={s.lede}>{t('legalContactLede')}</p>

        <div style={s.cardGrid}>
          <div style={s.card}>
            <div style={s.cardLabel}>{t('legalContactCardEmail')}</div>
            <div style={s.cardValue}>
              <a href="mailto:support@jasprmarket.com" style={s.cardValueLink}>support@jasprmarket.com</a>
            </div>
            <div style={s.cardNote}>{t('legalContactCardEmailNote')}</div>
          </div>

          <div style={s.card}>
            <div style={s.cardLabel}>{t('legalContactCardPhone')}</div>
            <div style={s.cardValue}>
              <a href="tel:+97466142417" style={s.cardValueLink}>+974 6614 2417</a>
            </div>
            <div style={s.cardNote}>{t('legalContactCardPhoneNote')}</div>
          </div>

          <div style={s.card}>
            <div style={s.cardLabel}>{t('legalContactCardAddress')}</div>
            <div style={s.cardValue}>
              {t('legalContactCardAddressLine1')}<br />
              {t('legalContactCardAddressLine2')}
            </div>
            <div style={s.cardNote}>{t('legalContactCardAddressNote')}</div>
          </div>
        </div>

        <Section num="1" id="who-to-contact" title={t('legalContactWhoTitle')}>
          <P>{t('legalContactWhoIntro')}</P>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>{t('legalContactWhoColAbout')}</th>
                <th style={s.th}>{t('legalContactWhoColEmail')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={s.td}>{t('legalContactWhoOrders')}</td><td style={s.td}><a href="mailto:orders@jasprmarket.com" style={s.link}>orders@jasprmarket.com</a></td></tr>
              <tr><td style={s.td}>{t('legalContactWhoSupport')}</td><td style={s.td}><a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a></td></tr>
              <tr><td style={s.td}>{t('legalContactWhoSales')}</td><td style={s.td}><a href="mailto:sales@jasprmarket.com" style={s.link}>sales@jasprmarket.com</a></td></tr>
              <tr><td style={s.td}>{t('legalContactWhoInfo')}</td><td style={s.td}><a href="mailto:info@jasprmarket.com" style={s.link}>info@jasprmarket.com</a></td></tr>
              <tr><td style={s.td}>{t('legalContactWhoPrivacy')}</td><td style={s.td}><a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a></td></tr>
            </tbody>
          </table>
        </Section>

        <Section num="2" id="hours" title={t('legalContactHoursTitle')}>
          <P>{t('legalContactHoursIntro')}</P>
          <UL>
            <LI>{t('legalContactHours1')}</LI>
            <LI>{t('legalContactHours2')}</LI>
            <LI>{t('legalContactHours3')}</LI>
          </UL>
          <P>{t('legalContactHoursUrgent')}</P>
        </Section>

        <Section num="3" id="response-times" title={t('legalContactResponseTitle')}>
          <UL>
            <LI>{t('legalContactResponse1')}</LI>
            <LI>{t('legalContactResponse2')}</LI>
            <LI>{t('legalContactResponse3')}</LI>
            <LI>{t('legalContactResponse4')}</LI>
          </UL>
        </Section>

        <Section num="4" id="vendors" title={t('legalContactVendorsTitle')}>
          <P>{t('legalContactVendorsP1')}</P>
          <P>{t('legalContactVendorsP2')} <a href="mailto:sales@jasprmarket.com" style={s.link}>sales@jasprmarket.com</a> {t('legalContactVendorsP3')}</P>
          <UL>
            <LI>{t('legalContactVendors1')}</LI>
            <LI>{t('legalContactVendors2')}</LI>
            <LI>{t('legalContactVendors3')}</LI>
            <LI>{t('legalContactVendors4')}</LI>
          </UL>
          <P>{t('legalContactVendorsPricing')}</P>
        </Section>

        <Section num="5" id="complaints" title={t('legalContactComplaintsTitle')}>
          <P>{t('legalContactComplaintsP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a> {t('legalContactComplaintsP2')}</P>
          <P>{t('legalContactComplaintsP3')} <strong>16001</strong>{t('legalContactComplaintsP4')}</P>
        </Section>

        <Section num="6" id="company-details" title={t('legalContactCompanyTitle')}>
          <P>{t('legalContactCompanyP1')}</P>
          <UL>
            <LI><strong>JASPR Trading Contracting and Services</strong></LI>
            <LI>{t('legalContactCompanyCR')} <strong>CR-223480</strong></LI>
            <LI>{t('legalContactCompanyAddr')} Building 220, Street 185, Zone 24, Doha, State of Qatar</LI>
            <LI>{t('legalContactCompanyPhone')} +974 6614 2417</LI>
            <LI>{t('legalContactCompanyWeb')} <a href="https://www.jasprmarket.com" style={s.link}>https://www.jasprmarket.com</a></LI>
          </UL>
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
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, margin: '32px 0 48px' },
  card: { background: '#fafaf7', border: '1px solid #e5e7eb', padding: 24 },
  cardLabel: { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6b7280', marginBottom: 12, fontWeight: 600 },
  cardValue: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontSize: 18, fontWeight: 600, color: '#0f1923', lineHeight: 1.4 },
  cardValueLink: { color: '#0f1923', textDecoration: 'none' },
  cardNote: { fontFamily: '"Inter", system-ui, sans-serif', fontSize: 13, color: '#6b7280', marginTop: 8 },
  h2: { fontFamily: '"Inter Tight", system-ui, sans-serif', fontWeight: 600, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.015em', color: '#0f1923', marginTop: 56, marginBottom: 16, scrollMarginTop: 24 },
  h2Num: { color: '#f97316', fontWeight: 500, marginRight: 12 },
  p: { marginBottom: 16, color: '#0f1923' },
  ul: { marginLeft: 24, marginBottom: 16, paddingLeft: 0 },
  li: { marginBottom: 8 },
  link: { color: '#f97316', textDecoration: 'underline', textUnderlineOffset: 2 },
  table: { width: '100%', borderCollapse: 'collapse', margin: '24px 0', fontSize: 15, fontFamily: '"Inter", system-ui, sans-serif' },
  thead: { background: '#fafaf7' },
  th: { padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#1e3a5f', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' },
}

export default Contact
