'use client'

import { useEffect, useState } from 'react'

export const AgeCounter = () => {
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

    return <>{age}</>
}
