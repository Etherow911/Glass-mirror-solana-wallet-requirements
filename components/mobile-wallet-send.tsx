"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scan, Send, ArrowLeft } from "lucide-react"
import { TokenSelector } from "@/components/token-selector"

interface MobileWalletSendProps {
  wallet: {
    address: string | null
    balance: number | null
  }
}

export function MobileWalletSend({ wallet }: MobileWalletSendProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("SOL")
  const [step, setStep] = useState(1)

  const handleScan = () => {
    // In a real app, this would open the camera for QR scanning
    alert("QR code scanning would open here")
  }

  const handleContinue = () => {
    if (!recipient || !amount) {
      alert("Please fill in all fields")
      return
    }
    setStep(2)
  }

  const handleSend = () => {
    // In a real app, this would send the transaction
    alert(`Sending ${amount} ${selectedToken} to ${recipient}`)
    setStep(1)
    setRecipient("")
    setAmount("")
  }

  const handleBack = () => {
    setStep(1)
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
      <h1 className="text-xl font-bold">Send</h1>

      {step === 1 ? (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Send Tokens</CardTitle>
            <CardDescription>Send SOL or SPL tokens to any address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Select Token</Label>
              <TokenSelector tokens={tokens} selectedToken={selectedToken} onSelect={setSelectedToken} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <div className="flex">
                <Input
                  id="recipient"
                  placeholder="Enter Solana address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="rounded-r-none"
                />
                <Button type="button" variant="outline" className="rounded-l-none border-l-0" onClick={handleScan}>
                  <Scan className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-slate-500">
                  {selectedToken}
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Available: {tokens.find((t) => t.symbol === selectedToken)?.balance.toFixed(4) || 0} {selectedToken}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 -ml-2" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle>Confirm Transaction</CardTitle>
                <CardDescription>Review the transaction details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">From</span>
                <span className="font-medium truncate max-w-[200px]">{wallet.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">To</span>
                <span className="font-medium truncate max-w-[200px]">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Amount</span>
                <span className="font-medium">
                  {amount} {selectedToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Network Fee</span>
                <span className="font-medium">0.000005 SOL</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span>
                  {amount} {selectedToken}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={handleSend}
            >
              <Send className="h-4 w-4 mr-2" /> Send Transaction
            </Button>
            <Button variant="outline" className="w-full" onClick={handleBack}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
