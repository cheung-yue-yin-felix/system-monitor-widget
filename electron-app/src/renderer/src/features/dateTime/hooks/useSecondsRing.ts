import { useEffect, useRef, type RefObject } from 'react'

export function useSecondsRing(seconds: number): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const dpr = window.devicePixelRatio

    canvas.width = width * dpr
    canvas.height = height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)

    const cx = width / 2
    const cy = height / 2
    const outerRadius = Math.min(cx, cy) - 4
    const innerRadius = outerRadius - 10

    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < seconds; i++) {
      const startDeg = i * 6 - 90
      const endDeg = startDeg + 3
      const startAngle = (startDeg * Math.PI) / 180
      const endAngle = (endDeg * Math.PI) / 180

      ctx.beginPath()
      ctx.arc(cx, cy, outerRadius, startAngle, endAngle)
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true)
      ctx.closePath()
      ctx.fillStyle = '#0ea5e9'
      ctx.fill()
    }
  }, [seconds])

  return canvasRef
}
