import { useEffect, useRef, useState } from 'react'

export default function Stat({ value, label, animate = false }) {
  const [shown, setShown] = useState(animate ? '0' : value)
  const ref = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!animate || !ref.current) return undefined

    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) return undefined

    const [, prefix, rawTarget, suffix] = match
    const target = Number(rawTarget)
    const decimals = rawTarget.includes('.') ? rawTarget.split('.')[1].length : 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShown(value)
        return
      }

      const start = performance.now()
      const duration = 850
      const updateCount = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const easedProgress = 1 - (1 - progress) ** 3
        const current = target * easedProgress
        const formatted = current.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
        setShown(`${prefix}${formatted}${suffix}`)
        if (progress < 1) frameRef.current = requestAnimationFrame(updateCount)
      }
      frameRef.current = requestAnimationFrame(updateCount)
    }, { threshold: 0.4 })

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [animate, value])

  return (
    <div ref={ref} className="stat">
      <span className="stat-value">{shown}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
