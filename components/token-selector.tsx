"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Token {
  symbol: string
  name: string
  balance: number
}

interface TokenSelectorProps {
  tokens: Token[]
  selectedToken: string
  onSelect: (value: string) => void
}

export function TokenSelector({ tokens, selectedToken, onSelect }: TokenSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedToken ? (
            <>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-2">
                  <span className="font-medium text-xs">{selectedToken}</span>
                </div>
                <span>{tokens.find((token) => token.symbol === selectedToken)?.name || selectedToken}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400">
                {tokens.find((token) => token.symbol === selectedToken)?.balance.toFixed(4) || 0}
              </span>
            </>
          ) : (
            "Select token"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.symbol}
                  value={token.symbol}
                  onSelect={(currentValue) => {
                    onSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-2">
                        <span className="font-medium text-xs">{token.symbol}</span>
                      </div>
                      <span>{token.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">
                        {token.balance.toFixed(4)}
                      </span>
                      <Check className={cn("h-4 w-4", selectedToken === token.symbol ? "opacity-100" : "opacity-0")} />
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
