const fs = require('fs');

let logoBase64 = '';
try {
  const logo = fs.readFileSync('logo.png');
  logoBase64 = 'data:image/png;base64,' + logo.toString('base64');
} catch (e) {
  console.log('logo.png not found, using empty string');
}

const svg = `<svg width="1180" height="610" viewBox="0 0 1180 610" xmlns="http://www.w3.org/2000/svg">
  <style>
    .key { font-family: 'Courier New', Courier, monospace; font-size: 15px; fill: #38BDF8; }
    .val { font-family: 'Courier New', Courier, monospace; font-size: 15px; fill: #F8FAFC; font-weight: bold; }
    .header { font-family: 'Courier New', Courier, monospace; font-size: 16px; fill: #94A3B8; font-weight: bold; }
    .dim { fill: #475569; }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .live-dot { animation: pulse 2s infinite; }
    .floating-logo { animation: float 5s ease-in-out infinite; }
    .frame { fill: none; stroke: #22D3EE; stroke-width: 2; }
    .line-dash { stroke: #334155; stroke-dasharray: 2,4; }
  </style>

  <!-- Background -->
  <rect width="1180" height="610" rx="15" fill="#0A101F" stroke="#22D3EE" stroke-width="1.5" />
  
  <!-- Mac Buttons -->
  <circle cx="40" cy="40" r="6" fill="#FF5F56"/>
  <circle cx="60" cy="40" r="6" fill="#FFBD2E"/>
  <circle cx="80" cy="40" r="6" fill="#27C93F"/>
  
  <!-- Terminal Title -->
  <text x="590" y="45" font-family="monospace" font-size="14" fill="#94A3B8" text-anchor="middle">syakib@frontend - % ./profile.sh --live</text>
  
  <!-- Separator -->
  <line x1="0" y1="70" x2="1180" y2="70" stroke="#1E293B" stroke-width="1.5"/>

  <!-- LEFT COLUMN: VISUAL.MAP -->
  <text x="50" y="105" font-family="monospace" font-size="12" fill="#475569" font-weight="bold">VISUAL.MAP</text>
  
  <!-- Frame Corners -->
  <path d="M 50 140 L 50 120 L 70 120" class="frame"/>
  <path d="M 430 120 L 450 120 L 450 140" class="frame"/>
  <path d="M 50 540 L 50 560 L 70 560" class="frame"/>
  <path d="M 450 540 L 450 560 L 430 560" class="frame"/>
  
  <rect x="50" y="120" width="400" height="440" fill="none" stroke="#1E293B" stroke-width="1"/>
  
  <!-- Logo (Base64) -->
  ${logoBase64 ? `<image x="100" y="190" width="300" height="300" href="${logoBase64}" class="floating-logo" />` : ''}

  <!-- RIGHT COLUMN: SYSTEM.INFO -->
  <text x="520" y="125" class="header">SYSTEM.INFO</text>
  <circle cx="1090" cy="120" r=\"4\" fill="#EF4444" class="live-dot"/>
  <text x="1105" y="125" font-family="monospace" font-size="12" fill="#EF4444">LIVE</text>

  <!-- Highlighted Name -->
  <rect x="520" y="145" width="600" height="30" rx="6" fill="#4C1D95" opacity="0.6"/>
  <text x="535" y="165" font-family="'Courier New', Courier, monospace" font-size="16" fill="#F8FAFC" font-weight="bold">syans-OG / Syakib</text>

  <!-- Key Value Pairs -->
  ${generateRow(210, 'Subject', 'Syakib')}
  ${generateRow(240, 'Role', 'Frontend Developer')}
  ${generateRow(270, 'Education', 'Mahasiswa Univ. Dian Nuswantoro')}
  ${generateRow(300, 'Status', 'Learning + Building')}
  ${generateRow(330, 'ToolChain', 'VS Code, Figma, Photoshop')}
  
  <text x="520" y="370" class="key dim">- Core.Tech</text>
  ${generateRow(400, 'Grid.Languages', 'HTML, JavaScript, Dart')}
  ${generateRow(430, 'Grid.Frameworks', 'Flutter')}
  
  <text x="520" y="470" class="key dim">- Contact</text>
  ${generateRow(500, 'Link.LinkedIn', 'linkedin.com/in/syakib')}
  ${generateRow(530, 'Link.Instagram', '@syans_14')}
  ${generateRow(560, 'Link.GitHub', 'github.com/syans-OG')}

  <text x="520" y="600" font-family="monospace" font-size="13" fill="#64748B">▶ More about me &amp; projects below in README ↓</text>
</svg>`;

function generateRow(y, key, val) {
  const keyWidth = key.length * 9;
  const valWidth = val.length * 9;
  return `
    <text x="520" y="${y}" class="key">${key}</text>
    <line x1="${520 + keyWidth + 10}" y1="${y-4}" x2="${1120 - valWidth - 10}" y2="${y-4}" class="line-dash" />
    <text x="1120" y="${y}" class="val" text-anchor="end">${val}</text>
  `;
}

fs.writeFileSync('terminal-banner.svg', svg);
console.log('SVG generated!');
