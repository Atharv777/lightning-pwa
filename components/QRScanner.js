"use client"

import { useEffect, useRef, useState } from "react"
import jsQR from "jsqr"
import { motion, AnimatePresence } from "framer-motion"
import { Scan, Check, Camera } from "lucide-react"

export default function QRScanner({ withText }) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [result, setResult] = useState("")
    const [scanned, setScanned] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [scanning, setScanning] = useState(false)
    const [cameraError, setCameraError] = useState(false)

    useEffect(() => {
        setIsClient(true)

        // Register service worker for PWA
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").catch((error) => {
                    console.error("Service Worker registration failed:", error)
                })
            })
        }
    }, [])

    useEffect(() => {
        if (!isClient) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if (!navigator.mediaDevices?.getUserMedia) {
            console.error("Camera not supported")
            setCameraError(true)
            return
        }

        setScanning(true)

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((stream) => {
                if (video) {
                    video.srcObject = stream
                    video.setAttribute("playsinline", "true")
                    video.play()

                    const tick = () => {
                        if (video.readyState === video.HAVE_ENOUGH_DATA && canvas && ctx) {
                            canvas.width = video.videoWidth
                            canvas.height = video.videoHeight
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                            const code = jsQR(imageData.data, imageData.width, imageData.height)

                            if (code) {
                                handleQRCodeDetected(code.data)
                                stopStream()
                                return
                            }
                        }
                        if (!scanned) {
                            requestAnimationFrame(tick)
                        }
                    }

                    requestAnimationFrame(tick)
                }
            })
            .catch((err) => {
                console.error("Error accessing camera: ", err)
                setCameraError(true)
                setScanning(false)
            })

        function stopStream() {
            setScanning(false)
            if (video?.srcObject) {
                const tracks = video.srcObject.getTracks()
                tracks.forEach((track) => track.stop())
            }
        }

        function handleQRCodeDetected(data) {
            setResult(data)
            setScanned(true)

            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200])
            }

            setTimeout(() => {
                setScanned(false)
            }, 2000)
        }

        return () => {
            stopStream()
        }
    }, [isClient, scanned])

    if (!isClient) {
        return (
            <div className="animate-pulse flex flex-col items-center text-white">
                <Camera className="h-12 w-12 mb-4 opacity-50" />
                <p>Initializing camera...</p>
            </div>
        )
    }

    return (
        <>
            <div className="relative z-10 w-full max-w-xs flex flex-col items-center">

                <AnimatePresence mode="wait">
                    {result
                        ? <p className="text-white break-words font-mono bg-gray-900/50 p-3 rounded-lg">{result}</p>
                        : (
                            <motion.div
                                key="scanner"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full flex flex-col items-center"
                            >
                                <div className="relative w-full max-w-xs aspect-square shadow-[0_0_25px_rgba(0,0,0,0.3)]">
                                    <video ref={videoRef} className="hidden" playsInline muted />
                                    <canvas ref={canvasRef} className="w-full h-full object-cover rounded-xl" />

                                    <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-white/85 rounded-tl-3xl"></div>
                                    <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-white/85 rounded-tr-3xl"></div>
                                    <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-white/85 rounded-bl-3xl"></div>
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-white/85 rounded-br-3xl"></div>

                                    {scanning && (
                                        <motion.div
                                            className="absolute inset-0 left-0 right-0 backdrop-blur-xl bg-[linear-gradient(to_right,#33c033_1.5px,transparent_1px),linear-gradient(to_bottom,#33c033_1.5px,transparent_1px)] bg-[size:35px_35px] rounded-xl [mask-image:radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_80%)] [mask-repeat:no-repeat] [mask-position:center] [mask-size:cover]"
                                            initial={{ opacity: 0.3 }}
                                            animate={{ opacity: [0.05, 0.3, 0.05] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    {cameraError && (
                                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col p-6 text-center">
                                            <Camera className="h-10 w-10 text-white mb-3" />
                                            <p className="text-white font-medium">Camera access denied</p>
                                            <p className="text-gray-400 text-sm mt-2">Please allow camera access to scan QR codes</p>
                                        </div>
                                    )}
                                </div>
                                {
                                    withText && (
                                        <motion.div
                                            className={`mt-8 flex items-center text-white/50 text-sm ${scanning ? "animate-pulse" : ""}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Scan className="h-4 w-4 mr-2" />
                                            <p>{scanning ? "Align QR code within the frame" : "Initializing camera..."}</p>
                                        </motion.div>
                                    )
                                }
                            </motion.div>
                        )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {scanned && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="relative"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <Check className="h-32 w-32 text-white" strokeWidth={1.5} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
