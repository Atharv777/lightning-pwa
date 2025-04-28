"use client"

import { useState } from "react"
import { ArrowLeft, QrCodeIcon as QrCodeScan, ChevronDown, Info, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import QRScanner from "@/components/QRScanner"


export default function SendPage({ goBack, walletData }) {
    const [amount, setAmount] = useState("")
    const [recipient, setRecipient] = useState("")
    const [amountUnit, setAmountUnit] = useState("btc")
    const [feeLevel, setFeeLevel] = useState(1)
    const [sliderValue, setSliderValue] = useState([1])
    const [showQrScanner, setShowQrScanner] = useState(false)
    const [slideDirection, setSlideDirection] = useState(1)

    const feeLevels = [
        { name: "Low", time: "~60 min", fee: 0.000005 },
        { name: "Medium", time: "~30 min", fee: 0.00001 },
        { name: "High", time: "~10 min", fee: 0.00002 },
    ]

    const handleFeeChange = (value) => {
        setSliderValue(value)
        setFeeLevel(value[0])
    }

    const handleAmountChange = (e) => {
        const value = e.target.value
        if (/^(\d*\.?\d*)$/.test(value) || value === "") {
            setAmount(value)
        }
    }

    const getBtcAmount = () => {
        if (!amount) return 0
        return amountUnit === "btc" ? Number.parseFloat(amount) : Number.parseFloat(amount) / 60000
    }

    const getUsdAmount = () => {
        if (!amount) return 0
        return amountUnit === "btc" ? Number.parseFloat(amount) * 60000 : Number.parseFloat(amount)
    }

    const isValidAmount = () => {
        const btcAmount = getBtcAmount()
        return btcAmount > 0 && btcAmount <= walletData.balance
    }

    const isValidRecipient = () => {
        return recipient.length > 25
    }

    const canSend = isValidAmount() && isValidRecipient()

    const openQrScanner = () => {
        setSlideDirection(1)
        setShowQrScanner(true)
    }

    const closeQrScanner = () => {
        setSlideDirection(-1)
        setShowQrScanner(false)
    }

    const handleQrScan = (result) => {
        setRecipient(result)
        closeQrScanner()
    }

    const pageVariants = {
        initial: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }),
    }

    return (
        <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            {showQrScanner ? (
                <motion.div
                    key="qrscanner"
                    className="absolute inset-0 bg-zinc-950 z-10"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    custom={slideDirection}
                >
                    <ScannerArea goBack={closeQrScanner} onScan={handleQrScan} />
                </motion.div>
            ) : (
                <motion.div
                    key="sendpage"
                    className="flex flex-col h-full"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    custom={slideDirection}
                >
                    <header className="p-4 flex justify-between items-center border-b border-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <button onClick={goBack} className="text-zinc-400 hover:text-white">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <h1 className="text-lg font-light tracking-tight text-white">Send Bitcoin</h1>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                        <div className="space-y-6">
                            {/* Recipient */}
                            <div className="space-y-2">
                                <Label htmlFor="recipient" className="text-zinc-400">
                                    Recipient
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="recipient"
                                        placeholder="Bitcoin address"
                                        className="bg-zinc-900 border-zinc-800 text-white pr-10"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                    <button className="absolute right-3 top-2.5 text-zinc-400 hover:text-white" onClick={openQrScanner} >
                                        <QrCodeScan className="h-4 w-4" />
                                    </button>
                                </div>
                                {recipient && !isValidRecipient() && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                        <AlertCircle className="h-3 w-3" />
                                        <span>Invalid Bitcoin address</span>
                                    </div>
                                )}
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label htmlFor="amount" className="text-zinc-400">
                                        Amount
                                    </Label>
                                    <div className="text-xs text-zinc-400">
                                        Available: {walletData.balance} BTC (${walletData.usdBalance})
                                    </div>
                                </div>

                                <div className="relative">
                                    <Input
                                        id="amount"
                                        placeholder="0.00"
                                        className="bg-zinc-900 border-zinc-800 text-white text-right pr-16 text-lg"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                    <div className="absolute right-3 top-2 flex items-center">
                                        <button
                                            onClick={() => setAmountUnit(amountUnit === "btc" ? "usd" : "btc")}
                                            className="flex items-center gap-1 text-zinc-400 hover:text-white text-sm"
                                        >
                                            {amountUnit.toUpperCase()}
                                            <ChevronDown className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>
                                        {amountUnit === "btc"
                                            ? `≈ $${getUsdAmount().toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                            : `≈ ${getBtcAmount().toFixed(8)} BTC`}
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (amountUnit === "btc") {
                                                setAmount(walletData.balance.toString())
                                            } else {
                                                setAmount(walletData.usdBalance.toString())
                                            }
                                        }}
                                        className="text-white hover:underline"
                                    >
                                        Max
                                    </button>
                                </div>

                                {amount && !isValidAmount() && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs">
                                        <AlertCircle className="h-3 w-3" />
                                        <span>
                                            {getBtcAmount() <= 0 ? "Amount must be greater than 0" : "Insufficient funds for this transaction"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="text-zinc-400 flex items-center gap-1">
                                        Network Fee
                                        <button className="text-zinc-500 hover:text-zinc-300">
                                            <Info className="h-3 w-3" />
                                        </button>
                                    </Label>
                                    <div className="text-sm">{feeLevels[feeLevel].name}</div>
                                </div>

                                <Slider value={sliderValue} min={0} max={2} step={1} onValueChange={handleFeeChange} className="py-4" />

                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>Slow</span>
                                    <span>Fast</span>
                                </div>

                                <div className="bg-zinc-900 p-3 rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Fee</span>
                                        <span className="text-white">
                                            {feeLevels[feeLevel].fee} BTC (${(feeLevels[feeLevel].fee * 60000).toFixed(2)})
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Estimated Confirmation</span>
                                        <span className="text-white">{feeLevels[feeLevel].time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-900 p-3 rounded-lg">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Total</span>
                                    <span className="text-white font-medium">
                                        {amount ? (getBtcAmount() + feeLevels[feeLevel].fee).toFixed(8) : "0.00000000"} BTC
                                    </span>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="p-4 border-t border-zinc-800/50">
                        <Button
                            disabled={!canSend}
                            className="w-full bg-white hover:bg-zinc-200 text-black rounded-full disabled:bg-zinc-700 disabled:text-zinc-400"
                        >
                            Send Bitcoin
                        </Button>
                    </footer>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


const ScannerArea = ({ goBack, onScan }) => {

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 flex justify-between items-center border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <button onClick={goBack} className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-lg font-light tracking-tight text-white">Scan QR Code</h1>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-4">

                <QRScanner withText={true} handleRequest={onScan} />

            </div>
        </div>
    )
}