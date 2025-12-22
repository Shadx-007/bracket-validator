"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code2, Braces, Terminal, Brackets, Binary, Cpu, Database, Box } from "lucide-react"

const shapes = [
  { Icon: Code2, x: "10%", y: "20%", delay: 0, duration: 20, size: "w-12 h-12" },
  { Icon: Braces, x: "80%", y: "30%", delay: 2, duration: 25, size: "w-14 h-14" },
  { Icon: Terminal, x: "15%", y: "70%", delay: 4, duration: 22, size: "w-10 h-10" },
  { Icon: Brackets, x: "85%", y: "75%", delay: 1, duration: 23, size: "w-16 h-16" },
  { Icon: Code2, x: "50%", y: "10%", delay: 3, duration: 21, size: "w-11 h-11" },
  { Icon: Binary, x: "25%", y: "45%", delay: 2.5, duration: 24, size: "w-13 h-13" },
  { Icon: Cpu, x: "70%", y: "55%", delay: 1.5, duration: 26, size: "w-12 h-12" },
  { Icon: Database, x: "40%", y: "80%", delay: 3.5, duration: 23, size: "w-14 h-14" },
  { Icon: Box, x: "60%", y: "15%", delay: 0.5, duration: 27, size: "w-10 h-10" },
]

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {shapes.map(({ Icon, x, y, delay, duration, size }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.02, 0.08, 0.02],
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            y: [-30, 30, -30],
          }}
          transition={{
            duration,
            repeat: Number.POSITIVE_INFINITY,
            delay,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl" />
            <Icon className={`${size} text-emerald-500/8 relative`} />
          </div>
        </motion.div>
      ))}

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border-2 border-emerald-500/5 rounded-lg backdrop-blur-sm"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 30}%`,
            width: `${70 + i * 12}px`,
            height: `${70 + i * 12}px`,
            background: "linear-gradient(135deg, rgba(16,185,129,0.02), transparent)",
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 18 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`sphere-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${25 + (i % 2) * 45}%`,
            width: `${40 + i * 15}px`,
            height: `${40 + i * 15}px`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.03, 0.1, 0.03],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/8 to-indigo-500/8 rounded-full blur-xl" />
        </motion.div>
      ))}
    </div>
  )
}
