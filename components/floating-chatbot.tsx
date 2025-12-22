"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI assistant. I can help you understand bracket syntax and validation. Try asking me about supported bracket types!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Mock bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 800)
  }

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("bracket") || lowerQuery.includes("syntax")) {
      return "I validate () parentheses, [] square brackets, {} curly braces, and <> angle brackets. The validator uses a stack-based algorithm with O(n) complexity and intelligently ignores brackets in strings and comments!"
    } else if (lowerQuery.includes("how") || lowerQuery.includes("work")) {
      return "The validator checks if every opening bracket has a matching closing bracket in the correct order. It also handles nested brackets and ignores content inside strings or comments."
    } else if (lowerQuery.includes("help") || lowerQuery.includes("guide")) {
      return "Try the Guide tab to see examples and best practices. You can also check the Analysis tab for detailed insights about your code structure!"
    } else if (lowerQuery.includes("error") || lowerQuery.includes("wrong")) {
      return "Common errors include: mismatched brackets, unclosed brackets, or closing before opening. Check the error panel for specific line numbers and suggestions."
    } else {
      return "That's a great question! I can help with bracket validation, syntax checking, and code analysis. What would you like to know more about?"
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-chart-1 hover:opacity-90 shadow-lg hover:shadow-xl transition-all relative group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <MessageCircle className="w-6 h-6 relative z-10" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-chart-2 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] z-50"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary via-chart-1 to-primary rounded-2xl opacity-20 blur-xl" />

            <div className="relative h-full backdrop-blur-xl bg-card/95 border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-chart-1/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-1 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-chart-2 rounded-full border-2 border-card"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-chart-2 rounded-full" />
                      Online
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-muted/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-primary to-chart-1 text-primary-foreground"
                          : "bg-muted/50 text-foreground border border-border/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50 bg-background/50">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask me anything..."
                      className="pr-10 bg-muted/50 border-border/50 focus:border-primary/50"
                    />
                    <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-gradient-to-br from-primary to-chart-1 hover:opacity-90 transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
