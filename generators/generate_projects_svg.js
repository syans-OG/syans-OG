const fs = require('fs');

const svg = `<svg width="1180" height="290" viewBox="0 0 1180 290" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots-projects" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.8" fill="#94a3b8" opacity="0.25" />
    </pattern>
  </defs>

  <style>
    :root { color-scheme: light dark; }

    /* Light Mode (Seamless GitHub #ffffff Canvas + Brand #F2F0EB Bento Cards + #D76F55 Terracotta Accent) */
    .bg { fill: #ffffff; }
    .card { fill: #F2F0EB; stroke: #D8D3C8; stroke-width: 1; transition: stroke 0.3s ease; }
    .title { font-family: system-ui, -apple-system, sans-serif; fill: #181614; font-weight: 800; }
    .subtitle { font-family: system-ui, -apple-system, sans-serif; fill: #78716C; font-weight: 700; }
    .project-title { font-family: system-ui, -apple-system, sans-serif; fill: #181614; font-weight: 700; }
    .project-desc { font-family: system-ui, -apple-system, sans-serif; fill: #78716C; font-weight: 500; }
    .pill { fill: #E8E4DB; stroke: #D8D3C8; stroke-width: 1; }
    .pill-text { fill: #181614; font-family: system-ui, sans-serif; font-weight: 600; }
    .icon-box { fill: #D76F55; }
    .icon-text { fill: #ffffff; font-family: system-ui, sans-serif; font-weight: 800; }
    .dot-accent { fill: #D76F55; }
    .arrow-icon { stroke: #D76F55; }

    /* Dark Mode (Seamless GitHub #0d1117 Canvas + Brand #181614 Bento Cards + #D76F55 Terracotta Accent) */
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0d1117; }
      .card { fill: #181614; stroke: #38342E; }
      .title { fill: #F2F0EB; }
      .subtitle { fill: #A8A29E; }
      .project-title { fill: #F2F0EB; }
      .project-desc { fill: #A8A29E; }
      .pill { fill: #2A2723; stroke: #38342E; }
      .pill-text { fill: #F2F0EB; }
      .icon-box { fill: #D76F55; }
      .icon-text { fill: #ffffff; }
      .dot-accent { fill: #D76F55; }
      .arrow-icon { stroke: #D76F55; }
    }

    .card-group:hover .card { stroke: #8b949e; }
    .card-group:hover .arrow-g { transform: translateX(6px); }
    .arrow-g { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  </style>

  <!-- Canvas Background -->
  <rect width="1180" height="290" class="bg" />
  <rect width="1180" height="290" fill="url(#dots-projects)" />

  <!-- Section Header -->
  <circle cx="46" cy="30" r="4" class="dot-accent" />
  <text x="60" y="34" class="subtitle" font-size="12" letter-spacing="3">02 \u2014 SELECTED WORKS</text>

  <!-- ═══════════════════════════════════════════ -->
  <!-- PROJECT 1: Miles Music App                 -->
  <!-- ═══════════════════════════════════════════ -->
  <a href="https://github.com/syans-OG/Miles-Music-App" target="_blank" class="card-group">
    <g transform="translate(40, 55)">
      <rect width="535" height="195" rx="24" class="card" />

      <!-- App Icon Box -->
      <rect x="30" y="30" width="44" height="44" rx="12" class="icon-box" />
      <text x="52" y="58" class="icon-text" font-size="20" text-anchor="middle">M</text>

      <!-- Titles -->
      <text x="88" y="48" class="project-title" font-size="22">Miles Music App</text>
      <text x="88" y="68" class="subtitle" font-size="12" opacity="0.7">Desktop Music Player</text>

      <!-- Description -->
      <text x="30" y="112" class="project-desc" font-size="14">A lightweight Windows desktop music player with vinyl interface.</text>

      <!-- Badges -->
      <g transform="translate(30, 138)">
        <rect x="0" y="0" width="65" height="28" rx="14" class="pill" />
        <text x="32.5" y="18" class="pill-text" font-size="11" text-anchor="middle">Tauri</text>

        <rect x="75" y="0" width="55" height="28" rx="14" class="pill" />
        <text x="102.5" y="18" class="pill-text" font-size="11" text-anchor="middle">Rust</text>

        <rect x="140" y="0" width="60" height="28" rx="14" class="pill" />
        <text x="170" y="18" class="pill-text" font-size="11" text-anchor="middle">React</text>
      </g>

      <!-- Arrow -->
      <g class="arrow-g" transform="translate(480, 40)">
        <line x1="0" y1="0" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="-6" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="6" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </a>

  <!-- ═══════════════════════════════════════════ -->
  <!-- PROJECT 2: Laris.in                        -->
  <!-- ═══════════════════════════════════════════ -->
  <a href="https://github.com/syans-OG/Laris.in" target="_blank" class="card-group">
    <g transform="translate(605, 55)">
      <rect width="535" height="195" rx="24" class="card" />

      <!-- App Icon Box -->
      <rect x="30" y="30" width="44" height="44" rx="12" class="icon-box" />
      <text x="52" y="58" class="icon-text" font-size="20" text-anchor="middle">L</text>

      <!-- Titles -->
      <text x="88" y="48" class="project-title" font-size="22">Laris.in</text>
      <text x="88" y="68" class="subtitle" font-size="12" opacity="0.7">POS Cashier Solution</text>

      <!-- Description -->
      <text x="30" y="112" class="project-desc" font-size="14">A seamless POS System app tailored for modern cashiers.</text>

      <!-- Badges -->
      <g transform="translate(30, 138)">
        <rect x="0" y="0" width="75" height="28" rx="14" class="pill" />
        <text x="37.5" y="18" class="pill-text" font-size="11" text-anchor="middle">Flutter</text>

        <rect x="85" y="0" width="60" height="28" rx="14" class="pill" />
        <text x="115" y="18" class="pill-text" font-size="11" text-anchor="middle">Dart</text>

        <rect x="155" y="0" width="65" height="28" rx="14" class="pill" />
        <text x="187.5" y="18" class="pill-text" font-size="11" text-anchor="middle">SQLite</text>
      </g>

      <!-- Arrow -->
      <g class="arrow-g" transform="translate(480, 40)">
        <line x1="0" y1="0" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="-6" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="6" x2="16" y2="0" class="arrow-icon" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </a>
</svg>`;

fs.writeFileSync('projects.svg', svg);
console.log('projects.svg generated! (Unified Bento Design)');
