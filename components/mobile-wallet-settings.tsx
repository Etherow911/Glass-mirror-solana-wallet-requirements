"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MirrorLogo } from "@/components/mirror-logo"
import { Shield, Moon, Sun, Globe, Bell, LogOut, HelpCircle, ChevronRight, Fingerprint } from "lucide-react"

interface MobileWalletSettingsProps {
  wallet: {
    address: string | null
    is2FAEnabled: boolean
  }
  onEnable2FA: () => void
}

export function MobileWalletSettings({ wallet, onEnable2FA }: MobileWalletSettingsProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, this would toggle the theme
  }

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  const toggleBiometrics = () => {
    setBiometrics(!biometrics)
  }

  const toggle2FA = () => {
    if (!wallet.is2FAEnabled) {
      onEnable2FA()
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      // In a real app, this would clear the wallet from localStorage
      localStorage.removeItem("mirrorWallet")
      window.location.reload()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Settings</h1>
        <MirrorLogo className="h-8 w-8" />
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your wallet security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-slate-500" />
              <div>
                <Label htmlFor="2fa" className="text-base">
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
              </div>
            </div>
            <Switch
              id="2fa"
              checked={wallet.is2FAEnabled}
              onCheckedChange={toggle2FA}
              disabled={!wallet.address || wallet.is2FAEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Fingerprint className="h-5 w-5 text-slate-500" />
              <div>
                <Label htmlFor="biometrics" className="text-base">
                  Biometric Authentication
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Use fingerprint or face ID</p>
              </div>
            </div>
            <Switch
              id="biometrics"
              checked={biometrics}
              onCheckedChange={toggleBiometrics}
              disabled={!wallet.address}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your wallet experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {darkMode ? <Moon className="h-5 w-5 text-slate-500" /> : <Sun className="h-5 w-5 text-slate-500" />}
              <Label htmlFor="dark-mode" className="text-base">
                Dark Mode
              </Label>
            </div>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-slate-500" />
              <Label htmlFor="notifications" className="text-base">
                Notifications
              </Label>
            </div>
            <Switch id="notifications" checked={notifications} onCheckedChange={toggleNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-slate-500" />
              <div>
                <Label className="text-base">Language</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">English</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <HelpCircle className="h-5 w-5 text-slate-500" />
              <Label className="text-base">Help Center</Label>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>

          <Separator />

          <Button variant="destructive" className="w-full" onClick={handleLogout} disabled={!wallet.address}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4">Mirror Wallet v1.0.0</div>
    </div>
  )
}
