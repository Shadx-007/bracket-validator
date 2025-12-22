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
  const [language, setLanguage] = useState<"c" | "cpp" | "java" | "python">("cpp")

  const handleValidationChange = useCallback(
    (valid: boolean, errors: ValidationError[]) => {
      setIsValid(valid)
      setValidationErrors(errors)
    },
    []
  )

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 pt-24">
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Realtime Bracket Syntax Validator
              </h1>
              <p className="text-muted-foreground">
                Validate brackets instantly using a stack-based algorithm
              </p>
            </div>

            {/* Language selector + status */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground">Language:</label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm"
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>

              <span className="text-sm text-emerald-500">
                {isValid
                  ? `Syntax valid for ${language.toUpperCase()}`
                  : `${validationErrors.length} errors detected`}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeEditor
                language={language}
                onValidationChange={handleValidationChange}
              />
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
