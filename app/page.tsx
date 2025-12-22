"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code2, Zap, Shield, Sparkles, Check, TrendingUp, Users, Star, Target, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingShapes } from "@/components/floating-shapes"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  return (
    <>
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <motion.section style={{ opacity, scale }} className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">Next-Gen Syntax Validation</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold mb-6 text-balance"
            >
              <span className="bg-gradient-to-r from-foreground via-emerald-500 to-foreground bg-clip-text text-transparent">
                Realtime Bracket
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Syntax Validator
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance leading-relaxed"
            >
              Professional IDE-like bracket validation with real-time error detection, intelligent syntax analysis, and
              instant feedback for developers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                onClick={() => router.push("/editor")}
                className="relative group px-8 py-6 text-lg font-semibold rounded-2xl overflow-hidden bg-emerald-500 hover:bg-emerald-600"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/login")}
                className="px-8 py-6 text-lg font-semibold rounded-2xl border-2 border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-xl hover:bg-emerald-500/10"
              >
                Login
              </Button>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: "Smart Detection",
                  description: "Instantly identify mismatched brackets and syntax errors",
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Real-time Analysis",
                  description: "Get immediate feedback as you type with zero lag",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Professional Tools",
                  description: "IDE-like features with advanced error reporting",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-emerald-500/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500">
                    <div className="mb-4 text-emerald-500">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-balance">{feature.title}</h3>
                    <p className="text-muted-foreground text-balance leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Deep Dive Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-center mb-16"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Target className="w-10 h-10" />,
                  title: "Precise Error Location",
                  description: "Pinpoint exactly where syntax errors occur with line and column highlighting",
                  features: ["Visual error markers", "Jump to error", "Smart suggestions"],
                },
                {
                  icon: <Rocket className="w-10 h-10" />,
                  title: "Lightning Fast",
                  description: "Optimized algorithms process thousands of lines in milliseconds",
                  features: ["Instant validation", "Zero latency", "Smooth experience"],
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: "Team Collaboration",
                  description: "Share code snippets and validate together in real-time",
                  features: ["Share links", "Save history", "Export results"],
                },
                {
                  icon: <Star className="w-10 h-10" />,
                  title: "Multi-Language Support",
                  description: "Works with JavaScript, Python, Java, C++, and more",
                  features: ["10+ languages", "Auto-detect", "Custom rules"],
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                >
                  <div className="mb-6 text-emerald-500">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-16"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Trusted by Developers
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Active Users", icon: <Users className="w-8 h-8" /> },
                { value: "1M+", label: "Lines Validated", icon: <Code2 className="w-8 h-8" /> },
                { value: "99.9%", label: "Accuracy Rate", icon: <Target className="w-8 h-8" /> },
                { value: "24/7", label: "Uptime", icon: <TrendingUp className="w-8 h-8" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-emerald-500/10"
                >
                  <div className="mb-4 text-emerald-500 flex justify-center">{stat.icon}</div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-center mb-16"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                What Developers Say
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "This tool saved me hours of debugging. The real-time validation is incredible!",
                  author: "Sarah Chen",
                  role: "Senior Developer",
                },
                {
                  quote: "Best bracket validator I have used. Fast, accurate, and beautifully designed.",
                  author: "Mike Rodriguez",
                  role: "Full Stack Engineer",
                },
                {
                  quote: "A must-have tool for any developer. The error detection is spot-on every time.",
                  author: "Emily Watson",
                  role: "Tech Lead",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-emerald-500/10"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed text-balance">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 text-balance leading-relaxed">
              Join thousands of developers using the most advanced bracket validation tool available today.
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/editor")}
              className="px-12 py-8 text-xl font-semibold rounded-2xl bg-emerald-500 hover:bg-emerald-600"
            >
              Try It Free Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  )
}
