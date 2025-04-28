"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [showInstallBanner, setShowInstallBanner] = useState(true)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const isIOS = () => {
        const ua = window.navigator.userAgent
        return /iPhone|iPad|iPod/i.test(ua)
    }

    useEffect(() => {
        const checkIsMobile = () => {
            const ua = navigator.userAgent
            return /Mobi|Android|iPhone|iPad|iPod/i.test(ua)
        }

        setIsMobile(checkIsMobile())

        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true)
            return
        }

        const handleBeforeInstallPrompt = (e) => {
            if (!checkIsMobile() || isIOS()) return

            e.preventDefault()
            setDeferredPrompt(e)

            setTimeout(() => {
                if (!localStorage.getItem("installBannerDismissed")) {
                    setShowInstallBanner(true)
                }
            }, 3000)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

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

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        setDeferredPrompt(null)
        setShowInstallBanner(false)
    }

    const dismissBanner = () => {
        setShowInstallBanner(false)
        localStorage.setItem("installBannerDismissed", "true")
    }

    if (isInstalled || !showInstallBanner || !isMobile) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-bottom">
            <div className="install-banner bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
                <div className="flex justify-between items-start mb-3 text-white">
                    <h3 className="font-medium">Install QR Scanner</h3>
                    <button onClick={dismissBanner} className="p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>


                {isIOS() ? (
                    <>
                        <p className="text-sm text-white/70 mb-4">
                            To install this app, tap <strong>Share</strong> and then <strong>Add to Home Screen</strong>.
                        </p>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    )
}
