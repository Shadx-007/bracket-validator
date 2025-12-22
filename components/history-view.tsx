"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, LogIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/mock-auth"
import { useRouter } from "next/navigation"

interface HistoryEntry {
  timestamp: Date
  isValid: boolean
  errorCount: number
}

interface HistoryViewProps {
  history: HistoryEntry[]
}

export function HistoryView({ history }: HistoryViewProps) {
  const { user } = useAuth()
  const router = useRouter()

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  if (!user) {
    return (
      <Card className="min-h-[500px] border-emerald-500/20 bg-[#0a0a0a]/60 backdrop-blur-xl">
        <CardContent className="flex flex-col items-center justify-center h-[500px] text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl" />
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 rounded-full border border-emerald-500/20">
              <Clock className="w-12 h-12 text-emerald-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-emerald-500 bg-clip-text text-transparent">
            Save Your History
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Login to save and access your validation history across sessions. Track your progress and review past
            validations.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login to Save History
            </Button>
            <Button variant="outline" onClick={() => router.push("/signup")} className="border-emerald-500/20">
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="min-h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Validation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Clock className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No validation history yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start typing code to see validation results</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-auto">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {entry.isValid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {entry.isValid
                        ? "Valid Syntax"
                        : `${entry.errorCount} ${entry.errorCount === 1 ? "Error" : "Errors"}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</p>
                  </div>
                </div>
                <Badge variant={entry.isValid ? "default" : "destructive"} className="text-xs">
                  {entry.isValid ? "Passed" : "Failed"}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
