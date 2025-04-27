"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ZapIcon } from "lucide-react"

export default function LightningChannelStep() {
    const [amount, setAmount] = useState(0.001)
    const [sliderValue, setSliderValue] = useState([0.001])

    const handleSliderChange = (value) => {
        setSliderValue(value)
        setAmount(value[0])
    }

    const handleInputChange = (e) => {
        const value = Number.parseFloat(e.target.value)
        if (!isNaN(value) && value >= 0) {
            setAmount(value)
            setSliderValue([value])
        }
    }

    return (
        <div className="flex flex-col flex-1">

            <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                    <ZapIcon className="h-4 w-4 text-white" />
                </div>
                <p className="text-zinc-400 text-sm">
                    Create a Lightning Network channel to enable instant, low-fee transactions.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-zinc-400">
                        Channel Amount (BTC)
                    </Label>
                    <div className="flex items-center gap-3">
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={handleInputChange}
                            step="0.0001"
                            min="0.0001"
                            max="1"
                            className="bg-zinc-900 border-zinc-800 text-white"
                        />
                        <div className="text-sm text-zinc-400 whitespace-nowrap">≈ ${(amount * 60000).toLocaleString()} USD</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-500">
                        <span>0.0001 BTC</span>
                        <span>1 BTC</span>
                    </div>
                    <Slider
                        value={sliderValue}
                        min={0.0001}
                        max={1}
                        step={0.0001}
                        onValueChange={handleSliderChange}
                        className="py-4"
                    />
                </div>

                <div className="bg-zinc-900 p-4 rounded space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Channel Fee</span>
                        <span className="text-white">0.00001 BTC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Total</span>
                        <span className="text-white font-medium">{(amount + 0.00001).toFixed(8)} BTC</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto border-l-2 border-zinc-700 pl-4 py-1">
                <p className="text-zinc-300 text-sm">
                    Funds will be locked in the Lightning channel and can be withdrawn at any time by closing the channel.
                </p>
            </div>
        </div>
    )
}
