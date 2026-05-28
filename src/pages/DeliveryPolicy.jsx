import React from 'react'

function DeliveryPolicy({ language = 'EN' }) {
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
    "title": "Delivery Policy",
    "lede": "This policy explains JASPR Market delivery coverage, delivery charges, vendor obligations, and failed delivery handling.",
    "sections": [
      {
        "id": "coverage",
        "title": "Delivery coverage",
        "paragraphs": [
          "JASPR Market currently supports same-day delivery within Doha, subject to vendor readiness, product availability, operational cut-off times, courier capacity, and customer location."
        ]
      },
      {
        "id": "charges",
        "title": "Delivery charges",
        "list": [
          "Orders above QAR 1000 may qualify for free delivery.",
          "Orders below QAR 1000 may be charged QAR 15 delivery fee.",
          "Delivery fees may vary for special products, remote locations, heavy items, or promotions where clearly stated."
        ]
      },
      {
        "id": "vendor",
        "title": "Vendor delivery responsibility",
        "paragraphs": [
          "Unless otherwise agreed in writing, vendors are responsible for packing, preparing, dispatching, and shipping orders safely and on time."
        ]
      },
      {
        "id": "failed",
        "title": "Failed delivery",
        "paragraphs": [
          "If delivery fails due to incorrect address, unavailable customer, unreachable phone number, refusal to accept the order, or repeated rescheduling, additional charges or cancellation may apply."
        ]
      },
      {
        "id": "delays",
        "title": "Delivery delays",
        "paragraphs": [
          "JASPR Market is not responsible for delays caused by weather, traffic, government restrictions, vendor delay, payment verification, force majeure, or circumstances outside reasonable control."
        ]
      },
      {
        "id": "inspection",
        "title": "Delivery inspection",
        "paragraphs": [
          "Customers should check the received package and report any visible damage, wrong item, or missing item as soon as reasonably possible."
        ]
      }
    ]
  },
  "ar": {
    "meta": "سياسة العملاء",
    "title": "سياسة التوصيل",
    "lede": "توضح هذه السياسة نطاق التوصيل في موبي مارت ورسوم التوصيل والتزامات البائع وآلية التعامل مع التوصيل غير الناجح.",
    "sections": [
      {
        "id": "coverage",
        "title": "نطاق التوصيل",
        "paragraphs": [
          "تدعم موبي مارت حالياً التوصيل في نفس اليوم داخل الدوحة، وذلك حسب جاهزية البائع وتوفر المنتج وأوقات قطع الطلبات التشغيلية وقدرة شركة التوصيل وموقع العميل."
        ]
      },
      {
        "id": "charges",
        "title": "رسوم التوصيل",
        "list": [
          "قد تكون الطلبات التي تزيد قيمتها عن 1000 ريال قطري مؤهلة للتوصيل المجاني.",
          "قد تخضع الطلبات الأقل من 1000 ريال قطري لرسوم توصيل بقيمة 15 ريال قطري.",
          "قد تختلف رسوم التوصيل للمنتجات الخاصة أو المناطق البعيدة أو المنتجات الثقيلة أو العروض الترويجية عند توضيح ذلك."
        ]
      },
      {
        "id": "vendor",
        "title": "مسؤولية البائع عن التوصيل",
        "paragraphs": [
          "ما لم يتم الاتفاق كتابياً على خلاف ذلك، يتحمل البائع مسؤولية تغليف الطلبات وتجهيزها وإرسالها وشحنها بأمان وفي الوقت المحدد."
        ]
      },
      {
        "id": "failed",
        "title": "التوصيل غير الناجح",
        "paragraphs": [
          "إذا تعذر التوصيل بسبب عنوان غير صحيح أو عدم توفر العميل أو عدم الرد على الهاتف أو رفض استلام الطلب أو تكرار إعادة الجدولة، فقد يتم تطبيق رسوم إضافية أو إلغاء الطلب."
        ]
      },
      {
        "id": "delays",
        "title": "تأخير التوصيل",
        "paragraphs": [
          "لا تتحمل موبي مارت مسؤولية التأخير الناتج عن الطقس أو الازدحام المروري أو القيود الحكومية أو تأخير البائع أو التحقق من الدفع أو القوة القاهرة أو الظروف الخارجة عن السيطرة المعقولة."
        ]
      },
      {
        "id": "inspection",
        "title": "فحص الطلب عند الاستلام",
        "paragraphs": [
          "ينبغي على العميل فحص الشحنة عند الاستلام والإبلاغ عن أي تلف ظاهر أو منتج خاطئ أو نقص في الطلب في أقرب وقت ممكن."
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

export default DeliveryPolicy
