'use client'

import React, { createContext, useContext, useState } from 'react'

export type CursorType = 'default' | 'button' | 'text' | 'icon' | 'link'

interface CursorState {
    type: CursorType
    label?: string
    dimensions?: { width: number; height: number; radius?: string }
}

interface CursorContextType {
    cursorState: CursorState
    setCursorType: (type: CursorType) => void
    setCursorLabel: (label: string) => void
    setDimensions: (dimensions: { width: number; height: number; radius?: string } | undefined) => void
    resetCursor: () => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [cursorState, setCursorState] = useState<CursorState>({
        type: 'default',
    })

    const setCursorType = (type: CursorType) => {
        setCursorState((prev) => ({ ...prev, type }))
    }

    const setCursorLabel = (label: string) => {
        setCursorState((prev) => ({ ...prev, label }))
    }

    const setDimensions = (dimensions: { width: number; height: number; radius?: string } | undefined) => {
        setCursorState((prev) => ({ ...prev, dimensions }))
    }

    const resetCursor = () => {
        setCursorState({ type: 'default' })
    }

    return (
        <CursorContext.Provider
            value={{
                cursorState,
                setCursorType,
                setCursorLabel,
                setDimensions,
                resetCursor,
            }}
        >
            {children}
        </CursorContext.Provider>
    )
}

export const useCursor = () => {
    const context = useContext(CursorContext)
    if (context === undefined) {
        throw new Error('useCursor must be used within a CursorProvider')
    }
    return context
}
