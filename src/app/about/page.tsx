'use client'

import { motion, Variants, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent, LazyMotion, domAnimation } from 'framer-motion'
import Link from 'next/link'
import StackIcon from 'tech-stack-icons'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { JOBS, HOVER_IMAGES, PROFILE_IMAGE } from '@/lib/data'
import { useMediaQuery } from '@/hooks/use-media-query'
import { AgeCounter } from '@/components/age-counter'
import { useCursor } from '@/context/cursor-context'

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

// import { useCursor } from '@/context/cursor-context'

// Desktop Intro Section: Split text transition with scaling image (scroll-linked animations)
const IntroSectionDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTargetRef = useRef<HTMLDivElement>(null)
  // const { setCursorType, resetCursor } = useCursor()

  // Image Cycling Logic
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Age calculation moved to AgeCounter component

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 1. "about" moves left, "me" moves right [0 -> 0.3]
  const aboutX = useTransform(scrollYProgress, [0, 0.3], [0, -400])
  const meX = useTransform(scrollYProgress, [0, 0.3], [0, 400])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0])

  // 2. Image transition [0 -> 0.6]
  // Start visible (opacity 1) at small scale, then grow and move to final position
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 1]) // Keep visible throughout
  // Scale and position logic
  // Base size is now smaller (4rem), scale up to larger final size
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.9, 4.5, 4.5])
  // Move from center to left side of biographical content
  const imageX = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-30vw"])
  const imageY = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-5vh"])

  // 3. Info Text [0.5 -> 0.7]
  const infoOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const infoY = useTransform(scrollYProgress, [0.5, 0.7], [30, 0])

  // 4. Quote [0.5 -> 1.0]
  const quote1Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const quote1X = useTransform(scrollYProgress, [0.6, 0.8], [20, 0])
  const quote2Opacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1])
  const quote2X = useTransform(scrollYProgress, [0.8, 1.0], [20, 0])
  const quote3Opacity = useTransform(scrollYProgress, [0.9, 1.0], [0, 1])
  const quote3X = useTransform(scrollYProgress, [0.9, 1.0], [20, 0])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % HOVER_IMAGES.length)
    }, 500)

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.01 && interval) {
        clearInterval(interval)
        interval = null
      } else if (latest <= 0.01 && !interval) {
        interval = setInterval(() => {
          setActiveImageIndex((prev) => (prev + 1) % HOVER_IMAGES.length)
        }, 500)
      }
    })

    return () => {
      if (interval) clearInterval(interval)
      unsubscribe()
    }
  }, [scrollYProgress])

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Split Text Overlay (Phase 1) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-20 mr-[10rem]">
          <motion.div
            className="relative flex items-center justify-center gap-8"
            id="about-me-hover"
            ref={hoverTargetRef}
            style={{
              opacity: textOpacity,
              pointerEvents: textOpacity.get() > 0 ? 'auto' : 'none'
            }}
          >
            {/* "about" text - moves left from center */}
            <motion.h1
              style={{
                x: aboutX,
                opacity: textOpacity,
              }}
              className="text-[8rem] font-bold tracking-tighter"
            >
              About
            </motion.h1>

            {/* Spacer to maintain layout where image was */}
            <div className="w-[4rem] aspect-[3/4]" />

            {/* "me" text - moves right from center */}
            <motion.h1
              style={{
                x: meX,
                opacity: textOpacity,
              }}
              className="text-[8rem] font-bold tracking-tighter"
            >
              Me
            </motion.h1>
          </motion.div>
        </div>

        {/* Cycling Image - Independent from text container */}
        <motion.div
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            x: imageX,
            y: imageY,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4rem] aspect-[3/4] rounded-[4px] overflow-hidden shadow-2xl origin-center z-30 mt-2"
        >
          {HOVER_IMAGES.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeImageIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>

        {/* Right Side: Biographical Content */}
        <div className="absolute pointer-events-none flex flex-col justify-start space-y-6 right-[5vw] top-1/2 -translate-y-1/2 h-[96vh] w-[45vw]">
          <div className="pointer-events-auto">
            <motion.div
              style={{
                opacity: infoOpacity,
                y: infoY,
              }}
            >
              <h2 className="text-[48px] lg:text-[80px] font-bold leading-[1.1] tracking-tight mb-8">
                I am Benedict
              </h2>
            </motion.div>

            <motion.div
              style={{
                opacity: infoOpacity,
                y: infoY,
              }}
              className="space-y-4 mb-6"
            >
              <p className="text-3xl font-bold text-black/90 tracking-wide">Software Engineer</p>
              <div className="flex flex-col gap-1">
                <p className="text-xl text-black/60 font-medium tabular-nums tracking-wide"><AgeCounter /> years old</p>
                <p className="text-xl text-black/60 font-medium tracking-wide">Based in Leipzig, Germany</p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8 max-w-xl"
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
              </motion.div>
              <motion.div
                style={{
                  opacity: quote3Opacity,
                  x: quote3X,
                }}
              >
                <p className="text-[22px] leading-[1.6] font-[system-ui] text-black/80 tracking-wide font-light">
                  Today, I continue to evolve as a developer, always seeking new challenges and opportunities to push the boundaries of what's possible in software engineering. My focus is on creating products that make a real impact.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

// Mobile Intro Section: Natural document flow with useInView fade animations
const IntroSectionMobile = () => {
  // Image Cycling Logic
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Age calculation moved to AgeCounter component

  // Track if image section is visible to pause cycling when off-screen
  const { ref: imageCycleRef, inView: imageCycleInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Image cycling interval - only runs when visible
  useEffect(() => {
    if (!imageCycleInView) return

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % HOVER_IMAGES.length)
    }, 500)

    return () => clearInterval(interval)
  }, [imageCycleInView])

  // useInView for fade-in triggers
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]) // Scales up as it fades out

  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: infoRef, inView: infoInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: quote1Ref, inView: quote1InView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: quote2Ref, inView: quote2InView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: quote3Ref, inView: quote3InView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="min-h-screen w-full">
      {/* About me title - Fixed Background */}
      <div className="fixed inset-0 h-[100dvh] flex items-center justify-center z-0 pointer-events-none">
        <motion.h1
          initial={{ opacity: 1, scale: 1 }}
          style={{ opacity, scale }}
          className="text-[4rem] font-bold tracking-tighter text-center text-black"
        >
          About me
        </motion.h1>
      </div>

      {/* Scrollable Content Wrapper */}
      <div className="relative z-10">
        {/* Spacer to push content below the fixed title */}
        <div className="h-[100dvh] w-full" />

        {/* Image - fades in when scrolled to */}
        <motion.div
          ref={(node) => {
            // Combine refs for both imageRef (fade-in) and imageCycleRef (cycling control)
            imageRef(node)
            imageCycleRef(node)
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: imageInView ? 1 : 0, scale: imageInView ? 1 : 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-12 px-6"
        >
          <div className="relative h-[40vh] aspect-[3/4] rounded-[20px] overflow-hidden shadow-2xl bg-white">
            {HOVER_IMAGES.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Biographical content - flows naturally, fades in progressively */}
        <div className="max-w-md mx-auto space-y-6 bg-[#FFFCF5]/80 backdrop-blur-sm p-4 rounded-2xl">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: infoInView ? 1 : 0, y: infoInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[32px] font-bold leading-[1.1] tracking-tight mb-2">
              I am Benedict
            </h2>
            <p className="text-lg font-bold text-black/90 tracking-wide">Software Engineer</p>
            <div className="flex flex-col mt-1">
              <p className="text-sm text-black/60 font-medium tabular-nums tracking-wide"><AgeCounter /> years old</p>
              <p className="text-sm text-black/60 font-medium tracking-wide">Based in Leipzig, Germany</p>
            </div>
          </motion.div>

          <motion.div
            ref={quote1Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: quote1InView ? 1 : 0, y: quote1InView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[14px] leading-[1.5] font-[system-ui] text-black/80 tracking-wide font-light">
              I grew up in a small town in Germany, where I developed an early fascination with technology and design. This curiosity led me to study Computer Science, where I discovered my passion for creating seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            ref={quote2Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: quote2InView ? 1 : 0, y: quote2InView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-[14px] leading-[1.5] font-[system-ui] text-black/80 tracking-wide font-light">
              My journey into app development began during university, building my first mobile application. I was captivated by the challenge of combining beautiful interfaces with robust functionality.
            </p>
          </motion.div>
          <motion.div
            ref={quote3Ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: quote3InView ? 1 : 0, y: quote3InView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[14px] leading-[1.5] font-[system-ui] text-black/80 tracking-wide font-light">
              I believe in building software that not only solves problems but delights users. Clean code, thoughtful design, and attention to detail are at the core of everything I create.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wrapper component that renders Desktop or Mobile version based on screen size
const IntroSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Return null during SSR/hydration to prevent mismatch
  if (isMobile === undefined) return null

  return isMobile ? <IntroSectionMobile /> : <IntroSectionDesktop />
}

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Track if section is in view to optimize animation performance
  const { ref: viewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const TECHSTACK = [
    { name: "typescript", label: "TypeScript", type: "icon" },
    { name: "python", label: "Python", type: "icon" },
    { name: "swift", label: "Swift", type: "icon" },
    { name: "js", label: "JavaScript", type: "icon" },
    { name: "firebase", label: "Firebase", type: "icon" },
    { name: "react", label: "React", type: "icon" },
    { name: "nextjs", label: "Next.js", type: "icon" },
    { name: "tailwindcss", label: "Tailwind", type: "icon" },
    { name: "postgresql", label: "PostgreSQL", type: "icon" },
    { name: "supabase", label: "Supabase", type: "icon" },
    { name: "git", label: "Git", type: "icon" },
    { name: "pandas", label: "Pandas", type: "asset" },
  ];

  // 1. "Techstack" title animation
  const titleX = useTransform(scrollYProgress, [0, 0.4], ["100vw", "0vw"])
  const titleScale = useTransform(scrollYProgress, [0.4, 0.6], [4, 1.2])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // 2. Icons fly-in animation
  const iconRevealProgress = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])

  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <LazyMotion features={domAnimation}>
      <section ref={containerRef} className="h-[200vh] relative">
        <div ref={viewRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.h2
            style={{
              x: titleX,
              scale: titleScale,
              opacity: titleOpacity
            }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-widest z-10 text-black/10 text-center px-4"
          >
            Techstack
          </motion.h2>

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-11"
            animate={inView ? { rotate: 360 } : undefined}
            transition={inView ? { duration: 100, repeat: Infinity, ease: "linear" } : { duration: 0 }}
          >
            {TECHSTACK.map((tech, index) => {
              // Circular arrangement around the smaller title
              const angle = (index / TECHSTACK.length) * Math.PI * 2;
              const radius = isMobile ? 140 : 280; // Reduced radius for mobile

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
                    animate={inView ? { rotate: -360 } : undefined}
                    transition={inView ? { duration: 100, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                  >
                    {tech.type === "icon" ? (
                      <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center p-2 md:p-3 lg:p-4 bg-white/40 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-110 hover:bg-white/60">
                        <StackIcon name={tech.name} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center p-2 md:p-3 lg:p-4 bg-white/40 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-110 hover:bg-white/60">
                        <img src={`./${tech.name}.png`} alt={tech.name} />
                      </div>
                    )}
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
    </LazyMotion>
  )
}

export default function About() {

  const { setCursorType, setDimensions, resetCursor } = useCursor();

  useEffect(() => {
    setCursorType('default')
    setDimensions(undefined)
    resetCursor()
  }, [])

  return (
    <main className="relative">
      {/* Background inherits dynamic animation from body */}
      {/* Navigation Back */}
      <nav className="fixed top-0 left-0 w-full p-12 z-50 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-50 transition-opacity">
          Benedict Kunzmann
        </Link>
        <Link href="/" className="text-[18px] text-black/70 hover:opacity-100 transition-opacity cursor-none">
          Close
        </Link>
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
        <p>Thanks for scrolling :)</p>
      </div>

    </main>
  )
}

