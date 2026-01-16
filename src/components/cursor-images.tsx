'use client'

import React, { useEffect, useState } from 'react'

interface CursorImagesProps {
    hoverRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>
    images: string[]
}

export default function CursorImages({ hoverRef, images }: CursorImagesProps) {
    const [active, setActive] = useState(false)
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [bounds, setBounds] = useState<{ left: number; width: number } | null>(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const target = hoverRef.current
        if (!target) return

        const onEnter = () => {
            const rect = target.getBoundingClientRect()
            setBounds({ left: rect.left, width: rect.width })
            setIsHovering(true)
            setActive(true)
        }
        const onLeave = () => {
            setIsHovering(false)
            setActive(false)
        }
        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY })
        }

        const onScroll = () => {
            // Hide images while scrolling, but keep hovering state
            setActive(false)
        }

        const onScrollEnd = () => {
            // Re-show images if still hovering after scroll ends
            if (isHovering) {
                setActive(true)
            }
        }

        let scrollTimer: NodeJS.Timeout

        const handleScroll = () => {
            onScroll()
            clearTimeout(scrollTimer)
            scrollTimer = setTimeout(onScrollEnd, 150)
        }

        target.addEventListener('mouseenter', onEnter)
        target.addEventListener('mouseleave', onLeave)
        target.addEventListener('mousemove', onMove)
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            target.removeEventListener('mouseenter', onEnter)
            target.removeEventListener('mouseleave', onLeave)
            target.removeEventListener('mousemove', onMove)
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(scrollTimer)
        }
    }, [hoverRef, isHovering])

    if (!active || !bounds) return null

    // Calculate which image to show based on position within the hover element
    const relativeX = pos.x - bounds.left
    const intervalWidth = bounds.width / images.length
    const imageIndex = Math.min(Math.max(0, Math.floor(relativeX / intervalWidth)), images.length - 1)
    const currentImage = images[imageIndex]

    // Position image near cursor
    const offsetX = 20
    const offsetY = 20

    return (
        <div className="pointer-events-none fixed inset-0 z-[60]">
            <img
                src={currentImage}
                alt="hover"
                style={{ left: pos.x + offsetX, top: pos.y + offsetY }}
                className="fixed w-12 h-12 rounded-xl shadow-lg border border-black/10 bg-white/70 backdrop-blur-sm object-cover transition-opacity duration-200"
            />
        </div>
    )
}
