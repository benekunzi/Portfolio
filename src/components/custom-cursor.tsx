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

    // Spring physics for smooth movement
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [mouseX, mouseY])

    // Variants determining look based on state
    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "#000000",
            x: -8,
            y: -8,
            mixBlendMode: "normal" as const
        },
        button: {
            height: cursorState.dimensions?.height || 50,
            width: cursorState.dimensions?.width || 150,
            borderRadius: cursorState.dimensions?.radius || "12px",
            backgroundColor: "rgba(0,0,0,0.0)", // Transparent for Project Items
            x: -(cursorState.dimensions?.width || 150) / 2,
            y: -(cursorState.dimensions?.height || 50) / 2,
            mixBlendMode: "normal" as const
        },
        link: {
            height: cursorState.dimensions?.height || 50,
            width: cursorState.dimensions?.width || 150,
            borderRadius: cursorState.dimensions?.radius || "12px",
            backgroundColor: "rgba(0,0,0,0.1)", // Slight overlay for Links
            x: -(cursorState.dimensions?.width || 150) / 2,
            y: -(cursorState.dimensions?.height || 50) / 2,
            mixBlendMode: "normal" as const
        },
        text: {
            height: 24,
            width: 2,
            backgroundColor: "#000000",
            borderRadius: 0,
            x: -1,
            y: -12,
            mixBlendMode: "normal" as const
        },
        icon: {
            height: 80,
            width: 80,
            backgroundColor: "transparent",
            borderRadius: cursorState.dimensions?.radius || "12px",
            x: -40,
            y: -40,
            mixBlendMode: "normal" as const
        }
    }

    const isTouchDevice = useIsTouchDevice()

    if (isTouchDevice) return null

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
            style={{
                left: smoothX,
                top: smoothY,
            }}
            variants={variants}
            animate={cursorState.type}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
    )
}
