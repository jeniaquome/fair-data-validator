'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  variant?: 'full' | 'compact'
}

export default function Logo({ size = 'md', showText = true, variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-sm', subtitle: 'text-[10px]' },
    md: { icon: 40, text: 'text-lg', subtitle: 'text-xs' },
    lg: { icon: 48, text: 'text-xl', subtitle: 'text-sm' },
  }

  const { icon, text, subtitle } = sizes[size]

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Logo Mark - Shield with FAIR nodes */}
      <div
        className="relative flex-shrink-0"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="fairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="33%" stopColor="#0EA5E9" />
              <stop offset="66%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Shield background */}
          <path
            d="M24 4L6 10v12c0 11.1 7.2 21.5 18 24 10.8-2.5 18-12.9 18-24V10L24 4z"
            fill="url(#brandGradient)"
          />

          {/* Inner shield highlight */}
          <path
            d="M24 8L10 13v9c0 9.2 5.9 17.8 14 19.8V8z"
            fill="white"
            fillOpacity="0.15"
          />

          {/* FAIR nodes - interconnected circles */}
          {/* F - Findable (Violet) */}
          <circle cx="17" cy="18" r="4" fill="#8B5CF6" />
          {/* A - Accessible (Sky Blue) */}
          <circle cx="31" cy="18" r="4" fill="#0EA5E9" />
          {/* I - Interoperable (Teal) */}
          <circle cx="17" cy="30" r="4" fill="#14B8A6" />
          {/* R - Reusable (Amber) */}
          <circle cx="31" cy="30" r="4" fill="#F59E0B" />

          {/* Connection lines */}
          <path
            d="M17 22v4M31 22v4M21 18h6M21 30h6M20 21l8 6M28 21l-8 6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* Center checkmark */}
          <path
            d="M20 24l3 3 5-6"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <>
          {variant === 'full' ? (
            <div className="hidden sm:block">
              <h1 className={`${text} font-bold text-slate-900`}>
                FAIR<span className="text-indigo-600">guard</span>
              </h1>
              <p className={`${subtitle} text-slate-500 -mt-0.5`}>
                Research Data Compliance Platform
              </p>
            </div>
          ) : null}
          <span className="sm:hidden text-sm font-bold text-slate-900">
            FAIR<span className="text-indigo-600">guard</span>
          </span>
        </>
      )}
    </div>
  )
}

// Standalone logo mark for favicon or small uses
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradientMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L6 10v12c0 11.1 7.2 21.5 18 24 10.8-2.5 18-12.9 18-24V10L24 4z"
        fill="url(#brandGradientMark)"
      />
      <path
        d="M24 8L10 13v9c0 9.2 5.9 17.8 14 19.8V8z"
        fill="white"
        fillOpacity="0.15"
      />
      <circle cx="17" cy="18" r="4" fill="#8B5CF6" />
      <circle cx="31" cy="18" r="4" fill="#0EA5E9" />
      <circle cx="17" cy="30" r="4" fill="#14B8A6" />
      <circle cx="31" cy="30" r="4" fill="#F59E0B" />
      <path
        d="M17 22v4M31 22v4M21 18h6M21 30h6M20 21l8 6M28 21l-8 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <path
        d="M20 24l3 3 5-6"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
