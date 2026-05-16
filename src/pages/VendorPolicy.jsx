import React from 'react'

function VendorPolicy({ language = 'EN' }) {
  const isRTL = language === 'AR'
  const c = isRTL ? content.ar : content.en

  return (
    <div style={s.page} dir={isRTL ? 'rtl' : 'ltr'} lang={isRTL ? 'ar' : 'en'}>
      <div style={{ ...s.doc, textAlign: isRTL ? 'right' : 'left' }}>
        <div style={s.meta}>{c.meta}</div>
        <h1 style={s.title}>{c.title}</h1>
        <p style={s.lede}>{c.lede}</p>

        {c.sections.map((section, index) => (
          <Section key={section.id} num={index + 1} id={section.id} title={section.title} isRTL={isRTL}>
            {section.paragraphs?.map((p, i) => <P key={`p-${i}`}>{p}</P>)}
            {section.list && (
              <UL isRTL={isRTL}>
                {section.list.map((item, i) => <LI key={i}>{item}</LI>)}
              </UL>
            )}
          </Section>
        ))}

      </div>
    </div>
  )
}

const content = {
  "en": {
    "meta": "Marketplace Policy",
    "title": "Vendor / Seller Policy",
    "lede": "This policy explains the obligations of vendors selling products on MobiMart.",
    "sections": [
      {
        "id": "eligibility",
        "title": "Vendor eligibility",
        "list": [
          "Valid Qatar Commercial Registration where applicable",
          "Trade licence or business approval where required",
          "Accurate contact details",
          "Product category and brand information",
          "Delivery and return process details"
        ]
      },
      {
        "id": "fees",
        "title": "Vendor fees",
        "paragraphs": [
          "Vendor onboarding, subscription, renewal, advertising, commission, and promotional fees may apply as communicated by MobiMart. Fees must be paid on time to maintain active vendor access."
        ]
      },
      {
        "id": "listing",
        "title": "Product listing responsibilities",
        "list": [
          "Vendors must provide accurate product titles, descriptions, prices, images, warranty information, and availability.",
          "Vendors must not upload misleading, copied, offensive, illegal, or counterfeit content.",
          "Vendors are responsible for stock accuracy and order fulfilment."
        ]
      },
      {
        "id": "prohibited",
        "title": "Prohibited products",
        "list": [
          "Counterfeit or fake products",
          "Illegal or restricted products",
          "Products violating intellectual property rights",
          "Hazardous products without proper approval",
          "Any product requiring authorization unless such authorization is provided"
        ]
      },
      {
        "id": "delivery",
        "title": "Delivery and fulfilment",
        "paragraphs": [
          "Unless otherwise agreed in writing, vendors are responsible for packaging, dispatching, shipping, and timely delivery of their orders."
        ]
      },
      {
        "id": "returns",
        "title": "Returns, refunds, and complaints",
        "paragraphs": [
          "Vendors are responsible for handling product quality issues, wrong items, defective products, warranty claims, and return approvals in accordance with MobiMart policies and applicable Qatar consumer protection requirements."
        ]
      },
      {
        "id": "law",
        "title": "Governing law",
        "paragraphs": [
          "This policy is governed by the laws and regulations of the State of Qatar. Any dispute shall be subject to the competent courts of Qatar."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة السوق الإلكتروني",
    "title": "سياسة البائعين",
    "lede": "توضح هذه السياسة التزامات البائعين الذين يعرضون منتجاتهم للبيع عبر منصة موبي مارت.",
    "sections": [
      {
        "id": "eligibility",
        "title": "أهلية البائع",
        "list": [
          "سجل تجاري قطري ساري حيثما ينطبق",
          "رخصة تجارية أو موافقة نشاط عند الحاجة",
          "بيانات تواصل صحيحة",
          "معلومات فئة المنتجات والعلامات التجارية",
          "تفاصيل آلية التوصيل والإرجاع"
        ]
      },
      {
        "id": "fees",
        "title": "رسوم البائع",
        "paragraphs": [
          "قد يتم تطبيق رسوم تسجيل أو اشتراك أو تجديد أو إعلانات أو عمولات أو رسوم ترويجية وفقاً لما تعلنه موبي مارت. يجب سداد الرسوم في موعدها للحفاظ على تفعيل حساب البائع."
        ]
      },
      {
        "id": "listing",
        "title": "مسؤوليات عرض المنتجات",
        "list": [
          "يجب على البائع تقديم عناوين وأوصاف وأسعار وصور ومعلومات ضمان وتوفر منتجات صحيحة.",
          "يُمنع تحميل محتوى مضلل أو منسوخ أو مسيء أو غير قانوني أو متعلق بمنتجات مقلدة.",
          "يتحمل البائع مسؤولية دقة المخزون وتنفيذ الطلبات."
        ]
      },
      {
        "id": "prohibited",
        "title": "المنتجات المحظورة",
        "list": [
          "المنتجات المقلدة أو غير الأصلية",
          "المنتجات غير القانونية أو المقيدة",
          "المنتجات التي تنتهك حقوق الملكية الفكرية",
          "المنتجات الخطرة دون موافقة مناسبة",
          "أي منتج يتطلب تصريحاً خاصاً ما لم يتم تقديم التصريح المطلوب"
        ]
      },
      {
        "id": "delivery",
        "title": "التوصيل وتنفيذ الطلبات",
        "paragraphs": [
          "ما لم يتم الاتفاق كتابياً على خلاف ذلك، يتحمل البائع مسؤولية التغليف والتجهيز والشحن والتوصيل في الوقت المحدد."
        ]
      },
      {
        "id": "returns",
        "title": "الإرجاع والاسترداد والشكاوى",
        "paragraphs": [
          "يتحمل البائع مسؤولية معالجة مشاكل جودة المنتجات والمنتجات الخاطئة والعيوب ومطالبات الضمان والموافقة على الإرجاع وفقاً لسياسات موبي مارت ومتطلبات حماية المستهلك المعمول بها في دولة قطر."
        ]
      },
      {
        "id": "law",
        "title": "القانون المعمول به",
        "paragraphs": [
          "تخضع هذه السياسة لقوانين ولوائح دولة قطر، وتختص المحاكم القطرية المختصة بالنظر في أي نزاع."
        ]
      }
    ]
  }
}

function Section({ num, id, title, children, isRTL }) {
  return (
    <section>
      <h2 id={id} style={s.h2}>
        <span style={{ ...s.h2Num, marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>{num}.</span>{title}
      </h2>
      {children}
    </section>
  )
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

export default VendorPolicy
