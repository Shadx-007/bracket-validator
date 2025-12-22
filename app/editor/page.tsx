"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { CodeEditor } from "@/components/code-editor"
import { ErrorPanel } from "@/components/error-panel"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingShapes } from "@/components/floating-shapes"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Footer } from "@/components/footer"
import type { ValidationError } from "@/lib/bracket-validator"

export default function EditorPage() {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [isValid, setIsValid] = useState(true)

  const handleValidationChange = useCallback((valid: boolean, errors: ValidationError[]) => {
    setIsValid(valid)
    setValidationErrors(errors)
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 pt-24">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Code Editor
              </h1>
              <p className="text-muted-foreground">
                Write and validate your code with real-time bracket syntax checking
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeEditor onValidationChange={handleValidationChange} />
              <ErrorPanel errors={validationErrors} isValid={isValid} />
            </div>
          </motion.div>
        </main>
      </div>

      <FloatingChatbot />
      <Footer />
    </div>
  )
}
