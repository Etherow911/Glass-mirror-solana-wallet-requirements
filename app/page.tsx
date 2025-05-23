import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MirrorLogo } from "@/components/mirror-logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-slate-200 dark:border-slate-700">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <MirrorLogo className="h-16 w-16" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-200">Mirror Wallet</CardTitle>
            <CardDescription>Secure, simple, and mobile-friendly Solana wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
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
                  className="h-10 w-10 text-slate-600 dark:text-slate-300"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Key Features</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="rounded-full bg-slate-100 p-1 mr-3 dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-600 dark:text-slate-300"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                Track token balances with real-time updates
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-slate-100 p-1 mr-3 dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-600 dark:text-slate-300"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
                Send and receive SOL and SPL tokens
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-slate-100 p-1 mr-3 dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-600 dark:text-slate-300"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                Enhanced security with 2FA protection
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-slate-100 p-1 mr-3 dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-600 dark:text-slate-300"
                  >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M2 15h10" />
                    <path d="m5 12-3 3 3 3" />
                  </svg>
                </div>
                Cloud backup to Google Drive, OneDrive, and more
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link href="/mobile" className="w-full">
              <Button className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
                Get Started
              </Button>
            </Link>
            <Link href="/cli" className="w-full">
              <Button variant="outline" className="w-full">
                CLI Interface
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
