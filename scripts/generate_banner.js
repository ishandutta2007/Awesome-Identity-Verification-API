const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814" />
      <stop offset="40%" stop-color="#0c1329" />
      <stop offset="80%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>

    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.6" />
    </linearGradient>

    <linearGradient id="laser-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.75" stroke-opacity="0.6" />
      <circle cx="40" cy="40" r="1" fill="#38bdf8" fill-opacity="0.3" />
    </pattern>

    <style>
      @keyframes pulseGlow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.04); }
      }
      @keyframes scanLine {
        0% { transform: translateY(0px); opacity: 0.2; }
        50% { opacity: 1; }
        100% { transform: translateY(180px); opacity: 0.2; }
      }
      @keyframes floatData {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes badgePulse {
        0%, 100% { stroke-opacity: 0.4; }
        50% { stroke-opacity: 0.9; }
      }
      .scan-anim {
        animation: scanLine 3.5s ease-in-out infinite;
      }
      .pulse-anim {
        animation: pulseGlow 4s ease-in-out infinite;
        transform-origin: center;
      }
      .float-anim {
        animation: floatData 5s ease-in-out infinite;
      }
      .badge-anim {
        animation: badgePulse 3s ease-in-out infinite;
      }
      .title-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-weight: 800;
        letter-spacing: -0.03em;
      }
      .body-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-weight: 500;
      }
    </style>
  </defs>

  <rect width="1200" height="420" fill="url(#bg-grad)" rx="16" />
  <rect width="1200" height="420" fill="url(#cyber-grid)" rx="16" />

  <circle cx="150" cy="100" r="180" fill="#0284c7" opacity="0.15" filter="url(#glow)" />
  <circle cx="1050" cy="220" r="220" fill="#6366f1" opacity="0.18" filter="url(#glow)" />
  <circle cx="600" cy="380" r="160" fill="#a855f7" opacity="0.12" filter="url(#glow)" />

  <g transform="translate(80, 75)">
    <rect x="0" y="0" width="240" height="270" rx="20" fill="url(#card-grad)" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.6" filter="url(#soft-glow)" />
    <path d="M 0 30 L 0 0 L 30 0" fill="none" stroke="#38bdf8" stroke-width="3" />
    <path d="M 210 0 L 240 0 L 240 30" fill="none" stroke="#38bdf8" stroke-width="3" />
    <path d="M 0 240 L 0 270 L 30 270" fill="none" stroke="#38bdf8" stroke-width="3" />
    <path d="M 210 270 L 240 270 L 240 240" fill="none" stroke="#38bdf8" stroke-width="3" />

    <g transform="translate(120, 105)">
      <circle cx="0" cy="0" r="60" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4 6" opacity="0.5" class="pulse-anim" />
      <circle cx="0" cy="0" r="45" fill="none" stroke="#818cf8" stroke-width="1.2" opacity="0.6" />
      <circle cx="0" cy="0" r="25" fill="#38bdf8" fill-opacity="0.08" stroke="#c084fc" stroke-width="1.5" />

      <path d="M -22 -15 C -22 -35, 22 -35, 22 -15 C 22 15, 12 35, 0 42 C -12 35, -22 15, -22 -15 Z" fill="none" stroke="#38bdf8" stroke-width="2" filter="url(#soft-glow)" />
      <circle cx="-9" cy="-8" r="3.5" fill="#38bdf8" filter="url(#soft-glow)" />
      <circle cx="9" cy="-8" r="3.5" fill="#38bdf8" filter="url(#soft-glow)" />
      <path d="M -1 2 L 0 10 L 4 10" fill="none" stroke="#818cf8" stroke-width="1.5" />
      <path d="M -7 20 Q 0 26 7 20" fill="none" stroke="#38bdf8" stroke-width="1.8" />

      <circle cx="-25" cy="-20" r="2" fill="#818cf8" />
      <circle cx="25" cy="-20" r="2" fill="#818cf8" />
      <circle cx="-28" cy="10" r="2" fill="#818cf8" />
      <circle cx="28" cy="10" r="2" fill="#818cf8" />
      <line x1="-25" y1="-20" x2="-9" y2="-8" stroke="#38bdf8" stroke-width="0.8" opacity="0.5" />
      <line x1="25" y1="-20" x2="9" y2="-8" stroke="#38bdf8" stroke-width="0.8" opacity="0.5" />
      <line x1="-28" y1="10" x2="-7" y2="20" stroke="#38bdf8" stroke-width="0.8" opacity="0.5" />
      <line x1="28" y1="10" x2="7" y2="20" stroke="#38bdf8" stroke-width="0.8" opacity="0.5" />
    </g>

    <rect x="25" y="195" width="190" height="6" rx="3" fill="#334155" />
    <rect x="25" y="210" width="140" height="6" rx="3" fill="#334155" />
    <rect x="25" y="225" width="170" height="6" rx="3" fill="#334155" />

    <g class="scan-anim">
      <rect x="5" y="25" width="230" height="2" fill="#38bdf8" filter="url(#glow)" />
      <polygon points="5,25 235,25 210,45 30,45" fill="url(#laser-grad)" opacity="0.35" />
    </g>

    <g transform="translate(195, 30)">
      <circle cx="0" cy="0" r="16" fill="#10b981" filter="url(#soft-glow)" />
      <path d="M -6 0 L -2 4 L 6 -4" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>

  <g transform="translate(365, 85)">
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="260" height="30" rx="15" fill="#1e293b" fill-opacity="0.8" stroke="#38bdf8" stroke-width="1" class="badge-anim" />
      <circle cx="16" cy="15" r="4" fill="#38bdf8" filter="url(#soft-glow)" />
      <text x="28" y="19.5" fill="#38bdf8" font-size="12" font-weight="700" letter-spacing="1.5" class="body-text">CURATED AWESOME STACK</text>
    </g>

    <text x="0" y="80" fill="url(#primary-grad)" font-size="44" class="title-text" filter="url(#soft-glow)">
      Awesome Identity Verification
    </text>

    <text x="0" y="122" fill="#94a3b8" font-size="18" class="body-text">
      The definitive directory of Identity Verification APIs, KYC/eKYC, Face Biometrics,
    </text>
    <text x="0" y="148" fill="#cbd5e1" font-size="18" class="body-text" font-weight="600">
      Document OCR, Liveness Detection &amp; Decentralized Identity (DID/VC)
    </text>

    <g transform="translate(0, 190)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="125" height="36" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2" />
        <text x="14" y="23" fill="#e2e8f0" font-size="13" font-weight="600" class="body-text">🔐 KYC / AML</text>
      </g>

      <g transform="translate(135, 0)">
        <rect x="0" y="0" width="165" height="36" rx="8" fill="#0f172a" stroke="#818cf8" stroke-width="1.2" />
        <text x="14" y="23" fill="#e2e8f0" font-size="13" font-weight="600" class="body-text">👤 Face Recognition</text>
      </g>

      <g transform="translate(310, 0)">
        <rect x="0" y="0" width="145" height="36" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1.2" />
        <text x="14" y="23" fill="#e2e8f0" font-size="13" font-weight="600" class="body-text">📄 Document OCR</text>
      </g>

      <g transform="translate(465, 0)">
        <rect x="0" y="0" width="145" height="36" rx="8" fill="#0f172a" stroke="#ec4899" stroke-width="1.2" />
        <text x="14" y="23" fill="#e2e8f0" font-size="13" font-weight="600" class="body-text">🛡️ Anti-Spoofing</text>
      </g>

      <g transform="translate(620, 0)">
        <rect x="0" y="0" width="140" height="36" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.2" />
        <text x="14" y="23" fill="#e2e8f0" font-size="13" font-weight="600" class="body-text">⭐ Open Source</text>
      </g>
    </g>
  </g>

  <rect x="0" y="415" width="1200" height="5" fill="url(#primary-grad)" />
</svg>`;

if (!fs.existsSync('assets')) fs.mkdirSync('assets');
fs.writeFileSync('assets/banner.svg', svg, 'utf8');
console.log('banner.svg generated successfully! File size:', fs.statSync('assets/banner.svg').size);
