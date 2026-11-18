import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// Base64 encoded thermal drone image matching aerial night IR signature
// Generates SVG vector representation converted to clean thermal sample
const thermalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#141816"/>
  <!-- Road / Canal -->
  <line x1="0" y1="340" x2="480" y2="0" stroke="#505854" stroke-width="16"/>
  <line x1="0" y1="340" x2="480" y2="0" stroke="#909894" stroke-width="4"/>
  <!-- Fence lines -->
  <line x1="50" y1="0" x2="180" y2="400" stroke="#28302C" stroke-width="2"/>
  <line x1="120" y1="0" x2="250" y2="400" stroke="#28302C" stroke-width="2"/>
  <line x1="200" y1="0" x2="330" y2="400" stroke="#28302C" stroke-width="2"/>
  <!-- Thermal Heat Signatures (6 Elephants including mother + calf clusters) -->
  <defs>
    <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="50%" stop-color="#F0F5F0" stop-opacity="0.9"/>
      <stop offset="80%" stop-color="#A0C0B0" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#141816" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Group 1: Mother + Calf #1 -->
  <ellipse cx="380" cy="290" rx="35" ry="25" fill="url(#heatGlow)"/>
  <ellipse cx="380" cy="290" rx="26" ry="18" fill="#FFFFFF"/>
  <ellipse cx="425" cy="315" rx="20" ry="15" fill="url(#heatGlow)"/>
  <ellipse cx="425" cy="315" rx="14" ry="10" fill="#FFFFFF"/>

  <!-- Group 2: Adult #2 -->
  <ellipse cx="440" cy="285" rx="28" ry="20" fill="url(#heatGlow)"/>
  <ellipse cx="440" cy="285" rx="20" ry="14" fill="#FFFFFF"/>

  <!-- Group 3: Distant Herd (3 Elephants + Calf #2) -->
  <ellipse cx="485" cy="205" rx="25" ry="18" fill="url(#heatGlow)"/>
  <ellipse cx="485" cy="205" rx="18" ry="12" fill="#FFFFFF"/>

  <ellipse cx="545" cy="225" rx="28" ry="20" fill="url(#heatGlow)"/>
  <ellipse cx="545" cy="225" rx="20" ry="14" fill="#FFFFFF"/>

  <ellipse cx="575" cy="240" rx="18" ry="14" fill="url(#heatGlow)"/>
  <ellipse cx="575" cy="240" rx="12" ry="9" fill="#FFFFFF"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'thermal_sample.svg'), thermalSvg);
console.log('Thermal SVG preset created in public/thermal_sample.svg');
