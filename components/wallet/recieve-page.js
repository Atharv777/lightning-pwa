"use client"

import { useState } from "react"
import { ArrowLeft, Copy, CheckCircle2, Share2, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QRCode from "react-qr-code"

export default function ReceivePage({ goBack, walletData }) {
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [activeTab, setActiveTab] = useState("bitcoin")
    const [amount, setAmount] = useState("")
    const [note, setNote] = useState("")

    const copyAddress = () => {
        navigator.clipboard.writeText(walletData.fullAddress)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
    }

    const handleAmountChange = (e) => {
        const value = e.target.value
        if (/^(\d*\.?\d*)$/.test(value) || value === "") {
            setAmount(value)
        }
    }

    const getQrValue = () => {
        if (activeTab === "bitcoin") {
            return `bitcoin:${walletData.fullAddress}${amount ? `?amount=${amount}` : ""}`
        } else {
            return `lightning:${walletData.fullAddress}${amount ? `?amount=${amount}` : ""}`
        }
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

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                <Tabs defaultValue="bitcoin" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-transparent border-b border-zinc-800 rounded-none mb-6">
                        <TabsTrigger
                            value="bitcoin"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:shadow-none rounded-none text-sm"
                        >
                            Bitcoin
                        </TabsTrigger>
                        <TabsTrigger
                            value="lightning"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:shadow-none rounded-none text-sm"
                        >
                            Lightning
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="bitcoin" className="mt-0 space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg">
                                <QRCode value={getQrValue()} size={180} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400">Bitcoin Address</Label>
                            <div className="flex items-center gap-2">
                                <div className="bg-zinc-900 p-3 rounded-lg flex-1 text-sm break-all">{walletData.fullAddress}</div>
                                <button
                                    onClick={copyAddress}
                                    className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-lg text-zinc-400 hover:text-white"
                                >
                                    {copiedAddress ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-zinc-400">
                                Request Amount (optional)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="amount"
                                    placeholder="0.00"
                                    className="bg-zinc-900 border-zinc-800 text-white pr-12"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                                <div className="absolute right-3 top-2.5 text-zinc-400">BTC</div>
                            </div>
                            {amount && (
                                <div className="text-xs text-zinc-400">
                                    ≈ $
                                    {(Number.parseFloat(amount || "0") * 60000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="note" className="text-zinc-400">
                                Note (optional)
                            </Label>
                            <Input
                                id="note"
                                placeholder="What's this for?"
                                className="bg-zinc-900 border-zinc-800 text-white"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="lightning" className="mt-0 space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg">
                                <QRCode value={getQrValue()} size={180} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400">Lightning Invoice</Label>
                            <div className="flex items-center gap-2">
                                <div className="bg-zinc-900 p-3 rounded-lg flex-1 text-sm break-all">
                                    lnbc1500n1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspk28uwq
                                </div>
                                <button
                                    onClick={copyAddress}
                                    className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-lg text-zinc-400 hover:text-white"
                                >
                                    {copiedAddress ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lightning-amount" className="text-zinc-400">
                                Request Amount (optional)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="lightning-amount"
                                    placeholder="0.00"
                                    className="bg-zinc-900 border-zinc-800 text-white pr-12"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                                <div className="absolute right-3 top-2.5 text-zinc-400">BTC</div>
                            </div>
                            {amount && (
                                <div className="text-xs text-zinc-400">
                                    ≈ $
                                    {(Number.parseFloat(amount || "0") * 60000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expiry" className="text-zinc-400">
                                Expires in
                            </Label>
                            <select id="expiry" className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white">
                                <option value="1h">1 hour</option>
                                <option value="24h" selected>
                                    24 hours
                                </option>
                                <option value="7d">7 days</option>
                                <option value="30d">30 days</option>
                            </select>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="p-4 border-t border-zinc-800/50">
                <div className="flex gap-2">
                    <Button className="flex-1 bg-white hover:bg-zinc-200 text-black rounded-full">
                        <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                    <Button variant="outline" className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 rounded-full">
                        <Download className="h-4 w-4 mr-2" /> Save QR
                    </Button>
                </div>
            </footer>
        </>
    )
}
