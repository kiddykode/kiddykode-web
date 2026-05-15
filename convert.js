const fs = require('fs');
const path = require('path');

const inputPath = path.join('c:', 'kiddykode-web', 'docs', 'YIL Campaign landingPag', 'variant-c.html');
const outputPath = path.join('c:', 'kiddykode-web', 'app', '[locale]', 'programs', 'yil-campaign', 'page.tsx');

let html = fs.readFileSync(inputPath, 'utf-8');

html = html.replace(/class=/g, 'className=');
html = html.replace(/<!--/g, '{/*');
html = html.replace(/-->/g, '*/}');
html = html.replace(/<img(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
});
html = html.replace(/<input(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
});
html = html.replace(/<br>/g, '<br />');

const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : html;

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let styleContent = styleMatch ? styleMatch[1] : '';

styleContent = styleContent.replace(/html, body \{([\s\S]*?)\}/, '.yil-wrapper {$1}');
styleContent = styleContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

bodyContent = bodyContent.replace(/style="(.*?)"/g, (match, p1) => {
    const props = p1.split(';').filter(p => p.trim());
    const reactStyle = {};
    props.forEach(prop => {
        let [key, value] = prop.split(':');
        if (!key || !value) return;
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        reactStyle[key] = value.trim();
    });
    return 'style={' + JSON.stringify(reactStyle) + '}';
});

bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');

bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '');

bodyContent = bodyContent.replace(/<svg(.*?)>/g, (match) => {
    return match.replace(/fill-rule="[^"]*"/, '').replace(/clip-rule="[^"]*"/, '');
});

const classMap = {
    'bg-bg': 'bg-yilc-bg', 'bg-card': 'bg-yilc-card', 'bg-card2': 'bg-yilc-card2',
    'bg-line': 'bg-yilc-line', 'bg-paper': 'bg-yilc-paper', 'bg-wa': 'bg-yilc-wa',
    'bg-hi': 'bg-yilc-hi', 'bg-warn': 'bg-yilc-warn', 'bg-fg2': 'bg-yilc-fg2',
    'text-bg': 'text-yilc-bg', 'text-ink': 'text-yilc-ink', 'text-fg': 'text-yilc-fg',
    'text-fg2': 'text-yilc-fg2', 'text-fg3': 'text-yilc-fg3', 'text-wa': 'text-yilc-wa',
    'text-hi': 'text-yilc-hi', 'text-warn': 'text-yilc-warn', 'border-line': 'border-yilc-line',
    'border-bg': 'border-yilc-bg', 'border-wa': 'border-yilc-wa', 'border-hi': 'border-yilc-hi',
    'border-warn': 'border-yilc-warn', 'border-fg3': 'border-yilc-fg3', 'divide-line': 'divide-yilc-line',
    'decoration-fg3': 'decoration-yilc-fg3', 'tracking-tightish': 'tracking-yilc-tightish',
    'tracking-tighter2': 'tracking-yilc-tighter2', 'tracking-tighter3': 'tracking-yilc-tighter3',
};

for (const [key, val] of Object.entries(classMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    bodyContent = bodyContent.replace(regex, val);
}

const opacityMap = ['bg', 'card', 'card2', 'line', 'ink', 'paper', 'fg', 'fg2', 'fg3', 'wa', 'hi', 'warn'];
opacityMap.forEach(color => {
    bodyContent = bodyContent.replace(new RegExp(`\\bbg-${color}\\/(\\d+)\\b`, 'g'), `bg-yilc-${color}/$1`);
    bodyContent = bodyContent.replace(new RegExp(`\\btext-${color}\\/(\\d+)\\b`, 'g'), `text-yilc-${color}/$1`);
    bodyContent = bodyContent.replace(new RegExp(`\\bborder-${color}\\/(\\d+)\\b`, 'g'), `border-yilc-${color}/$1`);
});

bodyContent = bodyContent.replace(/<span id="s1-days">45<\/span>/g, '{cd.s1Days}');
bodyContent = bodyContent.replace(/<span id="s1-days-2">45<\/span>/g, '{cd.s1Days}');
bodyContent = bodyContent.replace(/<span id="cd-mini"(.*?)>— : — : —<\/span>/g, '<span id="cd-mini"$1>{cd.mini}</span>');
bodyContent = bodyContent.replace(/<span id="cd-mini-2"(.*?)>— : — : —<\/span>/g, '<span id="cd-mini-2"$1>{cd.mini}</span>');
bodyContent = bodyContent.replace(/<div id="cd-mini-3"(.*?)>— : — : —<\/div>/g, '<div id="cd-mini-3"$1>{cd.mini}</div>');

bodyContent = bodyContent.replace(/data-cd-days(="[^"]*")?/g, '');
bodyContent = bodyContent.replace(/>—<\/div>[\s\n]*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">DAYS<\/div>/g, '>{cd.d}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">DAYS</div>');

bodyContent = bodyContent.replace(/data-cd-hours(="[^"]*")?/g, '');
bodyContent = bodyContent.replace(/>—<\/div>[\s\n]*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">HOURS<\/div>/g, '>{cd.h}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">HOURS</div>');

bodyContent = bodyContent.replace(/data-cd-mins(="[^"]*")?/g, '');
bodyContent = bodyContent.replace(/>—<\/div>[\s\n]*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">MINUTES<\/div>/g, '>{cd.m}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">MINUTES</div>');

bodyContent = bodyContent.replace(/data-cd-secs(="[^"]*")?/g, '');
bodyContent = bodyContent.replace(/>—<\/div>[\s\n]*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">SECONDS<\/div>/g, '>{cd.s}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">SECONDS</div>');

bodyContent = bodyContent.replace(/href="#" data-wa(="")? data-msg="(.*?)"/g, (m, p1, p2) => 'href={wa("' + p2 + '")} target="_blank" rel="noopener"');
bodyContent = bodyContent.replace(/href="#" data-wa(="")?/g, 'href={wa()} target="_blank" rel="noopener"');

bodyContent = bodyContent.replace(/<img src="assets\/bootcamp-photo.jpg"(.*?)\/>/g, '<img src="/yil/bootcamp-photo.jpg"$1/>');
bodyContent = bodyContent.replace(/<img src="assets\/kiddykode-logo.png"(.*?)\/>/g, '<img src="/yil/kiddykode-logo.png"$1/>');

const tsxContent = `"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Manrope, Geist_Mono, Instrument_Serif } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const instrumentSerif = Instrument_Serif({ weight: '400', style: 'italic', subsets: ['latin'], variable: '--font-instrument-serif' });

export default function YILCampaignVariantC() {
  const [cd, setCd] = useState({ d: '—', h: '—', m: '—', s: '—', s1Days: 45, mini: '— : — : —' });

  useEffect(() => {
    const DEADLINE = new Date('2026-06-15T23:59:59+01:00').getTime();
    const SESSION1 = new Date('2026-06-29T09:00:00+01:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, DEADLINE - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const dd = String(d).padStart(2,'0');
      const hh = String(h).padStart(2,'0');
      const mm = String(m).padStart(2,'0');
      const ss = String(s).padStart(2,'0');
      const mini = dd + ':' + hh + ':' + mm + ':' + ss;
      const s1Days = Math.max(0, Math.ceil((SESSION1 - now) / 86400000));
      
      setCd({ d: dd, h: hh, m: mm, s: ss, s1Days, mini });
    };
    tick();
    const int = setInterval(tick, 1000);
    return () => clearInterval(int);
  }, []);

  const PHONE = '237680262136';
  const wa = (msg = "Hello, I want to reserve a seat for YIL Young Innovators Lab. My child is ___ years old. Please share the next steps.") => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);

  return (
    <div className={\`\${manrope.variable} \${geistMono.variable} \${instrumentSerif.variable} yil-wrapper font-sans bg-yilc-bg text-yilc-fg antialiased min-h-screen\`}>
      <style dangerouslySetInnerHTML={{__html: \`${styleContent}\`}} />
      ${bodyContent}
    </div>
  );
}
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, tsxContent);
console.log('Conversion complete!');
`;
