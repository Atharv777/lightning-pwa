"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, QrCode, Repeat, Settings, Zap, ChevronDown, ExternalLink, Copy, CheckCircle2 } from "lucide-react"
import WalletNavigation from "./wallet-navigation"
import TransactionList from "./transaction-list"
import { AnimatePresence, motion } from "framer-motion"
import SendPage from "./send-page"
import ReceivePage from "./recieve-page"

export default function WalletHome({ onLock }) {
    const [activeTab, setActiveTab] = useState("assets")
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [currentView, setCurrentView] = useState("home")
    const [slideDirection, setSlideDirection] = useState(1)

    const walletData = {
        balance: 0.00342,
        usdBalance: 205.2,
        address: "bc1q8c6t...7mdj",
        fullAddress: "bc1q8c6tjgpqrcd52rh7nv4e2c3xed7mdj",
        lightningBalance: 0.00125,
        lightningUsdBalance: 75.0,
        networkFee: 0.00001,
    }

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
                                <h1 className="text-base font-light tracking-tight text-white montserrat"><span className="text-lg">⚡</span>Blaze Pay</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={onLock} className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                                    <Settings className="h-4 w-4 text-zinc-400" />
                                </button>
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
                                    {/* <button className="flex flex-col items-center justify-center bg-zinc-900/70 hover:bg-zinc-800/70 transition-colors rounded-xl py-4 border border-zinc-800/50">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
                                            <Repeat className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-xs">Swap</span>
                                    </button> */}
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 rounded-lg p-3 mb-6 border border-zinc-800/50">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <Zap className="h-3 w-3 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium">Lightning Network</h3>
                                            <p className="text-xs text-zinc-400">Instant transactions</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium">{walletData.lightningBalance} BLZ</div>
                                        <div className="text-xs text-zinc-400">${walletData.lightningUsdBalance}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-1.5 px-3 text-xs border border-zinc-800 rounded-md hover:bg-zinc-800/50 transition-colors">
                                        Open Channel
                                    </button>
                                    <button className="flex-1 py-1.5 px-3 text-xs border border-zinc-800 rounded-md hover:bg-zinc-800/50 transition-colors">
                                        Close Channel
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
                                            <p className="text-zinc-500 text-xs">No other assets in this wallet</p>
                                            <button className="text-white text-xs mt-1 flex items-center justify-center mx-auto hover:underline">
                                                Add tokens <ExternalLink className="h-3 w-3 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="activity" className="mt-0">
                                    <TransactionList />
                                </TabsContent>
                            </Tabs>
                        </main>

                        <WalletNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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
