"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { validateBrackets, type ValidationError } from "@/lib/bracket-validator"
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CodeEditorProps {
  onValidationChange?: (isValid: boolean, errors: ValidationError[]) => void
}

export function CodeEditor({ onValidationChange }: CodeEditorProps) {
  const [code, setCode] = useState("")
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isValid, setIsValid] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [highlightedErrors, setHighlightedErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    const result = validateBrackets(code)
    setErrors(result.errors)
    setIsValid(result.isValid)

    // Create error position keys
    const errorKeys = new Set(result.errors.map((err) => `${err.line}-${err.column}`))
    setHighlightedErrors(errorKeys)

    onValidationChange?.(result.isValid, result.errors)
  }, [code, onValidationChange])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const getLineNumbers = () => {
    const lineCount = code.split("\n").length
    return Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1)
  }

  const renderCodeWithHighlights = () => {
    if (!code) return <span className="text-muted-foreground">{"// Start typing your code..."}</span>

    const lines = code.split("\n")
    return lines.map((line, lineIndex) => {
      const lineNumber = lineIndex + 1
      const chars = line.split("")

      return (
        <div key={lineIndex} className="flex">
          {chars.map((char, colIndex) => {
            const column = colIndex + 1
            const errorKey = `${lineNumber}-${column}`
            const hasError = highlightedErrors.has(errorKey)
            const error = errors.find((e) => e.line === lineNumber && e.column === column)

            if (hasError && error) {
              return (
                <motion.span
                  key={colIndex}
                  initial={{ backgroundColor: "transparent" }}
                  animate={{
                    backgroundColor: ["transparent", "rgb(239 68 68 / 0.3)", "transparent"],
                  }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  className="relative inline-block px-[1px] rounded"
                  title={error.message}
                >
                  <span
                    className={`font-mono ${
                      error.type === "stray_closing"
                        ? "text-red-500 font-bold"
                        : error.type === "mismatch"
                          ? "text-orange-500 font-bold"
                          : "text-yellow-500 font-bold"
                    }`}
                  >
                    {char}
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-500" />
                </motion.span>
              )
            }

            return (
              <span key={colIndex} className="font-mono text-foreground">
                {char}
              </span>
            )
          })}
          {"\n"}
        </div>
      )
    })
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 backdrop-blur-xl bg-card/60 border-border/50 group hover:shadow-2xl ${
        isValid
          ? "ring-2 ring-green-500/20 shadow-lg shadow-green-500/10"
          : errors.length > 0
            ? "ring-2 ring-red-500/20 shadow-lg shadow-red-500/10"
            : ""
      }`}
    >
      <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-chart-1/10 -z-10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

      <motion.div
        className="absolute inset-0 -z-5"
        initial={{ backgroundPosition: "-200% 0" }}
        whileHover={{ backgroundPosition: "200% 0" }}
        transition={{ duration: 1.5, ease: "linear" }}
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-primary)/0.05, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="flex h-[500px]">
        {/* Line numbers */}
        <div className="flex-shrink-0 w-12 bg-muted/30 border-r border-border/50 p-2 text-right select-none overflow-hidden backdrop-blur-sm">
          {getLineNumbers().map((num) => (
            <div key={num} className="font-mono text-xs text-muted-foreground leading-6 h-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code editor area */}
        <div className="flex-1 relative">
          {/* Syntax highlighted overlay */}
          <div className="absolute inset-0 p-4 overflow-auto pointer-events-none whitespace-pre-wrap break-words font-mono text-sm leading-6">
            {renderCodeWithHighlights()}
          </div>

          {/* Actual textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-foreground font-mono text-sm leading-6 resize-none outline-none selection:bg-primary/20"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Start typing your code..."
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isValid ? "valid" : "invalid"}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          className="absolute top-3 right-3"
        >
          {isValid ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-500/20 backdrop-blur-sm shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <CheckCircle2 className="w-4 h-4 relative z-10" />
              </motion.div>
              <span className="text-xs font-medium relative z-10">Valid Syntax</span>
              <Sparkles className="w-3 h-3 relative z-10" />
            </motion.div>
          ) : errors.length > 0 ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1,
                x: [-2, 2, -2, 2, 0],
              }}
              transition={{
                x: { duration: 0.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 },
              }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 backdrop-blur-sm shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
              <AlertCircle className="w-4 h-4 relative z-10" />
              <span className="text-xs font-medium relative z-10">
                {errors.length} {errors.length === 1 ? "Error" : "Errors"}
              </span>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
