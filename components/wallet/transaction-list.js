"use client"

import { ArrowUpRight, ArrowDownLeft, Zap, ExternalLink } from "lucide-react"

const transactions = [
    {
        id: "tx1",
        type: "send",
        amount: 0.00125,
        usdAmount: 75.0,
        recipient: "bc1q8c6t...7mdj",
        date: "Today, 2:34 PM",
        status: "confirmed",
    },
    {
        id: "tx2",
        type: "receive",
        amount: 0.00045,
        usdAmount: 27.0,
        sender: "3FZbgi29...8kVr2",
        date: "Yesterday, 10:12 AM",
        status: "confirmed",
    },
    {
        id: "tx3",
        type: "lightning",
        amount: 0.00015,
        usdAmount: 9.0,
        recipient: "Lightning Invoice",
        date: "Apr 12, 5:45 PM",
        status: "confirmed",
    },
    {
        id: "tx4",
        type: "send",
        amount: 0.00078,
        usdAmount: 46.8,
        recipient: "bc1q8c6t...7mdj",
        date: "Apr 10, 9:22 AM",
        status: "confirmed",
    },
]

export default function TransactionList() {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-zinc-500 text-xs">No transactions yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.type === "send"
                                    ? "bg-red-900/30 text-red-400"
                                    : tx.type === "receive"
                                        ? "bg-green-900/30 text-green-400"
                                        : "bg-yellow-900/30 text-yellow-400"
                                }`}
                        >
                            {tx.type === "send" ? (
                                <ArrowUpRight className="h-3 w-3" />
                            ) : tx.type === "receive" ? (
                                <ArrowDownLeft className="h-3 w-3" />
                            ) : (
                                <Zap className="h-3 w-3" />
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-sm capitalize">{tx.type}</div>
                            <div className="text-xs text-zinc-400">{tx.date}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-sm ${tx.type === "receive" ? "text-green-400" : ""}`}>
                            {tx.type === "receive" ? "+" : "-"}
                            {tx.amount} BTC
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
