"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Activity, TrendingUp, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingShapes } from "@/components/floating-shapes"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const router = useRouter()

  // Mock stats - in a real app, these would come from a database or state management
  const stats = [
    { label: "Total Validations", value: "0", icon: <Code2 className="w-5 h-5" />, color: "text-emerald-500" },
    { label: "Success Rate", value: "0%", icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-500" },
    { label: "Errors Found", value: "0", icon: <AlertCircle className="w-5 h-5" />, color: "text-orange-500" },
    { label: "Time Saved", value: "0h", icon: <Clock className="w-5 h-5" />, color: "text-cyan-500" },
  ]

  const quickActions = [
    {
      title: "Open Editor",
      description: "Start validating code with our full IDE-like editor",
      icon: <Code2 className="w-6 h-6" />,
      href: "/editor",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      title: "Live Analysis",
      description: "View real-time metrics and detailed error analysis",
      icon: <Activity className="w-6 h-6" />,
      href: "/live-analysis",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "View History",
      description: "Check your past validation results and trends",
      icon: <TrendingUp className="w-6 h-6" />,
      href: "/history",
      color: "from-blue-500 to-purple-500",
    },
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 pt-24">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Overview of your validation activity and quick access to tools
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-emerald-500/20 bg-card/60 backdrop-blur-xl hover:border-emerald-500/40 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className={stat.color}>{stat.icon}</div>
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="border-emerald-500/20 bg-card/60 backdrop-blur-xl hover:border-emerald-500/40 transition-all cursor-pointer h-full group">
                      <CardHeader>
                        <div
                          className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} bg-opacity-10 mb-3 w-fit`}
                        >
                          <div className="text-white">{action.icon}</div>
                        </div>
                        <CardTitle className="text-xl">{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => router.push(action.href)}
                          variant="ghost"
                          className="w-full justify-between group-hover:bg-emerald-500/10"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity - Placeholder */}
            <Card className="border-emerald-500/20 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest validation sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Activity className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-2">No recent activity</p>
                  <p className="text-sm text-muted-foreground">Start using the editor to see your activity here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      <FloatingChatbot />
      <Footer />
    </div>
  )
}
