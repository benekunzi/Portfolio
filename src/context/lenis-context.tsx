'use client'

import { createContext, useContext, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
    stop: () => void
    start: () => void
}

const LenisContext = createContext<LenisContextType | null>(null)

export function useLenis() {
    const context = useContext(LenisContext)
    if (!context) {
        throw new Error('useLenis must be used within LenisProvider')
    }
    return context
}

export function LenisProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    const value: LenisContextType = {
        stop: () => {
            if (lenisRef.current) {
                lenisRef.current.stop()
            }
        },
        start: () => {
            if (lenisRef.current) {
                lenisRef.current.start()
            }
        },
    }

    return (
        <LenisContext.Provider value={value}>
            {children}
        </LenisContext.Provider>
    )
}

export function setLenisInstance(lenis: Lenis) {
    // This will be called from SmoothScroll component
    if (typeof window !== 'undefined') {
        (window as any).__lenis = lenis
    }
}

export function getLenisInstance(): Lenis | null {
    if (typeof window !== 'undefined') {
        return (window as any).__lenis || null
    }
    return null
}
