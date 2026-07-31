import React from 'react'

// Privacy Policy — JASPR Trading / MobiMart
function Privacy({ t = (k) => k, language = 'EN' }) {
  const isRTL = language === 'AR'

  const sections = [
    { id: 'who-we-are',      key: 'legalPrivacyTocWho' },
    { id: 'what-we-collect', key: 'legalPrivacyTocCollect' },
    { id: 'how-we-use',      key: 'legalPrivacyTocUse' },
    { id: 'legal-basis',     key: 'legalPrivacyTocBasis' },
    { id: 'sharing',         key: 'legalPrivacyTocSharing' },
    { id: 'international',   key: 'legalPrivacyTocIntl' },
    { id: 'retention',       key: 'legalPrivacyTocRetention' },
    { id: 'your-rights',     key: 'legalPrivacyTocRights' },
    { id: 'cookies',         key: 'legalPrivacyTocCookies' },
    { id: 'security',        key: 'legalPrivacyTocSecurity' },
    { id: 'children',        key: 'legalPrivacyTocChildren' },
    { id: 'changes',         key: 'legalPrivacyTocChanges' },
    { id: 'contact',         key: 'legalPrivacyTocContact' },
  ]

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={s.doc}>
        <div style={s.meta}>{t('legalEffective')} 9 May 2026 · {t('legalVersion')} 2.0</div>
        <h1 style={s.title}>{t('legalPrivacyTitle')}</h1>
        <p style={s.lede}>{t('legalPrivacyLede')}</p>

        <div style={s.noticeBox}>
          <strong>{t('legalPrivacyNoticeTitle')}</strong> {t('legalPrivacyNoticeText')}
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

        <Section num="1" id="who-we-are" title={t('legalPrivacyWhoTitle')}>
          <P>{t('legalPrivacyWhoP1')}</P>
          <P>{t('legalPrivacyWhoP2')}</P>
        </Section>

        <Section num="2" id="what-we-collect" title={t('legalPrivacyCollectTitle')}>
          <P>{t('legalPrivacyCollectIntro')}</P>

          <H3>{t('legalPrivacyCollectGiveTitle')}</H3>
          <UL>
            <LI>{t('legalPrivacyCollectGive1')}</LI>
            <LI>{t('legalPrivacyCollectGive2')}</LI>
            <LI>{t('legalPrivacyCollectGive3')}</LI>
            <LI>{t('legalPrivacyCollectGive4')}</LI>
            <LI>{t('legalPrivacyCollectGive5')}</LI>
          </UL>

          <H3>{t('legalPrivacyCollectTransTitle')}</H3>
          <UL>
            <LI>{t('legalPrivacyCollectTrans1')}</LI>
            <LI>{t('legalPrivacyCollectTrans2')}</LI>
            <LI>{t('legalPrivacyCollectTrans3')}</LI>
          </UL>

          <H3>{t('legalPrivacyCollectAutoTitle')}</H3>
          <UL>
            <LI>{t('legalPrivacyCollectAuto1')}</LI>
            <LI>{t('legalPrivacyCollectAuto2')}</LI>
            <LI>{t('legalPrivacyCollectAuto3')}</LI>
          </UL>
        </Section>

        <Section num="3" id="how-we-use" title={t('legalPrivacyUseTitle')}>
          <P>{t('legalPrivacyUseIntro')}</P>
          <UL>
            <LI>{t('legalPrivacyUse1')}</LI>
            <LI>{t('legalPrivacyUse2')}</LI>
            <LI>{t('legalPrivacyUse3')}</LI>
            <LI>{t('legalPrivacyUse4')}</LI>
            <LI>{t('legalPrivacyUse5')}</LI>
            <LI>{t('legalPrivacyUse6')}</LI>
            <LI>{t('legalPrivacyUse7')}</LI>
            <LI>{t('legalPrivacyUse8')}</LI>
            <LI>{t('legalPrivacyUse9')}</LI>
          </UL>
        </Section>

        <Section num="4" id="legal-basis" title={t('legalPrivacyBasisTitle')}>
          <P>{t('legalPrivacyBasisIntro')}</P>
          <UL>
            <LI>{t('legalPrivacyBasis1')}</LI>
            <LI>{t('legalPrivacyBasis2')}</LI>
            <LI>{t('legalPrivacyBasis3')}</LI>
            <LI>{t('legalPrivacyBasis4')}</LI>
          </UL>
        </Section>

        <Section num="5" id="sharing" title={t('legalPrivacySharingTitle')}>
          <P>{t('legalPrivacySharingIntro')}</P>

          <table style={s.table}>
            <thead>
              <tr style={s.thead}>
                <th style={s.th}>{t('legalPrivacySharingColRecipient')}</th>
                <th style={s.th}>{t('legalPrivacySharingColShare')}</th>
                <th style={s.th}>{t('legalPrivacySharingColWhy')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={s.td}><strong>{t('legalPrivacySharingVendorsName')}</strong></td>
                <td style={s.td}>{t('legalPrivacySharingVendorsShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingVendorsWhy')}</td>
              </tr>
              <tr>
                <td style={s.td}><strong>Cloudinary</strong></td>
                <td style={s.td}>{t('legalPrivacySharingCloudinaryShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingCloudinaryWhy')}</td>
              </tr>
              <tr>
                <td style={s.td}><strong>Resend</strong></td>
                <td style={s.td}>{t('legalPrivacySharingResendShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingResendWhy')}</td>
              </tr>
              <tr>
                <td style={s.td}><strong>Tap Payments</strong></td>
                <td style={s.td}>{t('legalPrivacySharingTapShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingTapWhy')}</td>
              </tr>
              <tr>
                <td style={s.td}><strong>{t('legalPrivacySharingCouriersName')}</strong></td>
                <td style={s.td}>{t('legalPrivacySharingCouriersShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingCouriersWhy')}</td>
              </tr>
              <tr>
                <td style={s.td}><strong>{t('legalPrivacySharingGovName')}</strong></td>
                <td style={s.td}>{t('legalPrivacySharingGovShare')}</td>
                <td style={s.td}>{t('legalPrivacySharingGovWhy')}</td>
              </tr>
            </tbody>
          </table>

          <P>{t('legalPrivacySharingNoSell')}</P>
        </Section>

        <Section num="6" id="international" title={t('legalPrivacyIntlTitle')}>
          <P>{t('legalPrivacyIntlP1')}</P>
        </Section>

        <Section num="7" id="retention" title={t('legalPrivacyRetentionTitle')}>
          <P>{t('legalPrivacyRetentionIntro')}</P>
          <UL>
            <LI>{t('legalPrivacyRetention1')}</LI>
            <LI>{t('legalPrivacyRetention2')}</LI>
            <LI>{t('legalPrivacyRetention3')}</LI>
            <LI>{t('legalPrivacyRetention4')}</LI>
            <LI>{t('legalPrivacyRetention5')}</LI>
          </UL>
        </Section>

        <Section num="8" id="your-rights" title={t('legalPrivacyRightsTitle')}>
          <P>{t('legalPrivacyRightsIntro')}</P>
          <UL>
            <LI>{t('legalPrivacyRights1')}</LI>
            <LI>{t('legalPrivacyRights2')}</LI>
            <LI>{t('legalPrivacyRights3')}</LI>
            <LI>{t('legalPrivacyRights4')}</LI>
            <LI>{t('legalPrivacyRights5')}</LI>
            <LI>{t('legalPrivacyRights6')}</LI>
          </UL>
          <P>
            {t('legalPrivacyRightsContact')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a>. {t('legalPrivacyRightsResponse')}
          </P>
        </Section>

        <Section num="9" id="cookies" title={t('legalPrivacyCookiesTitle')}>
          <P>{t('legalPrivacyCookiesIntro')}</P>
          <UL>
            <LI>{t('legalPrivacyCookies1')}</LI>
            <LI>{t('legalPrivacyCookies2')}</LI>
          </UL>
          <P>{t('legalPrivacyCookiesFuture')}</P>
        </Section>

        <Section num="10" id="security" title={t('legalPrivacySecurityTitle')}>
          <P>{t('legalPrivacySecurityIntro')}</P>
          <UL>
            <LI>{t('legalPrivacySecurity1')}</LI>
            <LI>{t('legalPrivacySecurity2')}</LI>
            <LI>{t('legalPrivacySecurity3')}</LI>
            <LI>{t('legalPrivacySecurity4')}</LI>
            <LI>{t('legalPrivacySecurity5')}</LI>
          </UL>
          <P>{t('legalPrivacySecurityBreach')}</P>
        </Section>

        <Section num="11" id="children" title={t('legalPrivacyChildrenTitle')}>
          <P>
            {t('legalPrivacyChildrenP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a> {t('legalPrivacyChildrenP2')}
          </P>
        </Section>

        <Section num="12" id="changes" title={t('legalPrivacyChangesTitle')}>
          <P>{t('legalPrivacyChangesP1')}</P>
        </Section>

        <Section num="13" id="contact" title={t('legalPrivacyContactTitle')}>
          <P>
            {t('legalPrivacyContactP1')} <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a><br />
            {t('legalPrivacyContactP2')} <strong>+974 6614 2417</strong> ({t('legalFooterHours')})<br />
            {t('legalPrivacyContactP3')} JASPR Trading Contracting and Services, Building 43, Street 310, Zone 27, Doha, State of Qatar
          </P>
        </Section>

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
    marginBottom: 48,
    paddingBottom: 32,
    borderBottom: '1px solid #e5e7eb'
  },
  noticeBox: {
    background: '#eff6ff',
    borderInlineStart: '3px solid #2563eb',
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

export default Privacy
