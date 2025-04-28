"use client"

import { Wallet, Zap, Clock, Settings } from "lucide-react"

export default function WalletNavigation({ activeTab, setActiveTab }) {
    return (
        <div className="bg-zinc-900 border-t border-zinc-800 py-2 px-4">
            <div className="flex justify-around">
                <button
                    onClick={() => setActiveTab("assets")}
                    className={`flex flex-col items-center p-2 ${activeTab === "assets" ? "text-white" : "text-zinc-500"}`}
                >
                    <Wallet className="h-4 w-4 mb-1" />
                    <span className="text-xs">Wallet</span>
                </button>
                <button
                    onClick={() => setActiveTab("lightning")}
                    className={`flex flex-col items-center p-2 ${activeTab === "lightning" ? "text-white" : "text-zinc-500"}`}
                >
                    <Zap className="h-4 w-4 mb-1" />
                    <span className="text-xs">Lightning</span>
                </button>
                <button
                    onClick={() => setActiveTab("activity")}
                    className={`flex flex-col items-center p-2 ${activeTab === "activity" ? "text-white" : "text-zinc-500"}`}
                >
                    <Clock className="h-4 w-4 mb-1" />
                    <span className="text-xs">Activity</span>
                </button>
                <button className="flex flex-col items-center p-2 text-zinc-500">
                    <Settings className="h-4 w-4 mb-1" />
                    <span className="text-xs">Settings</span>
                </button>
            </div>
        </div>
    )
}
