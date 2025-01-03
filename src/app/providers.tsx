// src/app/providers.tsx
'use client'

import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="w-full max-w-full p-0 m-0">
        {children}
      </div>
    </ThemeProvider>
  )
}