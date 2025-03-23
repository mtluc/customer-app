'use client'
import { useState, useEffect, memo } from 'react'

interface TimeLeftProps {
  targetTime: string //
}

const calculateTimeLeft = (targetTime: string) => {
  const target = new Date(targetTime).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
}

export default memo(function TimeLeft({ targetTime }: TimeLeftProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetTime)
      if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
      ) {
        setTimeLeft('Đã kết thúc')
        clearInterval(timer)
      } else {
        setTimeLeft(
          `⏳${
            timeLeft.days
              ? `${timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days} ngày`
              : ''
          } 
          ${timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
          ${timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
          ${timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}`
        )
      }
    }, 1000)

    return () => clearInterval(timer) // Cleanup khi component unmount
  }, [targetTime])

  return timeLeft
})
