// Generated cover art used until real screenshots are added in content.js.

const nodes = [
  [120, 250], [260, 130], [270, 360], [420, 230], [430, 420],
  [560, 110], [590, 320], [700, 210], [720, 410], [400, 70],
]
const edges = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6],
  [5, 7], [6, 7], [6, 8], [1, 9], [9, 5],
]
const hot = new Set([0, 3, 6, 7])

function Graph() {
  return (
    <>
      <rect width="800" height="500" fill="#141414" />
      <circle cx="420" cy="250" r="300" fill="url(#glow)" />
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          {hot.has(i) && <circle cx={x} cy={y} r="22" fill="#ff5e00" fillOpacity="0.18" />}
          <circle cx={x} cy={y} r={hot.has(i) ? 10 : 6} fill={hot.has(i) ? '#ff5e00' : '#ffffff'} />
        </g>
      ))}
    </>
  )
}

function Rings() {
  return (
    <>
      <rect width="800" height="500" fill="#ff5e00" />
      {[60, 130, 200, 270, 340, 410, 480].map((r) => (
        <circle key={r} cx="620" cy="120" r={r} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" />
      ))}
      <circle cx="620" cy="120" r="26" fill="#0d0d0d" />
    </>
  )
}

const bars = [140, 210, 170, 260, 230, 310, 280, 360, 330, 400]

function Bars() {
  return (
    <>
      <rect width="800" height="500" fill="#141414" />
      <circle cx="560" cy="420" r="320" fill="url(#glow)" />
      {[120, 220, 320, 420].map((y) => (
        <line key={y} x1="70" x2="730" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.08" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={84 + i * 66} y={440 - h} width="40" height={h} rx="10" fill={i >= 7 ? '#ff5e00' : '#ffffff'} fillOpacity={i >= 7 ? 1 : 0.16} />
      ))}
    </>
  )
}

function Dots() {
  const dots = []
  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 18; col++) {
      const x = 60 + col * 40
      const y = 50 + row * 40
      const d = Math.hypot(x - 300, y - 270)
      const near = d < 130
      dots.push(
        <circle key={`${row}-${col}`} cx={x} cy={y} r={near ? 7 : 3.5} fill={near ? '#ff5e00' : '#ffffff'} fillOpacity={near ? 1 - d / 190 : 0.22} />,
      )
    }
  }
  return (
    <>
      <rect width="800" height="500" fill="#141414" />
      <circle cx="300" cy="270" r="300" fill="url(#glow)" />
      {dots}
      <circle cx="300" cy="270" r="150" fill="none" stroke="#ff5e00" strokeOpacity="0.5" strokeDasharray="4 8" />
    </>
  )
}

const variants = { graph: Graph, rings: Rings, bars: Bars, dots: Dots }

export default function Visual({ variant = 'graph', image, alt = '', className = '' }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" decoding="async" className={`size-full object-cover ${className}`} />
  }
  const Art = variants[variant] ?? Graph
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={`size-full ${className}`} role="img" aria-label={alt}>
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ff5e00" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff5e00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Art />
    </svg>
  )
}
