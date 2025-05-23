"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, AlertCircle, RefreshCw, Send, Wallet, ShieldCheck, Key } from "lucide-react"

export default function CLIPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([
    "Welcome to Solana Wallet CLI",
    "Type 'help' to see available commands",
  ])
  const [wallet, setWallet] = useState<{
    address: string | null
    balance: number | null
    seedPhrase: string | null
    is2FAEnabled: boolean
  }>({
    address: null,
    balance: null,
    seedPhrase: null,
    is2FAEnabled: false,
  })
  const outputEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [output])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const command = input.trim()
    const newOutput = [...output, `> ${command}`]

    // Process commands
    if (command === "help") {
      newOutput.push(
        "Available commands:",
        "  create - Create a new wallet",
        "  balance - Check your wallet balance",
        "  send <address> <amount> - Send SOL to an address",
        "  receive - Show your address to receive funds",
        "  enable2fa - Enable two-factor authentication",
        "  backup - Backup your seed phrase",
        "  restore <seed-phrase> - Restore wallet from seed phrase",
        "  clear - Clear the console",
        "  exit - Exit the CLI (return to home)",
      )
    } else if (command === "create") {
      // Simulate wallet creation
      const mockAddress = "8dHEFZ1WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK" + Math.floor(Math.random() * 10)
      const mockSeedPhrase = "valley quantum region episode glide false annual degree shoulder identify apple swallow"

      setWallet({
        address: mockAddress,
        balance: 0,
        seedPhrase: mockSeedPhrase,
        is2FAEnabled: false,
      })

      newOutput.push(
        "Creating new wallet...",
        "Wallet created successfully!",
        `Address: ${mockAddress}`,
        "IMPORTANT: Please backup your seed phrase immediately using the 'backup' command",
      )
    } else if (command === "balance") {
      if (!wallet.address) {
        newOutput.push("Error: No wallet found. Create one first with 'create'")
      } else {
        // Simulate balance check
        const mockBalance = wallet.balance !== null ? wallet.balance : Math.random() * 10
        setWallet({ ...wallet, balance: mockBalance })

        newOutput.push(
          `Address: ${wallet.address}`,
          `Balance: ${mockBalance.toFixed(4)} SOL`,
          "Token balances:",
          "  • USDC: 25.00",
          "  • RAY: 15.75",
          "  • SRM: 50.00",
        )
      }
    } else if (command.startsWith("send")) {
      if (!wallet.address) {
        newOutput.push("Error: No wallet found. Create one first with 'create'")
      } else {
        const parts = command.split(" ")
        if (parts.length !== 3) {
          newOutput.push("Error: Invalid format. Use 'send <address> <amount>'")
        } else {
          const [_, recipient, amount] = parts

          if (isNaN(Number(amount))) {
            newOutput.push("Error: Amount must be a number")
          } else if (Number(amount) <= 0) {
            newOutput.push("Error: Amount must be greater than 0")
          } else if (wallet.balance !== null && Number(amount) > wallet.balance) {
            newOutput.push("Error: Insufficient funds")
          } else {
            // Simulate transaction
            const newBalance = wallet.balance !== null ? wallet.balance - Number(amount) : 0
            setWallet({ ...wallet, balance: newBalance })

            newOutput.push(
              "Processing transaction...",
              `Sending ${amount} SOL to ${recipient}...`,
              "Transaction confirmed!",
              `New balance: ${newBalance.toFixed(4)} SOL`,
            )
          }
        }
      }
    } else if (command === "receive") {
      if (!wallet.address) {
        newOutput.push("Error: No wallet found. Create one first with 'create'")
      } else {
        newOutput.push("Your wallet address:", wallet.address, "Share this address to receive SOL and other tokens")
      }
    } else if (command === "enable2fa") {
      if (!wallet.address) {
        newOutput.push("Error: No wallet found. Create one first with 'create'")
      } else if (wallet.is2FAEnabled) {
        newOutput.push("2FA is already enabled for this wallet")
      } else {
        setWallet({ ...wallet, is2FAEnabled: true })
        newOutput.push(
          "Setting up two-factor authentication...",
          "Scan this QR code with your authenticator app:",
          "[QR Code would be displayed here]",
          "Enter the 6-digit code from your authenticator app to confirm setup",
          "2FA has been successfully enabled!",
        )
      }
    } else if (command === "backup") {
      if (!wallet.address || !wallet.seedPhrase) {
        newOutput.push("Error: No wallet found. Create one first with 'create'")
      } else {
        newOutput.push(
          "⚠️ IMPORTANT: Store this seed phrase securely ⚠️",
          "Your seed phrase:",
          wallet.seedPhrase,
          "Write this down and keep it in a safe place. Anyone with this phrase can access your funds.",
        )
      }
    } else if (command.startsWith("restore")) {
      const parts = command.split(" ")
      if (parts.length < 2) {
        newOutput.push("Error: Please provide a seed phrase. Use 'restore <seed-phrase>'")
      } else {
        // Simulate wallet restoration
        const mockAddress = "5dGHPZ3WGqWz5XfVTBFbUKebG82JpQpT4z3qeVNE6nK" + Math.floor(Math.random() * 10)

        setWallet({
          address: mockAddress,
          balance: 5.25, // Mock balance
          seedPhrase: parts.slice(1).join(" "),
          is2FAEnabled: false,
        })

        newOutput.push(
          "Restoring wallet from seed phrase...",
          "Wallet restored successfully!",
          `Address: ${mockAddress}`,
          "Balance: 5.2500 SOL",
        )
      }
    } else if (command === "clear") {
      setOutput(["Console cleared"])
      setInput("")
      return
    } else if (command === "exit") {
      newOutput.push("Exiting CLI mode...")
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } else {
      newOutput.push(`Unknown command: ${command}. Type 'help' to see available commands.`)
    }

    setOutput(newOutput)
    setInput("")
  }

  return (
    <div className="flex min-h-screen flex-col p-4 bg-black text-green-400">
      <Card className="flex-1 border-green-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Solana Wallet CLI
          </CardTitle>
          <CardDescription className="text-green-600">Command Line Interface for your Solana wallet</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex">
          <Tabs defaultValue="terminal" className="flex-1 flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
              <TabsTrigger value="wallet">Wallet Info</TabsTrigger>
            </TabsList>
            <TabsContent value="terminal" className="flex-1 flex flex-col">
              <div className="flex-1 font-mono text-sm overflow-auto bg-black p-4 rounded-md border border-green-900">
                {output.map((line, i) => (
                  <div key={i} className={line.startsWith(">") ? "text-white" : ""}>
                    {line}
                  </div>
                ))}
                <div ref={outputEndRef} />
              </div>
              <form onSubmit={handleCommand} className="mt-4 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command..."
                  className="font-mono bg-black border-green-800 text-green-400"
                />
                <Button type="submit" variant="outline" className="border-green-800 text-green-400">
                  Execute
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="wallet" className="flex-1">
              <div className="space-y-4">
                {!wallet.address ? (
                  <Alert className="border-yellow-600 bg-yellow-950">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription>
                      No wallet detected. Create one with the &apos;create&apos; command.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="grid gap-4">
                      <div className="bg-gray-800 p-4 rounded-md border border-green-900">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Wallet className="h-4 w-4" /> Wallet Address
                          </h3>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-green-400">
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </Button>
                        </div>
                        <code className="text-xs break-all">{wallet.address}</code>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-md border border-green-900">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">Balance</h3>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-green-400">
                            <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                          </Button>
                        </div>
                        <div className="text-2xl font-bold">{wallet.balance?.toFixed(4) || "0.0000"} SOL</div>
                        <div className="mt-2 text-sm text-gray-400">
                          <div className="flex justify-between">
                            <span>USDC</span>
                            <span>25.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RAY</span>
                            <span>15.75</span>
                          </div>
                          <div className="flex justify-between">
                            <span>SRM</span>
                            <span>50.00</span>
                          </div>
                        </div>
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
                            <p className="text-xs text-gray-400">2FA: {wallet.is2FAEnabled ? "Enabled" : "Disabled"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-md border border-green-900">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Key className="h-4 w-4" /> Recovery
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400">
                          Use the &apos;backup&apos; command to view your seed phrase for wallet recovery.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">Type &apos;help&apos; to see available commands</CardFooter>
      </Card>

      <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-green-900">
        <h3 className="text-green-400 font-semibold mb-2">📦 Install CLI Tool</h3>
        <p className="text-green-600 text-sm mb-3">Install the Mirror Wallet CLI for system-wide access:</p>
        <div className="bg-black p-3 rounded font-mono text-xs text-green-400 mb-3">
          <div>npm install -g mirror-wallet</div>
          <div>mirror-wallet ui # Launch this interface</div>
        </div>
        <div className="text-green-600 text-xs">
          <div>Available commands:</div>
          <div>• mirror-wallet ui - Launch web interface</div>
          <div>• mirror-wallet mobile - Launch mobile interface</div>
          <div>• mirror-wallet create - Create new wallet</div>
          <div>• mirror-wallet balance - Check balance</div>
          <div>• mirror-wallet backup-cloud google - Backup to cloud</div>
        </div>
      </div>
    </div>
  )
}
