import type { DailyMotivation, Tagline } from "./types";

export const motivationalQuotes: DailyMotivation[] = [
  {
    id: "1",
    quote: "Rasa Sekali, Jatuh Cinta Selamanya",
    author: "Abang Colek",
    category: "product",
  },
  {
    id: "2",
    quote: "Pedas Manis Likat Melekat - Macam perniagaan, kena ada balance!",
    author: "Founder",
    category: "business",
  },
  {
    id: "3",
    quote: "Setiap event adalah peluang untuk buat customer jatuh cinta",
    author: "Founder",
    category: "growth",
  },
  {
    id: "4",
    quote: "Dari dapur rumah ke seluruh Malaysia - Mimpi boleh jadi kenyataan",
    author: "Founder Story",
    category: "founder",
  },
  {
    id: "5",
    quote: "Bukan calang-calang pedas, bukan calang-calang usahawan",
    author: "Abang Colek",
    category: "business",
  },
  {
    id: "6",
    quote: "Konsisten macam rasa sambal kita - Hari-hari padu!",
    author: "Founder",
    category: "growth",
  },
  {
    id: "7",
    quote: "Setiap booth adalah stage untuk showcase passion kita",
    author: "Founder",
    category: "business",
  },
  {
    id: "8",
    quote: "Sticky macam sambal, memorable macam brand",
    author: "Abang Colek",
    category: "product",
  },
];

export const taglines: Tagline[] = [
  {
    id: "1",
    text: "Rasa Padu, Pedas Menggamit",
    context: "formal",
    emoji: "🌶️",
  },
  {
    id: "2",
    text: "PEDAS MANIS LIKAT MELEKAT",
    context: "social",
    emoji: "🌶️🥭",
  },
  {
    id: "3",
    text: "Rasa Sekali Jatuh Cinta Selamanya",
    context: "emotional",
    emoji: "❤️",
  },
  {
    id: "4",
    text: "Pedas Tapi Puas",
    context: "social",
    emoji: "🌶️",
  },
  {
    id: "5",
    text: "Colek Sampai Licin",
    context: "social",
    emoji: "🥭",
  },
  {
    id: "6",
    text: "Bukan Calang-Calang Pedas",
    context: "formal",
    emoji: "🌶️",
  },
];

export const defaultChecklistItems = {
  preEvent: [
    "Semak inventory sambal (berapa botol/pack)",
    "Prepare booth setup equipment (meja, banner, standee)",
    "Print QR code untuk lucky draw",
    "Charge power bank dan phone",
    "Prepare cash float (duit kecil)",
    "Pack merchandise (sticker, flyer, business card)",
    "Prepare cooler box dengan ice pack",
    "Brief staff tentang product dan pricing",
    "Test payment system (QR pay, cash)",
    "Prepare shot list untuk TikTok content",
  ],
  duringEvent: [
    "Setup booth sebelum event start",
    "Display product dengan menarik",
    "Pasang banner dan standee",
    "Start greeting customers dengan senyum",
    "Record customer reactions untuk content",
    "Promote lucky draw registration",
    "Monitor stock level",
    "Engage dengan customers (build relationship)",
    "Capture behind-the-scenes content",
    "Note down customer feedback",
  ],
  postEvent: [
    "Pack semua equipment dengan kemas",
    "Count sales dan stock balance",
    "Collect customer feedback forms",
    "Download content dari phone ke laptop",
    "Update inventory system",
    "Thank EO dan exchange contact",
    "Post event highlight di social media",
    "Review apa yang berjaya dan perlu improve",
    "Plan content calendar untuk next week",
    "Rest dan celebrate! 🎉",
  ],
};

export const sampleHooks = [
  {
    id: "1",
    text: "POV: First time cuba sambal Abang Colek",
    tags: ["reaction", "trending", "pov"],
  },
  {
    id: "2",
    text: "Ramai tanya kenapa sambal ni addictive sangat...",
    tags: ["product", "viral"],
  },
  {
    id: "3",
    text: "Dari dapur rumah sampai jual 1000 botol sebulan",
    tags: ["founder-story", "motivation"],
  },
  {
    id: "4",
    text: "3 sebab kenapa customer balik beli lagi",
    tags: ["product", "tips"],
  },
  {
    id: "5",
    text: "Behind the scenes: Prepare untuk event hari ni",
    tags: ["bts", "event"],
  },
];

export const celebrationMessages = [
  "🎉 Tahniah! Milestone achieved!",
  "🚀 Level up! Teruskan momentum!",
  "⭐ Hebat! Ini baru permulaan!",
  "💪 Padu! Keep pushing forward!",
  "🔥 On fire! Jangan stop sekarang!",
  "🌟 Amazing! Customer mesti jatuh cinta!",
  "📈 Growth mode activated!",
  "🎯 Target achieved! Set new goal!",
];
