"use client"

import InstallPWA from "@/components/install-pwa";
import QRScanner from "@/components/QRScanner";

export default function Home() {


    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <QRScanner />
            <InstallPWA />
        </div>
    )
}
