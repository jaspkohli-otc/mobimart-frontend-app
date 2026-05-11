// ────────────────────────────────────────────────────────────────────────
//  translations-home.js
//
//  Translation keys for the new landing-page Home component (v26 redesign).
//
//  HOW TO USE:
//  1. Save this file at src/translations-home.js
//  2. In src/translations.js, add to the imports block at the top:
//       import { homeEN, homeAR } from './translations-home'
//  3. Then spread inside the EN and AR blocks:
//       EN: { ...legalEN, ...siteFooterEN, ...homeEN, /* rest */ }
//       AR: { ...legalAR, ...siteFooterAR, ...homeAR, /* rest */ }
//
//  Arabic translations: marketing/UI strings translated to Modern Standard
//  Arabic. Legal terminology in policy pages still uses [AR] placeholders
//  pending professional translator review.
// ────────────────────────────────────────────────────────────────────────

const homeEN = {
  // Coming Soon banner
  homeBannerText: "MobiMart is in soft launch — full features rolling out soon. Welcome!",

  // Top utility strip
  homeUtilDelivery: "Same Day Delivery in Doha",
  homeUtilPayments: "100% Secure Payments",
  homeUtilReturns:  "7 Days Easy Returns",

  // Hero section
  homeHeroEyebrow: "Qatar's #1 Mobile Marketplace",
  homeHeroTitle:   "Qatar's Marketplace for Mobiles, Laptops & Tech Accessories",
  homeHeroSub:     "New and used phones, laptops, tablets, and accessories from verified sellers across Qatar — delivered fast, backed by real customer support.",

  // Trust pills inside hero
  homeTrustVerified: "Verified Sellers",
  homeTrustQuality:  "Quality Checked",
  homeTrustSecure:   "Secure Payments",
  homeTrustFast:     "Fast Delivery",

  // Hero CTAs
  homeShopNow:    "Shop Now",
  homeSellDevice: "Sell Your Device",

  // Feature cards (in hero, beside phone)
  homeFeatSameDayTitle: "Same Day Delivery",
  homeFeatSameDaySub:   "Doha & nearby areas",
  homeFeatCODTitle:     "Cash on Delivery",
  homeFeatCODSub:       "Available everywhere",
  homeFeatReturnTitle:  "7 Days Return",
  homeFeatReturnSub:    "Easy & hassle free",
  homeFeatSupportTitle: "Customer Support",
  homeFeatSupportSub:   "Sun–Thu, 9 AM – 10 PM",

  // Trust strip (5-column row below hero)
  homeTrustStripVerifiedTitle: "Verified Sellers",
  homeTrustStripVerifiedSub:   "Trusted & approved vendors",
  homeTrustStripQualityTitle:  "Quality Products",
  homeTrustStripQualitySub:    "Tested & quality checked",
  homeTrustStripSecureTitle:   "Secure Payments",
  homeTrustStripSecureSub:     "100% safe & secure",
  homeTrustStripReturnsTitle:  "Easy Returns",
  homeTrustStripReturnsSub:    "24h / 7-day return policy",
  homeTrustStripDeliveryTitle: "Fast Delivery",
  homeTrustStripDeliverySub:   "Same day in Doha",

  // Category section
  homeCategoryTitle:   "Shop by Category",
  homeViewAllCats:     "View all categories",
  homeCatMobiles:      "Mobile Phones",
  homeCatLaptops:      "Laptops",
  homeCatAccessories:  "Accessories",
  homeCatTablets:      "Tablets",
  homeCatWatches:      "Smart Watches",
  homeCatChargers:     "Chargers & Cables",
  homeCatCases:        "Cases & Covers",
  homeCatHeadphones:   "Headphones",
  homeCatProtectors:   "Screen Protectors",

  // Popular products teaser
  homePopularTitle:        "Popular Products",
  homeViewAllProducts:     "View all products",
  homePopularComingSoon:   "We're working with vendors across Qatar to bring you the best deals. Browse our growing catalogue now.",
  homeBrowseProducts:      "Browse All Products",
}

const homeAR = {
  // Coming Soon banner
  homeBannerText: "موبي مارت في الإطلاق التجريبي — المزايا الكاملة قريبًا. أهلًا بكم!",

  // Top utility strip
  homeUtilDelivery: "توصيل في نفس اليوم بالدوحة",
  homeUtilPayments: "مدفوعات آمنة 100%",
  homeUtilReturns:  "إرجاع سهل خلال 7 أيام",

  // Hero section
  homeHeroEyebrow: "السوق رقم 1 للجوالات في قطر",
  homeHeroTitle:   "سوق قطر للجوالات وأجهزة اللابتوب والإكسسوارات التقنية",
  homeHeroSub:     "هواتف وأجهزة لابتوب وأجهزة لوحية وإكسسوارات جديدة ومستعملة من بائعين موثوقين في جميع أنحاء قطر — توصيل سريع ودعم عملاء حقيقي.",

  // Trust pills inside hero
  homeTrustVerified: "بائعون موثوقون",
  homeTrustQuality:  "جودة مفحوصة",
  homeTrustSecure:   "مدفوعات آمنة",
  homeTrustFast:     "توصيل سريع",

  // Hero CTAs
  homeShopNow:    "تسوق الآن",
  homeSellDevice: "بِع جهازك",

  // Feature cards
  homeFeatSameDayTitle: "توصيل في نفس اليوم",
  homeFeatSameDaySub:   "الدوحة والمناطق المجاورة",
  homeFeatCODTitle:     "الدفع عند الاستلام",
  homeFeatCODSub:       "متاح في كل مكان",
  homeFeatReturnTitle:  "إرجاع خلال 7 أيام",
  homeFeatReturnSub:    "سهل وبدون متاعب",
  homeFeatSupportTitle: "دعم العملاء",
  homeFeatSupportSub:   "الأحد–الخميس، 9 صباحًا – 10 مساءً",

  // Trust strip
  homeTrustStripVerifiedTitle: "بائعون موثوقون",
  homeTrustStripVerifiedSub:   "بائعون معتمدون وموثوقون",
  homeTrustStripQualityTitle:  "منتجات عالية الجودة",
  homeTrustStripQualitySub:    "مفحوصة ومضمونة الجودة",
  homeTrustStripSecureTitle:   "مدفوعات آمنة",
  homeTrustStripSecureSub:     "آمنة 100% ومحمية",
  homeTrustStripReturnsTitle:  "إرجاع سهل",
  homeTrustStripReturnsSub:    "سياسة إرجاع خلال 24 ساعة / 7 أيام",
  homeTrustStripDeliveryTitle: "توصيل سريع",
  homeTrustStripDeliverySub:   "في نفس اليوم بالدوحة",

  // Category section
  homeCategoryTitle:   "تسوق حسب الفئة",
  homeViewAllCats:     "عرض جميع الفئات",
  homeCatMobiles:      "الهواتف المحمولة",
  homeCatLaptops:      "أجهزة اللابتوب",
  homeCatAccessories:  "الإكسسوارات",
  homeCatTablets:      "الأجهزة اللوحية",
  homeCatWatches:      "الساعات الذكية",
  homeCatChargers:     "الشواحن والكابلات",
  homeCatCases:        "الأغطية والحافظات",
  homeCatHeadphones:   "سماعات الرأس",
  homeCatProtectors:   "واقيات الشاشة",

  // Popular products teaser
  homePopularTitle:        "المنتجات الأكثر مبيعًا",
  homeViewAllProducts:     "عرض جميع المنتجات",
  homePopularComingSoon:   "نعمل مع بائعين في جميع أنحاء قطر لتقديم أفضل العروض. تصفح كتالوجنا المتنامي الآن.",
  homeBrowseProducts:      "تصفح جميع المنتجات",
}

export { homeEN, homeAR }
