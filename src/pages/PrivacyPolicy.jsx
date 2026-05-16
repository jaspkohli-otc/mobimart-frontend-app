import React from 'react'

function PrivacyPolicy({ language = 'EN' }) {
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
    "meta": "Legal Policy",
    "title": "Privacy Policy",
    "lede": "This Privacy Policy explains how MobiMart by JASPR Trading collects, uses, shares, and protects user and vendor information in Qatar.",
    "sections": [
      {
        "id": "intro",
        "title": "Introduction",
        "paragraphs": [
          "MobiMart is operated by JASPR Trading Contracting and Services in the State of Qatar. We respect the privacy of customers, vendors, and visitors using our website, mobile application, and related services."
        ]
      },
      {
        "id": "data",
        "title": "Information we collect",
        "list": [
          "Name, mobile number, email address, and delivery address",
          "Order details, payment status, and customer support records",
          "Device, browser, language, and usage information",
          "Vendor business information, including Commercial Registration details where applicable",
          "Information provided through forms, emails, calls, or account settings"
        ]
      },
      {
        "id": "use",
        "title": "How we use information",
        "list": [
          "To process orders, payments, deliveries, returns, and refunds",
          "To manage customer accounts and vendor accounts",
          "To provide customer support and respond to complaints",
          "To improve website, app, security, and marketplace performance",
          "To prevent fraud, misuse, counterfeit activity, and policy violations",
          "To comply with applicable legal, accounting, regulatory, and consumer protection requirements in Qatar"
        ]
      },
      {
        "id": "sharing",
        "title": "Sharing of information",
        "paragraphs": [
          "We may share necessary information with vendors, delivery partners, payment service providers, technical service providers, and authorities where required by law. We only share information needed to provide the service or meet legal obligations."
        ]
      },
      {
        "id": "payments",
        "title": "Payment security",
        "paragraphs": [
          "Payment information is processed through authorized payment service providers. MobiMart does not intend to store full card payment details on its own servers unless expressly stated and secured according to applicable standards."
        ]
      },
      {
        "id": "rights",
        "title": "User rights and requests",
        "paragraphs": [
          "Users may request access, correction, or deletion of certain personal data by contacting support@jasprmarket.com. Some information may be retained where required for legal, accounting, fraud prevention, dispute handling, or consumer protection purposes."
        ]
      },
      {
        "id": "law",
        "title": "Governing law",
        "paragraphs": [
          "This Privacy Policy shall be interpreted in accordance with the applicable laws and regulations of the State of Qatar."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة قانونية",
    "title": "سياسة الخصوصية",
    "lede": "توضح سياسة الخصوصية هذه كيفية قيام موبي مارت من جيسبر للتجارة بجمع واستخدام ومشاركة وحماية معلومات المستخدمين والبائعين في دولة قطر.",
    "sections": [
      {
        "id": "intro",
        "title": "مقدمة",
        "paragraphs": [
          "يتم تشغيل موبي مارت بواسطة شركة JASPR Trading Contracting and Services في دولة قطر. نحن نحترم خصوصية العملاء والبائعين والزوار الذين يستخدمون الموقع الإلكتروني والتطبيق والخدمات المرتبطة به."
        ]
      },
      {
        "id": "data",
        "title": "المعلومات التي نقوم بجمعها",
        "list": [
          "الاسم ورقم الهاتف والبريد الإلكتروني وعنوان التوصيل",
          "تفاصيل الطلبات وحالة الدفع وسجلات خدمة العملاء",
          "معلومات الجهاز والمتصفح واللغة وطريقة الاستخدام",
          "معلومات النشاط التجاري للبائع، بما في ذلك بيانات السجل التجاري حيثما ينطبق",
          "المعلومات المقدمة من خلال النماذج أو البريد الإلكتروني أو المكالمات أو إعدادات الحساب"
        ]
      },
      {
        "id": "use",
        "title": "كيفية استخدام المعلومات",
        "list": [
          "معالجة الطلبات والمدفوعات والتوصيل والإرجاع والاسترداد",
          "إدارة حسابات العملاء والبائعين",
          "تقديم خدمة العملاء والرد على الشكاوى",
          "تحسين أداء الموقع والتطبيق والأمان والسوق الإلكتروني",
          "منع الاحتيال وسوء الاستخدام والمنتجات المقلدة ومخالفات السياسات",
          "الامتثال للمتطلبات القانونية والمحاسبية والتنظيمية وحماية المستهلك المعمول بها في دولة قطر"
        ]
      },
      {
        "id": "sharing",
        "title": "مشاركة المعلومات",
        "paragraphs": [
          "قد نقوم بمشاركة المعلومات الضرورية مع البائعين وشركات التوصيل ومزودي خدمات الدفع ومزودي الخدمات التقنية والجهات المختصة عند الطلب القانوني. تتم مشاركة المعلومات بالقدر اللازم لتقديم الخدمة أو الوفاء بالالتزامات القانونية."
        ]
      },
      {
        "id": "payments",
        "title": "أمان المدفوعات",
        "paragraphs": [
          "تتم معالجة معلومات الدفع من خلال مزودي خدمات دفع معتمدين. لا تعتزم موبي مارت تخزين بيانات البطاقة الكاملة على خوادمها إلا إذا تم النص على ذلك صراحة وبما يتوافق مع معايير الأمان المعمول بها."
        ]
      },
      {
        "id": "rights",
        "title": "حقوق المستخدم وطلباته",
        "paragraphs": [
          "يمكن للمستخدم طلب الوصول إلى بعض بياناته الشخصية أو تصحيحها أو حذفها عبر التواصل مع support@jasprmarket.com. قد يتم الاحتفاظ ببعض المعلومات عند الحاجة لأغراض قانونية أو محاسبية أو منع الاحتيال أو معالجة النزاعات أو حماية المستهلك."
        ]
      },
      {
        "id": "law",
        "title": "القانون المعمول به",
        "paragraphs": [
          "تُفسر سياسة الخصوصية هذه وفقاً للقوانين واللوائح المعمول بها في دولة قطر."
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

export default PrivacyPolicy
