const fs = require('fs');

const W = 640;
const H = 320;
const NUM_FRAMES = 18;

// 64-color curated palette
const palette = [
  [8, 14, 26],     // 0: Deep background #080e1a
  [12, 19, 41],    // 1: Navy card bg #0c1329
  [30, 41, 59],    // 2: Slate-800 #1e293b
  [51, 65, 85],    // 3: Slate-700 #334155
  [71, 85, 105],   // 4: Slate-600 #475569
  [148, 163, 184], // 5: Slate-400 #94a3b8
  [203, 213, 225], // 6: Slate-300 #cbd5e1
  [241, 245, 249], // 7: Slate-100 #f1f5f9
  [255, 255, 255], // 8: White #ffffff
  [56, 189, 248],  // 9: Cyan-400 #38bdf8
  [14, 165, 233],  // 10: Sky-500 #0ea5e9
  [2, 132, 199],   // 11: Sky-600 #0284c7
  [129, 140, 248], // 12: Indigo-400 #818cf8
  [99, 102, 241],  // 13: Indigo-500 #6366f1
  [192, 132, 252], // 14: Purple-400 #c084fc
  [168, 85, 247],  // 15: Purple-500 #a855f7
  [16, 185, 129],  // 16: Emerald-500 #10b981
  [52, 211, 153],  // 17: Emerald-400 #34d399
  [239, 68, 68],   // 18: Red-500 #ef4444
  [245, 158, 11],  // 19: Amber-500 #f59e0b
  [236, 72, 153],  // 20: Pink-500 #ec4899
  [15, 23, 42],    // 21: Slate-900 #0f172a
  [24, 34, 53],    // 22: Navy border
  [20, 80, 120],   // 23: Cyan dark glow
  [60, 30, 90],    // 24: Purple dark glow
  [10, 40, 30],    // 25: Green dark glow
];

// Fill rest of 256 palette entries
while (palette.length < 256) {
  palette.push([0, 0, 0]);
}

// 5x7 Basic Bitmap Font
const FONT_5X7 = {
  ' ': [0,0,0,0,0],
  'A': [0x7E, 0x11, 0x11, 0x11, 0x7E],
  'B': [0x7F, 0x49, 0x49, 0x49, 0x36],
  'C': [0x3E, 0x41, 0x41, 0x41, 0x22],
  'D': [0x7F, 0x41, 0x41, 0x22, 0x1C],
  'E': [0x7F, 0x49, 0x49, 0x49, 0x41],
  'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3E, 0x41, 0x49, 0x49, 0x7A],
  'H': [0x7F, 0x08, 0x08, 0x08, 0x7F],
  'I': [0x00, 0x41, 0x7F, 0x41, 0x00],
  'J': [0x20, 0x40, 0x41, 0x3F, 0x01],
  'K': [0x7F, 0x08, 0x14, 0x22, 0x41],
  'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F],
  'N': [0x7F, 0x04, 0x08, 0x10, 0x7F],
  'O': [0x3E, 0x41, 0x41, 0x41, 0x3E],
  'P': [0x7F, 0x09, 0x09, 0x09, 0x06],
  'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E],
  'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
  'S': [0x46, 0x49, 0x49, 0x49, 0x31],
  'T': [0x01, 0x01, 0x7F, 0x01, 0x01],
  'U': [0x3F, 0x40, 0x40, 0x40, 0x3F],
  'V': [0x1F, 0x20, 0x40, 0x20, 0x1F],
  'W': [0x7F, 0x20, 0x18, 0x20, 0x7F],
  'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
  'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
  '0': [0x3E, 0x51, 0x49, 0x45, 0x3E],
  '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46],
  '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7F, 0x10],
  '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3C, 0x4A, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36],
  '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
  ':': [0x00, 0x36, 0x36, 0x00, 0x00],
  '.': [0x00, 0x60, 0x60, 0x00, 0x00],
  ',': [0x00, 0x80, 0x60, 0x00, 0x00],
  '-': [0x08, 0x08, 0x08, 0x08, 0x08],
  '/': [0x20, 0x10, 0x08, 0x04, 0x02],
  '[': [0x00, 0x7F, 0x41, 0x41, 0x00],
  ']': [0x00, 0x41, 0x41, 0x7F, 0x00],
  '%': [0x23, 0x13, 0x08, 0x64, 0x62],
  '*': [0x14, 0x08, 0x3E, 0x08, 0x14],
  '|': [0x00, 0x00, 0x7F, 0x00, 0x00],
  '>': [0x41, 0x22, 0x14, 0x08, 0x00],
  '<': [0x08, 0x14, 0x22, 0x41, 0x00],
};

function createFrameRenderer() {
  const buf = new Uint8Array(W * H);

  function setPixel(x, y, color) {
    if (x >= 0 && x < W && y >= 0 && y < H) {
      buf[y * W + x] = color;
    }
  }

  function fillRect(x, y, w, h, color) {
    for (let j = y; j < y + h; j++) {
      if (j < 0 || j >= H) continue;
      for (let i = x; i < x + w; i++) {
        if (i < 0 || i >= W) continue;
        buf[j * W + i] = color;
      }
    }
  }

  function drawRect(x, y, w, h, color) {
    for (let i = x; i < x + w; i++) {
      setPixel(i, y, color);
      setPixel(i, y + h - 1, color);
    }
    for (let j = y; j < y + h; j++) {
      setPixel(x, j, color);
      setPixel(x + w - 1, j, color);
    }
  }

  function drawCircle(cx, cy, r, color) {
    for (let y = -r; y <= r; y++) {
      for (let x = -r; x <= r; x++) {
        const d = Math.sqrt(x * x + y * y);
        if (Math.abs(d - r) < 0.8) {
          setPixel(cx + x, cy + y, color);
        }
      }
    }
  }

  function fillCircle(cx, cy, r, color) {
    for (let y = -r; y <= r; y++) {
      for (let x = -r; x <= r; x++) {
        if (x * x + y * y <= r * r) {
          setPixel(cx + x, cy + y, color);
        }
      }
    }
  }

  function drawText(str, startX, startY, scale, color) {
    let curX = startX;
    const upper = str.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      const ch = upper[i];
      const glyph = FONT_5X7[ch] || FONT_5X7[' '];
      for (let col = 0; col < 5; col++) {
        const bits = glyph[col];
        for (let row = 0; row < 7; row++) {
          if ((bits >> row) & 1) {
            fillRect(curX + col * scale, startY + row * scale, scale, scale, color);
          }
        }
      }
      curX += 6 * scale;
    }
  }

  return { buf, setPixel, fillRect, drawRect, drawCircle, fillCircle, drawText };
}

// Generate frames
const frames = [];
const delays = [];

for (let f = 0; f < NUM_FRAMES; f++) {
  const r = createFrameRenderer();

  // 1. Background (Total frame 640x320)
  r.fillRect(0, 0, W, H, 0); // #080e1a

  // Top and bottom 50px padding zones (darker border/gradient accent)
  r.fillRect(0, 0, W, 48, 0);
  r.fillRect(0, 272, W, 48, 0);

  // Subtle grid dots in content zone (y: 50 to 270)
  for (let gy = 54; gy < 266; gy += 18) {
    for (let gx = 10; gx < W - 10; gx += 18) {
      r.setPixel(gx, gy, 2); // subtle dot
    }
  }

  // Top accent dividing lines
  r.fillRect(20, 49, W - 40, 1, 22);
  r.fillRect(20, 270, W - 40, 1, 22);

  // 2. Left ID Scanner Card Area (x: 28 to 175, y: 62 to 258)
  const cardX = 28;
  const cardY = 62;
  const cardW = 148;
  const cardH = 196;

  r.fillRect(cardX, cardY, cardW, cardH, 1); // Card bg
  r.drawRect(cardX, cardY, cardW, cardH, 22); // Card border

  // Corner Brackets
  r.fillRect(cardX, cardY, 14, 2, 9);
  r.fillRect(cardX, cardY, 2, 14, 9);
  r.fillRect(cardX + cardW - 14, cardY, 14, 2, 9);
  r.fillRect(cardX + cardW - 2, cardY, 2, 14, 9);
  r.fillRect(cardX, cardY + cardH - 2, 14, 2, 9);
  r.fillRect(cardX, cardY + cardH - 14, 2, 14, 9);
  r.fillRect(cardX + cardW - 14, cardY + cardH - 2, 14, 2, 9);
  r.fillRect(cardX + cardW - 2, cardY + cardH - 14, 2, 14, 9);

  // Biometric Target in Card (Center at x: 102, y: 135)
  const cx = cardX + Math.floor(cardW / 2);
  const cy = cardY + 70;

  // Radar Circles
  r.drawCircle(cx, cy, 42, (f % 2 === 0) ? 9 : 12);
  r.drawCircle(cx, cy, 28, 12);
  r.drawCircle(cx, cy, 14, 14);

  // Face Silhouette Points & Wireframe
  r.fillRect(cx - 14, cy - 12, 4, 4, 9); // Left Eye
  r.fillRect(cx + 10, cy - 12, 4, 4, 9); // Right Eye
  r.fillRect(cx - 1, cy - 2, 2, 6, 12);  // Nose
  r.fillRect(cx - 8, cy + 12, 16, 2, 9); // Mouth

  // Landmark Target Crosshairs
  r.fillRect(cx - 22, cy, 6, 1, 9);
  r.fillRect(cx + 16, cy, 6, 1, 9);
  r.fillRect(cx, cy - 22, 1, 6, 9);
  r.fillRect(cx, cy + 16, 1, 6, 9);

  // Simulated MRZ / Document Data Lines
  r.fillRect(cardX + 16, cardY + 138, 116, 3, 3);
  r.fillRect(cardX + 16, cardY + 148, 90, 3, 3);
  r.fillRect(cardX + 16, cardY + 158, 106, 3, 3);

  // Status Badge inside Card
  const verifiedColor = (f > 8) ? 17 : 9;
  r.fillRect(cardX + 16, cardY + 172, 116, 16, 21);
  r.drawRect(cardX + 16, cardY + 172, 116, 16, verifiedColor);
  r.drawText((f > 8) ? 'VERIFIED' : 'SCANNING...', cardX + 28, cardY + 176, 1, verifiedColor);

  // Scanning Laser Bar (Moving smoothly up and down)
  const scanProgress = (f < NUM_FRAMES / 2) ? (f / (NUM_FRAMES / 2)) : (1 - (f - NUM_FRAMES / 2) / (NUM_FRAMES / 2));
  const laserY = Math.floor(cardY + 10 + scanProgress * (cardH - 35));

  // Laser Glow Area
  r.fillRect(cardX + 2, laserY - 2, cardW - 4, 1, 23);
  r.fillRect(cardX + 2, laserY, cardW - 4, 2, 9); // Bright cyan core
  r.fillRect(cardX + 2, laserY + 2, cardW - 4, 1, 23);

  // 3. Right Content Area (x: 195 to 620)
  const textX = 195;

  // Category Tag
  r.fillRect(textX, 64, 210, 18, 21);
  r.drawRect(textX, 64, 210, 18, 9);
  r.fillCircle(textX + 10, 73, 3, 9);
  r.drawText('IDENTITY VERIFICATION APIS', textX + 20, 69, 1, 9);

  // Main Header: "AWESOME IDENTITY"
  r.drawText('AWESOME IDENTITY', textX, 92, 2, 8);
  r.drawText('VERIFICATION', textX, 112, 2, 9);

  // Subtitle
  r.drawText('KYC - BIOMETRICS - OCR - ANTI-SPOOFING', textX, 138, 1, 14);
  r.drawText('Top Hosted SaaS APIs & Open Source Stack', textX, 154, 1, 6);

  // Feature Badges
  const bY = 176;
  // Badge 1: KYC / AML
  r.fillRect(textX, bY, 82, 20, 21);
  r.drawRect(textX, bY, 82, 20, 9);
  r.drawText('KYC / AML', textX + 12, bY + 6, 1, 7);

  // Badge 2: BIOMETRICS
  r.fillRect(textX + 90, bY, 100, 20, 21);
  r.drawRect(textX + 90, bY, 100, 20, 12);
  r.drawText('BIOMETRICS', textX + 102, bY + 6, 1, 7);

  // Badge 3: OPEN SOURCE
  r.fillRect(textX + 198, bY, 108, 20, 21);
  r.drawRect(textX + 198, bY, 108, 20, 16);
  r.drawText('OPEN SOURCE', textX + 210, bY + 6, 1, 17);

  // Real-time confidence bar
  const liveConf = Math.min(99.9, 94.0 + f * 0.35).toFixed(1);
  r.fillRect(textX, 210, 420, 38, 1);
  r.drawRect(textX, 210, 420, 38, 22);

  r.drawText('SYSTEM MATCH CONFIDENCE: ' + liveConf + '%', textX + 14, 218, 1, 5);

  // Progress Bar fill
  const barW = Math.floor(390 * (0.85 + 0.15 * (f / NUM_FRAMES)));
  r.fillRect(textX + 14, 234, 390, 6, 2);
  r.fillRect(textX + 14, 234, barW, 6, (f > 8) ? 16 : 10);

  frames.push(r.buf);
  delays.push(10); // 100ms per frame
}

// LZW GIF Encoder
function encodeGIF(width, height, frames, delays, palette) {
  const buf = [];
  function writeBytes(...bytes) { for (let b of bytes) buf.push(b & 0xff); }
  function writeWord(w) { buf.push(w & 0xff, (w >> 8) & 0xff); }
  function writeString(str) { for (let i = 0; i < str.length; i++) buf.push(str.charCodeAt(i)); }

  writeString('GIF89a');
  writeWord(width);
  writeWord(height);
  writeBytes(0xf7, 0, 0);

  for (let i = 0; i < 256; i++) {
    writeBytes(palette[i][0], palette[i][1], palette[i][2]);
  }

  writeBytes(0x21, 0xff, 0x0b);
  writeString('NETSCAPE2.0');
  writeBytes(0x03, 0x01, 0x00, 0x00, 0x00);

  const minCodeSize = 8;
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;

  for (let f = 0; f < frames.length; f++) {
    const pixels = frames[f];
    const delay = delays[f] || 10;

    writeBytes(0x21, 0xf9, 0x04, 0x04);
    writeWord(delay);
    writeBytes(0, 0);

    writeBytes(0x2c);
    writeWord(0);
    writeWord(0);
    writeWord(width);
    writeWord(height);
    writeBytes(0x00);

    writeBytes(minCodeSize);

    let codeSize = minCodeSize + 1;
    let nextCode = eoiCode + 1;
    let codeTable = new Map();

    function initTable() {
      codeTable.clear();
      codeSize = minCodeSize + 1;
      nextCode = eoiCode + 1;
    }

    let bitBuffer = 0;
    let bitCount = 0;
    let packet = [];

    function emitBit(bit) {
      bitBuffer |= (bit << bitCount);
      bitCount++;
      if (bitCount === 8) {
        packet.push(bitBuffer);
        bitBuffer = 0;
        bitCount = 0;
        if (packet.length === 254) {
          writeBytes(packet.length, ...packet);
          packet = [];
        }
      }
    }

    function emitCode(code) {
      for (let i = 0; i < codeSize; i++) {
        emitBit((code >> i) & 1);
      }
    }

    initTable();
    emitCode(clearCode);

    let prefix = '' + pixels[0];

    for (let i = 1; i < pixels.length; i++) {
      const k = pixels[i];
      const pk = prefix + ',' + k;
      if (codeTable.has(pk)) {
        prefix = pk;
      } else {
        if (prefix.includes(',')) {
          emitCode(codeTable.get(prefix));
        } else {
          emitCode(parseInt(prefix, 10));
        }

        if (nextCode < 4096) {
          codeTable.set(pk, nextCode++);
          if (nextCode > (1 << codeSize) && codeSize < 12) {
            codeSize++;
          }
        } else {
          emitCode(clearCode);
          initTable();
        }
        prefix = '' + k;
      }
    }

    if (prefix.includes(',')) {
      emitCode(codeTable.get(prefix));
    } else {
      emitCode(parseInt(prefix, 10));
    }
    emitCode(eoiCode);

    if (bitCount > 0) {
      packet.push(bitBuffer);
    }
    if (packet.length > 0) {
      writeBytes(packet.length, ...packet);
      packet = [];
    }
    writeBytes(0x00);
  }

  writeBytes(0x3b);
  return Buffer.from(buf);
}

const gifBuffer = encodeGIF(W, H, frames, delays, palette);
fs.writeFileSync('assets/social-preview.gif', gifBuffer);
console.log('social-preview.gif successfully generated!');
console.log('Dimensions:', W + 'x' + H + 'px');
console.log('File size:', (gifBuffer.length / 1024).toFixed(2) + ' KB (Limit: < 1024 KB)');
