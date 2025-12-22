export interface ValidationError {
  type: "missing_closing" | "stray_closing" | "mismatch"
  line: number
  column: number
  char: string
  expected?: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

interface BracketPair {
  char: string
  line: number
  column: number
}

const BRACKET_PAIRS: Record<string, string> = {
  "(": ")",
  "{": "}",
  "[": "]",
}

const CLOSING_BRACKETS = new Set([")", "}", "]"])

/**
 * Validates bracket syntax in code, ignoring brackets inside strings and comments
 * Time Complexity: O(n) where n is the length of the code
 * Space Complexity: O(n) for the stack in worst case
 */
export function validateBrackets(code: string): ValidationResult {
  const stack: BracketPair[] = []
  const errors: ValidationError[] = []

  const lines = code.split("\n")
  let inString = false
  let stringChar = ""

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    let inLineComment = false

    for (let colIndex = 0; colIndex < line.length; colIndex++) {
      const char = line[colIndex]
      const prevChar = colIndex > 0 ? line[colIndex - 1] : ""

      // Check for single-line comment
      if (!inString && prevChar === "/" && char === "/") {
        inLineComment = true
        continue
      }

      if (inLineComment) continue

      // Handle string literals
      if ((char === '"' || char === "'" || char === "`") && prevChar !== "\\") {
        if (!inString) {
          inString = true
          stringChar = char
        } else if (char === stringChar) {
          inString = false
          stringChar = ""
        }
        continue
      }

      if (inString) continue

      // Check for opening brackets
      if (BRACKET_PAIRS[char]) {
        stack.push({
          char,
          line: lineIndex + 1,
          column: colIndex + 1,
        })
      }
      // Check for closing brackets
      else if (CLOSING_BRACKETS.has(char)) {
        if (stack.length === 0) {
          // Stray closing bracket
          errors.push({
            type: "stray_closing",
            line: lineIndex + 1,
            column: colIndex + 1,
            char,
            message: `Unexpected closing bracket '${char}' with no matching opening bracket`,
          })
        } else {
          const last = stack[stack.length - 1]
          const expectedClosing = BRACKET_PAIRS[last.char]

          if (char !== expectedClosing) {
            // Mismatched bracket
            errors.push({
              type: "mismatch",
              line: lineIndex + 1,
              column: colIndex + 1,
              char,
              expected: expectedClosing,
              message: `Mismatched bracket: expected '${expectedClosing}' but found '${char}'`,
            })
            stack.pop()
          } else {
            // Valid match
            stack.pop()
          }
        }
      }
    }

    // Reset string state at end of line for single-line strings
    if (inString && stringChar !== "`") {
      inString = false
      stringChar = ""
    }
  }

  // Check for unclosed brackets
  for (const bracket of stack) {
    errors.push({
      type: "missing_closing",
      line: bracket.line,
      column: bracket.column,
      char: bracket.char,
      expected: BRACKET_PAIRS[bracket.char],
      message: `Unclosed bracket '${bracket.char}' - missing '${BRACKET_PAIRS[bracket.char]}'`,
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Get the character at a specific line and column
 */
export function getCharAt(code: string, line: number, column: number): string {
  const lines = code.split("\n")
  if (line < 1 || line > lines.length) return ""
  const targetLine = lines[line - 1]
  if (column < 1 || column > targetLine.length) return ""
  return targetLine[column - 1]
}
