"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [showInstallBanner, setShowInstallBanner] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true)
            return
        }

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            // Prevent Chrome 76+ from automatically showing the prompt
            e.preventDefault()
            // Stash the event so it can be triggered later
            setDeferredPrompt(e)
            // Show install banner after a delay
            setTimeout(() => {
                setShowInstallBanner(true)
            }, 3000)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        // Listen for app installed event
        window.addEventListener("appinstalled", () => {
            setIsInstalled(true)
            setShowInstallBanner(false)
            setDeferredPrompt(null)
        })

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        // Show the install prompt
        deferredPrompt.prompt()

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice

        // We no longer need the prompt
        setDeferredPrompt(null)

        // Hide the banner regardless of outcome
        setShowInstallBanner(false)
    }

    const dismissBanner = () => {
        setShowInstallBanner(false)
        // Don't show again for this session
        localStorage.setItem("installBannerDismissed", "true")
    }

    if (isInstalled || !showInstallBanner) return null

    return (
        <>
            <button onClick={handleInstallClick} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Download className="h-5 w-5" />
            </button>

            {/* Install banner */}
            {showInstallBanner && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-bottom">
                    <div className="install-banner bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium">Install QR Scanner</h3>
                            <button onClick={dismissBanner} className="p-1">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-sm text-white/70 mb-4">
                            Install this app on your device for quick access even when offline.
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={handleInstallClick}
                                className="px-4 py-2 bg-white text-black rounded-lg font-medium flex items-center"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Install
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
