// Generates solid-color PNG placeholders for app icon / splash / adaptive-icon /
// favicon / notification icon. Phase D Task D.1 will replace each with the
// commissioned brand mark. Until then, Ahavah ships a black canvas (per the
// locked Dateasy palette in `ahavah-design-tokens/colors.ts`).
//
// Uses only Node's built-in `zlib` and `crypto` — no extra deps.

import { writeFileSync } from 'node:fs';
import { deflateSync, crc32 as zCrc32 } from 'node:zlib';

// Fallback CRC32 for older Node that lacks zlib.crc32
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  if (typeof zCrc32 === 'function') return zCrc32(buf);
  let c = 0xFFFFFFFF;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
};

const u32be = (n) => Buffer.from([n>>>24, n>>>16, n>>>8, n].map(b => b & 0xFF));

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = u32be(data.length);
  const crcBuf = u32be(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function solidPng(width, height, [r, g, b]) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  // IHDR: width, height, bit depth=8, color type=2 (RGB), compression=0, filter=0, interlace=0
  const ihdr = Buffer.concat([u32be(width), u32be(height), Buffer.from([8, 2, 0, 0, 0])]);
  // Raw scanlines: 1 filter byte (0=None) + width*3 RGB bytes per row
  const rowLen = 1 + width * 3;
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) {
    const off = y * rowLen;
    raw[off] = 0; // filter
    for (let x = 0; x < width; x++) {
      const px = off + 1 + x * 3;
      raw[px] = r; raw[px + 1] = g; raw[px + 2] = b;
    }
  }
  const idat = deflateSync(raw);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

const BLACK = [0, 0, 0];
const INDIGO = [0x55, 0x24, 0xF5]; // Persian Indigo, for adaptive-icon foreground contrast

const assets = [
  { path: 'assets/icon.png',           size: 1024, color: BLACK },
  { path: 'assets/adaptive-icon.png',  size: 1024, color: INDIGO },
  { path: 'assets/splash.png',         size: 512,  color: INDIGO },
  { path: 'assets/favicon.png',        size: 64,   color: BLACK },
  { path: 'assets/notification.png',   size: 96,   color: BLACK },
];

for (const a of assets) {
  const png = solidPng(a.size, a.size, a.color);
  writeFileSync(a.path, png);
  console.log(`wrote ${a.path} (${a.size}x${a.size}, ${png.length} bytes)`);
}
