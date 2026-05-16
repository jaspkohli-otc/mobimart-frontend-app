import React from 'react'

function Contact({ language = 'EN' }) {
  const isRTL = language === 'AR'
  const c = isRTL ? content.ar : content.en

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'} lang={isRTL ? 'ar' : 'en'}>
      <div style={{ ...s.doc, textAlign: isRTL ? 'right' : 'left' }}>
        <div style={s.meta}>{c.meta}</div>
        <h1 style={s.title}>{c.title}</h1>
        <p style={s.lede}>{c.lede}</p>

        <Section num="1" id="main-contact" title={c.mainTitle} isRTL={isRTL}>
          <UL isRTL={isRTL}>
            <LI>{c.email}: <a href="mailto:support@jasprmarket.com" style={s.link}>support@jasprmarket.com</a> — {c.reply}</LI>
            <LI>{c.phone}: <a href="tel:+97466142417" style={s.link}>+974 6614 2417</a> — {c.hours}</LI>
            <LI>{c.address}: {c.addressLine}</LI>
            <LI>{c.visits}</LI>
          </UL>
        </Section>

        <Section num="2" id="departments" title={c.departmentTitle} isRTL={isRTL}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={{ ...s.th, textAlign: isRTL ? 'right' : 'left' }}>{c.about}</th>
                <th style={{ ...s.th, textAlign: isRTL ? 'right' : 'left' }}>{c.email}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ ...s.td, textAlign: isRTL ? 'right' : 'left' }}>{row[0]}</td>
                  <td style={{ ...s.td, textAlign: isRTL ? 'right' : 'left' }}>
                    <a href={`mailto:${row[1]}`} style={s.link}>{row[1]}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section num="3" id="company" title={c.companyTitle} isRTL={isRTL}>
          <UL isRTL={isRTL}>
            <LI><strong>JASPR Trading Contracting and Services</strong></LI>
            <LI>{c.cr}: <strong>CR-223480</strong></LI>
            <LI>{c.website}: <a href="https://www.jasprmarket.com" style={s.link}>https://www.jasprmarket.com</a></LI>
          </UL>
        </Section>

        <Section num="4" id="complaints" title={c.complaintTitle} isRTL={isRTL}>
          <P>{c.complaintText}</P>
        </Section>

      </div>
    </div>
  )
}

const content = {
  en: {
    meta: 'Customer Care & Legal Contact',
    title: 'Contact Information',
    lede: 'Please use the correct contact channel so our team can respond to your request quickly.',
    mainTitle: 'Main contact details',
    email: 'Email',
    reply: 'Replies within 1 business day',
    phone: 'Phone',
    hours: 'Sun–Thu, 9 AM – 10 PM Qatar time',
    address: 'Address',
    addressLine: 'Building 220, Street 185, Zone 24, Doha, State of Qatar',
    visits: 'Visits by appointment only.',
    departmentTitle: 'Who to contact',
    about: 'Your question is about',
    rows: [
      ['Order status, delivery, payments', 'orders@jasprmarket.com'],
      ['Returns, refunds, complaints', 'support@jasprmarket.com'],
      ['Becoming a vendor / store registration', 'sales@jasprmarket.com'],
      ['General enquiries, partnership, press', 'info@jasprmarket.com'],
      ['Privacy, data requests, account deletion', 'support@jasprmarket.com']
    ],
    companyTitle: 'Company details',
    cr: 'Commercial Registration',
    website: 'Website',
    complaintTitle: 'Complaints and escalation',
    complaintText: 'Customers may submit complaints by emailing support@jasprmarket.com. Where required, customers may also contact the relevant Qatar consumer protection authority through official Qatar channels.'
  },
  ar: {
    meta: 'خدمة العملاء والتواصل القانوني',
    title: 'معلومات التواصل',
    lede: 'يرجى استخدام قناة التواصل المناسبة حتى يتمكن فريقنا من الرد على طلبك بسرعة وبشكل صحيح.',
    mainTitle: 'بيانات التواصل الرئيسية',
    email: 'البريد الإلكتروني',
    reply: 'يتم الرد خلال يوم عمل واحد',
    phone: 'الهاتف',
    hours: 'من الأحد إلى الخميس، من 9 صباحاً حتى 10 مساءً بتوقيت قطر',
    address: 'العنوان',
    addressLine: 'مبنى 220، شارع 185، منطقة 24، الدوحة، دولة قطر',
    visits: 'الزيارات حسب الموعد المسبق فقط.',
    departmentTitle: 'جهة التواصل المناسبة',
    about: 'موضوع الاستفسار',
    rows: [
      ['حالة الطلب، التوصيل، المدفوعات', 'orders@jasprmarket.com'],
      ['الإرجاع، الاسترداد، الشكاوى', 'support@jasprmarket.com'],
      ['التسجيل كبائع أو فتح متجر', 'sales@jasprmarket.com'],
      ['الاستفسارات العامة، الشراكات، الإعلام', 'info@jasprmarket.com'],
      ['الخصوصية، طلبات البيانات، حذف الحساب', 'support@jasprmarket.com']
    ],
    companyTitle: 'بيانات الشركة',
    cr: 'السجل التجاري',
    website: 'الموقع الإلكتروني',
    complaintTitle: 'الشكاوى والتصعيد',
    complaintText: 'يمكن للعملاء تقديم الشكاوى عبر support@jasprmarket.com. وعند الحاجة، يمكن للعملاء أيضاً التواصل مع جهة حماية المستهلك المختصة في دولة قطر من خلال القنوات الرسمية في قطر.'
  }
}

function Section({ num, id, title, children, isRTL }) {
  return <section><h2 id={id} style={s.h2}><span style={{ ...s.h2Num, marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>{num}.</span>{title}</h2>{children}</section>
}
const P = ({ children }) => <p style={s.p}>{children}</p>
const UL = ({ children, isRTL }) => <ul style={{ ...s.ul, marginLeft: isRTL ? 0 : 24, marginRight: isRTL ? 24 : 0 }}>{children}</ul>
const LI = ({ children }) => <li style={s.li}>{children}</li>

const s = {
  page: { background: '#fafaf7', minHeight: '100vh', fontFamily: '"Cairo", "Inter", system-ui, sans-serif', color: '#0f1923', fontSize: 17, lineHeight: 1.7 },
  doc: { maxWidth: 800, margin: '0 auto', padding: '64px 24px 96px', background: '#ffffff', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', minHeight: '100vh' },
  meta: { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: 16 },
  title: { fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: '#0f1923', marginBottom: 24 },
  lede: { fontSize: 19, color: '#1e3a5f', fontStyle: 'italic', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e5e7eb' },
  h2: { fontWeight: 600, fontSize: 26, lineHeight: 1.25, color: '#0f1923', marginTop: 48, marginBottom: 16 },
  h2Num: { color: '#f97316', fontWeight: 500 },
  p: { marginBottom: 16 },
  ul: { marginBottom: 16, paddingLeft: 0, paddingRight: 0 },
  li: { marginBottom: 8 },
  link: { color: '#f97316', textDecoration: 'underline', textUnderlineOffset: 2 },
  table: { width: '100%', borderCollapse: 'collapse', margin: '24px 0', fontSize: 15 },
  th: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#1e3a5f', background: '#fafaf7' },
  td: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' },
}

export default Contact
