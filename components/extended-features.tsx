import { 
  Code2, Zap, Shield, Target, Rocket, Users, Star, Cpu, GitBranch, 
  Cloud, Lock, Database, Terminal, Brain, Layers, FileCode, 
  Brackets, Parentheses, Braces, Type, Server, Clock, Eye, 
  Search, AlertTriangle, CheckCircle, Code, FileText, TrendingUp
} from "lucide-react"

export const extendedFeatures = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Smart Bracket Detection",
    description: "AI-powered identification of complex bracket patterns",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Validation",
    description: "Real-time feedback as you type",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Processing",
    description: "Your code remains private",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision Error Location",
    description: "Exact line and column highlighting",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "High Performance",
    description: "Optimized for speed and efficiency",
  },
]

export const validationTypes = [
  {
    name: "Bracket Matching",
    description: "Validate {}, [], (), <> pairs",
    icon: <Brackets className="w-5 h-5" />
  },
  {
    name: "Nesting Validation",
    description: "Check proper bracket nesting",
    icon: <Layers className="w-5 h-5" />
  },
  {
    name: "Syntax Analysis",
    description: "Language-specific syntax rules",
    icon: <Code className="w-5 h-5" />
  },
  {
    name: "Pattern Recognition",
    description: "Detect common coding patterns",
    icon: <Eye className="w-5 h-5" />
  }
]

export const integrationOptions = [
  "VS Code",
  "IntelliJ",
  "CLI Tool",
  "Web API",
  "Chrome Extension",
]

export const supportedLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
]