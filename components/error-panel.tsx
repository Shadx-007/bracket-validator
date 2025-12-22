"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ValidationError } from "@/lib/bracket-validator"
import { AlertCircle, CheckCircle2, XCircle, AlertTriangle, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ErrorPanelProps {
  errors: ValidationError[]
  isValid: boolean
}

export function ErrorPanel({ errors, isValid }: ErrorPanelProps) {
  const getErrorIcon = (type: ValidationError["type"]) => {
    switch (type) {
      case "stray_closing":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "mismatch":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "missing_closing":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getErrorColor = (type: ValidationError["type"]) => {
    switch (type) {
      case "stray_closing":
        return "destructive"
      case "mismatch":
        return "default"
      case "missing_closing":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card className="h-[500px] overflow-hidden flex flex-col backdrop-blur-xl bg-card/60 border-border/50 relative shadow-xl group hover:shadow-2xl transition-all duration-500">
      <div className="absolute -inset-px bg-gradient-to-br from-chart-1/10 to-primary/10 -z-10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {isValid ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </motion.div>
              <span>No Issues</span>
              <Sparkles className="w-4 h-4 text-green-500" />
            </>
          ) : (
            <>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
              <span>
                {errors.length} {errors.length === 1 ? "Issue" : "Issues"} Found
              </span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-2">
        <AnimatePresence mode="popLayout">
          {isValid ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-full text-center p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 relative" />
                </div>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                All brackets are balanced!
              </motion.h3>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your code syntax is valid.
              </motion.p>
            </motion.div>
          ) : (
            errors.map((error, index) => (
              <motion.div
                key={`${error.line}-${error.column}-${index}`}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-all backdrop-blur-sm hover:shadow-lg cursor-default"
              >
                <div className="flex items-start gap-3">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    {getErrorIcon(error.type)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getErrorColor(error.type)} className="text-xs">
                        Line {error.line}:{error.column}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">char: '{error.char}'</span>
                    </div>
                    <p className="text-sm text-foreground">{error.message}</p>
                    {error.expected && (
                      <p className="text-xs text-muted-foreground mt-1">Expected: '{error.expected}'</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
