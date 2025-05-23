"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, ExternalLink } from "lucide-react"
import { MirrorLogo } from "@/components/mirror-logo"
import { TokenList } from "@/components/token-list"

interface MobileWalletHomeProps {
  wallet: {
    address: string | null
    balance: number | null
    is2FAEnabled: boolean
  }
  onRefresh: () => void
}

export function MobileWalletHome({ wallet, onRefresh }: MobileWalletHomeProps) {
  const [copied, setCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    onRefresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Mock token data
  const tokens = [
    { symbol: "USDC", name: "USD Coin", amount: 25.0, value: 25.0, change: 0.1 },
    { symbol: "RAY", name: "Raydium", amount: 15.75, value: 31.5, change: 2.5 },
    { symbol: "SRM", name: "Serum", amount: 50.0, value: 40.0, change: -1.2 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MirrorLogo className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Mirror Wallet</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Wallet Balance</CardTitle>
          <CardDescription>
            {wallet.address ? (
              <div className="flex items-center text-xs">
                <span className="truncate max-w-[180px]">{wallet.address}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={copyAddress}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              "No wallet connected"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-1">
            {wallet.balance !== null ? wallet.balance.toFixed(4) : "0.0000"} SOL
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            ≈ ${wallet.balance !== null ? (wallet.balance * 20).toFixed(2) : "0.00"} USD
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
              Send
            </Button>
            <Button variant="outline" className="flex-1">
              Receive
            </Button>
          </div>
        </CardContent>
      </Card>

      <TokenList tokens={tokens} />

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
        <div className="flex items-center justify-center">
          <span>Solana Explorer</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </div>
      </div>
    </div>
  )
}
