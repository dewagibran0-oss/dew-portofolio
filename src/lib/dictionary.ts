/**
 * Kamus dwibahasa (ID / EN).
 * ID = sumber kebenaran bentuk (shape); EN wajib mengikuti bentuk yang sama.
 * Label bergaya "kode" (SESSION_ID, Career_Matrix, LOG_FILE, dsb) sengaja
 * dibiarkan netral-bahasa karena merupakan bagian dari estetika desain.
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
    badge: "Systems Architect // 2026.V1",
    description:
      "Mendefinisikan ulang <b>Frontier Digital</b> melalui logika otonom dan rekayasa estetika kelas elite.",
    launch: "Luncurkan Proyek",
    link: "Jalin Koneksi",
    hud: "Progress // Trace",
    location: "Lokasi",
    status: "Status",
    live: "Live",
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
    tag: "Project_Vault_2026",
    titleTop: "SISTEM",
    titleBottom: "TERANCANG.",
    intro:
      "Arsitektur digital dengan rekayasa performa tinggi dan estetika fungsional.",
    explore: "Jelajahi Arsip",
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
  experience: {
    tag: "Career_Matrix_v4.0",
    titleTop: "Riwayat",
    titleBottom: "Terekam.",
    intro:
      "Rekam jejak profesional dalam pengembangan sistem dan arsitektur infrastruktur digital tingkat lanjut.",
    summary: "Executive_Summary",
    achievements: "Key_Achievements",
    readLog: "Baca Log Lengkap",
    close: "Tutup Log",
    role: "Lead_System_Architect",
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
    badge: "Ready_to_Collaborate",
    titleTop: "Tingkatkan",
    titleBottom: "Inti Digital Anda.",
    paragraph:
      "Menyatukan arsitektur teknis yang kuat dengan desain yang intuitif. Mari diskusikan visi Anda menjadi kenyataan digital.",
    initInquiry: "Initialize_Inquiry",
    terminalDesc:
      "Sistem siap menerima instruksi. Tekan tombol salin atau klik tombol kirim untuk membuka protokol komunikasi langsung.",
    masterAddress: "Master_Address",
    copy: "COPY_UID",
    copied: "DONE",
    openMail: "Open_In_Mail_App",
    localTime: "Current_Local_Time",
    baseLocation: "Base_Location",
    uptime: "Uptime_Status",
    latency: "Global_Latency",
  },
  footer: {
    bio: "Membangun infrastruktur digital masa depan dengan presisi tingkat tinggi dan performa yang tidak kenal kompromi.",
    initContact: "Initialize_Contact",
    ready: "Siap Untuk Deployment?",
    readyDesc:
      "Buka protokol komunikasi dan mari kita bangun sesuatu yang revolusioner bersama.",
    startProtocol: "Start_Protocol",
    privacy: "Privacy_Protocol",
    backToTop: "Back_to_Root",
    navRoot: "Navigation_Root",
    archiveGroup: "Artifact_Archive",
    coreInterface: "Core_Interface",
    laboratory: "Laboratory",
    systemLog: "System_Log",
    knowledgeBase: "Knowledge_Base",
    projects2026: "Projects_2026",
    legacyVault: "Legacy_Vault",
    sourceIndex: "Source_Index",
    uiComponents: "UI_Components",
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
    badge: "Systems Architect // 2026.V1",
    description:
      "Redefining <b>Digital Frontiers</b> through autonomous logic and elite aesthetic engineering.",
    launch: "Launch Project",
    link: "Establish Link",
    hud: "Progress // Trace",
    location: "Location",
    status: "Status",
    live: "Live",
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
    tag: "Project_Vault_2026",
    titleTop: "REFINED",
    titleBottom: "SYSTEMS.",
    intro:
      "Digital architecture with high-performance engineering and functional aesthetics.",
    explore: "Explore Archive",
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
  experience: {
    tag: "Career_Matrix_v4.0",
    titleTop: "History",
    titleBottom: "Encoded.",
    intro:
      "A professional track record in system development and advanced digital infrastructure architecture.",
    summary: "Executive_Summary",
    achievements: "Key_Achievements",
    readLog: "Read Full Log",
    close: "Close Log",
    role: "Lead_System_Architect",
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
    badge: "Ready_to_Collaborate",
    titleTop: "Elevate Your",
    titleBottom: "Digital Core.",
    paragraph:
      "Uniting robust technical architecture with intuitive design. Let's discuss turning your vision into digital reality.",
    initInquiry: "Initialize_Inquiry",
    terminalDesc:
      "System ready to receive instructions. Hit copy or click send to open a direct communication protocol.",
    masterAddress: "Master_Address",
    copy: "COPY_UID",
    copied: "DONE",
    openMail: "Open_In_Mail_App",
    localTime: "Current_Local_Time",
    baseLocation: "Base_Location",
    uptime: "Uptime_Status",
    latency: "Global_Latency",
  },
  footer: {
    bio: "Building the digital infrastructure of the future with high precision and uncompromising performance.",
    initContact: "Initialize_Contact",
    ready: "Ready For Deployment?",
    readyDesc:
      "Open the communication protocol and let's build something revolutionary together.",
    startProtocol: "Start_Protocol",
    privacy: "Privacy_Protocol",
    backToTop: "Back_to_Root",
    navRoot: "Navigation_Root",
    archiveGroup: "Artifact_Archive",
    coreInterface: "Core_Interface",
    laboratory: "Laboratory",
    systemLog: "System_Log",
    knowledgeBase: "Knowledge_Base",
    projects2026: "Projects_2026",
    legacyVault: "Legacy_Vault",
    sourceIndex: "Source_Index",
    uiComponents: "UI_Components",
  },
};

export type Dictionary = typeof id;

export const dictionaries: Record<Lang, Dictionary> = { id, en };
