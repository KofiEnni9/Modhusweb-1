'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Script from 'next/script'
import { 
  ArrowRight,
  Check,
  Github,
  Twitter,
  Linkedin,
  Box,
  Music,
  Play,
  Pause,
  ChevronDown,
  Layers,
  PlayCircle,
} from 'lucide-react'

import ModhusLogo from './components/logo.jsx'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

// Type declaration for Google model-viewer web component
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'shadow-intensity'?: string;
        poster?: string;
        loading?: string;
      };
    }
  }
}

// Waveform bar heights (pre-generated for visual consistency)
const WAVEFORM_BARS = [
  0.3, 0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.3, 0.7, 0.5,
  0.9, 0.4, 0.6, 0.8, 0.3, 0.7, 0.9, 0.5, 0.4, 0.8,
  0.6, 0.3, 0.7, 0.9, 0.5, 0.8, 0.4, 0.6, 0.7, 0.3,
  0.9, 0.5, 0.8, 0.6, 0.4, 0.7, 0.3, 0.9, 0.5, 0.8,
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      setAudioCurrentTime(current)
      setAudioProgress(duration ? (current / duration) * 100 : 0)
    }
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration)
    }
  }, [])

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false)
    setAudioProgress(0)
    setAudioCurrentTime(0)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleAudioEnded)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleAudioEnded)
    }
  }, [handleTimeUpdate, handleLoadedMetadata, handleAudioEnded])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const seekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioDuration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = x / rect.width
      audioRef.current.currentTime = percent * audioDuration
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Load model-viewer from Google CDN */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {/* ========== Header ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <ModhusLogo />
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToDemo}
                className="text-gray-600 hover:text-primary-600 transition-colors font-medium text-sm sm:text-base"
              >
                Demo
              </button>
              <a
                href="#waitlist"
                className="bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all font-semibold text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-600/30"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ========== Hero Section ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
          <div className="grid-overlay" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border"
            style={{
              background: 'rgba(0, 102, 204, 0.1)',
              borderColor: 'rgba(0, 102, 204, 0.3)',
            }}
          >
            <Layers className="h-5 w-5 text-blue-400" />
            <span className={`text-sm font-medium text-blue-400 ${roboto.className}`}>
              YouTube for AI Models
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] text-white mb-6">
            AI for all.
            <br />
            <span className="animated-gradient-text inline-block">
              No expertise needed
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover, run, and share AI models — from music generation to 3D creation — all from your browser.
          </p>
        </div>

        {/* Scroll Arrow */}
        <div
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 cursor-pointer animate-fade-in-up-delay-3"
          onClick={scrollToDemo}
        >
          <div className="scroll-arrow-container flex flex-col items-center gap-2 px-5 py-3 rounded-full border-2 backdrop-blur-md transition-all hover:border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="text-white font-semibold text-xs uppercase tracking-widest">
              Demo
            </span>
            <ChevronDown className="h-5 w-5 text-white scroll-arrow-icon" />
          </div>
        </div>
      </section>

      {/* ========== Demo Section ========== */}
      <section id="demo-section" className="min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6 border border-purple-200">
              <PlayCircle className="h-5 w-5 text-purple-600" />
              <span className={`text-sm font-medium text-purple-600 ${roboto.className}`}>
                Live Demo
              </span>
            </div>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 ${roboto.className}`}>
              Access AI Beyond Text
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Generated from a simple text prompt using models available on Modhus
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 3D Model Card */}
            <div className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
                <model-viewer
                  src="/assets/demo/white_mesh.glb"
                  alt="A retro car 3D model generated by AI"
                  auto-rotate=""
                  camera-controls=""
                  shadow-intensity="1"
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                  Drag to rotate
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Box className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                    3D Model
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Prompt</p>
                  <p className="text-gray-800 italic">&quot;a retro car&quot;</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-gray-200 px-3 py-1.5 rounded-full text-gray-700">
                    tencent/Hunyuan3D-2.1
                  </span>
                </div>
              </div>
            </div>

            {/* Audio / Music Card */}
            <div className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
              <div className="relative h-80 bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-8">
                {/* Waveform visualization */}
                <div className="flex items-end justify-center gap-[3px] h-28 mb-6 w-full max-w-xs">
                  {WAVEFORM_BARS.map((height, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        isPlaying 
                          ? 'waveform-bar-playing' 
                          : ''
                      }`}
                      style={{ 
                        height: `${height * 100}%`,
                        animationDelay: isPlaying ? `${i * 0.05}s` : undefined,
                        backgroundColor: (i / WAVEFORM_BARS.length) * 100 <= audioProgress 
                          ? 'rgb(147, 51, 234)' 
                          : 'rgb(216, 180, 254)',
                        opacity: audioProgress > 0 ? ((i / WAVEFORM_BARS.length) * 100 <= audioProgress ? 1 : 0.5) : 0.6,
                      }}
                    />
                  ))}
                </div>

                {/* Play button */}
                <button 
                  onClick={toggleAudio}
                  className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                </button>

                {/* Progress bar */}
                <div className="w-full max-w-xs mt-5">
                  <div 
                    className="w-full h-1.5 bg-purple-200 rounded-full cursor-pointer group/progress"
                    onClick={seekAudio}
                  >
                    <div 
                      className="h-full bg-purple-600 rounded-full relative"
                      style={{ width: `${audioProgress}%`, transition: 'width 0.1s linear' }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-mono text-purple-600">
                    <span>{formatTime(audioCurrentTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                </div>

                <audio ref={audioRef} src="/assets/demo/my_beat.wav" preload="metadata" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                    Music
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Prompt</p>
                  <p className="text-gray-800 italic">&quot;techno kick drum pattern, drum and bass breakbeat, fast tempo, energetic&quot;</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-gray-200 px-3 py-1.5 rounded-full text-gray-700">
                    facebook/musicgen-small
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Waitlist Section ========== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 ${roboto.className}`}>
            Ready to explore?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join the waitlist and be the first to access Modhus when we launch.
          </p>

          <div id="waitlist" className="max-w-md mx-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-600/30"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-400 bg-green-900/30 py-4 px-6 rounded-full border border-green-500/30">
                <Check className="h-5 w-5" />
                <span className="font-semibold">You&apos;re on the list! Check your email.</span>
              </div>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
            )}
            <p className="text-sm text-gray-500 mt-5">
              Snakes will eat you alive if you don&apos;t join the waitlist.
            </p>
          </div>
        </div>
      </section>

      {/* ========== Footer ========== */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-black">
                <ModhusLogo />
              </div>
              <p className="text-gray-400 mb-4">
                Making AI accessible to everyone. The YouTube for AI models.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#demo-section" className="hover:text-white transition">Demo</a></li>
                <li><a href="#waitlist" className="hover:text-white transition">Waitlist</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Modhus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
