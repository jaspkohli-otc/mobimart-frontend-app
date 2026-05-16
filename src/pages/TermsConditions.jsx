import React from 'react'

function TermsConditions({ language = 'EN' }) {
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

        <PolicyFooter />
      </div>
    </div>
  )
}

const content = {
  "en": {
    "meta": "Legal Terms",
    "title": "Terms & Conditions",
    "lede": "These Terms & Conditions govern the use of the MobiMart marketplace website, application, and related services.",
    "sections": [
      {
        "id": "acceptance",
        "title": "Acceptance of terms",
        "paragraphs": [
          "By accessing or using MobiMart, users agree to comply with these Terms & Conditions and all applicable platform policies."
        ]
      },
      {
        "id": "role",
        "title": "Marketplace role",
        "paragraphs": [
          "MobiMart operates as an online marketplace connecting customers with independent vendors. Unless expressly stated, MobiMart is not the direct seller of products listed by vendors."
        ]
      },
      {
        "id": "accounts",
        "title": "User accounts",
        "list": [
          "Users must provide accurate information when creating or using an account.",
          "Users are responsible for maintaining the confidentiality of their login details.",
          "MobiMart may suspend accounts involved in fraud, misuse, abusive behaviour, or policy violations."
        ]
      },
      {
        "id": "orders",
        "title": "Orders and pricing",
        "paragraphs": [
          "Product availability, pricing, descriptions, and delivery timing may depend on vendor information. MobiMart may cancel or refuse orders where fraud, pricing error, restricted product issues, or policy violations are suspected."
        ]
      },
      {
        "id": "vendors",
        "title": "Vendor responsibility",
        "list": [
          "Vendors are responsible for product accuracy, quality, legality, pricing, warranty, delivery, and return obligations.",
          "Vendors must comply with Qatar laws, consumer protection requirements, and MobiMart policies.",
          "Vendors must not sell counterfeit, illegal, unsafe, or restricted products without proper authorization."
        ]
      },
      {
        "id": "liability",
        "title": "Limitation of liability",
        "paragraphs": [
          "To the maximum extent permitted by law, MobiMart shall not be liable for indirect losses, vendor misconduct, product defects caused by vendors, or delivery failures outside MobiMart’s reasonable control."
        ]
      },
      {
        "id": "law",
        "title": "Governing law and disputes",
        "paragraphs": [
          "These Terms & Conditions shall be governed by the laws of the State of Qatar. Any dispute shall be subject to the competent courts of Qatar, unless otherwise required by applicable law."
        ]
      }
    ]
  },
  "ar": {
    "meta": "شروط قانونية",
    "title": "الشروط والأحكام",
    "lede": "تنظم هذه الشروط والأحكام استخدام موقع وتطبيق وخدمات سوق موبي مارت الإلكتروني.",
    "sections": [
      {
        "id": "acceptance",
        "title": "قبول الشروط",
        "paragraphs": [
          "باستخدام موبي مارت أو الوصول إليه، يوافق المستخدم على الالتزام بهذه الشروط والأحكام وجميع سياسات المنصة المعمول بها."
        ]
      },
      {
        "id": "role",
        "title": "دور السوق الإلكتروني",
        "paragraphs": [
          "تعمل موبي مارت كسوق إلكتروني يربط العملاء بالبائعين المستقلين. ما لم يُذكر خلاف ذلك صراحة، فإن موبي مارت ليست البائع المباشر للمنتجات المعروضة من قبل البائعين."
        ]
      },
      {
        "id": "accounts",
        "title": "حسابات المستخدمين",
        "list": [
          "يجب على المستخدم تقديم معلومات صحيحة عند إنشاء الحساب أو استخدامه.",
          "يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات الدخول الخاصة به.",
          "يجوز لموبي مارت إيقاف الحسابات المرتبطة بالاحتيال أو سوء الاستخدام أو السلوك المسيء أو مخالفة السياسات."
        ]
      },
      {
        "id": "orders",
        "title": "الطلبات والأسعار",
        "paragraphs": [
          "قد يعتمد توفر المنتجات وأسعارها وأوصافها ومواعيد التوصيل على المعلومات المقدمة من البائعين. يجوز لموبي مارت إلغاء أو رفض الطلبات عند الاشتباه في الاحتيال أو خطأ السعر أو وجود منتجات مقيدة أو مخالفة للسياسات."
        ]
      },
      {
        "id": "vendors",
        "title": "مسؤولية البائع",
        "list": [
          "يتحمل البائع مسؤولية دقة المنتج وجودته وقانونيته وسعره وضمانه والتوصيل والإرجاع.",
          "يجب على البائع الامتثال لقوانين دولة قطر ومتطلبات حماية المستهلك وسياسات موبي مارت.",
          "يُمنع على البائع بيع منتجات مقلدة أو غير قانونية أو غير آمنة أو مقيدة دون التصاريح اللازمة."
        ]
      },
      {
        "id": "liability",
        "title": "حدود المسؤولية",
        "paragraphs": [
          "إلى الحد الذي يسمح به القانون، لا تتحمل موبي مارت المسؤولية عن الخسائر غير المباشرة أو تصرفات البائعين أو عيوب المنتجات الناتجة عن البائعين أو إخفاقات التوصيل الخارجة عن السيطرة المعقولة لموبي مارت."
        ]
      },
      {
        "id": "law",
        "title": "القانون المعمول به والنزاعات",
        "paragraphs": [
          "تخضع هذه الشروط والأحكام لقوانين دولة قطر، وتختص المحاكم القطرية المختصة بالنظر في أي نزاع، ما لم ينص القانون المعمول به على خلاف ذلك."
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

export default TermsConditions
