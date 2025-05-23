"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2 } from "lucide-react"
import { TokenSelector } from "@/components/token-selector"

interface MobileWalletReceiveProps {
  wallet: {
    address: string | null
    balance: number | null
  }
}

export function MobileWalletReceive({ wallet }: MobileWalletReceiveProps) {
  const [selectedToken, setSelectedToken] = useState("SOL")
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareAddress = () => {
    // In a real app, this would use the Web Share API
    if (navigator.share && wallet.address) {
      navigator
        .share({
          title: "My Mirror Wallet Address",
          text: `Here's my Solana address: ${wallet.address}`,
          url: `https://explorer.solana.com/address/${wallet.address}`,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      alert("Sharing not supported on this browser")
    }
  }

  // Mock token data
  const tokens = [
    { symbol: "SOL", name: "Solana", balance: wallet.balance || 0 },
    { symbol: "USDC", name: "USD Coin", balance: 25.0 },
    { symbol: "RAY", name: "Raydium", balance: 15.75 },
    { symbol: "SRM", name: "Serum", balance: 50.0 },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Receive</h1>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Receive Tokens</CardTitle>
          <CardDescription>Share your address to receive tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col items-center">
          <div className="w-full">
            <TokenSelector tokens={tokens} selectedToken={selectedToken} onSelect={setSelectedToken} />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg w-48 h-48 flex items-center justify-center">
            {wallet.address ? (
              <div className="text-center">
                {/* This would be a real QR code in a production app */}
                <div className="w-36 h-36 bg-slate-900 dark:bg-white mx-auto relative">
                  <div className="absolute inset-2 grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${Math.random() > 0.7 ? "bg-white dark:bg-slate-900" : "bg-transparent"} rounded-sm`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-xs">Scan to receive {selectedToken}</div>
              </div>
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400">No wallet connected</div>
            )}
          </div>

          {wallet.address && (
            <div className="w-full space-y-2">
              <div className="text-center text-sm font-medium">Your Address</div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-xs break-all text-center">
                {wallet.address}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={copyAddress} disabled={!wallet.address}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            className="flex-1 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
            onClick={shareAddress}
            disabled={!wallet.address}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
