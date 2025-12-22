"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { validateBrackets, type ValidationError } from "@/lib/bracket-validator"
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CodeEditorProps {
  language?: string
  onValidationChange?: (isValid: boolean, errors: ValidationError[]) => void
}

export function CodeEditor({ language = "cpp", onValidationChange }: CodeEditorProps) {
  const [code, setCode] = useState("")
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isValid, setIsValid] = useState(true)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ✅ SAFE language handling (NO CRASH)
  const safeLanguage = (language ?? "cpp").toUpperCase()

  useEffect(() => {
    const result = validateBrackets(code)
    setErrors(result.errors)
    setIsValid(result.isValid)

    onValidationChange?.(result.isValid, result.errors)
  }, [code, onValidationChange])

  return (
    <Card
      className={`relative overflow-hidden backdrop-blur-xl bg-card/60 border-border/50 transition-all
        ${
          isValid
            ? "ring-2 ring-green-500/20 shadow-green-500/10"
            : "ring-2 ring-red-500/20 shadow-red-500/10"
        }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div>
          <h2 className="text-lg font-semibold">Realtime Code Editor</h2>
          <p className="text-xs text-muted-foreground">
            Syntax validation for {safeLanguage}
          </p>
        </div>

        {isValid ? (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            No Issues
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.length} Error{errors.length !== 1 && "s"}
          </div>
        )}
      </div>

      {/* EDITOR */}
      <div className="relative h-[420px]">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Write your ${safeLanguage} code here`}
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm
                     bg-transparent text-foreground resize-none outline-none
                     leading-6 caret-primary"
        />
      </div>

      {/* OUTPUT */}
      <div className="border-t border-border/50 p-4 text-sm">
        <h3 className="font-medium mb-2">Output</h3>

        {isValid ? (
          <div className="flex items-center gap-2 text-green-500">
            <Sparkles className="w-4 h-4" />
            All brackets are balanced. Syntax is valid.
          </div>
        ) : (
          <ul className="space-y-1 text-red-500">
            {errors.map((err, i) => (
              <li key={i}>
                Line {err.line}, Col {err.column} — {err.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* STATUS BADGE */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3"
        >
          {isValid && (
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-green-500 text-xs">
              <CheckCircle2 className="w-3 h-3" />
              Valid Syntax
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
