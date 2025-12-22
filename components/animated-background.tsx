"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  id: number
  width: number
  height: number
  left: string
  top: string
  color: string
  duration: number
  delay: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, { damping: 30, stiffness: 100 })
  const y = useSpring(mouseY, { damping: 30, stiffness: 100 })
  const x2 = useSpring(mouseX, { damping: 40, stiffness: 80 })
  const y2 = useSpring(mouseY, { damping: 40, stiffness: 80 })
  const x3 = useSpring(mouseX, { damping: 20, stiffness: 120 })
  const y3 = useSpring(mouseY, { damping: 20, stiffness: 120 })

  useEffect(() => {
    setMounted(true)
    const generatedParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 3 === 0 ? "var(--color-primary)" : i % 3 === 1 ? "var(--color-chart-1)" : "var(--color-chart-2)",
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
    }))
    setParticles(generatedParticles)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Don't render anything until client-side mount
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.02),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.02),transparent_50%)]" />

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        style={{
          x,
          y,
        }}
        className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px]"
      >
        <motion.div
          className="w-full h-full bg-emerald-500/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          x: x2,
          y: y2,
        }}
        className="absolute top-1/2 -right-1/4 w-[450px] h-[450px]"
      >
        <motion.div
          className="w-full h-full bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <motion.div
        style={{
          x: x3,
          y: y3,
        }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px]"
      >
        <motion.div
          className="w-full h-full bg-indigo-500/5 rounded-full blur-[90px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: particle.left,
            top: particle.top,
            background: particle.color,
            opacity: 0.15,
            boxShadow: "0 0 10px currentColor",
          }}
          animate={{
            y: [0, -50, 0],
            x: [-10, 10, -10],
            opacity: [0.05, 0.2, 0.05],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {["{ }", "[ ]", "( )", "< >"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-emerald-500/5 font-mono text-2xl font-bold"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.02, 0.05, 0.02],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  )
}
