'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useCursor } from '@/context/cursor-context'

interface ProjectItemProps {
    id: string
    title: string
    year: string
    videoUrl: string
    aspectRatio: "portrait" | "landscape"
    onHoverStart?: () => void
    onHoverEnd?: () => void
    onClick?: () => void
}

export function ProjectItem({ id, title, year, videoUrl, aspectRatio, onHoverStart, onHoverEnd, onClick }: ProjectItemProps) {
    const [isHovered, setIsHovered] = useState(false)
    const { setCursorType, setDimensions, resetCursor } = useCursor()

    // Mouse position tracking for video parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 600 } // More responsive feel
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    // Map mouse X (-150px to 150px range relative to center) to video offset (-20px to 20px)
    const xOffset = useTransform(springX, [-150, 150], [-20, 20])
    const yOffset = useTransform(springY, [-50, 50], [-10, 10])


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const xPos = e.clientX - rect.left - rect.width / 2
        const yPos = e.clientY - rect.top - rect.height / 2
        mouseX.set(xPos)
        mouseY.set(yPos)
    }

    const calculatedWidth = aspectRatio === "portrait" ? "300px" : "600px"

    return (
        <div
            className="relative flex items-center justify-between py-3 group"
            onMouseEnter={(e) => {
                setIsHovered(true)
                onHoverStart?.()

                const rect = e.currentTarget.getBoundingClientRect()
                // Adjust dimensions to match the hover box (-inset-y-1 -inset-x-4)
                // The main div is the reference, so we add the padding diffs
                setDimensions({
                    width: rect.width + 32, // inset-x-4 = 16px * 2 = 32px
                    height: rect.height + 8, // inset-y-1 = 4px * 2 = 8px
                    radius: "20px"
                })
                setCursorType('button')
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                onHoverEnd?.()
                // Reset position on leave
                mouseX.set(0)
                mouseY.set(0)

                resetCursor()
                setDimensions(undefined)
            }}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            {/* Search Analysis: "Hover Box... extends 4px top and bottom" */}
            {/* We use absolute positioning with negative inset to create the box extending beyond text */}

            <motion.div
                className="absolute -inset-y-1 -inset-x-4 bg-white/50 backdrop-blur-[8px] rounded-[20px] z-0 shadow-[0_10px_20px_2px_rgba(0,0,0,0.08)] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 font-[system-ui] font-medium text-[16px] text-black"
                animate={{ scale: isHovered ? 1.05 : 1, x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                layoutId={`title-${id}`}
            >
                {title}
            </motion.div>
            <motion.div
                className="relative z-10 font-[system-ui] text-[16px] text-black/70 pl-20"
                animate={{ scale: isHovered ? 1.05 : 1, x: isHovered ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
                {year}
            </motion.div>

            <motion.div
                layoutId={`video-${id}`}
                style={{
                    x: xOffset,
                    y: yOffset,
                    width: calculatedWidth
                }}
                className={`fixed top-[10%] h-auto left-[35%] z-30 overflow-hidden rounded-[40px] shadow-2xl pointer-events-none`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.95,
                    x: "-50%",
                    y: isHovered ? "-50%" : "-40%",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
            >
                <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    )
}
