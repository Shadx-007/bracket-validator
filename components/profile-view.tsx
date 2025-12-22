"use client"

import { useAuth } from "@/lib/mock-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Shield, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function ProfileView() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-500/20 bg-[#0a0a0a]/60 backdrop-blur-xl">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 rounded-full border border-emerald-500/20">
                  <LogIn className="w-12 h-12 text-emerald-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-emerald-500 bg-clip-text text-transparent">
                Profile Access
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Login to view your profile information, manage account settings, and track your validation progress.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button variant="outline" onClick={() => router.push("/signup")} className="border-emerald-500/20">
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const getInitials = (email: string | null | undefined) => {
    if (!email) return "U"
    return email.charAt(0).toUpperCase()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-chart-1 text-primary-foreground">
                  {getInitials(user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{user?.email?.split("@")[0]}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    Member
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">User ID</span>
              <span className="text-sm text-muted-foreground font-mono">{user?.uid?.slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">Email Verified</span>
              <span className="text-sm text-muted-foreground">{user?.emailVerified ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Provider</span>
              <span className="text-sm text-muted-foreground">Email/Password</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
