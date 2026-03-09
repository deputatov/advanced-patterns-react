import { getItem, setItem } from '@/lib/utils/localStorage';
import { storageKey } from 'node_modules/@tanstack/react-router/dist/esm/scroll-restoration';
import React, { createContext, use, useEffect, useState } from 'react';

type Theme = "system" | "light" | "dark"

type ThemeProviderState = {
   theme: Theme;
   setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

type ThemeProviderProps = {
   children: React.ReactNode;
   defaultTheme: Theme;
   storageKey?: string;
}

const ThemeContext = createContext<ThemeProviderState | null>(null)

function ThemeProvider({
   children,
   defaultTheme = 'system',
   storageKey = 'theme'
}: ThemeProviderProps) {
   const [theme, setTheme] = useState<Theme>(() =>
      getItem(storageKey) ?? defaultTheme,
   ) 

   useEffect(() => {
      const root = document.documentElement
      root.classList.remove('light', 'dark')

      if (theme === 'system') {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light"

         root.classList.add(systemTheme)
         setItem(storageKey, systemTheme)
         return;
      }

      root.classList.add(theme)
      setItem(storageKey, theme)
   }, [theme])

   return (
      <ThemeContext value={{theme, setTheme}}>
         {children}
      </ThemeContext>
   ); 
}

function useTheme() {
   const context = use(ThemeContext)

   if (context === null) {
      throw new Error('useTheme must be used within ThemeProvider')
   }

   return context
}

export {
   ThemeProvider,
   useTheme
}