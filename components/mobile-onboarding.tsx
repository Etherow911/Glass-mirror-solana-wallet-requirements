"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MirrorLogo } from "@/components/mirror-logo"

interface MobileOnboardingProps {
  onComplete: () => void
}

export function MobileOnboarding({ onComplete }: MobileOnboardingProps) {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-slate-200 dark:border-slate-700">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <MirrorLogo className="h-16 w-16" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-200">Mirror Wallet</CardTitle>
            <CardDescription>
              {step === 1 && "Welcome to your new Solana wallet"}
              {step === 2 && "Secure your wallet"}
              {step === 3 && "Ready to go!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {step === 1 && (
              <div className="text-center space-y-6">
                <div className="rounded-full bg-slate-100 p-6 mx-auto w-32 h-32 flex items-center justify-center dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 text-slate-600 dark:text-slate-300"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Create a New Wallet</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Your gateway to the Solana ecosystem. Send, receive, and manage your crypto assets with ease.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="text-center space-y-6">
                <div className="rounded-full bg-slate-100 p-6 mx-auto w-32 h-32 flex items-center justify-center dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 text-slate-600 dark:text-slate-300"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Backup Your Wallet</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    You'll receive a 12-word recovery phrase. Save it to Google Drive, OneDrive, Dropbox, or iCloud for
                    safekeeping.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="rounded-full bg-slate-100 p-6 mx-auto w-32 h-32 flex items-center justify-center dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-16 w-16 text-slate-600 dark:text-slate-300"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4 12 14.01l-3-3" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">You're All Set!</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Your wallet is ready to use. Start exploring the world of Solana with Mirror Wallet.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={nextStep}
            >
              {step < 3 ? "Continue" : "Get Started"}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  step === i ? "bg-slate-800 dark:bg-slate-200" : "bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
