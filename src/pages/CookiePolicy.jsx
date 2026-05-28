import React from 'react'

function CookiePolicy({ language = 'EN' }) {
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
    "meta": "Website & App Policy",
    "title": "Cookie Policy",
    "lede": "This Cookie Policy explains how JASPR Market uses cookies and similar technologies on its website and application.",
    "sections": [
      {
        "id": "what",
        "title": "What are cookies?",
        "paragraphs": [
          "Cookies are small text files placed on your device when you visit a website or use certain online services. They help the platform remember preferences, improve performance, and understand how users interact with the service."
        ]
      },
      {
        "id": "use",
        "title": "How we use cookies",
        "list": [
          "To keep users signed in where applicable",
          "To remember language and display preferences",
          "To improve website and application performance",
          "To measure traffic and understand usage patterns",
          "To support security, fraud prevention, and error detection",
          "To support marketing or analytics where permitted"
        ]
      },
      {
        "id": "third",
        "title": "Third-party cookies",
        "paragraphs": [
          "JASPR Market may use third-party tools such as analytics, advertising, payment, and security providers. These providers may place cookies or similar technologies according to their own policies."
        ]
      },
      {
        "id": "control",
        "title": "Consent and control",
        "list": [
          "Users may control cookies through browser settings.",
          "Blocking cookies may affect some website or app features.",
          "Users may contact support@jasprmarket.com for privacy-related questions."
        ]
      },
      {
        "id": "law",
        "title": "Qatar law and privacy",
        "paragraphs": [
          "This policy is intended to be read together with JASPR Market’s Privacy Policy and shall be interpreted in accordance with applicable laws and regulations in the State of Qatar."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة الموقع والتطبيق",
    "title": "سياسة ملفات تعريف الارتباط",
    "lede": "توضح هذه السياسة كيفية استخدام موبي مارت لملفات تعريف الارتباط والتقنيات المشابهة على الموقع الإلكتروني والتطبيق.",
    "sections": [
      {
        "id": "what",
        "title": "ما هي ملفات تعريف الارتباط؟",
        "paragraphs": [
          "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهاز المستخدم عند زيارة الموقع أو استخدام خدمات إلكترونية معينة. تساعد هذه الملفات في تذكر التفضيلات وتحسين الأداء وفهم كيفية استخدام المنصة."
        ]
      },
      {
        "id": "use",
        "title": "كيفية استخدام ملفات تعريف الارتباط",
        "list": [
          "الحفاظ على تسجيل دخول المستخدمين عند الحاجة",
          "تذكر اللغة وتفضيلات العرض",
          "تحسين أداء الموقع والتطبيق",
          "قياس الزيارات وفهم أنماط الاستخدام",
          "دعم الأمان ومنع الاحتيال واكتشاف الأخطاء",
          "دعم التحليلات أو التسويق حيثما يكون ذلك مسموحاً"
        ]
      },
      {
        "id": "third",
        "title": "ملفات تعريف الارتباط الخاصة بأطراف ثالثة",
        "paragraphs": [
          "قد تستخدم موبي مارت أدوات تابعة لأطراف ثالثة مثل مزودي التحليلات والإعلانات والدفع والأمان. وقد تستخدم هذه الأطراف ملفات تعريف ارتباط أو تقنيات مشابهة وفقاً لسياساتها الخاصة."
        ]
      },
      {
        "id": "control",
        "title": "الموافقة والتحكم",
        "list": [
          "يمكن للمستخدم التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح.",
          "قد يؤدي حظر ملفات تعريف الارتباط إلى عدم عمل بعض ميزات الموقع أو التطبيق بشكل صحيح.",
          "يمكن التواصل عبر support@jasprmarket.com للاستفسارات المتعلقة بالخصوصية."
        ]
      },
      {
        "id": "law",
        "title": "القانون القطري والخصوصية",
        "paragraphs": [
          "تُقرأ هذه السياسة مع سياسة الخصوصية الخاصة بموبي مارت، وتُفسر وفقاً للقوانين واللوائح المعمول بها في دولة قطر."
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

export default CookiePolicy
