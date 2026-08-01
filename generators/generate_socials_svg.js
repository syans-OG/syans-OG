const fs = require('fs');

function createSocialSVG({ platform, label, handle, iconPath, width = 375, height = 75 }) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots-${platform}" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.7" fill="#94a3b8" opacity="0.2" />
    </pattern>
  </defs>

  <style>
    :root { color-scheme: light dark; }

    /* Light Mode (Brand #F2F0EB Card) */
    .card { fill: #F2F0EB; stroke: #D8D3C8; stroke-width: 1; transition: all 0.2s ease; }
    .icon { fill: #181614; }
    .label { font-family: system-ui, -apple-system, sans-serif; fill: #181614; font-weight: 700; font-size: 15px; }
    .handle { font-family: system-ui, -apple-system, sans-serif; fill: #78716C; font-weight: 500; font-size: 12px; }
    .arrow { fill: #78716C; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600; }

    /* Dark Mode (Brand #181614 Card) */
    @media (prefers-color-scheme: dark) {
      .card { fill: #181614; stroke: #38342E; }
      .icon { fill: #F2F0EB; }
      .label { fill: #F2F0EB; }
      .handle { fill: #A8A29E; }
      .arrow { fill: #A8A29E; }
    }
  </style>

  <!-- Bento Card Base -->
  <rect width="${width}" height="${height}" rx="18" class="card" />
  <rect width="${width}" height="${height}" rx="18" fill="url(#dots-${platform})" />

  <!-- Content Group -->
  <g transform="translate(24, 22)">
    <!-- Icon -->
    <g transform="translate(0, 2)">
      <path d="${iconPath}" class="icon" />
    </g>

    <!-- Text Info -->
    <text x="42" y="14" class="label">${label}</text>
    <text x="42" y="32" class="handle">${handle}</text>

    <!-- Top Right Arrow Indicator -->
    <text x="${width - 64}" y="20" class="arrow">&#x2197;</text>
  </g>
</svg>`;
}

const linkedinPath = "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z";

const instagramPath = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";

const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";

fs.writeFileSync('social-linkedin.svg', createSocialSVG({
  platform: 'linkedin',
  label: 'LinkedIn',
  handle: 'in/syakib',
  iconPath: linkedinPath
}));

fs.writeFileSync('social-instagram.svg', createSocialSVG({
  platform: 'instagram',
  label: 'Instagram',
  handle: '@syans_14',
  iconPath: instagramPath
}));

fs.writeFileSync('social-github.svg', createSocialSVG({
  platform: 'github',
  label: 'GitHub',
  handle: '@syans-OG',
  iconPath: githubPath
}));

console.log('Social Bento cards generated successfully!');
