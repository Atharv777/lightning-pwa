"use client"

import { useState } from "react"
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react"
import QRCode from "react-qr-code"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import QRScanner from "@/components/QRScanner"
import TransactionSuccess from "./transaction-success"


export default function ReceivePage({ goBack, walletData }) {
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [amount, setAmount] = useState("")
    const [currentStep, setCurrentStep] = useState("1")

    const copyAddress = () => {
        navigator.clipboard.writeText(walletData.fullAddress)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
    }

    const onScan = (data) => {
        let amount = Number(data.split("b")[1].split("z")[0])
        setAmount(amount)
        window.localStorage.setItem(
            "balance",
            (Number(localStorage.getItem("balance")) + amount).toFixed(2)
        )
        if (!localStorage.getItem("transactions")) {
            localStorage.setItem("transactions", "[]")
        }
        localStorage.setItem("transactions", JSON.stringify([...JSON.parse(localStorage.getItem("transactions")), {
            "type" : "receive",
            "amount" : amount,
            "usdAmount" : amount * 0.25,
            "recipient": data.split("py")[1].split("adrs")[0],
        }]))
        setCurrentStep("3")
    }

    const getQrValue = () => {
        return walletData.fullAddress
    }

    return (
        <>
            <header className="p-4 flex justify-between items-center border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <button onClick={goBack} className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-lg font-light tracking-tight text-white">Receive</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {
                    currentStep === "1"
                        ? <>
                            <div className="mt-0 space-y-6">
                                <Label className="text-zinc-500 text-sm">Step 1: <span className="leading-[1.42] text-xs text-zinc-600">Show Your Address</span></Label>
                                <div className="flex justify-center">
                                    <div className="bg-white p-4 rounded-lg">
                                        <QRCode value={getQrValue()} size={150} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Your Address</Label>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="bg-zinc-900 p-3 rounded-lg flex-1 text-sm break-all w-full">
                                            {walletData.address}
                                        </div>
                                        <button
                                            onClick={copyAddress}
                                            className="w-full py-2 flex items-center justify-center bg-zinc-900 rounded-lg text-zinc-400 hover:text-white text-sm"
                                        >
                                            {copiedAddress
                                                ? <>
                                                    <CheckCircle2 className="h-3 w-3 text-green-400 mr-2" />
                                                    <span className="text-green-400">Copied!</span>
                                                </>
                                                : <>
                                                    <Copy className="h-3 w-3 mr-2" />
                                                    <span>Copy</span>
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Label className="text-zinc-500 text-sm mb-2">Step 2: <span className="leading-[1.42] text-xs text-zinc-600">Scan Invoice</span></Label>
                                <Button className="w-full bg-white hover:bg-zinc-300 text-black rounded-full disabled:bg-zinc-700 disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed" onClick={() => setCurrentStep("2")}>
                                    Scan Lightning Invoice
                                </Button>
                            </div>
                        </>

                        : currentStep === "2"
                            ? <div className="mt-0">
                                <Label className="text-zinc-500 text-sm">Step 2: <span className="leading-[1.42] text-xs text-zinc-600">Scan Invoice</span></Label>

                                <div className="w-full flex justify-center my-8">
                                    <QRScanner withText={true} handleRequest={onScan} />
                                </div>

                                <Button className="w-full bg-white hover:bg-zinc-300 text-black rounded-full disabled:bg-zinc-700 disabled:text-zinc-400 cursor-pointer disabled:cursor-not-allowed" onClick={() => setCurrentStep("1")}>
                                    Back to Step 1
                                </Button>
                            </div>

                            : currentStep === "3"
                                ? <TransactionSuccess amount={amount} recipient={walletData.address} goToHome={goBack} receive={true} />
                                : null
                }

                <div className="mt-10">
                    <ul className="space-y-1">
                        <li className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                            <span className="text-zinc-500">
                                Show your address QR to the sender
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                            <span className="text-zinc-500">
                                Sender creates a Lightning Invoice
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                            <span className="text-zinc-500">
                                Click &ldquo;Scan Lightning Invoice&rdquo; to open QR Scanner
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-xs">
                            <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                            <span className="text-zinc-500">
                                Scan the Invoice to complete the transaction
                            </span>
                        </li>
                    </ul>
                </div>
            </main >
        </>
    )
}

