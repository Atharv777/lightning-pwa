"use client"

import InstallPWA from "@/components/install-pwa";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";
import QRScanner from "@/components/QRScanner";

export default function Home() {

    return (
        <div>
            {/* <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <QRScanner />
            </div> */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
                <OnboardingFlow />
            </div>
            <InstallPWA />
        </div>
    )
}
