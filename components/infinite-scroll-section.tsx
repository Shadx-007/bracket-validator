import { motion } from "framer-motion"
import { validationTypes, integrationOptions, supportedLanguages } from "./extended-features"
import { CheckCircle, Cpu } from "lucide-react"

interface ScrollSectionProps {
  sectionId: number
}

export const InfiniteScrollSection = ({ sectionId }: ScrollSectionProps) => {
  const sectionThemes = [
    { 
      bg: "from-emerald-500/5 to-cyan-500/5", 
      border: "border-emerald-500/10",
      text: "text-emerald-400",
      accent: "bg-emerald-500/10"
    },
    { 
      bg: "from-blue-500/5 to-indigo-500/5", 
      border: "border-blue-500/10",
      text: "text-blue-400",
      accent: "bg-blue-500/10"
    },
    { 
      bg: "from-purple-500/5 to-pink-500/5", 
      border: "border-purple-500/10",
      text: "text-purple-400",
      accent: "bg-purple-500/10"
    },
    { 
      bg: "from-amber-500/5 to-orange-500/5", 
      border: "border-amber-500/10",
      text: "text-amber-400",
      accent: "bg-amber-500/10"
    },
  ]

  const theme = sectionThemes[sectionId % sectionThemes.length]

  return (
    <section className="py-16 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.accent} border ${theme.border} mb-4`}>
            <span className={`text-xs font-medium ${theme.text}`}>
              Module {sectionId + 1}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${theme.bg.replace('/5', '/20')} bg-clip-text text-transparent`}>
              Validation Technology
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Advanced parsing algorithms for bracket and syntax validation.
          </p>
        </motion.div>

        {/* Validation Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {validationTypes.map((type, index) => (
              <div
                key={`type-${sectionId}-${index}`}
                className={`p-4 rounded-lg border ${theme.border} ${theme.bg} hover:border-opacity-30 transition-colors`}
              >
                <div className={`mb-2 ${theme.text}`}>{type.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{type.name}</h4>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language Support */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-center mb-4">Supported Languages</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {supportedLanguages.slice(sectionId % 3, (sectionId % 3) + 4).map((lang, index) => (
              <span
                key={`lang-${sectionId}-${index}`}
                className={`px-3 py-1 text-xs rounded-full border ${theme.border} bg-black/20`}
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Integration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-center mb-4">Integration</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {integrationOptions.map((option, index) => (
              <div
                key={`option-${sectionId}-${index}`}
                className={`p-2 rounded border ${theme.border} ${theme.bg} text-center`}
              >
                <div className="text-xs font-medium">{option}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-6 rounded-xl border ${theme.border} ${theme.bg}`}
        >
          <h3 className="text-lg font-semibold text-center mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Speed", value: `${500 + (sectionId * 20)} lines/ms` },
              { label: "Memory", value: `< ${2 + (sectionId % 3)}MB` },
              { label: "Accuracy", value: `${99.8 + (sectionId * 0.02)}%` },
              { label: "Users", value: `${1000 + (sectionId * 50)}` },
            ].map((stat, index) => (
              <div key={`stat-${sectionId}-${index}`} className="text-center">
                <div className="text-lg font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}