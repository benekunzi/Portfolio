import { useEffect, useState } from 'react'

export function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            )
        }

        checkTouch()

        // Optional: Listen for resize/change if device capabilities change (rare but possible)
        window.addEventListener('resize', checkTouch)
        return () => window.removeEventListener('resize', checkTouch)
    }, [])

    return isTouch
}
