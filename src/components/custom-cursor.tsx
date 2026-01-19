'use client'

import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useCursor } from '@/context/cursor-context'
import { useIsTouchDevice } from '@/hooks/use-is-touch-device'

export default function CustomCursor() {
    const { cursorState } = useCursor()

    // Mouse position
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Spring physics for "realtime" but smooth movement
    const springConfig = { damping: 30, stiffness: 1000, mass: 0.1 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener('mousemove', moveCursor, { passive: true })
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [mouseX, mouseY])

    // Variants determining look based on state
    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "#000000",
            mixBlendMode: "normal" as const
        },
        button: {
            height: cursorState.dimensions?.height || 50,
            width: cursorState.dimensions?.width || 150,
            borderRadius: cursorState.dimensions?.radius || "12px",
            backgroundColor: "rgba(0,0,0,0.0)", // Transparent for Project Items
            mixBlendMode: "normal" as const
        },
        link: {
            height: cursorState.dimensions?.height || 50,
            width: cursorState.dimensions?.width || 150,
            borderRadius: cursorState.dimensions?.radius || "12px",
            backgroundColor: "rgba(0,0,0,0.1)", // Slight overlay for Links
            mixBlendMode: "normal" as const
        },
        text: {
            height: 24,
            width: 2,
            backgroundColor: "#000000",
            borderRadius: 0,
            mixBlendMode: "normal" as const
        },
        icon: {
            height: 80,
            width: 80,
            backgroundColor: "transparent",
            borderRadius: cursorState.dimensions?.radius || "12px",
            mixBlendMode: "normal" as const
        }
    }

    const isTouchDevice = useIsTouchDevice()

    if (isTouchDevice) return null

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
            style={{
                x: smoothX,
                y: smoothY,
            }}
            variants={variants}
            animate={cursorState.type}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.1 }}
        />
    )
}
