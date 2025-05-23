"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileNavbar } from "@/components/mobile-navbar"
import { MobileWalletHome } from "@/components/mobile-wallet-home"
import { MobileWalletSend } from "@/components/mobile-wallet-send"
import { MobileWalletReceive } from "@/components/mobile-wallet-receive"
import { MobileWalletSettings } from "@/components/mobile-wallet-settings"
import { MobileWalletBackup } from "@/components/mobile-wallet-backup"
import { MobileOnboarding } from "@/components/mobile-onboarding"
import { useMobile } from "@/hooks/use-mobile"
import { TransactionHistory } from "@/components/transaction-history"

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [wallet, setWallet] = useState<{
    address: string | null
    balance: number | null
    seedPhrase: string | null
    is2FAEnabled: boolean
    isOnboarded: boolean
  }>({
    address: null,
    balance: null,
    seedPhrase: null,
    is2FAEnabled: false,
    isOnboarded: false,
  })
  const router = useRouter()
  const isMobile = useMobile()

  useEffect(() => {
    // Check if wallet exists in localStorage
    const storedWallet = localStorage.getItem("mirrorWallet")
    if (storedWallet) {
      try {
        const parsedWallet = JSON.parse(storedWallet)
        setWallet({
          ...parsedWallet,
          isOnboarded: true,
        })
      } catch (error) {
        console.error("Error parsing wallet data:", error)
      }
    }
  }, [])

  const createWallet = () => {
    // Simulate wallet creation
    const mockAddress = "8dHEFZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK" + Math.floor(Math.random() * 10)
    const mockSeedPhrase = "valley quantum region episode glide false annual degree shoulder identify apple swallow"

    const newWallet = {
      address: mockAddress,
      balance: 0,
      seedPhrase: mockSeedPhrase,
      is2FAEnabled: false,
      isOnboarded: true,
    }

    setWallet(newWallet)
    localStorage.setItem("mirrorWallet", JSON.stringify(newWallet))
  }

  const refreshBalance = () => {
    if (wallet.address) {
      // Simulate balance update
      const mockBalance = Math.random() * 10
      const updatedWallet = { ...wallet, balance: mockBalance }
      setWallet(updatedWallet)
      localStorage.setItem("mirrorWallet", JSON.stringify(updatedWallet))
    }
  }

  const enable2FA = () => {
    if (wallet.address) {
      const updatedWallet = { ...wallet, is2FAEnabled: true }
      setWallet(updatedWallet)
      localStorage.setItem("mirrorWallet", JSON.stringify(updatedWallet))
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Redirect to desktop version if not on mobile
  useEffect(() => {
    if (!isMobile && typeof window !== "undefined") {
      router.push("/")
    }
  }, [isMobile, router])

  if (!wallet.isOnboarded) {
    return <MobileOnboarding onComplete={createWallet} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <MobileNavbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1 p-4 pb-20">
        {activeTab === "home" && <MobileWalletHome wallet={wallet} onRefresh={refreshBalance} />}
        {activeTab === "send" && <MobileWalletSend wallet={wallet} />}
        {activeTab === "receive" && <MobileWalletReceive wallet={wallet} />}
        {activeTab === "history" && <TransactionHistory walletAddress={wallet.address} />}
        {activeTab === "backup" && <MobileWalletBackup wallet={wallet} />}
        {activeTab === "settings" && <MobileWalletSettings wallet={wallet} onEnable2FA={enable2FA} />}
      </main>
    </div>
  )
}
