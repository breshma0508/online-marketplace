"use client"

export default function BhaLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="bhaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#2E7D32", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1B5E20", stopOpacity: 1 }} />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer decorative circle */}
      <circle cx="20" cy="20" r="19" fill="url(#bhaGradient)" filter="url(#shadow)" />
      <circle cx="20" cy="20" r="18" fill="none" stroke="#E8F5E9" strokeWidth="1" opacity="0.6" />

      {/* Inner decorative petals (mandala style) */}
      <g opacity="0.3" fill="#E8F5E9">
        <circle cx="20" cy="8" r="1.5" />
        <circle cx="28.5" cy="11.5" r="1.5" />
        <circle cx="31.5" cy="20" r="1.5" />
        <circle cx="28.5" cy="28.5" r="1.5" />
        <circle cx="20" cy="32" r="1.5" />
        <circle cx="11.5" cy="28.5" r="1.5" />
        <circle cx="8.5" cy="20" r="1.5" />
        <circle cx="11.5" cy="11.5" r="1.5" />
      </g>

      {/* Hindi "भ" character - stylized */}
      <text
        x="20"
        y="26"
        fontSize="24"
        fontWeight="bold"
        fill="#E8F5E9"
        textAnchor="middle"
        fontFamily="serif"
        letterSpacing="0"
      >
        भ
      </text>

      {/* Decorative lines */}
      <line x1="12" y1="20" x2="16" y2="20" stroke="#E8F5E9" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="20" x2="28" y2="20" stroke="#E8F5E9" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}
