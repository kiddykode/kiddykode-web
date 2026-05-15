import os
import re
import json

input_path = r"c:\kiddykode-web\docs\YIL Campaign landingPag\variant-c.html"
output_path = r"c:\kiddykode-web\app\[locale]\programs\yil-campaign\page.tsx"

with open(input_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace standard HTML with JSX
html = html.replace('class=', 'className=')
html = html.replace('<!--', '{/*')
html = html.replace('-->', '*/}')

# Fix self closing tags
html = re.sub(r'<img(.*?)(?<!/)>', r'<img\1 />', html)
html = re.sub(r'<input(.*?)(?<!/)>', r'<input\1 />', html)
html = html.replace('<br>', '<br />')

body_match = re.search(r'<body>([\s\S]*?)</body>', html)
body_content = body_match.group(1) if body_match else html

style_match = re.search(r'<style>([\s\S]*?)</style>', html)
style_content = style_match.group(1) if style_match else ''

style_content = re.sub(r'html, body \{([\s\S]*?)\}', r'.yil-wrapper {\1}', style_content)

def style_replacer(match):
    props = [p for p in match.group(1).split(';') if p.strip()]
    react_style = {}
    for prop in props:
        parts = prop.split(':')
        if len(parts) != 2: continue
        key, value = parts
        key = key.strip()
        # camelCase
        key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
        react_style[key] = value.strip()
    return f"style={{{json.dumps(react_style)}}}"

body_content = re.sub(r'style="(.*?)"', style_replacer, body_content)

body_content = body_content.replace('stroke-width', 'strokeWidth')
body_content = body_content.replace('stroke-linecap', 'strokeLinecap')
body_content = body_content.replace('stroke-linejoin', 'strokeLinejoin')

body_content = re.sub(r'<script>[\s\S]*?</script>', '', body_content)

body_content = re.sub(r'<svg(.*?)>', lambda m: '<svg' + m.group(1).replace('fill-rule', 'fillRule').replace('clip-rule', 'clipRule') + '>', body_content)

class_map = {
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
}

for key, val in class_map.items():
    body_content = re.sub(rf'\b{key}\b', val, body_content)

opacity_map = ['bg', 'card', 'card2', 'line', 'ink', 'paper', 'fg', 'fg2', 'fg3', 'wa', 'hi', 'warn']
for color in opacity_map:
    body_content = re.sub(rf'\bbg-{color}/(\d+)\b', rf'bg-yilc-{color}/\1', body_content)
    body_content = re.sub(rf'\btext-{color}/(\d+)\b', rf'text-yilc-{color}/\1', body_content)
    body_content = re.sub(rf'\bborder-{color}/(\d+)\b', rf'border-yilc-{color}/\1', body_content)

body_content = body_content.replace('<span id="s1-days">45</span>', '{cd.s1Days}')
body_content = body_content.replace('<span id="s1-days-2">45</span>', '{cd.s1Days}')
body_content = re.sub(r'<span id="cd-mini"(.*?)>— : — : —</span>', r'<span id="cd-mini"\1>{cd.mini}</span>', body_content)
body_content = re.sub(r'<span id="cd-mini-2"(.*?)>— : — : —</span>', r'<span id="cd-mini-2"\1>{cd.mini}</span>', body_content)
body_content = re.sub(r'<div id="cd-mini-3"(.*?)>— : — : —</div>', r'<div id="cd-mini-3"\1>{cd.mini}</div>', body_content)

body_content = re.sub(r'data-cd-days(?:="[^"]*")?', '', body_content)
body_content = re.sub(r'>—</div>\s*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">DAYS</div>', r'>{cd.d}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">DAYS</div>', body_content)

body_content = re.sub(r'data-cd-hours(?:="[^"]*")?', '', body_content)
body_content = re.sub(r'>—</div>\s*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">HOURS</div>', r'>{cd.h}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">HOURS</div>', body_content)

body_content = re.sub(r'data-cd-mins(?:="[^"]*")?', '', body_content)
body_content = re.sub(r'>—</div>\s*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">MINUTES</div>', r'>{cd.m}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">MINUTES</div>', body_content)

body_content = re.sub(r'data-cd-secs(?:="[^"]*")?', '', body_content)
body_content = re.sub(r'>—</div>\s*<div className="mono text-\[10px\] text-yilc-fg2 mt-1">SECONDS</div>', r'>{cd.s}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">SECONDS</div>', body_content)

def href_replacer_with_msg(m):
    msg = m.group(1)
    return f'href={{wa("{msg}")}} target="_blank" rel="noopener"'

def href_replacer_no_msg(m):
    return f'href={{wa()}} target="_blank" rel="noopener"'

body_content = re.sub(r'href="#" data-wa(?:="")? data-msg="(.*?)"', href_replacer_with_msg, body_content)
body_content = re.sub(r'href="#" data-wa(?:="")?', href_replacer_no_msg, body_content)

body_content = re.sub(r'<img src="assets/bootcamp-photo.jpg"(.*?)/\s*>', r'<img src="/yil/bootcamp-photo.jpg"\1 />', body_content)
body_content = re.sub(r'<img src="assets/kiddykode-logo.png"(.*?)/\s*>', r'<img src="/yil/kiddykode-logo.png"\1 />', body_content)

# We need to correctly handle `{` inside style tags in React, but we are using dangerouslySetInnerHTML, so style string needs `\`` correctly handled.
# React code literal:
tsx_content = f'''"use client";
import React, {{ useEffect, useState }} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {{ Manrope, Geist_Mono, Instrument_Serif }} from 'next/font/google';

const manrope = Manrope({{ subsets: ['latin'], variable: '--font-manrope' }});
const geistMono = Geist_Mono({{ subsets: ['latin'], variable: '--font-geist-mono' }});
const instrumentSerif = Instrument_Serif({{ weight: '400', style: 'italic', subsets: ['latin'], variable: '--font-instrument-serif' }});

export default function YILCampaignVariantC() {{
  const [cd, setCd] = useState({{ d: '—', h: '—', m: '—', s: '—', s1Days: 45, mini: '— : — : —' }});

  useEffect(() => {{
    const DEADLINE = new Date('2026-06-15T23:59:59+01:00').getTime();
    const SESSION1 = new Date('2026-06-29T09:00:00+01:00').getTime();
    const tick = () => {{
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
      
      setCd({{ d: dd, h: hh, m: mm, s: ss, s1Days, mini }});
    }};
    tick();
    const int = setInterval(tick, 1000);
    return () => clearInterval(int);
  }}, []);

  const PHONE = '237680262136';
  const wa = (msg = "Hello, I want to reserve a seat for YIL Young Innovators Lab. My child is ___ years old. Please share the next steps.") => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);

  return (
    <div className={{`${{manrope.variable}} ${{geistMono.variable}} ${{instrumentSerif.variable}} yil-wrapper font-sans bg-yilc-bg text-yilc-fg antialiased min-h-screen`}}>
      <style dangerouslySetInnerHTML={{{{__html: `{style_content}`}}}} />
      {body_content}
    </div>
  );
}}
'''

os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print('Conversion complete!')
