/**
 * Kamus dwibahasa (ID / EN).
 * ID = sumber kebenaran bentuk (shape); EN wajib mengikuti bentuk yang sama.
 * Semua label memakai bahasa natural yang elegan (label bergaya "kode"
 * seperti Career_Matrix / COPY_UID sudah dihapus dari desain).
 */

export type Lang = "id" | "en";

const id = {
  nav: {
    links: {
      about: "Tentang",
      services: "Layanan",
      work: "Karya",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    startProject: "MULAI PROYEK",
    getInTouch: "Hubungi saya",
    themeToDark: "Beralih ke mode gelap",
    themeToLight: "Beralih ke mode terang",
    switchLang: "Switch to English",
  },
  hero: {
    badge: "Terbuka untuk proyek",
    description:
      "Membangun <b>produk digital</b> yang rapi, cepat, dan enak dipakai — dengan ketelitian teknis dan rasa desain.",
    launch: "Lihat Karya",
    link: "Hubungi Saya",
    hud: "Gulir",
    location: "Lokasi",
    status: "Status",
    live: "Tersedia",
  },
  skills: {
    titleTop: "Toolbox",
    titleBottom: "& Stack",
    desc: "Kombinasi antara presisi pemrograman dan kebebasan kreatif untuk membangun produk digital yang utuh.",
    tagEngineering: "Engineering",
    tagDesign: "Design",
    levels: {
      Expert: "Ahli",
      Advanced: "Mahir",
      Intermediate: "Menengah",
    } as Record<string, string>,
  },
  about: {
    bgText: "ARCHITECT",
    badge: "Tentang Arsitek",
    titleTop: "Merancang",
    titleBottom: "Jiwa Digital.",
    paragraph:
      "Bukan sekadar kode. Saya membangun <b>ekosistem digital</b> yang menggabungkan presisi teknis dengan estetika premium yang tak lekang oleh waktu.",
    stats: {
      projects: "Proyek Elite",
      systems: "Sistem Dibangun",
      accuracy: "Akurasi Desain",
    },
    base: "Basis: Jakarta, IDN",
    download: "Unduh Resume",
    downloading: "Menganalisis Sistem...",
    downloaded: "CV Diperoleh",
    inquiry: "Pertanyaan",
  },
  services: {
    label: "Keahlian Inti",
    titleTop: "Masa Depan",
    titleBottom: "Terdefinisi.",
    intro:
      "Kami menggabungkan seni desain dengan presisi rekayasa untuk menciptakan solusi digital yang tak tertandingi.",
    analyze: "Analisis Kasus",
    capabilities: "Kapabilitas Utama",
    impact: "Dampak",
    perfIncrease: "Peningkatan Performa",
    close: "Tutup Analisis",
    ctaTitle: "Mulai Proyek\nImpian Anda.",
    ctaSubtitle: "Konsultasikan visi Anda secara gratis hari ini.",
    connect: "Hubungi Sekarang",
    items: {
      "01": {
        title: "Ekosistem Web",
        subtitle: "Web Development",
        description:
          "Membangun sistem informasi berbasis web yang responsif dengan fokus pada efisiensi operasional.",
        longDescription:
          "Implementasi solusi web menggunakan HTML5, CSS3, JavaScript, Node.js, React.js, PHP, dan Laravel untuk digitalisasi alur kerja administrasi dan manajemen data.",
        features: ["Desain Responsif", "Kode Bersih", "Loading Optimal"],
        stats: "SEO Friendly",
      },
      "02": {
        title: "Integritas Data",
        subtitle: "Digital Administration",
        description:
          "Manajemen dokumen dan database operasional dengan tingkat akurasi tinggi.",
        longDescription:
          "Pengelolaan dokumen Delivery Order (DO) dan logistik pelayaran menggunakan sistem digital untuk memastikan keamanan data aset perusahaan.",
        features: ["Manajemen Database", "Input Tanpa Error", "Arsip Digital"],
        stats: "Akurasi 100%",
      },
      "03": {
        title: "Infra-Support",
        subtitle: "IT Support & Ops",
        description:
          "Pemeliharaan infrastruktur IT internal dan troubleshooting perangkat keras/lunak.",
        longDescription:
          "Memastikan kelancaran operasional harian kantor melalui pemeliharaan sistem informasi dan dukungan teknis proaktif bagi pengguna.",
        features: ["Perawatan Hardware", "Diagnostik Sistem", "Dukungan Pengguna"],
        stats: "Respon Cepat",
      },
      "04": {
        title: "Logika Alur Kerja",
        subtitle: "System Architecture",
        description:
          "Otomatisasi alur kerja administrasi konvensional menjadi digital (paperless).",
        longDescription:
          "Merancang logika sistem informasi sederhana yang mengintegrasikan pengadaan (procurement) dengan dokumentasi digital yang terpusat.",
        features: ["Alur Paperless", "Logika Procurement", "Otomatisasi Tugas"],
        stats: "Operasi Efisien",
      },
    } as Record<
      string,
      {
        title: string;
        subtitle: string;
        description: string;
        longDescription: string;
        features: string[];
        stats: string;
      }
    >,
  },
  projects: {
    tag: "Karya Pilihan",
    titleTop: "Sistem",
    titleBottom: "Terancang.",
    intro:
      "Arsitektur digital dengan rekayasa performa tinggi dan estetika fungsional.",
    explore: "Jelajahi Arsip",
    view: "Lihat Proyek",
    items: {
      "01": {
        title: "Diva Mobile Ecosystem",
        category: "Retail Tech",
        description:
          "Sistem manajemen inventaris dan POS smartphone untuk optimalisasi bisnis retail digital.",
      },
      "02": {
        title: "DFS Finance Tracker",
        category: "Financial Tool",
        description:
          "Aplikasi pengelolaan keuangan personal dengan fitur pelacakan arus kas.",
      },
      "03": {
        title: "MiniBank Core System",
        category: "Fintech",
        description:
          "Simulasi sistem perbankan mikro yang menangani logika transaksi simpan pinjam.",
      },
      "04": {
        title: "TTSS Mobile Application",
        category: "Mobile",
        description: "Company Profile dengan Sistem Mobile.",
      },
    } as Record<
      string,
      { title: string; category: string; description: string }
    >,
  },
  archive: {
    back: "Kembali",
    tag: "Arsip Proyek",
    titleTop: "Semua",
    titleBottom: "Karya.",
    intro:
      "Kumpulan proyek 2023—2026: sistem web, solusi fintech, dan aplikasi korporat.",
    searchPlaceholder: "Cari judul atau teknologi...",
    clearSearch: "Hapus pencarian",
    all: "Semua",
    noResults: "Tidak ada hasil",
    noResultsHint: "Coba kata kunci atau kategori lain.",
    projectsCount: "Proyek",
    categoriesCount: "Kategori",
    code: "Kode",
    live: "Situs",
    statuses: {
      Active: "Aktif",
      Beta: "Beta",
      Archived: "Arsip",
    } as Record<string, string>,
    items: {
      "01": {
        description:
          "Situs portofolio pribadi dengan animasi halus dan performa tinggi.",
      },
      "02": {
        description:
          "POS kantin digital dengan integrasi pembayaran Midtrans.",
      },
      "03": {
        description:
          "Platform retail smartphone dengan katalog dan manajemen inventaris.",
      },
      "04": {
        description:
          "Aplikasi pengelolaan keuangan personal dengan pelacakan arus kas.",
      },
      "05": {
        description:
          "Simulasi sistem perbankan mikro untuk transaksi simpan pinjam.",
      },
      "06": {
        description:
          "Situs perusahaan untuk logistik industri pertambangan.",
      },
      "07": {
        description:
          "Portal perdagangan internasional multi-negara.",
      },
      "08": {
        description:
          "Situs perusahaan pelayaran untuk manajemen armada dan kargo.",
      },
      "09": {
        description:
          "Aplikasi e-commerce lengkap dengan payment gateway terintegrasi.",
      },
      "10": {
        description:
          "Aplikasi mobile company profile untuk perusahaan pelayaran.",
      },
    } as Record<string, { description: string }>,
  },
  experience: {
    tag: "Pengalaman",
    titleTop: "Riwayat",
    titleBottom: "Terekam.",
    intro:
      "Rekam jejak profesional dalam pengembangan sistem dan arsitektur infrastruktur digital tingkat lanjut.",
    summary: "Ringkasan",
    achievements: "Pencapaian Utama",
    readLog: "Baca Selengkapnya",
    close: "Tutup",
    role: "Peran",
    items: {
      "01": {
        role: "Procurement & System Support",
        desc: "Manajemen database pengadaan barang/jasa dan dokumentasi transaksi digital.",
        fullLog:
          "Bertanggung jawab atas akurasi database vendor dan aset perusahaan. Mengimplementasikan sistem pengarsipan digital untuk mempermudah audit pengadaan dan pelaporan aset.",
      },
      "02": {
        role: "Digital Administration Specialist",
        desc: "Optimasi pengelolaan Delivery Order (DO) dan validasi data logistik ekspor-impor.",
        fullLog:
          "Mengelola siklus dokumen container dengan ketelitian tinggi. Menggunakan teknik pengolahan data digital untuk memastikan validitas manifest dan koordinasi logistik yang tanpa hambatan.",
      },
      "03": {
        role: "Administrative & IT Operations",
        desc: "Digitalisasi sistem administrasi pelayaran dan pemeliharaan infrastruktur IT operasional.",
        fullLog:
          "Mengintegrasikan sistem manajemen dokumen kapal ke format digital untuk meningkatkan efisiensi akses data. Bertanggung jawab atas troubleshooting perangkat keras dan kelancaran sistem informasi internal perusahaan.",
      },
      "04": {
        role: "S1 Informatika",
        desc: "Fokus pada pengembangan sistem informasi, manajemen basis data, dan rekayasa web.",
        fullLog:
          "Mendalami struktur data, algoritma, dan arsitektur aplikasi modern. Aktif dalam pengembangan solusi teknologi yang relevan dengan kebutuhan efisiensi industri.",
      },
      "05": {
        role: "Rekayasa Perangkat Lunak (RPL)",
        desc: "Fondasi pemrograman, logika algoritma, dan siklus pengembangan perangkat lunak.",
        fullLog:
          "Mempelajari fundamental coding (HTML/CSS/JS/PHP) dan perancangan database sejak dini. Berhasil menyelesaikan berbagai proyek aplikasi web sederhana sebagai syarat kelulusan.",
      },
    } as Record<string, { role: string; desc: string; fullLog: string }>,
  },
  contact: {
    badge: "Siap berkolaborasi",
    titleTop: "Tingkatkan",
    titleBottom: "Inti Digital Anda.",
    paragraph:
      "Menyatukan arsitektur teknis yang kuat dengan desain yang intuitif. Mari diskusikan visi Anda menjadi kenyataan digital.",
    initInquiry: "Hubungi Saya",
    terminalDesc:
      "Salin alamat email atau klik tombol kirim untuk memulai percakapan langsung.",
    masterAddress: "Alamat email",
    copy: "Salin email",
    copied: "Tersalin",
    openMail: "Buka di aplikasi email",
    localTime: "Waktu lokal",
    baseLocation: "Lokasi",
    uptime: "Ketersediaan",
    latency: "Respons",
  },
  footer: {
    bio: "Membangun infrastruktur digital masa depan dengan presisi tingkat tinggi dan performa yang tidak kenal kompromi.",
    initContact: "Hubungi Saya",
    ready: "Siap Memulai Proyek?",
    readyDesc:
      "Mari berbincang dan bangun sesuatu yang berkesan bersama.",
    startProtocol: "Mulai Percakapan",
    privacy: "Kebijakan Privasi",
    backToTop: "Kembali ke Atas",
    navRoot: "Navigasi",
    archiveGroup: "Arsip",
    coreInterface: "Halaman Utama",
    laboratory: "Laboratorium",
    systemLog: "Catatan Rilis",
    knowledgeBase: "Dokumentasi",
    projects2026: "Proyek 2026",
    legacyVault: "Arsip Lama",
    sourceIndex: "Indeks Sumber",
    uiComponents: "Komponen UI",
  },
};

const en: typeof id = {
  nav: {
    links: {
      about: "About",
      services: "Services",
      work: "Work",
      experience: "Experience",
      contact: "Contact",
    },
    startProject: "START A PROJECT",
    getInTouch: "Get in touch",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
    switchLang: "Ganti ke Indonesia",
  },
  hero: {
    badge: "Available for work",
    description:
      "Building <b>digital products</b> that are clean, fast, and a joy to use — with technical rigor and an eye for design.",
    launch: "View Work",
    link: "Get in Touch",
    hud: "Scroll",
    location: "Location",
    status: "Status",
    live: "Available",
  },
  skills: {
    titleTop: "Toolbox",
    titleBottom: "& Stack",
    desc: "A blend of programming precision and creative freedom to build complete digital products.",
    tagEngineering: "Engineering",
    tagDesign: "Design",
    levels: {
      Expert: "Expert",
      Advanced: "Advanced",
      Intermediate: "Intermediate",
    },
  },
  about: {
    bgText: "ARCHITECT",
    badge: "About Architect",
    titleTop: "Crafting",
    titleBottom: "Digital Soul.",
    paragraph:
      "Not just code. I build <b>digital ecosystems</b> that merge technical precision with timeless, premium aesthetics.",
    stats: {
      projects: "Elite Projects",
      systems: "Systems Built",
      accuracy: "Design Accuracy",
    },
    base: "Base: Jakarta, IDN",
    download: "Download Resume",
    downloading: "Analysing System...",
    downloaded: "CV Acquired",
    inquiry: "Inquiry",
  },
  services: {
    label: "Core Expertise",
    titleTop: "Defined",
    titleBottom: "Future.",
    intro:
      "We fuse the art of design with engineering precision to craft unrivaled digital solutions.",
    analyze: "Analyze Case",
    capabilities: "Key Capabilities",
    impact: "Impact",
    perfIncrease: "Performance Increase",
    close: "Close Analysis",
    ctaTitle: "Start Your\nDream Project.",
    ctaSubtitle: "Consult your vision for free today.",
    connect: "Connect Now",
    items: {
      "01": {
        title: "Web Ecosystem",
        subtitle: "Web Development",
        description:
          "Building responsive web-based information systems focused on operational efficiency.",
        longDescription:
          "Implementing web solutions with HTML5, CSS3, JavaScript, Node.js, React.js, PHP, and Laravel to digitize administrative workflows and data management.",
        features: ["Responsive Design", "Clean Code", "Optimized Loading"],
        stats: "SEO Friendly",
      },
      "02": {
        title: "Data Integrity",
        subtitle: "Digital Administration",
        description:
          "Managing operational documents and databases with a high level of accuracy.",
        longDescription:
          "Handling Delivery Order (DO) documents and shipping logistics through digital systems to secure company asset data.",
        features: ["Database Management", "Zero-Error Entry", "Digital Filing"],
        stats: "100% Accuracy",
      },
      "03": {
        title: "Infra-Support",
        subtitle: "IT Support & Ops",
        description:
          "Internal IT infrastructure maintenance and hardware/software troubleshooting.",
        longDescription:
          "Ensuring smooth daily office operations through information-system maintenance and proactive technical support for users.",
        features: ["Hardware Maintenance", "System Diagnostics", "User Support"],
        stats: "Fast Response",
      },
      "04": {
        title: "Workflow Logic",
        subtitle: "System Architecture",
        description:
          "Automating conventional administrative workflows into digital, paperless flows.",
        longDescription:
          "Designing simple information-system logic that integrates procurement with centralized digital documentation.",
        features: ["Paperless Flow", "Procurement Logic", "Task Automation"],
        stats: "Efficient Ops",
      },
    },
  },
  projects: {
    tag: "Selected Work",
    titleTop: "Refined",
    titleBottom: "Systems.",
    intro:
      "Digital architecture with high-performance engineering and functional aesthetics.",
    explore: "Explore Archive",
    view: "View Project",
    items: {
      "01": {
        title: "Diva Mobile Ecosystem",
        category: "Retail Tech",
        description:
          "Inventory management and smartphone POS system to optimize digital retail business.",
      },
      "02": {
        title: "DFS Finance Tracker",
        category: "Financial Tool",
        description:
          "Personal finance management app with cash-flow tracking features.",
      },
      "03": {
        title: "MiniBank Core System",
        category: "Fintech",
        description:
          "A micro-banking system simulation handling savings-and-loan transaction logic.",
      },
      "04": {
        title: "TTSS Mobile Application",
        category: "Mobile",
        description: "Company Profile with a Mobile System.",
      },
    },
  },
  archive: {
    back: "Back",
    tag: "Project Archive",
    titleTop: "All",
    titleBottom: "Work.",
    intro:
      "A collection of projects from 2023—2026: web systems, fintech solutions, and corporate applications.",
    searchPlaceholder: "Search title or technology...",
    clearSearch: "Clear search",
    all: "All",
    noResults: "No results",
    noResultsHint: "Try a different keyword or category.",
    projectsCount: "Projects",
    categoriesCount: "Categories",
    code: "Code",
    live: "Live site",
    statuses: {
      Active: "Active",
      Beta: "Beta",
      Archived: "Archived",
    },
    items: {
      "01": {
        description:
          "Personal portfolio site with smooth animation and high performance.",
      },
      "02": {
        description:
          "Digital canteen POS with Midtrans payment integration.",
      },
      "03": {
        description:
          "Smartphone retail platform with catalog and inventory management.",
      },
      "04": {
        description:
          "Personal finance management app with cash-flow tracking.",
      },
      "05": {
        description:
          "Micro-banking system simulation for savings-and-loan transactions.",
      },
      "06": {
        description:
          "Corporate website for industrial mining logistics.",
      },
      "07": {
        description:
          "Multi-national international trade portal.",
      },
      "08": {
        description:
          "Shipping company website for fleet and cargo management.",
      },
      "09": {
        description:
          "Full e-commerce application with an integrated payment gateway.",
      },
      "10": {
        description:
          "Mobile company-profile app for a shipping company.",
      },
    },
  },
  experience: {
    tag: "Experience",
    titleTop: "History",
    titleBottom: "Encoded.",
    intro:
      "A professional track record in system development and advanced digital infrastructure architecture.",
    summary: "Summary",
    achievements: "Key Achievements",
    readLog: "Read More",
    close: "Close",
    role: "Role",
    items: {
      "01": {
        role: "Procurement & System Support",
        desc: "Managing procurement databases for goods/services and digital transaction documentation.",
        fullLog:
          "Responsible for the accuracy of the vendor and company asset database. Implemented a digital archiving system to streamline procurement audits and asset reporting.",
      },
      "02": {
        role: "Digital Administration Specialist",
        desc: "Optimizing Delivery Order (DO) management and validating export-import logistics data.",
        fullLog:
          "Managed the container document cycle with high precision. Used digital data-processing techniques to ensure manifest validity and seamless logistics coordination.",
      },
      "03": {
        role: "Administrative & IT Operations",
        desc: "Digitizing shipping administration systems and maintaining operational IT infrastructure.",
        fullLog:
          "Integrated ship document management systems into digital formats to improve data-access efficiency. Responsible for hardware troubleshooting and smooth internal information systems.",
      },
      "04": {
        role: "B.Sc. Informatics",
        desc: "Focused on information-system development, database management, and web engineering.",
        fullLog:
          "Studying data structures, algorithms, and modern application architecture. Actively developing technology solutions relevant to industrial efficiency needs.",
      },
      "05": {
        role: "Software Engineering (RPL)",
        desc: "Programming fundamentals, algorithmic logic, and the software development lifecycle.",
        fullLog:
          "Learned coding fundamentals (HTML/CSS/JS/PHP) and database design early on. Completed various simple web application projects as a graduation requirement.",
      },
    },
  },
  contact: {
    badge: "Open to collaboration",
    titleTop: "Elevate Your",
    titleBottom: "Digital Core.",
    paragraph:
      "Uniting robust technical architecture with intuitive design. Let's discuss turning your vision into digital reality.",
    initInquiry: "Get in Touch",
    terminalDesc:
      "Copy the email address or hit send to start a direct conversation.",
    masterAddress: "Email address",
    copy: "Copy email",
    copied: "Copied",
    openMail: "Open in mail app",
    localTime: "Local time",
    baseLocation: "Location",
    uptime: "Availability",
    latency: "Response",
  },
  footer: {
    bio: "Building the digital infrastructure of the future with high precision and uncompromising performance.",
    initContact: "Get in Touch",
    ready: "Ready to Start a Project?",
    readyDesc:
      "Let's talk and build something memorable together.",
    startProtocol: "Start a Conversation",
    privacy: "Privacy Policy",
    backToTop: "Back to Top",
    navRoot: "Navigation",
    archiveGroup: "Archive",
    coreInterface: "Main Pages",
    laboratory: "Laboratory",
    systemLog: "Changelog",
    knowledgeBase: "Documentation",
    projects2026: "Projects 2026",
    legacyVault: "Past Work",
    sourceIndex: "Source Index",
    uiComponents: "UI Components",
  },
};

export type Dictionary = typeof id;

export const dictionaries: Record<Lang, Dictionary> = { id, en };
