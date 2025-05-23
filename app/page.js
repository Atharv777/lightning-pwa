"use client"

import InstallPWA from "@/components/install-pwa";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";
import WalletFlow from "@/components/wallet/wallet-flow";
import { decryptPrivateKey } from "@/lib/encrypt-decrypt";
import { useEffect, useState } from "react";

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [onboardingDone, setOnboardingDone] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = localStorage.getItem("user_private_info_encrypted")
            if (data) {
                setOnboardingDone(true)
            }
            else {
                setOnboardingDone(false)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className="bg-zinc-950 min-h-screen flex flex-col">
            {
                loading
                    ? <div className="flex-1 flex justify-center items-center h-full"><div className="w-10 h-10 border-4 border-t-4 border-transparent border-t-white/60 border-l-white/60 rounded-full animate-spin"></div></div>
                    : <>
                        {
                            onboardingDone
                                ? <WalletFlow />
                                : <div className="flex min-h-screen flex-col items-center justify-start md:justify-center p-4">
                                    <OnboardingFlow />
                                </div>
                        }
                        <InstallPWA />
                    </>
            }
        </div >
    )
}
