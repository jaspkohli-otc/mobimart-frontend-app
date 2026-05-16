import React from 'react'

function RefundReturnPolicy({ language = 'EN' }) {
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
    "meta": "Customer Policy",
    "title": "Return & Refund Policy",
    "lede": "This policy explains when customers may request returns, refunds, replacements, or complaint review through MobiMart.",
    "sections": [
      {
        "id": "eligible",
        "title": "Eligible return cases",
        "list": [
          "Damaged product received",
          "Wrong item delivered",
          "Product materially different from the listing description",
          "Defective product",
          "Missing item or verified order issue"
        ]
      },
      {
        "id": "timeline",
        "title": "Return request timeline",
        "paragraphs": [
          "Customers should submit return or complaint requests within 3 days from delivery unless a different period is required by law, warranty terms, or vendor policy approved by MobiMart."
        ]
      },
      {
        "id": "nonreturn",
        "title": "Non-returnable items",
        "list": [
          "Opened hygiene or personal care products where return is not suitable",
          "Perishable items",
          "Customized or personalized items",
          "Digital products or services after access or delivery",
          "Clearance or final-sale items where clearly stated, except where required by law"
        ]
      },
      {
        "id": "process",
        "title": "Review process",
        "paragraphs": [
          "MobiMart may request photos, order details, product condition information, and vendor confirmation before approving a return, refund, replacement, or store credit."
        ]
      },
      {
        "id": "refund",
        "title": "Refund timing",
        "paragraphs": [
          "Approved refunds are normally processed through the original payment method within 7 to 14 business days, subject to bank, payment gateway, and provider processing times."
        ]
      },
      {
        "id": "vendor",
        "title": "Vendor responsibility",
        "paragraphs": [
          "Vendors are responsible for product quality, product authenticity, warranty obligations, and return handling in accordance with MobiMart policies and applicable Qatar consumer protection requirements."
        ]
      },
      {
        "id": "law",
        "title": "Qatar consumer protection",
        "paragraphs": [
          "This policy is intended to operate alongside applicable consumer protection laws and regulations in the State of Qatar. Nothing in this policy limits rights that cannot legally be limited."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة العملاء",
    "title": "سياسة الإرجاع والاسترداد",
    "lede": "توضح هذه السياسة الحالات التي يمكن للعملاء فيها طلب الإرجاع أو الاسترداد أو الاستبدال أو مراجعة الشكوى من خلال موبي مارت.",
    "sections": [
      {
        "id": "eligible",
        "title": "حالات الإرجاع المؤهلة",
        "list": [
          "استلام منتج تالف",
          "استلام منتج خاطئ",
          "اختلاف المنتج بشكل جوهري عن الوصف المعروض",
          "وجود عيب في المنتج",
          "نقص في الطلب أو وجود مشكلة مثبتة في الطلب"
        ]
      },
      {
        "id": "timeline",
        "title": "مدة تقديم طلب الإرجاع",
        "paragraphs": [
          "ينبغي على العميل تقديم طلب الإرجاع أو الشكوى خلال 3 أيام من تاريخ التوصيل، ما لم تكن هناك مدة مختلفة مطلوبة بموجب القانون أو شروط الضمان أو سياسة البائع المعتمدة من موبي مارت."
        ]
      },
      {
        "id": "nonreturn",
        "title": "المنتجات غير القابلة للإرجاع",
        "list": [
          "منتجات العناية الشخصية أو النظافة المفتوحة حيث لا يكون الإرجاع مناسباً",
          "المنتجات القابلة للتلف",
          "المنتجات المخصصة أو المصنوعة حسب الطلب",
          "المنتجات أو الخدمات الرقمية بعد الوصول إليها أو تسليمها",
          "منتجات التصفية أو البيع النهائي عند توضيح ذلك، إلا إذا تطلب القانون خلاف ذلك"
        ]
      },
      {
        "id": "process",
        "title": "آلية المراجعة",
        "paragraphs": [
          "قد تطلب موبي مارت صوراً وتفاصيل الطلب وحالة المنتج وتأكيد البائع قبل الموافقة على الإرجاع أو الاسترداد أو الاستبدال أو الرصيد داخل المتجر."
        ]
      },
      {
        "id": "refund",
        "title": "مدة الاسترداد",
        "paragraphs": [
          "تتم معالجة المبالغ المستردة المعتمدة عادةً من خلال وسيلة الدفع الأصلية خلال 7 إلى 14 يوم عمل، وذلك وفقاً لمدة معالجة البنك أو بوابة الدفع أو مزود الخدمة."
        ]
      },
      {
        "id": "vendor",
        "title": "مسؤولية البائع",
        "paragraphs": [
          "يتحمل البائع مسؤولية جودة المنتج وأصالته والتزامات الضمان ومعالجة الإرجاع وفقاً لسياسات موبي مارت ومتطلبات حماية المستهلك المعمول بها في دولة قطر."
        ]
      },
      {
        "id": "law",
        "title": "حماية المستهلك في قطر",
        "paragraphs": [
          "تهدف هذه السياسة إلى العمل جنباً إلى جنب مع قوانين ولوائح حماية المستهلك المعمول بها في دولة قطر. ولا تحد هذه السياسة من أي حقوق لا يجوز تقييدها قانوناً."
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

export default RefundReturnPolicy
