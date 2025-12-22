"use client"

import { motion } from "framer-motion"
import { GuideView } from "@/components/guide-view"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingShapes } from "@/components/floating-shapes"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Footer } from "@/components/footer"

export default function GuidePage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 pt-24">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Usage Guide
              </h1>
              <p className="text-muted-foreground">Learn how to use the bracket validator effectively</p>
            </div>

            <GuideView />
          </motion.div>
        </main>
      </div>

      <FloatingChatbot />
      <Footer />
    </div>
  )
}
