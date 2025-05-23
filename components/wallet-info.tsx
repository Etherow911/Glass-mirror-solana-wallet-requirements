"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Send, ShieldCheck } from "lucide-react"

interface WalletInfoProps {
  address: string
  balance: number
  tokens?: { symbol: string; amount: number }[]
  is2FAEnabled: boolean
  onRefresh?: () => void
}

export function WalletInfo({ address, balance, tokens = [], is2FAEnabled, onRefresh }: WalletInfoProps) {
  return (
    <Card className="border-green-800 bg-gray-900 text-green-400">
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
        <CardDescription className="text-green-600">Your Solana wallet details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-md border border-green-900">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Wallet Address</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-green-400">
              <Copy className="h-3 w-3 mr-1" /> Copy
            </Button>
          </div>
          <code className="text-xs break-all">{address}</code>
        </div>

        <div className="bg-gray-800 p-4 rounded-md border border-green-900">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Balance</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-green-400" onClick={onRefresh}>
              <RefreshCw className="h-3 w-3 mr-1" /> Refresh
            </Button>
          </div>
          <div className="text-2xl font-bold">{balance.toFixed(4)} SOL</div>
          {tokens.length > 0 && (
            <div className="mt-2 text-sm text-gray-400">
              {tokens.map((token, index) => (
                <div key={index} className="flex justify-between">
                  <span>{token.symbol}</span>
                  <span>{token.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-md border border-green-900">
            <div className="flex flex-col items-center text-center">
              <Send className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">Send</h3>
              <p className="text-xs text-gray-400">Transfer tokens</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md border border-green-900">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">Security</h3>
              <p className="text-xs text-gray-400">2FA: {is2FAEnabled ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
