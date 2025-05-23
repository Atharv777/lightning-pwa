"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, QrCode, Copy, CheckCircle2 } from "lucide-react"
import TransactionList from "./transaction-list"
import { AnimatePresence, motion } from "framer-motion"
import SendPage from "./send-page"
import ReceivePage from "./recieve-page"

export default function WalletHome({ onLock, publicprivatekey }) {
    const [activeTab, setActiveTab] = useState("assets")
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [currentView, setCurrentView] = useState("home")
    const [slideDirection, setSlideDirection] = useState(1)

    var walletData = {
        balance: 0.00342,
        usdBalance: 205.2,
        lightningBalance: 0.00125,
        lightningUsdBalance: 75.0,
        fullAddress: publicprivatekey.publicKey,
        address: publicprivatekey.publicKey,
        privateKey: publicprivatekey.privateKey
    }

    try {
        walletData.balance = Number(localStorage.getItem("balance"))
        walletData.lightningBalance = walletData.balance
        walletData.usdBalance = walletData.balance * 0.25
        walletData.lightningUsdBalance = walletData.usdBalance
    } catch { }

    const copyAddress = () => {
        navigator.clipboard.writeText(walletData.fullAddress)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
    }

    const navigateTo = (view) => {
        setSlideDirection(1)
        setCurrentView(view)
    }

    const goBack = () => {
        setSlideDirection(-1)
        setCurrentView("home")
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
                x: { type: "spring", stiffness: 400, damping: 30 },
                opacity: { duration: 0.2 },
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 400, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }),
    }

    return (
        <div className="flex flex-col h-full relative">
            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                {currentView === "home" ? (
                    <motion.div
                        key="home"
                        className="flex flex-col h-full"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        custom={slideDirection}
                    >
                        <header className="p-4 flex justify-between items-center border-b border-zinc-800/50">
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-light tracking-tight text-white montserrat"><span className="text-xl">⚡</span>Blaze Pay</h1>
                            </div>
                        </header>

                        <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                                        <span>Wallet Balance</span>
                                    </div>
                                </div>
                                <div className="text-white text-3xl font-semibold mb-1">{walletData.balance} BLZ</div>
                                <div className="text-zinc-400 text-sm">${walletData.usdBalance.toLocaleString()}</div>

                                <div className="flex items-center gap-1 mt-2 text-xs text-zinc-400">
                                    <span>{walletData.address}</span>
                                    <button onClick={copyAddress} className="text-zinc-400 hover:text-white">
                                        {copiedAddress ? <CheckCircle2 className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="grid grid-cols-2 gap-3 text-white">
                                    <button
                                        onClick={() => navigateTo("send")}
                                        className="flex flex-col items-center justify-center bg-zinc-900/70 hover:bg-zinc-800/70 transition-colors rounded-xl py-4 border border-zinc-800/50"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
                                            <Send className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-xs">Send</span>
                                    </button>
                                    <button
                                        onClick={() => navigateTo("receive")}
                                        className="flex flex-col items-center justify-center bg-zinc-900/70 hover:bg-zinc-800/70 transition-colors rounded-xl py-4 border border-zinc-800/50"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
                                            <QrCode className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-xs">Receive</span>
                                    </button>
                                </div>
                            </div>

                            <Tabs defaultValue="assets" className="w-full" onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2 bg-transparent border-b border-zinc-800 rounded-none mb-4">
                                    <TabsTrigger
                                        value="assets"
                                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-white data-[state=active]:shadow-none rounded-none text-sm"
                                    >
                                        Assets
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="activity"
                                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-white data-[state=active]:shadow-none rounded-none text-sm"
                                    >
                                        Activity
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="assets" className="mt-0">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-white font-bold text-base">
                                                    ⚡
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">Blaze Coin</div>
                                                    <div className="text-xs text-zinc-400">BLZ</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">{walletData.balance} BLZ</div>
                                                <div className="text-xs text-zinc-400">${walletData.usdBalance}</div>
                                            </div>
                                        </div>

                                        <div className="text-center py-6">
                                            <p className="text-zinc-500 text-xs">No other assets supported by this wallet</p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="activity" className="mt-0">
                                    <TransactionList />
                                </TabsContent>
                            </Tabs>
                        </main>

                    </motion.div>

                ) : currentView === "send" ? (
                    <motion.div
                        key="send"
                        className="flex flex-col h-full"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        custom={slideDirection}
                    >
                        <SendPage goBack={goBack} walletData={walletData} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="receive"
                        className="flex flex-col h-full"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        custom={slideDirection}
                    >
                        <ReceivePage goBack={goBack} walletData={walletData} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
