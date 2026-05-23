import type { ReactNode } from "react";

// Branded SVG illustrations. Each variant draws Moroccan-themed elements
// (arches, sun, kasbahs, waves, tagines, etc.) on brand-color gradients.
// Used in place of unverified stock photos.

type Tone = "coral" | "teal" | "sand" | "dark" | "sunset" | "ocean" | "dusk";

const TONES: Record<Tone, { from: string; to: string; sun: string; accent: string; ink: string }> = {
  coral:  { from: "#993C1D", to: "#D85A30", sun: "#FAECE7", accent: "#FAECE7", ink: "#FAECE7" },
  teal:   { from: "#0F6E52", to: "#1D9E75", sun: "#E1F5EE", accent: "#E1F5EE", ink: "#E1F5EE" },
  sand:   { from: "#E8DDC8", to: "#F7F3EC", sun: "#D85A30", accent: "#D85A30", ink: "#1A1A18" },
  dark:   { from: "#141412", to: "#1E1E1B", sun: "#D85A30", accent: "#D85A30", ink: "#F7F3EC" },
  sunset: { from: "#993C1D", to: "#BA7517", sun: "#FAECE7", accent: "#F7F3EC", ink: "#F7F3EC" },
  ocean:  { from: "#1D9E75", to: "#5DCAA5", sun: "#F7F3EC", accent: "#F7F3EC", ink: "#FAFAF7" },
  dusk:   { from: "#993C1D", to: "#1E1E1B", sun: "#D85A30", accent: "#D85A30", ink: "#F7F3EC" },
};

export type CoverVariant =
  // Cities
  | "city-agadir"
  | "city-marrakech"
  | "city-essaouira"
  | "city-taghazout"
  | "city-ouarzazate"
  | "city-casablanca"
  // Categories
  | "cat-restauration"
  | "cat-surf"
  | "cat-transport"
  | "cat-excursions"
  | "cat-rental"
  | "cat-wellness"
  | "cat-hotel"
  | "cat-culture"
  | "cat-shopping"
  // Steps / moments
  | "step-subscribe"
  | "step-explore"
  | "step-qr"
  | "moment-sunset"
  | "moment-hammam"
  // Partners
  | "partner-excursions"
  | "partner-hammam";

type VariantConfig = { tone: Tone; render: (c: typeof TONES[Tone]) => ReactNode };

const VARIANTS: Record<CoverVariant, VariantConfig> = {
  // ============ CITIES ============
  "city-agadir": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={520} cy={120} r={70} color={c.sun} />
        <Palm x={80} y={210} color={c.accent} />
        <Palm x={140} y={230} color={c.accent} scale={0.8} />
        <Waves y={300} color={c.ink} opacity={0.4} />
        <Waves y={340} color={c.ink} opacity={0.7} />
      </>
    ),
  },
  "city-marrakech": {
    tone: "coral",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={60} color={c.sun} />
        <Arches y={250} color={c.ink} opacity={0.85} />
        <Zellige color={c.ink} opacity={0.07} />
      </>
    ),
  },
  "city-essaouira": {
    tone: "ocean",
    render: (c) => (
      <>
        <Sun cx={510} cy={120} r={50} color={c.sun} />
        <Boat x={120} y={250} color={c.ink} />
        <Boat x={340} y={280} color={c.ink} scale={0.7} opacity={0.85} />
        <Waves y={310} color={c.ink} opacity={0.5} />
        <Waves y={345} color={c.ink} opacity={0.8} />
      </>
    ),
  },
  "city-taghazout": {
    tone: "ocean",
    render: (c) => (
      <>
        <Sun cx={510} cy={120} r={70} color={c.sun} />
        <BigWave color={c.ink} />
        <SurfBoard x={80} y={250} color={c.accent} />
      </>
    ),
  },
  "city-ouarzazate": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={520} cy={140} r={80} color={c.sun} />
        <Kasbah x={60} y={210} color={c.ink} />
        <Dunes color={c.ink} opacity={0.6} />
      </>
    ),
  },
  "city-casablanca": {
    tone: "dusk",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={55} color={c.sun} />
        <Minaret x={260} y={130} color={c.ink} />
        <Waves y={330} color={c.ink} opacity={0.55} />
        <Waves y={360} color={c.ink} opacity={0.8} />
      </>
    ),
  },

  // ============ CATEGORIES ============
  "cat-restauration": {
    tone: "coral",
    render: (c) => (
      <>
        <Sun cx={520} cy={120} r={55} color={c.sun} />
        <Tagine x={210} y={210} color={c.ink} />
        <Zellige color={c.ink} opacity={0.06} />
      </>
    ),
  },
  "cat-surf": {
    tone: "ocean",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={60} color={c.sun} />
        <BigWave color={c.ink} />
        <SurfBoard x={110} y={260} color={c.accent} />
      </>
    ),
  },
  "cat-transport": {
    tone: "dark",
    render: (c) => (
      <>
        <Sun cx={490} cy={100} r={50} color={c.sun} />
        <Road color={c.ink} />
        <Mountains color={c.ink} opacity={0.55} />
      </>
    ),
  },
  "cat-excursions": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={510} cy={130} r={75} color={c.sun} />
        <Camel x={150} y={250} color={c.ink} />
        <Camel x={320} y={270} color={c.ink} scale={0.8} opacity={0.8} />
        <Dunes color={c.ink} opacity={0.6} />
      </>
    ),
  },
  "cat-rental": {
    tone: "dark",
    render: (c) => (
      <>
        <Sun cx={500} cy={110} r={45} color={c.sun} />
        <Mountains color={c.ink} opacity={0.4} />
        <Car x={180} y={250} color={c.ink} />
        <Road color={c.ink} opacity={0.5} />
      </>
    ),
  },
  "cat-wellness": {
    tone: "teal",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={55} color={c.sun} />
        <Steam color={c.ink} />
        <Drops color={c.accent} />
        <Zellige color={c.ink} opacity={0.06} />
      </>
    ),
  },
  "cat-hotel": {
    tone: "sand",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={55} color={c.sun} />
        <Arches y={240} color={c.ink} opacity={0.85} />
        <Lantern x={520} y={250} color={c.accent} />
      </>
    ),
  },
  "cat-culture": {
    tone: "coral",
    render: (c) => (
      <>
        <Sun cx={520} cy={130} r={60} color={c.sun} />
        <Arches y={250} color={c.ink} opacity={0.9} />
        <Lantern x={130} y={230} color={c.accent} />
        <Lantern x={530} y={230} color={c.accent} />
      </>
    ),
  },
  "cat-shopping": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={520} cy={115} r={50} color={c.sun} />
        <Lantern x={110} y={210} color={c.accent} />
        <Lantern x={230} y={230} color={c.accent} />
        <Lantern x={380} y={210} color={c.accent} />
        <Lantern x={520} y={235} color={c.accent} />
        <Zellige color={c.ink} opacity={0.07} />
      </>
    ),
  },

  // ============ STEPS ============
  "step-subscribe": {
    tone: "coral",
    render: (c) => (
      <>
        <Sun cx={510} cy={110} r={60} color={c.sun} />
        <Crown x={260} y={150} color={c.ink} />
        <Zellige color={c.ink} opacity={0.06} />
      </>
    ),
  },
  "step-explore": {
    tone: "teal",
    render: (c) => (
      <>
        <Sun cx={500} cy={120} r={55} color={c.sun} />
        <Pin x={300} y={170} color={c.ink} />
        <Mountains color={c.ink} opacity={0.45} />
      </>
    ),
  },
  "step-qr": {
    tone: "dark",
    render: (c) => (
      <>
        <QrGrid x={230} y={120} color={c.ink} />
        <Sun cx={500} cy={100} r={35} color={c.sun} />
      </>
    ),
  },

  // ============ MOMENTS ============
  "moment-sunset": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={300} cy={170} r={95} color={c.sun} />
        <Waves y={290} color={c.ink} opacity={0.5} />
        <Waves y={325} color={c.ink} opacity={0.8} />
        <Tea x={460} y={245} color={c.ink} />
      </>
    ),
  },
  "moment-hammam": {
    tone: "teal",
    render: (c) => (
      <>
        <Arches y={235} color={c.ink} opacity={0.85} />
        <Steam color={c.ink} />
        <Lantern x={110} y={220} color={c.accent} />
        <Lantern x={500} y={220} color={c.accent} />
      </>
    ),
  },

  // ============ PARTNERS ============
  "partner-excursions": {
    tone: "sunset",
    render: (c) => (
      <>
        <Sun cx={500} cy={130} r={70} color={c.sun} />
        <Camel x={180} y={250} color={c.ink} />
        <Dunes color={c.ink} opacity={0.6} />
      </>
    ),
  },
  "partner-hammam": {
    tone: "teal",
    render: (c) => (
      <>
        <Arches y={235} color={c.ink} opacity={0.85} />
        <Steam color={c.ink} />
        <Lantern x={150} y={215} color={c.accent} />
        <Lantern x={460} y={215} color={c.accent} />
      </>
    ),
  },
};

export function ThemedCover({
  variant,
  className,
  rounded,
}: {
  variant: CoverVariant;
  className?: string;
  rounded?: boolean;
}) {
  const cfg = VARIANTS[variant];
  const tone = TONES[cfg.tone];
  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%", borderRadius: rounded ? 12 : 0 }}
    >
      <defs>
        <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tone.from} />
          <stop offset="100%" stopColor={tone.to} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#g-${variant})`} />
      {cfg.render(tone)}
    </svg>
  );
}

// ============================================================================
// SVG primitives
// ============================================================================

function Sun({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 1.4} fill={color} opacity={0.12} />
      <circle cx={cx} cy={cy} r={r * 1.15} fill={color} opacity={0.18} />
      <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.95} />
    </g>
  );
}

function Arches({ y, color, opacity = 1 }: { y: number; color: string; opacity?: number }) {
  const archW = 90;
  const archH = 130;
  const start = 30;
  const archCount = 7;
  return (
    <g opacity={opacity}>
      <rect x="0" y={y + archH} width="640" height={400 - y - archH} fill={color} opacity={0.6} />
      {Array.from({ length: archCount }).map((_, i) => {
        const x = start + i * (archW + 5);
        return (
          <path
            key={i}
            d={`M${x},${y + archH} L${x},${y + 40} Q${x + archW / 2},${y - 10} ${x + archW},${y + 40} L${x + archW},${y + archH} Z`}
            fill={color}
          />
        );
      })}
    </g>
  );
}

function Waves({ y, color, opacity = 1 }: { y: number; color: string; opacity?: number }) {
  return (
    <path
      d={`M0,${y} Q160,${y - 18} 320,${y} T640,${y} L640,400 L0,400 Z`}
      fill={color}
      opacity={opacity}
    />
  );
}

function BigWave({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M0,300 Q120,180 240,260 Q360,340 480,240 Q560,180 640,260 L640,400 L0,400 Z"
        fill={color}
        opacity={0.4}
      />
      <path
        d="M0,340 Q120,280 240,310 Q360,340 480,290 Q560,260 640,310 L640,400 L0,400 Z"
        fill={color}
        opacity={0.7}
      />
      <path
        d="M0,375 Q160,355 320,375 T640,375 L640,400 L0,400 Z"
        fill={color}
      />
    </g>
  );
}

function Palm({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-3" y="0" width="6" height="90" fill={color} opacity={0.85} />
      <path d="M0,0 Q-30,-25 -55,-15 Q-30,-5 0,0" fill={color} opacity={0.85} />
      <path d="M0,0 Q30,-25 55,-15 Q30,-5 0,0" fill={color} opacity={0.85} />
      <path d="M0,0 Q-25,-40 -10,-55 Q5,-40 0,0" fill={color} opacity={0.85} />
      <path d="M0,0 Q25,-40 10,-55 Q-5,-40 0,0" fill={color} opacity={0.85} />
      <path d="M0,0 Q-45,-5 -55,5 Q-30,5 0,0" fill={color} opacity={0.75} />
      <path d="M0,0 Q45,-5 55,5 Q30,5 0,0" fill={color} opacity={0.75} />
    </g>
  );
}

function Boat({ x, y, color, scale = 1, opacity = 1 }: { x: number; y: number; color: string; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <path d="M0,30 Q40,55 80,30 L70,45 Q40,55 10,45 Z" fill={color} />
      <rect x="38" y="-25" width="4" height="55" fill={color} />
      <path d="M40,-25 L80,15 L40,15 Z" fill={color} opacity={0.85} />
    </g>
  );
}

function SurfBoard({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(-15)`}>
      <ellipse cx="0" cy="0" rx="55" ry="13" fill={color} opacity={0.9} />
      <line x1="-45" y1="0" x2="45" y2="0" stroke={color} strokeOpacity={0.4} strokeWidth="1" />
    </g>
  );
}

function Kasbah({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="40" width="180" height="130" fill={color} />
      <rect x="40" y="0" width="50" height="170" fill={color} />
      <rect x="140" y="20" width="60" height="150" fill={color} />
      {/* crenellations */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((dx) => (
        <rect key={dx} x={dx} y={32} width="8" height="10" fill={color} />
      ))}
      {/* arch door */}
      <path d="M75,170 L75,135 Q85,118 95,135 L95,170 Z" fill="#1A1A18" opacity={0.5} />
    </g>
  );
}

function Minaret({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="40" width="60" height="200" fill={color} />
      <rect x="-10" y="240" width="80" height="20" fill={color} />
      <rect x="5" y="60" width="50" height="18" fill={color} opacity={0.6} />
      <rect x="5" y="100" width="50" height="18" fill={color} opacity={0.6} />
      <rect x="5" y="140" width="50" height="18" fill={color} opacity={0.6} />
      {/* top */}
      <rect x="5" y="0" width="50" height="40" fill={color} />
      <polygon points="30,-30 0,0 60,0" fill={color} />
      <circle cx="30" cy="-30" r="4" fill={color} />
    </g>
  );
}

function Camel({ x, y, color, scale = 1, opacity = 1 }: { x: number; y: number; color: string; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <path
        d="M0,60 L0,30 Q5,15 15,20 Q25,5 35,15 Q45,5 55,15 Q65,5 75,20 Q85,15 90,30 L90,60 L75,60 L75,40 L60,40 L60,60 L30,60 L30,40 L15,60 Z"
        fill={color}
      />
      <path d="M50,15 Q55,-5 65,5" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="62" cy="5" r="3" fill={color} />
    </g>
  );
}

function Dunes({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d="M0,360 Q160,300 320,340 Q480,380 640,330 L640,400 L0,400 Z" fill={color} />
      <path d="M0,385 Q200,360 400,380 T640,380 L640,400 L0,400 Z" fill={color} opacity={0.7} />
    </g>
  );
}

function Tagine({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* base */}
      <ellipse cx="110" cy="155" rx="110" ry="20" fill={color} opacity={0.85} />
      <path d="M0,150 Q110,170 220,150 L210,160 Q110,180 10,160 Z" fill={color} />
      {/* cone lid */}
      <path d="M30,150 Q110,30 190,150 Z" fill={color} />
      <circle cx="110" cy="30" r="8" fill={color} opacity={0.85} />
      {/* steam */}
      <path d="M110,15 Q105,5 110,-5 Q115,-15 110,-25" stroke={color} strokeWidth="3" fill="none" opacity={0.6} strokeLinecap="round" />
      <path d="M125,20 Q120,10 125,0 Q130,-10 125,-20" stroke={color} strokeWidth="3" fill="none" opacity={0.5} strokeLinecap="round" />
    </g>
  );
}

function Road({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d="M0,400 L260,200 L380,200 L640,400 Z" fill={color} opacity={0.5} />
      <path d="M310,200 L320,400" stroke={color} strokeWidth="6" strokeDasharray="14 12" />
    </g>
  );
}

function Mountains({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d="M0,260 L120,140 L210,220 L320,120 L430,200 L540,140 L640,210 L640,400 L0,400 Z" fill={color} />
    </g>
  );
}

function Car({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M0,40 L20,20 L70,15 L100,30 L130,30 L130,55 L0,55 Z" fill={color} />
      <circle cx="25" cy="58" r="10" fill="#1A1A18" />
      <circle cx="25" cy="58" r="4" fill={color} />
      <circle cx="105" cy="58" r="10" fill="#1A1A18" />
      <circle cx="105" cy="58" r="4" fill={color} />
      <rect x="22" y="22" width="40" height="10" fill="#1A1A18" opacity={0.45} />
    </g>
  );
}

function Steam({ color }: { color: string }) {
  return (
    <g opacity={0.45}>
      {[160, 240, 320, 400, 480].map((x, i) => (
        <path
          key={x}
          d={`M${x},${300 - i * 5} Q${x - 10},${240 - i * 8} ${x},${190 - i * 10} Q${x + 10},${140 - i * 12} ${x},${100 - i * 14}`}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

function Drops({ color }: { color: string }) {
  return (
    <g opacity={0.85}>
      {[
        [200, 220], [260, 260], [320, 230], [380, 280], [440, 245],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x},${y} Q${x - 6},${y + 10} ${x},${y + 16} Q${x + 6},${y + 10} ${x},${y} Z`}
          fill={color}
        />
      ))}
    </g>
  );
}

function Lantern({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="15" y1="0" x2="15" y2="-30" stroke={color} strokeWidth="2" opacity={0.7} />
      <path d="M0,5 Q15,-5 30,5 L25,45 Q15,55 5,45 Z" fill={color} opacity={0.95} />
      <rect x="8" y="48" width="14" height="6" fill={color} />
      <rect x="10" y="56" width="10" height="4" fill={color} />
      <circle cx="15" cy="25" r="4" fill="#1A1A18" opacity={0.35} />
    </g>
  );
}

function Crown({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M0,60 L20,10 L45,40 L70,5 L95,40 L120,10 L140,60 Z"
        fill={color}
      />
      <rect x="0" y="60" width="140" height="20" fill={color} opacity={0.9} />
      <circle cx="20" cy="10" r="6" fill={color} />
      <circle cx="70" cy="5" r="6" fill={color} />
      <circle cx="120" cy="10" r="6" fill={color} />
    </g>
  );
}

function Pin({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M30,0 Q0,0 0,30 Q0,55 30,90 Q60,55 60,30 Q60,0 30,0 Z"
        fill={color}
      />
      <circle cx="30" cy="30" r="12" fill="#1A1A18" opacity={0.35} />
    </g>
  );
}

function QrGrid({ x, y, color }: { x: number; y: number; color: string }) {
  // Pseudo-random but deterministic pattern
  const cells: [number, number][] = [];
  let seed = 7;
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 11; c++) {
      seed = (seed * 9301 + 49297) % 233280;
      if (seed / 233280 > 0.45) cells.push([r, c]);
    }
  }
  const cell = 16;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width={11 * cell} height={11 * cell} fill={color} opacity={0.12} />
      {cells.map(([r, c], i) => (
        <rect key={i} x={c * cell} y={r * cell} width={cell - 2} height={cell - 2} fill={color} />
      ))}
      {/* finder squares */}
      {[
        [0, 0], [0, 7], [7, 0],
      ].map(([r, c], i) => (
        <g key={i} transform={`translate(${c * cell},${r * cell})`}>
          <rect width={cell * 4 - 2} height={cell * 4 - 2} fill="none" stroke={color} strokeWidth="4" />
          <rect x={cell} y={cell} width={cell * 2 - 2} height={cell * 2 - 2} fill={color} />
        </g>
      ))}
    </g>
  );
}

function Tea({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* teapot */}
      <path d="M0,50 Q0,15 50,15 Q100,15 100,50 L95,80 Q90,95 50,95 Q10,95 5,80 Z" fill={color} />
      <path d="M95,40 Q120,40 130,55" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M5,40 Q-15,40 -25,55 Q-15,55 5,55" fill={color} />
      <circle cx="50" cy="10" r="6" fill={color} />
      <path d="M50,15 L52,5" stroke={color} strokeWidth="2" />
      {/* steam */}
      <path d="M40,5 Q35,-5 40,-15" stroke={color} strokeWidth="3" fill="none" opacity={0.5} strokeLinecap="round" />
      <path d="M60,5 Q65,-5 60,-15" stroke={color} strokeWidth="3" fill="none" opacity={0.5} strokeLinecap="round" />
    </g>
  );
}

function Zellige({ color, opacity = 0.06 }: { color: string; opacity?: number }) {
  // Subtle Moroccan-tile pattern overlay
  const size = 40;
  const cols = Math.ceil(640 / size);
  const rows = Math.ceil(400 / size);
  return (
    <g opacity={opacity}>
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const x = c * size;
          const y = r * size;
          return (
            <g key={`${r}-${c}`} transform={`translate(${x},${y})`}>
              <path
                d={`M${size / 2},2 L${size - 2},${size / 2} L${size / 2},${size - 2} L2,${size / 2} Z`}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
              />
            </g>
          );
        })
      )}
    </g>
  );
}
