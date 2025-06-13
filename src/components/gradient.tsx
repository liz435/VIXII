'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        video.muted = true
        await video.play()
        console.log('Video playing successfully')
      } catch (error) {
        console.error('Video play error:', error)
      }
    }

    playVideo()

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  return (
    <div {...props} className={clsx('relative overflow-hidden', className)}>
      {/* Video element with proper styling */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/video.webm" type="video/webm" />
      </video>

      {/* Content container that sits above the video */}
      <div className="relative z-10">{props.children}</div>
    </div>
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden">
      {/* Main cloud */}
      <div
        className={clsx(
          'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
          'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#c3ffbe] from-[28%] via-[#8feed7] via-[70%] to-[#3bf9b0]',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
        style={{
          animation:
            'cloudDrift 20s linear infinite, cloudFloat 8s ease-in-out infinite',
        }}
      />

      {/* Secondary cloud for layered effect */}
      <div
        className={clsx(
          'absolute -right-80 -top-20 h-40 w-[28rem] transform-gpu md:right-20',
          'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-[#a8f5ff] from-[20%] via-[#7df3e1] via-[60%] to-[#5bead6]',
          'rotate-[15deg] rounded-full opacity-40 blur-2xl',
        )}
        style={{
          animation:
            'cloudDrift 30s linear infinite reverse, cloudFloat 12s ease-in-out infinite 2s',
        }}
      />

      <style jsx>{`
        @keyframes cloudDrift {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100px);
          }
        }

        @keyframes cloudFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          33% {
            transform: translateY(-8px);
          }
          66% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  )
}

// Alternative version with CSS-in-JS approach using Tailwind's arbitrary properties
export function GradientBackgroundTailwind() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
          'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#c3ffbe] from-[28%] via-[#8feed7] via-[70%] to-[#3bf9b0]',
          'rotate-[-10deg] rounded-full blur-3xl',
          'animate-[float_6s_ease-in-out_infinite,breathe_4s_ease-in-out_infinite_alternate]',
        )}
        style={
          {
            '--float-keyframes': `
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(-10deg); }
              50% { transform: translateY(-10px) rotate(-8deg); }
            }
          `,
            '--breathe-keyframes': `
            @keyframes breathe {
              0% { transform: scale(1) rotate(-10deg); opacity: 0.8; }
              100% { transform: scale(1.05) rotate(-12deg); opacity: 0.6; }
            }
          `,
          } as React.CSSProperties
        }
      />
    </div>
  )
}
