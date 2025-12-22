"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code2, Activity, History, BookOpen, User, Home, LogIn, LogOut, LayoutDashboard } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/mock-auth"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

type TabId = "home" | "editor" | "live-analysis" | "dashboard" | "history" | "guide" | "profile"

interface Tab {
  id: TabId
  label: string
  icon: React.ReactNode
  href: string
  softProtected: boolean
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, href: "/", softProtected: false },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    href: "/dashboard",
    softProtected: false,
  },
  {
    id: "editor",
    label: "Editor",
    icon: <Code2 className="w-4 h-4" />,
    href: "/editor",
    softProtected: false,
  },
  {
    id: "live-analysis",
    label: "Live Analysis",
    icon: <Activity className="w-4 h-4" />,
    href: "/live-analysis",
    softProtected: false,
  },
  {
    id: "history",
    label: "History",
    icon: <History className="w-4 h-4" />,
    href: "/history",
    softProtected: true,
  },
  {
    id: "guide",
    label: "Guide",
    icon: <BookOpen className="w-4 h-4" />,
    href: "/guide",
    softProtected: false,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-4 h-4" />,
    href: "/profile",
    softProtected: true,
  },
]

export function GlobalNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>("home")

  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [pathname])

  useEffect(() => {
    if (!shouldRender) return

    if (pathname === "/") {
      setActiveTab("home")
    } else if (pathname === "/dashboard") {
      setActiveTab("dashboard")
    } else if (pathname === "/editor") {
      setActiveTab("editor")
    } else if (pathname === "/live-analysis") {
      setActiveTab("live-analysis")
    } else if (pathname === "/history") {
      setActiveTab("history")
    } else if (pathname === "/guide") {
      setActiveTab("guide")
    } else if (pathname === "/profile") {
      setActiveTab("profile")
    }
  }, [pathname, shouldRender])

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id)
    router.push(tab.href)
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const visibleTabs = tabs

  return shouldRender ? (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-[#050505]/90 border-b border-emerald-500/10 shadow-lg shadow-emerald-500/5"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl" />
              <Code2 className="w-8 h-8 text-emerald-500 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-emerald-500 bg-clip-text text-transparent hidden sm:block">
              BracketValidator
            </span>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <div className="relative flex gap-1 p-1.5 bg-[#0a0a0a]/60 backdrop-blur-xl border border-emerald-500/10 rounded-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-emerald-500/10 rounded-2xl blur-lg opacity-50" />

              {visibleTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {activeTab === tab.id && (
                    <>
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-xl"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                      <motion.div
                        layoutId="activeNavGlow"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-emerald-500/50 rounded-xl blur-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    </>
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id ? "text-black font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: activeTab === tab.id ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {tab.icon}
                    </motion.div>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="ml-2">
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-xl backdrop-blur-xl border-emerald-500/20 bg-transparent hover:bg-emerald-500/10 hover:border-emerald-500/40"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="rounded-xl backdrop-blur-xl border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40"
                >
                  <LogIn className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) : null
}
