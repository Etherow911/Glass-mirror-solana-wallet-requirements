"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, ExternalLink, Search, Download, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  signature: string
  type: "send" | "receive"
  amount: number
  token: string
  to: string
  from: string
  timestamp: Date
  status: "confirmed" | "pending" | "failed"
  fee: number
  blockHeight: number
  error?: string
}

interface TransactionHistoryProps {
  walletAddress?: string
}

export function TransactionHistory({ walletAddress }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

  // Mock transaction data
  const mockTransactions: Transaction[] = [
    {
      signature: "5UxV2MnQZf8K9vL3mP1qR7sT4wX6yZ2aB5cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9",
      type: "send",
      amount: 2.5,
      token: "SOL",
      to: "8dHEFZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK9",
      from: "5dGHPZ3WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK8",
      timestamp: new Date(Date.now() - 3600000),
      status: "confirmed",
      fee: 0.000005,
      blockHeight: 234567890,
    },
    {
      signature: "3TyU1VnMkLf7G8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4nO5pQ6",
      type: "receive",
      amount: 5.0,
      token: "SOL",
      to: "5dGHPZ3WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK8",
      from: "9eHQZ4WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK7",
      timestamp: new Date(Date.now() - 7200000),
      status: "confirmed",
      fee: 0.000005,
      blockHeight: 234567850,
    },
    {
      signature: "7ZaB1CdE2fG3hI4jK5lM6nO7pQ8rS9tU0vW1xY2zA3bC4dE5fG6hI7jK8lM9nO0pQ1",
      type: "send",
      amount: 100.0,
      token: "USDC",
      to: "7cGPZ2WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK6",
      from: "5dGHPZ3WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK8",
      timestamp: new Date(Date.now() - 86400000),
      status: "confirmed",
      fee: 0.000005,
      blockHeight: 234560000,
    },
    {
      signature: "1EfG5HiJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN1oP2qR3sT4uV5",
      type: "send",
      amount: 0.1,
      token: "SOL",
      to: "4bFPZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK4",
      from: "5dGHPZ3WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK8",
      timestamp: new Date(Date.now() - 259200000),
      status: "failed",
      fee: 0.000005,
      blockHeight: 234540000,
      error: "Insufficient funds",
    },
  ]

  useEffect(() => {
    loadTransactions()
  }, [walletAddress])

  useEffect(() => {
    filterTransactions()
  }, [transactions, filter, searchTerm])

  const loadTransactions = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions)
      setLoading(false)
    }, 1000)
  }

  const filterTransactions = () => {
    let filtered = transactions

    // Filter by type
    if (filter !== "all") {
      filtered = filtered.filter((tx) => tx.type === filter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.token.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredTransactions(filtered)
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Failed</Badge>
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const exportTransactions = (format: "csv" | "json") => {
    const data = filteredTransactions.map((tx) => ({
      date: tx.timestamp.toISOString(),
      type: tx.type,
      amount: tx.amount,
      token: tx.token,
      from: tx.from,
      to: tx.to,
      status: tx.status,
      fee: tx.fee,
      signature: tx.signature,
      blockHeight: tx.blockHeight,
    }))

    if (format === "csv") {
      const headers = Object.keys(data[0]).join(",")
      const rows = data.map((row) => Object.values(row).join(","))
      const csv = [headers, ...rows].join("\n")

      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mirror-wallet-transactions-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
    } else {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mirror-wallet-transactions-${new Date().toISOString().split("T")[0]}.json`
      a.click()
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Transaction History
            <Button variant="ghost" size="icon" onClick={loadTransactions} disabled={loading}>
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
          </CardTitle>
          <CardDescription>View and manage your transaction history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="send">Sent</SelectItem>
                <SelectItem value="receive">Received</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportTransactions("csv")}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportTransactions("json")}>
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">Loading transactions...</div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">No transactions found</div>
            ) : (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.signature}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  onClick={() => setSelectedTx(tx)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {tx.type === "send" ? (
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium capitalize">{tx.type}</span>
                        {getStatusBadge(tx.status)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {tx.type === "send" ? `To: ${tx.to.slice(0, 8)}...` : `From: ${tx.from.slice(0, 8)}...`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("font-medium", tx.type === "send" ? "text-red-600" : "text-green-600")}>
                      {tx.type === "send" ? "-" : "+"}
                      {tx.amount} {tx.token}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{formatTimeAgo(tx.timestamp)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transaction Details
              <Button variant="ghost" size="sm" onClick={() => setSelectedTx(null)}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Signature</label>
                <div className="font-mono text-xs break-all">{selectedTx.signature}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</label>
                <div>{getStatusBadge(selectedTx.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Amount</label>
                <div className="font-medium">
                  {selectedTx.amount} {selectedTx.token}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Fee</label>
                <div>{selectedTx.fee} SOL</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">From</label>
                <div className="font-mono text-xs break-all">{selectedTx.from}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">To</label>
                <div className="font-mono text-xs break-all">{selectedTx.to}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Block Height</label>
                <div>{selectedTx.blockHeight.toLocaleString()}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Time</label>
                <div>{selectedTx.timestamp.toLocaleString()}</div>
              </div>
            </div>

            {selectedTx.error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="text-sm font-medium text-red-800 dark:text-red-300">Error</div>
                <div className="text-sm text-red-600 dark:text-red-400">{selectedTx.error}</div>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(`https://explorer.solana.com/tx/${selectedTx.signature}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Solana Explorer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
