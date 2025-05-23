"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"

interface CloudBackupOptionsProps {
  wallet: {
    address: string | null
    seedPhrase: string | null
  }
}

export function CloudBackupOptions({ wallet }: CloudBackupOptionsProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [backupStatus, setBackupStatus] = useState<{
    google: boolean
    onedrive: boolean
    dropbox: boolean
    icloud: boolean
  }>({
    google: false,
    onedrive: false,
    dropbox: false,
    icloud: false,
  })

  const handleBackup = (service: "google" | "onedrive" | "dropbox" | "icloud") => {
    if (!wallet.seedPhrase) {
      alert("No wallet to backup")
      return
    }

    if (!password) {
      alert("Please enter a password")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // In a real app, this would encrypt the seed phrase and upload to the selected service
    setBackupStatus({ ...backupStatus, [service]: true })

    // Simulate API call
    setTimeout(() => {
      alert(`Backup to ${service} completed successfully!`)
    }, 1000)
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle>Cloud Backup</CardTitle>
        <CardDescription>Securely backup your wallet to cloud storage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!wallet.seedPhrase ? (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400">No wallet connected</div>
        ) : (
          <>
            <Alert className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <AlertCircle className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <AlertDescription className="text-slate-600 dark:text-slate-400">
                Your seed phrase will be encrypted before being stored in the cloud.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="password">Encryption Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">Select Backup Location</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className={`h-auto py-3 px-4 justify-start ${backupStatus.google ? "border-green-500 dark:border-green-700" : ""}`}
                  onClick={() => handleBackup("google")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <span className="font-bold text-xs">G</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Google Drive</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {backupStatus.google ? "Backed up" : "Not backed up"}
                      </div>
                    </div>
                  </div>
                  {backupStatus.google && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto py-3 px-4 justify-start ${backupStatus.onedrive ? "border-green-500 dark:border-green-700" : ""}`}
                  onClick={() => handleBackup("onedrive")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <span className="font-bold text-xs">O</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">OneDrive</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {backupStatus.onedrive ? "Backed up" : "Not backed up"}
                      </div>
                    </div>
                  </div>
                  {backupStatus.onedrive && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto py-3 px-4 justify-start ${backupStatus.dropbox ? "border-green-500 dark:border-green-700" : ""}`}
                  onClick={() => handleBackup("dropbox")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <span className="font-bold text-xs">D</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Dropbox</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {backupStatus.dropbox ? "Backed up" : "Not backed up"}
                      </div>
                    </div>
                  </div>
                  {backupStatus.dropbox && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto py-3 px-4 justify-start ${backupStatus.icloud ? "border-green-500 dark:border-green-700" : ""}`}
                  onClick={() => handleBackup("icloud")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <span className="font-bold text-xs">i</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">iCloud</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {backupStatus.icloud ? "Backed up" : "Not backed up"}
                      </div>
                    </div>
                  </div>
                  {backupStatus.icloud && <Check className="h-4 w-4 text-green-500 ml-auto" />}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
