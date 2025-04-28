"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LockIcon, AlertCircle } from "lucide-react"


export default function WalletUnlock({ onUnlock }) {
    const [password, setPassword] = useState("")
    const [rememberDevice, setRememberDevice] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleUnlock = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (password.trim() === "") {
                setError("Please enter your password")
            } else {
                onUnlock()
            }
        } catch (err) {
            setError("Failed to unlock wallet. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-full max-w-xs">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-light tracking-tight text-white montserrat"><span className="text-4xl">⚡</span>Blaze Pay</h1>
                    </div>
                </div>

                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-4">
                        <LockIcon className="h-5 w-5 text-zinc-400" />
                    </div>
                    <h2 className="text-lg font-light text-white">Unlock your wallet</h2>
                </div>

                <form onSubmit={handleUnlock} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-400">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-zinc-900 border-zinc-800 text-white"
                            placeholder="Enter your password"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <p>{error}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-white hover:bg-zinc-200 text-black rounded-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                                Unlocking...
                            </>
                        ) : (
                            "Unlock"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
