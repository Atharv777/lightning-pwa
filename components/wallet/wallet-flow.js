
"use client"

import { useState, useEffect } from "react"
import WalletUnlock from "@/components/wallet/wallet-unlock"
import WalletHome from "@/components/wallet/wallet-home"

export default function WalletPage() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [privKey, setPrivKey] = useState(true)

    useEffect(() => {
        const checkSession = setTimeout(() => {
            setIsLoading(false)
            setIsUnlocked(false)
        }, 1000)

        return () => clearTimeout(checkSession)
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 md:p-4 text-white">
            <div className="w-full md:max-w-sm mx-auto bg-zinc-950 rounded-xl overflow-hidden flex flex-col h-screen max-h-[100vh] md:max-h-[650px] md:h-[90vh] border border-zinc-800/50">
                {isUnlocked
                    ? <WalletHome onLock={() => setIsUnlocked(false)} privateKey={privKey} />
                    : <WalletUnlock onUnlock={() => setIsUnlocked(true)} setPrivateKey={setPrivKey} />
                }
            </div>
        </div>
    )
}
