"use client"

import { Home, Send, QrCode, Shield, Settings, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileNavbar({ activeTab, onTabChange }: MobileNavbarProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "send", label: "Send", icon: Send },
    { id: "receive", label: "Receive", icon: QrCode },
    { id: "history", label: "History", icon: Clock },
    { id: "backup", label: "Backup", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-3 px-1",
              activeTab === tab.id ? "text-slate-800 dark:text-slate-200" : "text-slate-500 dark:text-slate-400",
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-slate-800 dark:text-slate-200" : "")} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
