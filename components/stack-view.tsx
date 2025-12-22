"use client"

export function StackView({ stack }: { stack: string[] }) {
  return (
    <div className="border rounded-lg p-4 bg-muted/40">
      <h3 className="font-semibold mb-2">Stack Visualization (DSA)</h3>

      {stack.length === 0 ? (
        <p className="text-green-500">✔ Stack Empty (Balanced)</p>
      ) : (
        <div className="space-y-1">
          {stack.map((item, i) => (
            <div
              key={i}
              className="px-2 py-1 bg-background border rounded text-sm font-mono"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
