"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CloudBackupOptions } from "@/components/cloud-backup-options"
import { AlertCircle, Copy, Eye, EyeOff, Lock } from "lucide-react"

interface MobileWalletBackupProps {
  wallet: {
    address: string | null
    seedPhrase: string | null
  }
}

export function MobileWalletBackup({ wallet }: MobileWalletBackupProps) {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState(false)
  const [backupTab, setBackupTab] = useState("phrase")

  const toggleSeedPhrase = () => {
    setShowSeedPhrase(!showSeedPhrase)
  }

  const copySeedPhrase = () => {
    if (wallet.seedPhrase) {
      navigator.clipboard.writeText(wallet.seedPhrase)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Backup & Recovery</h1>

      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertTitle className="text-amber-800 dark:text-amber-500">Important</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          Never share your seed phrase with anyone. Keep it secure and backed up in multiple locations.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={backupTab} onValueChange={setBackupTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="phrase">Seed Phrase</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Backup</TabsTrigger>
        </TabsList>
        <TabsContent value="phrase">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Your Seed Phrase</CardTitle>
              <CardDescription>
                These 12 words are the only way to recover your wallet if you lose access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {wallet.seedPhrase ? (
                <>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    {showSeedPhrase ? (
                      <div className="grid grid-cols-3 gap-2">
                        {wallet.seedPhrase.split(" ").map((word, index) => (
                          <div key={index} className="bg-white dark:bg-slate-700 p-2 rounded text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400 mr-1">{index + 1}.</span>
                            {word}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-32 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={toggleSeedPhrase}>
                      {showSeedPhrase ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button
                      className="flex-1 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                      onClick={copySeedPhrase}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-slate-500 dark:text-slate-400">No wallet connected</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cloud">
          <CloudBackupOptions wallet={wallet} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
