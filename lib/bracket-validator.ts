export type ValidationErrorType =
  | "mismatch"
  | "unclosed"
  | "stray_closing"

export interface ValidationError {
  message: string
  line: number
  column: number
  type: ValidationErrorType
  found?: string
  expected?: string
}

const BRACKETS: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const OPEN = Object.keys(BRACKETS)
const CLOSE = Object.values(BRACKETS)

const COMMENT_RULES: Record<
  "c" | "cpp" | "java" | "python",
  RegExp[]
> = {
  c: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  cpp: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  java: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  python: [/#.*$/gm],
}

export function validateBrackets(
  code: string,
  language: "c" | "cpp" | "java" | "python" = "cpp"
) {
  if (typeof code !== "string") {
    return {
      isValid: true,
      errors: [],
      stackSnapshot: [],
    }
  }

  let cleaned = code
  const rules = COMMENT_RULES[language] ?? []

  rules.forEach((r) => {
    cleaned = cleaned.replace(r, "")
  })

  const stack: { char: string; line: number; column: number }[] = []
  const errors: ValidationError[] = []

  const lines = cleaned.split("\n")

  lines.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      const lineNo = lineIndex + 1
      const colNo = i + 1

      if (OPEN.includes(ch)) {
        stack.push({ char: ch, line: lineNo, column: colNo })
      } else if (CLOSE.includes(ch)) {
        if (stack.length === 0) {
          errors.push({
            type: "stray_closing",
            message: `Stray closing bracket '${ch}'`,
            line: lineNo,
            column: colNo,
            found: ch,
          })
          continue
        }

        const last = stack.pop()!
        if (BRACKETS[last.char] !== ch) {
          errors.push({
            type: "mismatch",
            message: `Expected '${BRACKETS[last.char]}' but found '${ch}'`,
            line: lineNo,
            column: colNo,
            found: ch,
            expected: BRACKETS[last.char],
          })
        }
      }
    }
  })

  stack.forEach((item) => {
    errors.push({
      type: "unclosed",
      message: `Unclosed bracket '${item.char}'`,
      line: item.line,
      column: item.column,
      expected: BRACKETS[item.char],
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
    stackSnapshot: stack.map((s) => s.char),
  }
}
