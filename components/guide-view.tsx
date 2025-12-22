"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code2, Zap, Shield } from "lucide-react"

export function GuideView() {
  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-primary" />,
      title: "Real-time Validation",
      description: "Instant feedback as you type with line-by-line error detection",
    },
    {
      icon: <Zap className="w-6 h-6 text-chart-1" />,
      title: "O(n) Performance",
      description: "Stack-based algorithm ensures optimal performance for large files",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Smart Parsing",
      description: "Intelligently ignores brackets inside strings and comments",
    },
  ]

  const examples = [
    {
      title: "Valid Code",
      code: `function calculate(a, b) {
  const result = [a + b];
  return result[0];
}`,
      status: "valid",
    },
    {
      title: "Stray Closing Bracket",
      code: `function test() {
  console.log("Hello");
}} // Extra bracket`,
      status: "error",
    },
    {
      title: "Mismatched Brackets",
      code: `const arr = [1, 2, 3};
// Square bracket opened, curly brace closed`,
      status: "error",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Usage Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Realtime Bracket Syntax Validator is a professional tool for detecting bracket syntax errors in your
            code. It validates parentheses ( ), curly braces {"{ }"}, and square brackets [ ] in real-time, providing
            instant feedback with exact line and column numbers.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-primary/10">{feature.icon}</div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{example.title}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${example.status === "valid" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`}
                >
                  {example.status === "valid" ? "Valid" : "Error"}
                </span>
              </div>
              <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto">{example.code}</pre>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
