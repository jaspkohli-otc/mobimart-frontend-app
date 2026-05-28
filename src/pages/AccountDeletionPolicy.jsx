import React from 'react'

function AccountDeletionPolicy({ language = 'EN' }) {
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
    "meta": "Privacy & Account Policy",
    "title": "Account Deletion Policy",
    "lede": "This policy explains how users may request deletion of their JASPR Market account and related personal data.",
    "sections": [
      {
        "id": "request",
        "title": "How to request account deletion",
        "paragraphs": [
          "Users may request deletion of their account through the account settings inside the application, where available, or by emailing support@jasprmarket.com from the email address linked to their account."
        ]
      },
      {
        "id": "verify",
        "title": "Verification",
        "paragraphs": [
          "For security reasons, JASPR Market may ask the user to verify their identity or account ownership before processing the deletion request."
        ]
      },
      {
        "id": "delete",
        "title": "What data may be deleted",
        "list": [
          "Profile details",
          "Saved addresses",
          "Communication preferences",
          "Non-essential personal information linked to the account"
        ]
      },
      {
        "id": "retain",
        "title": "Data we may need to retain",
        "paragraphs": [
          "Certain information may be retained where required for legal, accounting, fraud prevention, order history, dispute handling, tax, regulatory, or consumer protection purposes under applicable Qatar laws and business requirements."
        ]
      },
      {
        "id": "timeline",
        "title": "Processing timeline",
        "paragraphs": [
          "JASPR Market will review and process valid account deletion requests within a reasonable period after verification. Users will be notified once the request has been reviewed or completed."
        ]
      },
      {
        "id": "contact",
        "title": "Contact",
        "paragraphs": [
          "For account deletion and privacy requests, please email support@jasprmarket.com."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة الخصوصية والحساب",
    "title": "سياسة حذف الحساب",
    "lede": "توضح هذه السياسة كيفية طلب المستخدم حذف حسابه في موبي مارت والبيانات الشخصية المرتبطة به.",
    "sections": [
      {
        "id": "request",
        "title": "كيفية طلب حذف الحساب",
        "paragraphs": [
          "يمكن للمستخدم طلب حذف حسابه من خلال إعدادات الحساب داخل التطبيق عند توفرها، أو من خلال إرسال بريد إلكتروني إلى support@jasprmarket.com من البريد الإلكتروني المرتبط بالحساب."
        ]
      },
      {
        "id": "verify",
        "title": "التحقق من الهوية",
        "paragraphs": [
          "لأسباب أمنية، قد تطلب موبي مارت من المستخدم التحقق من هويته أو ملكية الحساب قبل معالجة طلب الحذف."
        ]
      },
      {
        "id": "delete",
        "title": "البيانات التي قد يتم حذفها",
        "list": [
          "بيانات الملف الشخصي",
          "العناوين المحفوظة",
          "تفضيلات التواصل",
          "المعلومات الشخصية غير الضرورية المرتبطة بالحساب"
        ]
      },
      {
        "id": "retain",
        "title": "البيانات التي قد نحتاج للاحتفاظ بها",
        "paragraphs": [
          "قد يتم الاحتفاظ ببعض المعلومات عند الحاجة لأغراض قانونية أو محاسبية أو منع الاحتيال أو سجل الطلبات أو معالجة النزاعات أو الضرائب أو الالتزامات التنظيمية أو حماية المستهلك وفقاً للقوانين والمتطلبات المعمول بها في دولة قطر."
        ]
      },
      {
        "id": "timeline",
        "title": "مدة المعالجة",
        "paragraphs": [
          "تقوم موبي مارت بمراجعة ومعالجة طلبات حذف الحساب الصحيحة خلال مدة معقولة بعد التحقق. سيتم إشعار المستخدم بعد مراجعة الطلب أو إكماله."
        ]
      },
      {
        "id": "contact",
        "title": "التواصل",
        "paragraphs": [
          "لطلبات حذف الحساب والخصوصية، يرجى التواصل عبر support@jasprmarket.com."
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

export default AccountDeletionPolicy
