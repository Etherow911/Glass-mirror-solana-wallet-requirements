import { cn } from "@/lib/utils"

interface MirrorLogoProps {
  className?: string
}

export function MirrorLogo({ className }: MirrorLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 rounded-full opacity-50 blur-sm"></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-full p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-800 dark:text-slate-200"
          />
          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" className="text-slate-800 dark:text-slate-200" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" className="text-slate-800 dark:text-slate-200" />
          <circle cx="12" cy="12" r="2" fill="currentColor" className="text-slate-800 dark:text-slate-200" />
        </svg>
      </div>
    </div>
  )
}
