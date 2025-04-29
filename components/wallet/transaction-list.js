"use client"

import { ArrowUpRight, ArrowDownLeft, Zap, ExternalLink } from "lucide-react"

export default function TransactionList() {
    var transactions = []
    try {
        transactions = JSON.parse(window.localStorage.getItem("transactions"))
        if (transactions == null) {
            transactions = []
        }
    } catch (e) {
        console.log(e)
        window.localStorage.setItem("transactions", "[]")
    }
    if (transactions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-zinc-500 text-xs">No transactions yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.type === "send"
                                ? "bg-red-900/30 text-red-400"
                                : tx.type === "receive"
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-yellow-900/30 text-yellow-400"
                                }`}
                        >
                            <Zap className="h-3 w-3" />
                        </div>
                        <div>
                            <div className="font-medium text-sm capitalize">{tx.type}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-sm ${tx.type === "receive" ? "text-green-400" : ""}`}>
                            {tx.type === "receive" ? "+" : "-"}
                            {tx.amount} BLZ
                        </div>
                        <div className="text-xs text-zinc-400">${tx.usdAmount}</div>
                    </div>
                </div>
            ))}

            <div className="text-center pt-4">
                <button className="text-xs text-zinc-400 hover:text-white flex items-center justify-center mx-auto">
                    View all transactions <ExternalLink className="h-3 w-3 ml-1" />
                </button>
            </div>
        </div>
    )
}
