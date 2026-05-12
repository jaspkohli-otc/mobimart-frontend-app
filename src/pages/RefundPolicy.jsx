import React from 'react'
import PolicyFooter from '../components/PolicyFooter'

// Refund & Return Policy — JASPR Trading / MobiMart
function RefundPolicy({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'

  const sections = [
    { id: 'when-eligible',  key: 'legalRefundTocWhen' },
    { id: 'conditions',     key: 'legalRefundTocConditions' },
    { id: 'non-returnable', key: 'legalRefundTocNonReturn' },
    { id: 'how-to-return',  key: 'legalRefundTocHow' },
    { id: 'refund-method',  key: 'legalRefundTocMethod' },
    { id: 'shipping-cost',  key: 'legalRefundTocShipping' },
    { id: 'cancellations',  key: 'legalRefundTocCancel' },
    { id: 'cod-misuse',     key: 'legalRefundTocCOD' },
    { id: 'warranty',       key: 'legalRefundTocWarranty' },
    { id: 'disputes',       key: 'legalRefundTocDisputes' },
    { id: 'contact',        key: 'legalRefundTocContact' },
  ]

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.doc}>
        <div style={s.meta}>{t('legalEffective')} 9 May 2026 · {t('legalVersion')} 2.0</div>
        <h1 style={s.title}>{t('legalRefundTitle')}</h1>
        <p style={s.lede}>{t('legalRefundLede')}</p>

        <div style={s.infoBox}>
          <strong>{t('legalRefundQuickSummary')}</strong> {t('legalRefundQuickText')}
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

        <Section num="1" id="when-eligible" title={t('legalRefundWhenTitle')}>
          <P>{t('legalRefundWhenIntro')}</P>
          <H3>{t('legalRefundChangeMindTitle')}</H3>
          <P>{t('legalRefundChangeMindIntro')}</P>
          <UL>
            <LI>{t('legalRefundChangeMind1')}</LI>
            <LI>{t('legalRefundChangeMind2')}</LI>
            <LI>{t('legalRefundChangeMind3')}</LI>
          </UL>
          <H3>{t('legalRefundDefectiveTitle')}</H3>
          <P>{t('legalRefundDefectiveIntro')}</P>
          <UL>
            <LI>{t('legalRefundDefective1')}</LI>
            <LI>{t('legalRefundDefective2')}</LI>
            <LI>{t('legalRefundDefective3')}</LI>
          </UL>
          <P>{t('legalRefundDefectiveLaw')}</P>
        </Section>

        <Section num="2" id="conditions" title={t('legalRefundConditionsTitle')}>
          <P>{t('legalRefundConditionsIntro')}</P>
          <UL>
            <LI>{t('legalRefundConditions1')}</LI>
            <LI>{t('legalRefundConditions2')}</LI>
            <LI>{t('legalRefundConditions3')}</LI>
          </UL>
          <P>{t('legalRefundConditionsP1')}</P>
        </Section>

        <Section num="3" id="non-returnable" title={t('legalRefundNonReturnTitle')}>
          <P>{t('legalRefundNonReturnIntro')}</P>
          <UL>
            <LI>{t('legalRefundNonReturn1')}</LI>
            <LI>{t('legalRefundNonReturn2')}</LI>
            <LI>{t('legalRefundNonReturn3')}</LI>
            <LI>{t('legalRefundNonReturn4')}</LI>
            <LI>{t('legalRefundNonReturn5')}</LI>
          </UL>
        </Section>

        <Section num="4" id="how-to-return" title={t('legalRefundHowTitle')}>
          <ol style={s.ol}>
            <li style={s.li}>{t('legalRefundHow1Title')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a> {t('legalRefundHow1Body')}</li>
            <li style={s.li}>{t('legalRefundHow2')}</li>
            <li style={s.li}>{t('legalRefundHow3')}</li>
            <li style={s.li}>{t('legalRefundHow4')}</li>
            <li style={s.li}>{t('legalRefundHow5')}</li>
          </ol>
        </Section>

        <Section num="5" id="refund-method" title={t('legalRefundMethodTitle')}>
          <P>{t('legalRefundMethodIntro')}</P>
          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>{t('legalRefundMethodColPay')}</th>
                <th style={s.th}>{t('legalRefundMethodColMethod')}</th>
                <th style={s.th}>{t('legalRefundMethodColTime')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={s.td}>{t('legalRefundMethodCODPay')}</td>
                <td style={s.td}>{t('legalRefundMethodCODMethod')}</td>
                <td style={s.td}>{t('legalRefundMethodCODTime')}</td>
              </tr>
              <tr>
                <td style={s.td}>{t('legalRefundMethodCardPay')}</td>
                <td style={s.td}>{t('legalRefundMethodCardMethod')}</td>
                <td style={s.td}>{t('legalRefundMethodCardTime')}</td>
              </tr>
              <tr>
                <td style={s.td}>{t('legalRefundMethodChangeMindPay')}</td>
                <td style={s.td}>{t('legalRefundMethodChangeMindMethod')}</td>
                <td style={s.td}>{t('legalRefundMethodChangeMindTime')}</td>
              </tr>
            </tbody>
          </table>
          <P>{t('legalRefundMethodWindow')}</P>
        </Section>

        <Section num="6" id="shipping-cost" title={t('legalRefundShippingTitle')}>
          <UL>
            <LI>{t('legalRefundShipping1')}</LI>
            <LI>{t('legalRefundShipping2')}</LI>
          </UL>
          <P>{t('legalRefundShippingP1')}</P>
        </Section>

        <Section num="7" id="cancellations" title={t('legalRefundCancelTitle')}>
          <P>{t('legalRefundCancelP1')}</P>
          <P>{t('legalRefundCancelP2')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a>.</P>
          <P>{t('legalRefundCancelP3')}</P>
        </Section>

        <Section num="8" id="cod-misuse" title={t('legalRefundCODTitle')}>
          <P>{t('legalRefundCODP1')}</P>
        </Section>

        <Section num="9" id="warranty" title={t('legalRefundWarrantyTitle')}>
          <P>{t('legalRefundWarrantyP1')}</P>
          <P>{t('legalRefundWarrantyP2')}</P>
          <P>{t('legalRefundWarrantyP3')}</P>
        </Section>

        <Section num="10" id="disputes" title={t('legalRefundDisputesTitle')}>
          <P>{t('legalRefundDisputesP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a>. {t('legalRefundDisputesP2')}</P>
          <P>{t('legalRefundDisputesP3')} <strong>16001</strong>{t('legalRefundDisputesP4')}</P>
        </Section>

        <Section num="11" id="contact" title={t('legalRefundContactTitle')}>
          <P>
            {t('legalRefundContactP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a><br />
            {t('legalRefundContactP2')} <strong>+974 6614 2417</strong><br />
            {t('legalRefundContactP3')}
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
  page: {
    background: '#fafaf7',
    minHeight: '100vh',
    fontFamily: '"Source Serif 4", Georgia, "Times New Roman", serif',
    color: '#0f1923',
    fontSize: 17,
    lineHeight: 1.7
  },
  doc: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '64px 24px 96px',
    background: '#ffffff',
    borderLeft: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb',
    minHeight: '100vh'
  },
  meta: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#6b7280',
    marginBottom: 16
  },
  title: {
    fontFamily: '"Inter Tight", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 44,
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: '#0f1923',
    marginBottom: 24
  },
  lede: {
    fontSize: 19,
    color: '#1e3a5f',
    fontStyle: 'italic',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid #e5e7eb'
  },
  infoBox: {
    background: '#fff7ed',
    borderInlineStart: '3px solid #f97316',
    padding: '16px 20px',
    margin: '24px 0',
    fontSize: 15,
    fontFamily: '"Inter", system-ui, sans-serif'
  },
  toc: {
    background: '#fafaf7',
    border: '1px solid #e5e7eb',
    padding: '20px 24px',
    marginBottom: 48,
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: 14
  },
  tocLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 12,
    fontWeight: 600
  },
  tocList: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: 'none',
    columns: 2,
    columnGap: 32
  },
  tocItem: {
    marginBottom: 6,
    breakInside: 'avoid'
  },
  tocLink: {
    color: '#1e3a5f',
    textDecoration: 'none'
  },
  h2: {
    fontFamily: '"Inter Tight", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 26,
    lineHeight: 1.25,
    letterSpacing: '-0.015em',
    color: '#0f1923',
    marginTop: 56,
    marginBottom: 16,
    scrollMarginTop: 24
  },
  h2Num: {
    color: '#f97316',
    fontWeight: 500,
    marginInlineEnd: 12
  },
  h3: {
    fontFamily: '"Inter Tight", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 18,
    color: '#1e3a5f',
    marginTop: 32,
    marginBottom: 12
  },
  p: {
    marginBottom: 16,
    color: '#0f1923'
  },
  ul: {
    marginInlineStart: 24,
    marginBottom: 16,
    paddingInlineStart: 0
  },
  ol: {
    marginInlineStart: 24,
    marginBottom: 16,
    paddingInlineStart: 0
  },
  li: {
    marginBottom: 8
  },
  link: {
    color: '#f97316',
    textDecoration: 'underline',
    textUnderlineOffset: 2
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '24px 0',
    fontSize: 15,
    fontFamily: '"Inter", system-ui, sans-serif'
  },
  thead: {
    background: '#fafaf7'
  },
  th: {
    padding: '12px 16px',
    textAlign: 'start',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 600,
    color: '#1e3a5f',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  td: {
    padding: '12px 16px',
    textAlign: 'start',
    borderBottom: '1px solid #e5e7eb',
    verticalAlign: 'top'
  }
}

export default RefundPolicy
