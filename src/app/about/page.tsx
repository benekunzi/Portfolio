'use client'

import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import StackIcon from 'tech-stack-icons'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { JOBS, HOVER_IMAGES } from '@/lib/data'
import CursorImages from '@/components/cursor-images'

// Reusable Section Component that handles the snapping
const SnapSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && entry) {
      // Smoothly snap to this section when it becomes the dominant one
      // We use a small timeout to ensure it doesn't fight active scrolling too aggressively
      const timer = setTimeout(() => {
        entry.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [inView, entry])

  return (
    <section
      ref={ref}
      className={`min-h-screen w-full flex items-center justify-center ${className}`}
    >
      {children}
    </section>
  )
}

import { useCursor } from '@/context/cursor-context'

// Combined Intro Section: Split text transition with scaling image
const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTargetRef = useRef<HTMLDivElement>(null)
  const { setCursorType, resetCursor } = useCursor()

  // Calculate age in real-time
  const calculateAge = () => {
    const birthDate = new Date('1999-07-29')
    const today = new Date()
    const diffMs = today.getTime() - birthDate.getTime()
    const ageYears = diffMs / (365.25 * 24 * 60 * 60 * 1000)
    return ageYears.toFixed(9) // 9 decimal places for smooth updates
  }

  const [age, setAge] = useState(calculateAge())

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge())
    }, 100) // Update every 100ms for smooth animation

    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 1. "about" moves left, "me" moves right [0 -> 0.3]
  const aboutX = useTransform(scrollYProgress, [0, 0.3], [0, -400])
  const meX = useTransform(scrollYProgress, [0, 0.3], [0, 400])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])

  // 2. Image transition [0 -> 0.6]
  // Appears from center and grows between the words
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  // Scale ends at 2.4 to make it "really big" (approx 84% of viewport if base is 35vh)
  const imageScale = useTransform(scrollYProgress, [0.05, 0.25, 0.6], [0.5, 1.5, 2.4])
  const imageX = useTransform(scrollYProgress, [0, 0.3, 0.6], ["0%", "0%", "-22vw"])
  // Keep Y centered (0%) so we can align text to it easily
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6], ["0%", "0%", "0%"])

  // 3. Info Text (Left side under image) [0.5 -> 0.7]
  const infoOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const infoY = useTransform(scrollYProgress, [0.5, 0.7], [30, 0])

  // 4. Quote (Right side) [0.5 -> 1.0]
  const quote1Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const quote1X = useTransform(scrollYProgress, [0.6, 0.8], [20, 0])

  const quote2Opacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1])
  const quote2X = useTransform(scrollYProgress, [0.8, 1.0], [20, 0])

  return (
    <section ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Center: Large Image - starts at absolute center */}
        <motion.div
          style={{
            x: imageX,
            y: imageY,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <motion.div
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            // Changed base size to height-based for responsiveness
            className="relative h-[35vh] aspect-[3/4] rounded-[20px] md:rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img
              src="https://api.dicebear.com/7.x/identicon/svg?seed=Code"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Biographical Content */}
        {/* h-[84vh] matches the target height of the image (35vh * 2.4 = 84vh) */}
        <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 h-[84vh] w-[45vw] flex flex-col justify-start space-y-10 pointer-events-none">
          <div className="pointer-events-auto">
            <motion.div
              style={{
                opacity: infoOpacity,
                y: infoY,
              }}
              onMouseEnter={() => setCursorType('text')}
              onMouseLeave={resetCursor}
            >
              <h2 className="text-[48px] md:text-[80px] font-bold leading-[1.1] tracking-tight mb-8">
                I am Benedict
              </h2>
            </motion.div>

            <motion.div
              style={{
                opacity: infoOpacity,
                y: infoY,
              }}
              className="space-y-4 mb-12"
              onMouseEnter={() => setCursorType('text')}
              onMouseLeave={resetCursor}
            >
              <p className="text-3xl font-bold text-black/90 tracking-wide">Software Engineer</p>
              <div className="flex flex-col gap-1">
                <p className="text-xl text-black/60 font-medium tabular-nums tracking-wide">{age} years old</p>
                <p className="text-xl text-black/60 font-medium tracking-wide">Based in Leipzig, Germany</p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8 max-w-xl"
              onMouseEnter={() => setCursorType('text')}
              onMouseLeave={resetCursor}
            >
              <motion.div
                style={{
                  opacity: quote1Opacity,
                  x: quote1X,
                }}
              >
                <p className="text-[22px] leading-[1.6] font-[system-ui] text-black/80 tracking-wide font-light">
                  I grew up in a small town in Germany, where I developed an early fascination with technology and design. This curiosity led me to study Computer Science, where I discovered my passion for creating seamless user experiences.
                </p>
              </motion.div>

              <motion.div
                style={{
                  opacity: quote2Opacity,
                  x: quote2X,
                }}
                className="space-y-6"
              >
                <p className="text-[22px] leading-[1.6] font-[system-ui] text-black/80 tracking-wide font-light">
                  My journey into app development began during university, building my first mobile application. I was captivated by the challenge of combining beautiful interfaces with robust functionality.
                </p>
                <p className="text-[22px] leading-[1.6] font-[system-ui] text-black/80 tracking-wide font-light">
                  I believe in building software that not only solves problems but delights users. Clean code, thoughtful design, and attention to detail are at the core of everything I create.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Split Text Overlay (Phase 1) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <motion.div
            className="relative flex z-10"
            id="about-me-hover"
            ref={hoverTargetRef}
            style={{ opacity: textOpacity, pointerEvents: textOpacity.get() > 0 ? 'auto' : 'none' }}
          >
            {/* "about" text - moves left from center */}
            <motion.h1
              style={{
                x: aboutX,
                opacity: textOpacity,
              }}
              className="text-[4rem] md:text-[8rem] font-bold tracking-tighter"
              layoutId="about-link"
            >
              About
            </motion.h1>

            <div className="md:w-8" /> {/* Spacer between the words */}

            {/* "me" text - moves right from center */}
            <motion.h1
              style={{
                x: meX,
                opacity: textOpacity,
              }}
              className="text-[4rem] md:text-[8rem] font-bold tracking-tighter"
            >
              me
            </motion.h1>
            {/* Cursor-follow images shown when hovering over the split text */}
            <CursorImages hoverRef={hoverTargetRef} images={HOVER_IMAGES} />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setCursorType, resetCursor, setDimensions } = useCursor()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const TECHSTACK = [
    { name: "typescript", label: "TypeScript" },
    { name: "python", label: "Python" },
    { name: "swift", label: "Swift" },
    { name: "kotlin", label: "Kotlin" },
    { name: "js", label: "JavaScript" },
    { name: "rust", label: "Rust" },
    { name: "go", label: "Go" },
    { name: "reactjs", label: "React" },
    { name: "nextjs", label: "Next.js" },
    { name: "tailwindcss", label: "Tailwind" },
    { name: "nodejs", label: "Node.js" },
    { name: "postgresql", label: "PostgreSQL" },
    { name: "aws", label: "AWS" },
    { name: "docker", label: "Docker" },
    { name: "git", label: "Git" },
    { name: "mongodb", label: "MongoDB" },
    { name: "fastapi", label: "FastAPI" },
    { name: "django", label: "Django" }
  ];

  // 1. "Techstack" title animation
  const titleX = useTransform(scrollYProgress, [0, 0.4], ["100vw", "0vw"])
  const titleScale = useTransform(scrollYProgress, [0.4, 0.6], [4, 1.2])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // 2. Icons fly-in animation
  const iconRevealProgress = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])

  return (
    <section ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.h2
          style={{
            x: titleX,
            scale: titleScale,
            opacity: titleOpacity
          }}
          className="text-6xl md:text-8xl font-bold uppercase tracking-widest z-10 text-black/10"
        >
          Techstack
        </motion.h2>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          {TECHSTACK.map((tech, index) => {
            // Circular arrangement around the smaller title
            const angle = (index / TECHSTACK.length) * Math.PI * 2;
            const radius = 280; // Reduced radius (was 350)

            // Destination position
            const destX = Math.cos(angle) * (radius * (index % 2 === 0 ? 0.85 : 1.15));
            const destY = Math.sin(angle) * (radius * (index % 2 === 0 ? 0.85 : 1.15));

            // Random starting positions further out
            const startX = Math.cos(angle) * 1200;
            const startY = Math.sin(angle) * 1200;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const x = useTransform(iconRevealProgress, [0, 1], [startX, destX])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(iconRevealProgress, [0, 1], [startY, destY])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(iconRevealProgress, [0, 0.2], [0, 1])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(iconRevealProgress, [0, 1], [0.5, 1])

            return (
              <motion.div
                key={tech.name}
                style={{ x, y, opacity, scale }}
                className="absolute group"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    // rounded-2xl is usually 1rem (16px)
                    setDimensions({ width: rect.width, height: rect.height, radius: "16px" })
                    setCursorType('button')
                  }}
                  onMouseLeave={() => {
                    resetCursor()
                    setDimensions(undefined)
                  }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-3 md:p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-110 hover:bg-white/60">
                    <StackIcon name={tech.name} />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <span className="text-xs font-bold text-black/60 bg-white/90 px-3 py-1 rounded shadow-md whitespace-nowrap border border-black/5">
                      {tech.label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default function About() {
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <main className="relative bg-[#FFFCF5]">
      {/* Background set to match theme base */}

      {/* Navigation Back */}
      <nav className="fixed top-0 left-0 w-full p-12 z-50 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto text-xl font-bold hover:opacity-50 transition-opacity">
          Benedict Kunzmann
        </Link>
        <div className="pointer-events-auto">
          <Link href="/" className="text-[18px] text-black/70 hover:opacity-100 transition-opacity">
            Close
          </Link>
        </div>
      </nav>

      {/* Layered Intro Section (Title + Quote) */}
      <IntroSection />

      {/* Techstack Animation Section */}
      <TechStackSection />

      {/* Snap Section: Journey Timeline (Vertical, Clean) */}
      <SnapSection className="px-6 py-32 min-h-screen h-auto flex-col justify-start">
        <div className="max-w-4xl w-full mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-20 text-center">My Journey</h3>

          <div className="space-y-24">
            {JOBS.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center group"
              >
                {/* Round Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                    <img src={job.image} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h4 className="text-3xl font-bold">{job.title}</h4>
                    <span className="text-lg font-medium text-black/40 mt-1 md:mt-0">
                      {job.period}
                    </span>
                  </div>

                  <p className="text-xl text-black/50 font-medium mb-4">{job.company}</p>
                  <p className="text-lg text-black/80 leading-relaxed mb-6">
                    {job.description}
                  </p>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map(tech => (
                      <span key={tech} className="px-4 py-1.5 border border-black/10 rounded-full text-sm font-medium text-black/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* Footer / End Spacer */}
      <div className="h-[20vh] flex items-center justify-center text-black/30 pb-12">
        <p>Thanks for scrolling.</p>
      </div>

    </main>
  )
}
