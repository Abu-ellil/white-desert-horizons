import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Official tour programs — every itinerary line is taken verbatim from the
 * operator's (Mohamed Aboshanab) program notes. No stops added.
 * Open questions from the source are surfaced as editorial notes instead of
 * invented content.
 */

type ItineraryDay = { label: string; ar: string[]; en: string[] };

export type TourProgram = {
  slug: string;
  number: string;
  titleAr: string;
  titleEn: string;
  subtitle: string;
  duration: string;
  startLabel: string;
  startValue: string;
  tourTypeLabel: string;
  tourTypeValue: string;
  stayLabel: string;
  stayValue: string;
  introAr: string;
  introEn: string;
  days: ItineraryDay[];
  includes?: { ar: string; en: string }[];
  excludes?: { ar: string; en: string }[];
  variants?: { id: string; labelAr: string; labelEn: string; days: ItineraryDay[] }[];
  note?: { titleAr: string; titleEn: string; bodyAr: string; bodyEn: string };
  /**
   * Indicative per-person USD ranges by group size — a booking aid, not a
   * quote. Final pricing is always confirmed on WhatsApp (note text says so).
   */
  priceTiers?: { groupEn: string; groupAr: string; rangeEn: string; rangeAr: string }[];
};

/** Shared intro line for the pricing table (bilingual). */
export const pricingIntro = {
  en: "Indicative per-person ranges (USD) — every journey is private; the final quote is confirmed on WhatsApp.",
  ar: "نطاقات استرشادية للشخص بالدولار — كل الرحلات خاصة، والسعر النهائي بيتأكد على واتساب.",
} as const;

export const programs: TourProgram[] = [
  {
    slug: "white-desert-overnight",
    number: "01",
    titleAr: "الصحراء البيضاء — ليلة واحدة",
    titleEn: "White Desert Overnight",
    subtitle:
      "The signature journey — chalk formations, sunset, firelight and a night beneath the stars.",
    duration: "2 days · 1 night",
    startLabel: "Departs",
    startValue: "Cairo",
    tourTypeLabel: "Tour type",
    tourTypeValue: "Private",
    stayLabel: "Overnight",
    stayValue: "White Desert camp",
    introAr:
      "رحلة خاصة من القاهرة إلى قلب الصحراء البيضاء: كثبان سوداء، جبال كريستال، تكوينات جيرية، وليلة تحت النجوم.",
    introEn:
      "A private journey from Cairo into the heart of the White Desert: black dunes, crystal mountain, limestone formations, and a night beneath the stars.",
    days: [
      {
        label: "Day 1",
        ar: [
          "٧:٠٠ صباحاً — التحرك من مكان إقامتك في القاهرة بسيارة خاصة",
          "الوصول للواحات البحرية بعد حوالي ٤ ساعات — الغداء",
          "الصحراء السوداء",
          "قرية الحيز والعين الباردة",
          "جبل الكريستال",
          "منطقة العقبات",
          "الصحراء البيضاء القديمة (منطقة عيش الغراب والخيام)",
          "الصحراء البيضاء الجديدة (التكوينات الجيرية)",
          "بعد الغروب — التخييم، العشاء، والمبيت تحت النجوم",
        ],
        en: [
          "7:00 AM — private car pickup from your accommodation in Cairo",
          "Arrive Bahariya Oasis after about 4 hours' drive — lunch",
          "The Black Desert",
          "Al-Haiz village and the cold spring",
          "Crystal Mountain",
          "Agabat region",
          "The Old White Desert (mushroom and tent formations)",
          "The New White Desert (limestone formations)",
          "After sunset — camp, dinner, and a night under the stars",
        ],
      },
      {
        label: "Day 2",
        ar: [
          "مشاهدة الشروق ثم الإفطار",
          "الجيب يرجّعنا للواحة حيث سيارة العودة جاهزة",
          "العودة إلى القاهرة",
        ],
        en: [
          "Watch the sunrise, then breakfast",
          "Jeep back to the oasis where your transport is ready",
          "Return to Cairo",
        ],
      },
    ],
    includes: [
      { ar: "سيارة خاصة من الباب للباب", en: "Private car, door to door" },
      { ar: "السفاري", en: "Safari" },
      { ar: "كل الوجبات (غداء – عشاء – فطار)", en: "All meals (lunch, dinner, breakfast)" },
      { ar: "مياه معدنية", en: "Mineral water" },
      { ar: "مشروبات باردة وساخنة", en: "Cold and hot drinks" },
      { ar: "تذاكر المحمية", en: "National park tickets" },
      { ar: "المخيم والمبيت", en: "Camp and overnight stay" },
    ],
    excludes: [
      { ar: "أي حاجة مش مذكورة في البرنامج", en: "Anything not mentioned in the program" },
    ],
    note: {
      titleAr: "الأسعار",
      titleEn: "Pricing",
      bodyAr: "السعر دايماً حسب عدد الأفراد · كل الرحلات خاصة",
      bodyEn: "Price always depends on the number of people · All tours are private",
    },
    priceTiers: [
      { groupEn: "2 travelers", groupAr: "شخصين", rangeEn: "$230–280", rangeAr: "٢٣٠–٢٨٠$" },
      { groupEn: "3–4 travelers", groupAr: "٣–٤ أفراد", rangeEn: "$190–230", rangeAr: "١٩٠–٢٣٠$" },
      { groupEn: "5–6 travelers", groupAr: "٥–٦ أفراد", rangeEn: "$160–200", rangeAr: "١٦٠–٢٠٠$" },
      {
        groupEn: "7+ travelers",
        groupAr: "٧ أفراد أو أكثر",
        rangeEn: "$140–180",
        rangeAr: "١٤٠–١٨٠$",
      },
    ],
  },
  {
    slug: "bahariya-expedition",
    number: "02",
    titleAr: "الواحات البحرية والصحراء البيضاء — ليلتين",
    titleEn: "Bahariya & White Desert Expedition",
    subtitle:
      "Three days across the volcanic edge, the dunes and the luminous chalk — in two curated versions.",
    duration: "3 days · 2 nights",
    startLabel: "Departs",
    startValue: "Cairo",
    tourTypeLabel: "Tour type",
    tourTypeValue: "Private",
    stayLabel: "Overnight",
    stayValue: "Desert camps (2 nights)",
    introAr:
      "برنامج ثلاثة أيام في الصحراء الغربية — نسختان مختارتان بعناية: واحدة مع كهف الجارة، وأخرى مع النبع السحري والتزحلق على الرمال.",
    introEn:
      "A three-day Western Desert journey offered in two curated versions: one with the Kahf El-Gara cave, one with the Magic Spring and sandboarding.",
    days: [],
    variants: [
      {
        id: "a",
        labelAr: "النسخة أ — كهف الجارة",
        labelEn: "Version A — Kahf El-Gara cave",
        days: [
          {
            label: "Day 1",
            ar: [
              "الصحراء السوداء",
              "جبل المرصوص",
              "قرية الحيز — مياه كبريتية",
              "جبل الكريستال",
              "العقبات سفاري",
              "بيات في غرود كراوين عند جبل المخروم",
            ],
            en: [
              "Black Desert",
              "Jabal Al-Marsous",
              "Al-Haiz village (sulfur water)",
              "Crystal Mountain",
              "Agabat safari",
              "Overnight at Ghorood Karawin dunes by Jabal Al-Makhroum",
            ],
          },
          {
            label: "Day 2",
            ar: [
              "غرود كراوين سفاري ٧٠ كيلو + ١٢٠ كيلو أسفلت",
              "الوصول للكهف — غداء — التحرك حوالي ٢:٣٠",
              "الرجوع لعين السرو ومنها على الوادي الكبير",
              "الوادي الصغير",
              "الصحراء البيضاء الجديدة",
              "ومنها على القديمة — تخييم",
            ],
            en: [
              "Ghorood Karawin safari (70 km) + 120 km asphalt",
              "Arrive at the cave — lunch — depart around 2:30 PM",
              "Back via Ain El-Sarw to Wadi El-Kebir",
              "Wadi El-Sagheer",
              "New White Desert",
              "On to the Old White Desert — camping",
            ],
          },
          {
            label: "Day 3",
            ar: ["فطار وزيارة سريعة للعقبات", "الرجوع للواحات وجولة حرة", "التحرك للقاهرة"],
            en: [
              "Breakfast and a quick visit to Agabat",
              "Back to the oasis with free time",
              "Departure to Cairo",
            ],
          },
        ],
      },
      {
        id: "b",
        labelAr: "النسخة ب — النبع السحري والتزحلق",
        labelEn: "Version B — Magic Spring & sandboarding",
        days: [
          {
            label: "Day 1",
            ar: [
              "الانطلاق بالسيارة إلى الواحات البحرية — الغداء",
              "الصحراء السوداء",
              "قرية الهيزة (نبع بارد)",
              "جبل الكريستال",
              "التخييم في العقبة — العشاء والمبيت",
            ],
            en: [
              "Drive to Bahariya, lunch",
              "Black Desert",
              "Al-Hayza village (cold spring)",
              "Crystal Mountain",
              "Camp at Agaba — dinner and overnight",
            ],
          },
          {
            label: "Day 2",
            ar: [
              "الإفطار",
              "من موقع العقبة إلى منطقة مكروم عبر الكثبان الرملية",
              "كثبان رملية صغيرة / بحر رملي كبير",
              "اكتشاف «النبع السحري»",
              "الصحراء البيضاء وتكويناتها الجيرية المستديرة",
              "الوصول للصحراء البيضاء عند الغروب — التخييم تحت النجوم",
            ],
            en: [
              "Breakfast",
              "From Agaba across the dunes to the Makhroum area",
              "Small dunes / the Great Sand Sea",
              "Discover the “Magic Spring”",
              "The White Desert and its rounded limestone formations",
              "Arrive at the White Desert at sunset — camping under the stars",
            ],
          },
          {
            label: "Day 3",
            ar: [
              "استكشاف الصحراء البيضاء الجديدة (صخور على هيئة حيوانات)",
              "التوجه لمكان الإقامة — التزحلق على الرمال",
              "العودة للواحات البحرية — الغداء",
              "الانطلاق عائدين إلى القاهرة",
            ],
            en: [
              "Explore the New White Desert (animal-shaped rock formations)",
              "To the accommodation — sandboarding",
              "Back to Bahariya Oasis — lunch",
              "Return to Cairo",
            ],
          },
        ],
      },
    ],
    note: {
      titleAr: "الأسعار والتحقق",
      titleEn: "Pricing & confirmation",
      bodyAr:
        "السعر حسب عدد الأفراد · كل الرحلات خاصة · النسختان متاحتان — اختار النسخة المناسبة عند الحجز",
      bodyEn:
        "Price depends on group size · All tours are private · Both versions available — choose one when booking",
    },
    priceTiers: [
      { groupEn: "2 travelers", groupAr: "شخصين", rangeEn: "$320–390", rangeAr: "٣٢٠–٣٩٠$" },
      { groupEn: "3–4 travelers", groupAr: "٣–٤ أفراد", rangeEn: "$270–330", rangeAr: "٢٧٠–٣٣٠$" },
      { groupEn: "5–6 travelers", groupAr: "٥–٦ أفراد", rangeEn: "$230–290", rangeAr: "٢٣٠–٢٩٠$" },
      {
        groupEn: "7+ travelers",
        groupAr: "٧ أفراد أو أكثر",
        rangeEn: "$200–260",
        rangeAr: "٢٠٠–٢٦٠$",
      },
    ],
  },
  {
    slug: "siwa-oasis",
    number: "03",
    titleAr: "واحة سيوة",
    titleEn: "Siwa Oasis",
    subtitle: "Salt lakes, ancient temples and the Great Sand Sea — Egypt's far western oasis.",
    duration: "2–3 days",
    startLabel: "Departs",
    startValue: "Cairo",
    tourTypeLabel: "Tour type",
    tourTypeValue: "Private",
    stayLabel: "Overnight",
    stayValue: "Siwa hotel",
    introAr:
      "رحلة إلى أبعد واحات مصر الغربية: جبل الموتى، معابد الإسكندر وآمون، بحيرات الملح، عين كليوباترا، وسفاري بحر الرمال الأعظم.",
    introEn:
      "A journey to Egypt's far western oasis: the Mountain of the Dead, temples of Alexander and Amun, salt lakes, Cleopatra's Spring, and a Great Sand Sea safari.",
    days: [
      {
        label: "Day 1",
        ar: [
          "٧:٠٠ صباحاً — الانطلاق من القاهرة (حوالي ٨ ساعات، استراحتين في الطريق للراحة والتسوق)",
          "٣:٠٠ عصراً — الوصول لسيوة، النقل للفندق، تسجيل الوصول وترك الأمتعة",
          "٥:٠٠ مساءً — جزيرة فتناس لتصوير الغروب",
          "بعد الغروب — فندق بدوي قريب من الجزيرة للعشاء وزيارة ينابيع الكبريت الساخنة",
          "العودة للفندق",
        ],
        en: [
          "7:00 AM — depart Cairo (~8 hours, two rest stops for relaxing and shopping)",
          "3:00 PM — arrive Siwa, hotel check-in, drop luggage",
          "5:00 PM — Fatnas Island for sunset photography",
          "After sunset — a Bedouin hotel near the island for dinner and the hot sulfur springs",
          "Return to the hotel",
        ],
      },
      {
        label: "Day 2",
        ar: [
          "٨:٠٠ صباحاً الإفطار — ٩:٠٠ المغادرة",
          "جبل الموتى",
          "معبد الإسكندر",
          "معبد آمون",
          "جبل دكرور",
          "بحيرات الملح",
          "عين كليوباترا — استحمام وغداء",
          "تبديل السيارة بجيب دفع رباعي — سفاري بحر الرمال الأعظم من ٥:٠٠ حتى الغروب",
          "سوق سيوة — تسوق، تمور، عشاء",
          "العودة للفندق",
        ],
        en: [
          "Breakfast 8:00 AM — depart 9:00 AM",
          "Mountain of the Dead",
          "Temple of Alexander",
          "Temple of Amun",
          "Jabal Dakrour",
          "The Salt Lakes",
          "Cleopatra's Spring — swim and lunch",
          "Switch to a 4×4 jeep — Great Sand Sea safari, 5:00 PM until sunset",
          "Siwa market — shopping, dates, dinner",
          "Return to the hotel",
        ],
      },
      {
        label: "Day 3",
        ar: [
          "٨:٠٠ الإفطار — ٨:٣٠ المغادرة بكل الأمتعة",
          "قلعة شالي والمنازل القديمة",
          "١٠:٠٠ مغادرة سيوة — العودة للقاهرة، الوصول ٧:٠٠ مساءً",
        ],
        en: [
          "Breakfast 8:00 AM — depart 8:30 AM with all luggage",
          "Shali Fortress and the old houses of Siwa",
          "10:00 AM depart Siwa — direct to Cairo, arriving 7:00 PM",
        ],
      },
    ],
    note: {
      titleAr: "ملاحظة حول المدة",
      titleEn: "Duration note",
      bodyAr:
        "البرنامج المفصّل هنا ٣ أيام؛ ويمكن اختصاره ليومين حسب وقتك. تأكيد وسيلة العودة (طيران أم بري) يتم عند التخطيط.",
      bodyEn:
        "The detailed itinerary runs three days and can be shortened to two. Return by air or road is confirmed during planning.",
    },
    priceTiers: [
      { groupEn: "2 travelers", groupAr: "شخصين", rangeEn: "$350–420", rangeAr: "٣٥٠–٤٢٠$" },
      { groupEn: "3–4 travelers", groupAr: "٣–٤ أفراد", rangeEn: "$300–360", rangeAr: "٣٠٠–٣٦٠$" },
      { groupEn: "5–6 travelers", groupAr: "٥–٦ أفراد", rangeEn: "$260–320", rangeAr: "٢٦٠–٣٢٠$" },
    ],
  },
  {
    slug: "fayoum-safari",
    number: "04",
    titleAr: "الفيوم — سفاري يوم واحد",
    titleEn: "Fayoum Desert Safari",
    subtitle:
      "A full day by 4×4: waterfalls, whale fossils, enchanted lakes and a Bedouin gathering.",
    duration: "Full day",
    startLabel: "Departs",
    startValue: "Cairo (round trip)",
    tourTypeLabel: "Tour type",
    tourTypeValue: "Private",
    stayLabel: "Overnight",
    stayValue: "None — day trip",
    introAr:
      "يوم كامل من السفاري في واحة الفيوم: وادي الحيتان، شلالات وادي الريان، البحيرة المسحورة، وجبل المدورة.",
    introEn:
      "A full day of 4×4 safari in Fayoum Oasis: Wadi El Hitan, Wadi El Rayan waterfalls, the Enchanted Lake and Jabal Al Mudawara.",
    days: [
      {
        label: "Day trip",
        ar: [
          "التحرك من القاهرة إلى الفيوم ذهاباً وعودة",
          "السفاري يبدأ من قرية تونس",
          "سفاري ٤×٤ في واحة الفيوم:",
          "وادي الحيتان",
          "وادي الريان (البحيرة الأولى)",
          "شلالات وادي الريان",
          "البحيرة المسحورة",
          "جبل المدورة",
          "بحيرة الماجيك",
          "تجمع بدوي",
          "السفاري مستمر حتى نهاية اليوم",
        ],
        en: [
          "Round-trip transport from Cairo to Fayoum",
          "The safari starts from Tunis Village",
          "4×4 safari in Fayoum Oasis:",
          "Wadi El Hitan (Valley of the Whales)",
          "Wadi El Rayan (First Lake)",
          "Wadi El Rayan Waterfalls",
          "The Enchanted Lake",
          "Jabal Al Mudawara",
          "The Magic Lake",
          "Bedouin Gathering",
          "The safari continues until the end of the day",
        ],
      },
    ],
    note: {
      titleAr: "الأسعار",
      titleEn: "Pricing",
      bodyAr: "السعر حسب عدد الأفراد · الرحلة خاصة · الوجبات تُرتب عند التخطيط",
      bodyEn: "Price depends on group size · Private tour · Meals arranged during planning",
    },
    priceTiers: [
      { groupEn: "2 travelers", groupAr: "شخصين", rangeEn: "$120–150", rangeAr: "١٢٠–١٥٠$" },
      { groupEn: "3–4 travelers", groupAr: "٣–٤ أفراد", rangeEn: "$100–130", rangeAr: "١٠٠–١٣٠$" },
      { groupEn: "5–6 travelers", groupAr: "٥–٦ أفراد", rangeEn: "$85–115", rangeAr: "٨٥–١١٥$" },
    ],
  },
];

type Lang = "en" | "ar";

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="inline-flex overflow-hidden rounded-full border border-line-dark"
      role="group"
      aria-label="Language / اللغة"
    >
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
            lang === l
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-surface-dark-foreground/60 hover:text-primary"
          }`}
        >
          {l === "en" ? "EN" : "عربي"}
        </button>
      ))}
    </div>
  );
}

function ProgramItinerary({ day, index, lang }: { day: ItineraryDay; index: number; lang: Lang }) {
  const lines = lang === "ar" ? day.ar : day.en;
  return (
    <div className="border-t border-border pt-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className={`mb-6 flex items-baseline gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <span className="font-serif text-4xl text-primary/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl">{day.label}</h3>
      </div>
      <div
        className={`rounded-sm border border-border p-6 ${lang === "ar" ? "bg-surface-warm/40" : ""}`}
      >
        <ul
          className={`space-y-2.5 text-sm leading-7 ${lang === "ar" ? "text-right" : "text-muted-foreground"}`}
        >
          {lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProgramPage({ program }: { program: TourProgram }) {
  const [lang, setLang] = useState<Lang>("en");
  const [variant, setVariant] = useState(program.variants?.[0]?.id ?? "");
  const activeVariant = program.variants?.find((v) => v.id === variant) ?? program.variants?.[0];
  const rtl = lang === "ar";
  const title = rtl ? program.titleAr : program.titleEn;
  const intro = rtl ? program.introAr : program.introEn;

  const metaRows: [string, string][] = rtl
    ? [
        ["نقطة الانطلاق", program.startValue],
        ["نوع الرحلة", program.tourTypeValue === "Private" ? "خاصة" : program.tourTypeValue],
        ["المبيت", program.stayValue],
      ]
    : [
        [program.startLabel, program.startValue],
        [program.tourTypeLabel, program.tourTypeValue],
        [program.stayLabel, program.stayValue],
      ];

  return (
    <main className="bg-background">
      {/* Hero */}
      <section
        className="bg-surface-dark px-5 pb-16 pt-32 text-surface-dark-foreground sm:px-8 sm:pb-20 sm:pt-40 lg:px-12"
        dir={rtl ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-[1260px]">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-surface-dark-foreground/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> {rtl ? "كل البرامج" : "All programs"}
            </a>
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker">
                {rtl ? `برنامج ${program.number}` : `Program ${program.number}`}
              </p>
              <h1 className="editorial-title mt-5 text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-surface-dark-foreground/65">
                {program.subtitle}
              </p>
            </div>
            <div className="grid gap-px border border-line-dark bg-line-dark sm:grid-cols-3 lg:min-w-[420px]">
              {metaRows.map(([label, value]) => (
                <div key={label} className="bg-surface-dark p-5">
                  <p className="text-[0.6rem] uppercase tracking-[0.16em] text-surface-dark-foreground/50">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-line-dark pt-5">
            <p className="text-[0.63rem] uppercase tracking-[0.18em] text-surface-dark-foreground/50">
              {program.duration}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12" dir={rtl ? "rtl" : "ltr"}>
        <div className="mx-auto max-w-[1260px]">
          <p className="max-w-4xl text-base leading-8 text-muted-foreground">{intro}</p>
        </div>
      </section>

      {/* Itinerary */}
      <section
        className="bg-surface-warm px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
        dir={rtl ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-[1260px]">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">{rtl ? "البرنامج" : "Itinerary"}</p>
              <h2 className="editorial-title mt-4 text-4xl sm:text-5xl">
                {rtl ? (
                  <>
                    يوم <em>بيوم.</em>
                  </>
                ) : (
                  <>
                    Day by <em>day.</em>
                  </>
                )}
              </h2>
            </div>
            {rtl && <p className="font-serif text-xl text-muted-foreground">البرنامج اليوم بيوم</p>}
          </div>

          {program.variants && activeVariant && (
            <div className="mb-12 flex flex-wrap gap-3">
              {program.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v.id)}
                  className={`rounded-full border px-6 py-3 text-sm transition-colors ${
                    v.id === activeVariant.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {rtl ? v.labelAr : v.labelEn}
                </button>
              ))}
            </div>
          )}

          {(activeVariant ? activeVariant.days : program.days).map((day, i) => (
            <ProgramItinerary
              key={`${activeVariant?.id ?? "main"}-${day.label}`}
              day={day}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* Includes / Excludes / Note */}
      {(program.includes || program.note) && (
        <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12" dir={rtl ? "rtl" : "ltr"}>
          <div className="mx-auto grid max-w-[1260px] gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            {program.includes && (
              <div>
                <p className="section-kicker">{rtl ? "السعر يشمل" : "What's included"}</p>
                <h2 className="editorial-title mt-4 text-4xl">
                  {rtl ? (
                    <>
                      وضّحنا كل <em>حاجة.</em>
                    </>
                  ) : (
                    <>
                      Included, <em>clearly.</em>
                    </>
                  )}
                </h2>
                <div className="mt-8 border-t border-border">
                  <h3 className="border-b border-border py-5 font-serif text-xl font-normal">
                    {rtl ? "يشمل" : "Includes"}
                  </h3>
                  <ul className="divide-y divide-border">
                    {program.includes.map((row) => (
                      <li key={row.en} className="py-3 text-sm leading-7">
                        {rtl ? row.ar : <span className="text-muted-foreground">{row.en}</span>}
                      </li>
                    ))}
                  </ul>
                  {program.excludes && (
                    <>
                      <h3 className="border-b border-border py-5 font-serif text-xl font-normal">
                        {rtl ? "لا يشمل" : "Excludes"}
                      </h3>
                      <ul className="divide-y divide-border">
                        {program.excludes.map((row) => (
                          <li key={row.en} className="py-3 text-sm leading-7 text-muted-foreground">
                            {rtl ? row.ar : row.en}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
            {program.note && (
              <div className="reveal flex flex-col gap-6 self-start">
                {program.priceTiers && (
                  <div
                    className="rounded-sm border border-border bg-card p-8"
                    dir={rtl ? "rtl" : "ltr"}
                  >
                    <p className="section-kicker">
                      {rtl ? "الأسعار الاسترشادية" : "Indicative pricing"}
                    </p>
                    <p className="mt-3 text-xs leading-6 text-muted-foreground">
                      {rtl ? pricingIntro.ar : pricingIntro.en}
                    </p>
                    <table className="mt-5 w-full border-t border-border text-sm">
                      <tbody>
                        {program.priceTiers.map((tier) => (
                          <tr key={tier.groupEn} className="border-b border-border">
                            <td className="py-3 pr-2 text-muted-foreground">
                              {rtl ? tier.groupAr : tier.groupEn}
                            </td>
                            <td className="py-3 text-right font-serif text-lg">
                              {rtl ? tier.rangeAr : tier.rangeEn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {rtl ? "لكل الشخص · بالدولار الأمريكي" : "Per person · USD"}
                    </p>
                  </div>
                )}
                <div
                  className="reveal rounded-sm border border-primary/40 bg-primary/5 p-8"
                  dir={rtl ? "rtl" : "ltr"}
                >
                  <p className="section-kicker">
                    {rtl ? program.note.titleAr : program.note.titleEn}
                  </p>
                  <p className="mt-4 text-base leading-8">
                    {rtl ? program.note.bodyAr : program.note.bodyEn}
                  </p>
                  {!rtl && program.note.bodyAr && null}
                  <Button asChild variant="goldOutline" size="journey" className="mt-7">
                    <a href={`/?program=${program.slug}#plan`}>
                      {rtl ? "اسأل عن البرنامج ده" : "Ask about this program"} <ArrowRight />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="bg-surface-dark px-5 py-20 text-center text-surface-dark-foreground sm:px-8"
        dir={rtl ? "rtl" : "ltr"}
      >
        <p className="section-kicker">{siteConfig.name}</p>
        <h2 className="editorial-title mx-auto mt-5 max-w-3xl text-4xl sm:text-6xl">
          {rtl ? (
            <>
              جاهزين لما <em>تكون جاهز.</em>
            </>
          ) : (
            <>
              Ready when <em>you are.</em>
            </>
          )}
        </h2>
        <Button asChild variant="gold" size="journey" className="mt-9">
          <a href={`/?program=${program.slug}#plan`}>
            {rtl ? "خطط للرحلة" : "Plan this journey"} <ArrowRight />
          </a>
        </Button>
      </section>
    </main>
  );
}
