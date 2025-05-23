import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Token {
  symbol: string
  name: string
  amount: number
  value: number
  change: number
}

interface TokenListProps {
  tokens: Token[]
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Tokens</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                  <span className="font-medium text-xs">{token.symbol}</span>
                </div>
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {token.amount} {token.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.value.toFixed(2)}</div>
                <div
                  className={`text-sm flex items-center justify-end ${token.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {token.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(token.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
