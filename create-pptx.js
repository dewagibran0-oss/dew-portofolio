const pptxgen = require("C:\\Users\\Dewa Gibran\\AppData\\Roaming\\npm\\node_modules\\pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Dewa Ahmad Gibran";
pres.title = "Portfolio - Dewa Ahmad Gibran";

// ─── Brand Colors ───
const C = {
  darkBg: "0A0A23",
  navyBg: "0F172A",
  cardBg: "1E293B",
  electricBlue: "3B82F6",
  neonCyan: "22D3EE",
  purple: "8B5CF6",
  white: "E5E7EB",
  muted: "64748B",
  green: "10B981",
  coral: "F43F5E",
  amber: "F59E0B",
};

const FONT_H = "Calibri";
const FONT_B = "Calibri";

function addCornerAccents(slide, color) {
  const c = color || C.electricBlue;
  const l = 0.3, gap = 0.15;
  // top-left
  slide.addShape(pres.shapes.LINE, { x: gap, y: gap, w: l, h: 0, line: { color: c, width: 1.5 } });
  slide.addShape(pres.shapes.LINE, { x: gap, y: gap, w: 0, h: l, line: { color: c, width: 1.5 } });
  // top-right
  slide.addShape(pres.shapes.LINE, { x: 10 - gap - l, y: gap, w: l, h: 0, line: { color: c, width: 1.5 } });
  slide.addShape(pres.shapes.LINE, { x: 10 - gap, y: gap, w: 0, h: l, line: { color: c, width: 1.5 } });
  // bottom-left
  slide.addShape(pres.shapes.LINE, { x: gap, y: 5.625 - gap, w: l, h: 0, line: { color: c, width: 1.5 } });
  slide.addShape(pres.shapes.LINE, { x: gap, y: 5.625 - gap, w: 0, h: -l, line: { color: c, width: 1.5 } });
  // bottom-right
  slide.addShape(pres.shapes.LINE, { x: 10 - gap - l, y: 5.625 - gap, w: l, h: 0, line: { color: c, width: 1.5 } });
  slide.addShape(pres.shapes.LINE, { x: 10 - gap, y: 5.625 - gap, w: 0, h: -l, line: { color: c, width: 1.5 } });
}

function addSlideNumber(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 9, y: 5.2, w: 0.8, h: 0.3,
    fontSize: 8, color: C.muted, fontFace: FONT_B, align: "right", margin: 0
  });
}

const TOTAL_SLIDES = 7;

// ════════════════════════════════════════════
// SLIDE 1: TITLE
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  addCornerAccents(s, C.neonCyan);

  // System label
  s.addText("SYS_INIT // PORTFOLIO_v2.0.4", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  // Decorative line
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 1.1, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  // Large name
  s.addText("DEWA AHMAD", {
    x: 0.6, y: 1.3, w: 8.8, h: 0.9,
    fontSize: 48, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  s.addText("GIBRAN", {
    x: 0.6, y: 2.1, w: 8.8, h: 0.9,
    fontSize: 48, color: C.electricBlue, fontFace: FONT_H, bold: true, margin: 0
  });

  // Title
  s.addText("DIGITAL ARCHITECT & WEB DEVELOPER", {
    x: 0.6, y: 3.0, w: 8.8, h: 0.4,
    fontSize: 14, color: C.neonCyan, fontFace: FONT_B, charSpacing: 4, margin: 0
  });

  // Tagline
  s.addText("Building Digital Ecosystems // Full-Stack Engineer", {
    x: 0.6, y: 3.4, w: 6, h: 0.3,
    fontSize: 11, color: C.muted, fontFace: FONT_B, margin: 0
  });

  // Status badges
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.1, w: 0.9, h: 0.3,
    fill: { color: C.green, transparency: 80 },
    line: { color: C.green, width: 0.5 }
  });
  s.addText("ACTIVE", {
    x: 0.6, y: 4.1, w: 0.9, h: 0.3,
    fontSize: 8, color: C.green, fontFace: "Consolas", align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.65, y: 4.1, w: 1.4, h: 0.3,
    fill: { color: C.electricBlue, transparency: 80 },
    line: { color: C.electricBlue, width: 0.5 }
  });
  s.addText("READY_TO_HIRE", {
    x: 1.65, y: 4.1, w: 1.4, h: 0.3,
    fontSize: 8, color: C.electricBlue, fontFace: "Consolas", align: "center", valign: "middle", margin: 0
  });

  // Location / system info
  s.addText("LOC: JAKARTA, IDN // SYS: ONLINE // UPTIME: 99.9%", {
    x: 0.6, y: 5.0, w: 6, h: 0.3,
    fontSize: 8, color: C.muted, fontFace: "Consolas", margin: 0
  });

  addSlideNumber(s, 1, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 2: ABOUT ME
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navyBg };
  addCornerAccents(s, C.purple);

  s.addText("ABOUT // PROFILE", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  // Section title
  s.addText("TENTANG SAYA", {
    x: 0.6, y: 1.0, w: 4, h: 0.5,
    fontSize: 24, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  // Photo placeholder - circle frame
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 1.7, w: 2.2, h: 2.2,
    fill: { color: C.cardBg },
    line: { color: C.purple, width: 2.5 }
  });
  s.addText("YOUR\nPHOTO\nHERE", {
    x: 0.6, y: 1.7, w: 2.2, h: 2.2,
    fontSize: 10, color: C.muted, fontFace: FONT_B, align: "center", valign: "middle", margin: 0
  });
  s.addText("(Upload foto transparan Anda)", {
    x: 0.6, y: 3.95, w: 2.2, h: 0.3,
    fontSize: 7, color: C.muted, fontFace: FONT_B, align: "center", margin: 0
  });

  // Bio
  s.addText("Halo, saya Dewa Ahmad Gibran —", {
    x: 3.2, y: 1.7, w: 6.2, h: 0.35,
    fontSize: 16, color: C.white, fontFace: FONT_H, margin: 0
  });

  s.addText([
    { text: "Seorang Digital Architect & Web Developer yang berbasis di Jakarta, Indonesia. ", options: { breakLine: true } },
    { text: "Saya membangun ekosistem digital — dari website responsif, sistem informasi, ", options: { breakLine: true } },
    { text: "hingga arsitektur backend yang scalable dan efisien.", options: {} }
  ], {
    x: 3.2, y: 2.2, w: 6.2, h: 1.2,
    fontSize: 11, color: C.muted, fontFace: FONT_B, lineSpacingMultiple: 1.4, margin: 0
  });

  // Terminal snippet
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.2, y: 3.3, w: 6.2, h: 0.8,
    fill: { color: C.darkBg }
  });
  s.addText([
    { text: "$ ", options: { color: C.green, fontFace: "Consolas" } },
    { text: "dewa-gibran --status", options: { color: C.white, fontFace: "Consolas", breakLine: true } },
    { text: "> SESSION_ACTIVE // 24+ Projects // 15 Systems // 100% Accuracy", options: { color: C.neonCyan, fontFace: "Consolas" } }
  ], {
    x: 3.4, y: 3.35, w: 5.8, h: 0.7,
    fontSize: 9, margin: 0
  });

  // Stats row
  const stats = [
    { num: "24+", label: "ELITE PROJECTS", color: C.electricBlue },
    { num: "15", label: "PRO SYSTEMS", color: C.neonCyan },
    { num: "100%", label: "ACCURACY", color: C.green },
    { num: "3+", label: "YEARS EXP", color: C.purple },
  ];
  stats.forEach((st, i) => {
    const bx = 0.6 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: 4.5, w: 2.1, h: 0.8,
      fill: { color: C.cardBg }
    });
    s.addText(st.num, {
      x: bx, y: 4.5, w: 2.1, h: 0.45,
      fontSize: 18, color: st.color, fontFace: FONT_H, bold: true, align: "center", valign: "bottom", margin: 0
    });
    s.addText(st.label, {
      x: bx, y: 4.9, w: 2.1, h: 0.3,
      fontSize: 7, color: C.muted, fontFace: "Consolas", align: "center", valign: "top", margin: 0
    });
  });

  addSlideNumber(s, 2, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 3: SKILLS & TECH STACK
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  addCornerAccents(s, C.electricBlue);

  s.addText("SKILLS // TECH STACK", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  s.addText("KEAHLIAN & TEKNOLOGI", {
    x: 0.6, y: 1.0, w: 5, h: 0.5,
    fontSize: 24, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  const skillCategories = [
    { name: "FRONTEND", color: C.electricBlue, skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "TypeScript", "Three.js", "Tailwind"] },
    { name: "BACKEND", color: C.neonCyan, skills: ["Node.js", "PHP", "Laravel", "Go"] },
    { name: "DATABASE", color: C.purple, skills: ["PostgreSQL", "MySQL", "MongoDB"] },
    { name: "MOBILE", color: C.amber, skills: ["Flutter", "Dart"] },
    { name: "TOOLS", color: C.coral, skills: ["Docker", "Git", "GitHub", "Vercel", "Figma"] },
    { name: "CREATIVE", color: C.green, skills: ["Photoshop", "Premiere Pro", "Canva", "MS Office"] },
  ];

  const cols = 3;
  const cardW = 2.8;
  const cardH = 1.55;
  const startX = 0.6;
  const gapX = 0.25;
  const startY = 1.75;
  const gapY = 0.18;

  skillCategories.forEach((cat, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cardW + gapX);
    const cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.cardBg }
    });

    // Category header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: 0.35,
      fill: { color: cat.color, transparency: 85 }
    });

    s.addText(cat.name, {
      x: cx + 0.15, y: cy, w: cardW - 0.3, h: 0.35,
      fontSize: 8, color: cat.color, fontFace: "Consolas", bold: true, valign: "middle", margin: 0
    });

    s.addText(cat.skills.join("  //  "), {
      x: cx + 0.15, y: cy + 0.4, w: cardW - 0.3, h: 1.0,
      fontSize: 9, color: C.white, fontFace: FONT_B, valign: "top", margin: 0, lineSpacingMultiple: 1.2
    });
  });

  addSlideNumber(s, 3, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 4: FEATURED PROJECTS
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navyBg };
  addCornerAccents(s, C.neonCyan);

  s.addText("PROJECTS // PORTFOLIO", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  s.addText("PROYEK PILIHAN", {
    x: 0.6, y: 1.0, w: 5, h: 0.5,
    fontSize: 24, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  const projects = [
    { name: "Diva Mobile Ecosystem", desc: "Ekosistem ritel digital modern dengan Node.js, Tailwind & Three.js", tag: "RETAIL TECH", tagColor: C.green },
    { name: "DFS Finance Tracker", desc: "Aplikasi pelacak keuangan perusahaan dengan PHP, Laravel & MySQL", tag: "FINTECH", tagColor: C.electricBlue },
    { name: "MiniBank Core System", desc: "Sistem inti perbankan mini — Laravel + MySQL + arsitektur monolith", tag: "FINTECH", tagColor: C.electricBlue },
    { name: "TTSS Mobile App", desc: "Aplikasi mobile manajemen logistik dengan Flutter & Dart", tag: "MOBILE", tagColor: C.amber },
  ];

  const projW = 4.2;
  const projH = 1.5;
  const pStartX = 0.6;
  const pStartY = 1.7;
  const pGap = 0.3;

  projects.forEach((proj, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const px = pStartX + col * (projW + pGap);
    const py = pStartY + row * (projH + pGap);

    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: projW, h: projH,
      fill: { color: C.cardBg }
    });

    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: 0.06, h: projH,
      fill: { color: proj.tagColor }
    });

    // Tag badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: px + 0.25, y: py + 0.15, w: 1.2, h: 0.22,
      fill: { color: proj.tagColor, transparency: 85 }
    });
    s.addText(proj.tag, {
      x: px + 0.25, y: py + 0.15, w: 1.2, h: 0.22,
      fontSize: 7, color: proj.tagColor, fontFace: "Consolas", align: "center", valign: "middle", margin: 0
    });

    s.addText(proj.name, {
      x: px + 0.25, y: py + 0.45, w: projW - 0.5, h: 0.35,
      fontSize: 14, color: C.white, fontFace: FONT_H, bold: true, valign: "middle", margin: 0
    });

    s.addText(proj.desc, {
      x: px + 0.25, y: py + 0.85, w: projW - 0.5, h: 0.5,
      fontSize: 9, color: C.muted, fontFace: FONT_B, valign: "top", margin: 0
    });
  });

  addSlideNumber(s, 4, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 5: EXPERIENCE
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  addCornerAccents(s, C.purple);

  s.addText("EXPERIENCE // TIMELINE", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  s.addText("PENGALAMAN KERJA", {
    x: 0.6, y: 1.0, w: 5, h: 0.5,
    fontSize: 24, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  const experiences = [
    { company: "PT. Cladhist Utama Karya", role: "Procurement & System Support", period: "2025 - Sekarang", desc: "Vendor Database Audit, Digital Archive System, Efficient Procurement" },
    { company: "PT. Sembilan Dua Delapan", role: "Digital Administration Specialist", period: "2024 - 2025", desc: "Zero-Error Documentation, DO System Optimization, Export-Import Flow" },
    { company: "PT. Tujuh Tunas Satu Samudera", role: "Admin & IT Operations", period: "2023 - Sekarang", desc: "Digital Workflow Migration, 99% Data Accuracy, Internal IT Support" },
  ];

  const expStartY = 1.75;
  const expGap = 1.2;

  experiences.forEach((exp, i) => {
    const ey = expStartY + i * expGap;

    // Timeline dot
    s.addShape(pres.shapes.OVAL, {
      x: 0.55, y: ey + 0.25, w: 0.15, h: 0.15,
      fill: { color: C.purple }
    });

    // Timeline line (connecting)
    if (i < experiences.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.61, y: ey + 0.4, w: 0.03, h: expGap - 0.2,
        fill: { color: C.purple, transparency: 70 }
      });
    }

    // Company & role
    s.addText(exp.company, {
      x: 1.0, y: ey, w: 4, h: 0.3,
      fontSize: 14, color: C.white, fontFace: FONT_H, bold: true, margin: 0
    });

    s.addText(exp.role, {
      x: 1.0, y: ey + 0.3, w: 4, h: 0.25,
      fontSize: 11, color: C.neonCyan, fontFace: FONT_B, margin: 0
    });

    s.addText(exp.period, {
      x: 1.0, y: ey + 0.55, w: 4, h: 0.2,
      fontSize: 9, color: C.purple, fontFace: "Consolas", margin: 0
    });

    s.addText(exp.desc, {
      x: 5.5, y: ey + 0.05, w: 4, h: 0.9,
      fontSize: 10, color: C.muted, fontFace: FONT_B, valign: "middle", margin: 0, lineSpacingMultiple: 1.3
    });
  });

  addSlideNumber(s, 5, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 6: EDUCATION & SERVICES
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navyBg };
  addCornerAccents(s, C.electricBlue);

  s.addText("EDUCATION // SERVICES", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  // Left: Education
  s.addText("PENDIDIKAN", {
    x: 0.6, y: 1.0, w: 4, h: 0.45,
    fontSize: 16, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  const eduBgColors = [C.electricBlue, C.purple];
  const education = [
    { school: "Universitas Bakrie", program: "S1 Informatika", year: "2024 - Sekarang", focus: "Systems Design, Fullstack Dev, Database Design" },
    { school: "SMK 17 Agustus 1945", program: "Rekayasa Perangkat Lunak", year: "2021 - 2024", focus: "Coding Basics, Software Logic" },
  ];

  education.forEach((edu, i) => {
    const ey = 1.6 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: ey, w: 0.06, h: 0.85,
      fill: { color: eduBgColors[i] }
    });
    s.addText(edu.school, {
      x: 0.85, y: ey, w: 3.5, h: 0.25,
      fontSize: 12, color: C.white, fontFace: FONT_H, bold: true, margin: 0
    });
    s.addText(edu.program + " // " + edu.year, {
      x: 0.85, y: ey + 0.25, w: 3.5, h: 0.2,
      fontSize: 9, color: C.neonCyan, fontFace: FONT_B, margin: 0
    });
    s.addText(edu.focus, {
      x: 0.85, y: ey + 0.5, w: 3.5, h: 0.25,
      fontSize: 8, color: C.muted, fontFace: FONT_B, margin: 0
    });
  });

  // Right: Services
  s.addText("LAYANAN", {
    x: 5.2, y: 1.0, w: 4, h: 0.45,
    fontSize: 16, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  const services = [
    { id: "01", name: "Ekosistem Web", desc: "Website responsif, sistem informasi, fullstack development" },
    { id: "02", name: "Integritas Data", desc: "Database management, dokumentasi, akurasi 100%" },
    { id: "03", name: "Infra-Support", desc: "IT support, hardware maintenance, system diagnostics" },
    { id: "04", name: "Logika Alur Kerja", desc: "Paperless workflow, procurement logic, automation" },
  ];

  const svcColors = [C.electricBlue, C.neonCyan, C.purple, C.amber];
  services.forEach((svc, i) => {
    const sy = 1.6 + i * 0.85;
    const sc = svcColors[i];

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: sy, w: 4.2, h: 0.7,
      fill: { color: C.cardBg }
    });

    // Number badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: sy, w: 0.5, h: 0.7,
      fill: { color: sc, transparency: 85 }
    });
    s.addText(svc.id, {
      x: 5.2, y: sy, w: 0.5, h: 0.7,
      fontSize: 14, color: sc, fontFace: FONT_H, bold: true, align: "center", valign: "middle", margin: 0
    });

    s.addText(svc.name, {
      x: 5.85, y: sy + 0.05, w: 3.4, h: 0.25,
      fontSize: 11, color: C.white, fontFace: FONT_H, bold: true, valign: "middle", margin: 0
    });
    s.addText(svc.desc, {
      x: 5.85, y: sy + 0.32, w: 3.4, h: 0.3,
      fontSize: 8, color: C.muted, fontFace: FONT_B, valign: "top", margin: 0
    });
  });

  addSlideNumber(s, 6, TOTAL_SLIDES);
}

// ════════════════════════════════════════════
// SLIDE 7: CONTACT / CLOSING
// ════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.darkBg };
  addCornerAccents(s, C.neonCyan);

  // Terminal header
  s.addText("CONTACT // SESSION_END", {
    x: 0.6, y: 0.4, w: 4, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: "Consolas", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 0.85, w: 8.8, h: 0,
    line: { color: C.cardBg, width: 0.5 }
  });

  // Let's connect text
  s.addText("MARI TERHUBUNG", {
    x: 0.6, y: 1.0, w: 8.8, h: 0.6,
    fontSize: 28, color: C.white, fontFace: FONT_H, bold: true, margin: 0
  });

  s.addText("Bangun ekosistem digital Anda bersama saya.", {
    x: 0.6, y: 1.6, w: 6, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: FONT_B, margin: 0
  });

  // Contact cards
  const contacts = [
    { label: "EMAIL", value: "dewagibran0@gmail.com", icon: "@" },
    { label: "PHONE", value: "+62 881-0250-20924", icon: "&" },
    { label: "LINKEDIN", value: "/in/dewa-gibran-393b253b2", icon: "in" },
    { label: "GITHUB", value: "/dewagibran0-oss", icon: "{}" },
    { label: "INSTAGRAM", value: "@dwaagbrnn", icon: "#" },
  ];

  const contactStartY = 2.2;
  contacts.forEach((ct, i) => {
    const cy = contactStartY + i * 0.5;

    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: cy + 0.05, w: 0.35, h: 0.35,
      fill: { color: C.cardBg },
      line: { color: C.electricBlue, width: 0.5 }
    });
    s.addText(ct.icon, {
      x: 0.6, y: cy + 0.05, w: 0.35, h: 0.35,
      fontSize: 9, color: C.neonCyan, fontFace: FONT_B, align: "center", valign: "middle", margin: 0
    });

    s.addText(ct.label, {
      x: 1.15, y: cy, w: 1.5, h: 0.2,
      fontSize: 8, color: C.muted, fontFace: "Consolas", valign: "bottom", margin: 0
    });
    s.addText(ct.value, {
      x: 1.15, y: cy + 0.18, w: 3.5, h: 0.25,
      fontSize: 12, color: C.white, fontFace: FONT_B, valign: "top", margin: 0
    });
  });

  // Right side: CTA box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 2.2, w: 4, h: 2.8,
    fill: { color: C.cardBg }
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 2.2, w: 4, h: 0.04,
    fill: { color: C.gradient1 || C.electricBlue }
  });

  s.addText("READY TO\nCOLLABORATE?", {
    x: 5.7, y: 2.5, w: 3.6, h: 0.8,
    fontSize: 20, color: C.white, fontFace: FONT_H, bold: true, valign: "middle", margin: 0
  });

  s.addText("Saya saat ini terbuka untuk\nproyek baru dan kolaborasi.\nMari diskusikan ide Anda!", {
    x: 5.7, y: 3.3, w: 3.6, h: 0.8,
    fontSize: 10, color: C.muted, fontFace: FONT_B, lineSpacingMultiple: 1.3, margin: 0
  });

  // CTA Button
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.7, y: 4.2, w: 2.5, h: 0.4,
    fill: { color: C.electricBlue }
  });
  s.addText("dewagibran0@gmail.com", {
    x: 5.7, y: 4.2, w: 2.5, h: 0.4,
    fontSize: 8, color: C.white, fontFace: "Consolas", align: "center", valign: "middle", margin: 0
  });

  // Bottom system bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.35, w: 10, h: 0.275,
    fill: { color: C.cardBg }
  });

  // System info in footer
  s.addText("SYS: PORTFOLIO_v2.0.4 // NODE: ACTIVE // LOC: JAKARTA, IDN // BUILD: 2026", {
    x: 0.6, y: 5.35, w: 8.8, h: 0.275,
    fontSize: 8, color: C.muted, fontFace: "Consolas", valign: "middle", margin: 0
  });

  addSlideNumber(s, 7, TOTAL_SLIDES);
}

// ─── WRITE ───
pres.writeFile({ fileName: "Dewa_Gibran_Portfolio.pptx" })
  .then(() => console.log("✅ Presentation created: Dewa_Gibran_Portfolio.pptx"))
  .catch(err => console.error("Error:", err));
