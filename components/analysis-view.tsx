"use client"

import { motion } from "framer-motion"
import type { ValidationError } from "@/lib/bracket-validator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AnalysisViewProps {
  errors: ValidationError[]
  isValid: boolean
}

export function AnalysisView({ errors, isValid }: AnalysisViewProps) {
  const errorsByType = errors.reduce(
    (acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalErrors = errors.length
  const validationScore = isValid ? 100 : Math.max(0, 100 - totalErrors * 10)

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            Validation Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                {validationScore}%
              </span>
              {isValid ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
            <Progress value={validationScore} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {isValid
                ? "Perfect! No syntax errors detected."
                : `Found ${totalErrors} syntax ${totalErrors === 1 ? "error" : "errors"}.`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Error Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-red-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Stray Closing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{errorsByType.stray_closing || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Unexpected closing brackets</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-orange-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Mismatched</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">{errorsByType.mismatch || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Incorrect bracket pairs</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Missing Closing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{errorsByType.missing_closing || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Unclosed brackets</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">Total Characters Analyzed</span>
              <span className="text-sm text-muted-foreground">Real-time</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">Validation Algorithm</span>
              <span className="text-sm text-muted-foreground">Stack-based O(n)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">String Handling</span>
              <span className="text-sm text-muted-foreground">Intelligent parsing</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Comment Detection</span>
              <span className="text-sm text-muted-foreground">Single-line (//) supported</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
