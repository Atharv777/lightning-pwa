"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Confetti from "react-confetti"


export default function TransactionSuccess({ amount, recipient, goToHome, receive }) {
    const [showConfetti, setShowConfetti] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    const checkmarkVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.3 },
            },
        },
    }

    const circleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 0.6,
            },
        },
    }

    const formatAddress = (address) => {
        if (address.length <= 12) return address
        return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
    }

    return (
        <div className="flex flex-col h-full">
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.15}
                    colors={["#ffffff", "#8b5cf6", "#c4b5fd", "#4c1d95"]}
                />
            )}

            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="relative mb-8">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-green-500/10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 rounded-full bg-green-500/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.8, 1.1, 0.8],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            delay: 0.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />

                    <motion.div
                        className="relative w-24 h-24 rounded-full bg-green-600 flex items-center justify-center"
                        variants={circleVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M17 30L25 38L43 20"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={checkmarkVariants}
                                initial="hidden"
                                animate="visible"
                            />
                        </svg>
                    </motion.div>
                </div>

                <motion.div className="text-center space-y-4" variants={textVariants} initial="hidden" animate="visible">
                    <h2 className="text-2xl font-light text-white">Transaction {receive ? "Received" : "Sent"}!</h2>
                    <p className="text-zinc-400">Your transaction has been successfully broadcast to the network.</p>

                    <div className="mt-6 space-y-3 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Amount</span>
                            <span className="text-white font-medium">{amount} BLZ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">{receive ? "From" : "To"}</span>
                            <span className="text-white font-mono text-xs">{formatAddress(recipient)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="p-4 border-t border-zinc-800/50">
                <Button onClick={goToHome} className="w-full bg-white hover:bg-zinc-200 text-black rounded-full">
                    Back to Wallet
                </Button>
            </footer>
        </div>
    )
}
