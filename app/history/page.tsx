"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HistoryView } from "@/components/history-view"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingShapes } from "@/components/floating-shapes"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Footer } from "@/components/footer"

export default function HistoryPage() {
  // In a real app, this would be fetched from a database or state management
  const [validationHistory] = useState<Array<{ timestamp: Date; isValid: boolean; errorCount: number }>>([])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 pt-24">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Validation History
              </h1>
              <p className="text-muted-foreground">Track your past validation results and review error patterns</p>
            </div>

            <HistoryView history={validationHistory} />
          </motion.div>
        </main>
      </div>

      <FloatingChatbot />
      <Footer />
    </div>
  )
}
