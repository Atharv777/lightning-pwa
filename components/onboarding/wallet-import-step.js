"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import QRScanner from "../QRScanner"
import { ScanQrCode, Pencil, AlertCircle } from "lucide-react"

export default function WalletImportStep({ setPhraseWords, setPrivKey, privKey, phraseWords, setImportValid }) {
    const [activeTab, setActiveTab] = useState("phrase")
    const [error, setError] = useState("")
    const [wantToScan, setWantToScan] = useState(false)
    const [touched, setTouched] = useState(false)

    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData("Text").trim()
        const words = pastedText.split(/\s+/)

        if (words.length === 12) {
            e.preventDefault()
            setPhraseWords(words)
        }
    }

    const handlePhraseChange = (index, value) => {
        const onlyLetters = value.replace(/[^a-zA-Z]/g, "")
        const updated = [...phraseWords]
        updated[index] = onlyLetters
        setPhraseWords(updated)
        setTouched(true)
    }

    const handlePrivKeyChange = (value) => {
        setPrivKey(value)
        setWantToScan(false)
        setTouched(true)
    }

    useEffect(() => {
        if (!touched) return
        validateInput()
    }, [activeTab, touched])

    const validateInput = () => {
        if (activeTab === "phrase") {
            const emptyWords = phraseWords.filter((word) => !word.trim()).length

            if (emptyWords === 12) {
                setError("Please enter your recovery phrase")
                setImportValid(false)
            } else if (emptyWords > 0) {
                setError(`Please fill all words (${emptyWords} remaining)`)
                setImportValid(false)
            } else {
                setError("")
                setImportValid(true)
            }
        } else {
            if (!privKey) {
                setError("Please enter your private key")
                setImportValid(false)
            } else if (!/^[0-9a-fA-F]{64}$/.test(privKey)) {
                setError("Invalid private key format")
                setImportValid(false)
            } else {
                setError("")
                setImportValid(true)
            }
        }
    }

    return (
        <div className="flex flex-col flex-1">

            <Tabs defaultValue="phrase" className="w-full" onValueChange={(value) => { setActiveTab(value); setError("") }}>
                <TabsList className="grid w-full grid-cols-2 bg-transparent border-b border-zinc-800 rounded-none">
                    <TabsTrigger
                        value="phrase"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-white data-[state=active]:shadow-none rounded-none text-zinc-200"
                    >
                        Recovery Phrase
                    </TabsTrigger>
                    <TabsTrigger
                        value="key"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-white data-[state=active]:shadow-none rounded-none text-zinc-200"
                    >
                        Private Key
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="phrase" className="flex-1 flex flex-col mt-2">
                    <p className="text-zinc-400 text-sm mb-5">
                        Enter your 12-word recovery phrase to access your existing wallet.
                    </p>

                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="relative">
                                    <Input
                                        className="bg-zinc-900 border-zinc-800 text-white h-10 pl-8 focus:border-none"
                                        placeholder="word"
                                        value={phraseWords[i]}
                                        onChange={(e) => handlePhraseChange(i, e.target.value)}
                                        onPaste={i === 0 ? handlePaste : undefined}
                                        onBlur={() => { setTouched(true); validateInput() }}
                                    />
                                    <span className="absolute left-3 top-2.5 text-zinc-500 text-xs">{i + 1}.</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="key" className="flex-1 flex flex-col mt-2">

                    {
                        wantToScan
                            ? (
                                <div className="flex flex-col gap-10 justify-center items-center py-10 flex-1 w-[225px] m-auto">
                                    <QRScanner withText={false} handleRequest={handlePrivKeyChange} />
                                    <Button onClick={() => { setWantToScan(false) }} size="sm" className="w-full bg-white hover:bg-zinc-200 text-black"><Pencil /> Enter manually</Button>
                                </div>
                            )
                            : (
                                <>
                                    <p className="text-zinc-400 text-sm mb-5">Enter your private key to access your existing wallet.</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="privateKey" className="text-zinc-400">
                                                Private Key
                                            </Label>
                                            <Input
                                                id="privateKey"
                                                className="bg-zinc-900 border-zinc-800 text-white font-mono"
                                                placeholder="Enter your private key"
                                                value={privKey}
                                                onChange={(e) => handlePrivKeyChange(e.target.value)}
                                                maxLength={64}
                                                onBlur={() => { setTouched(true); validateInput() }}
                                            />
                                            <p className="text-xs text-zinc-500 mt-1">Format: hexadecimal string (64 characters)</p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 text-sm font-light my-5 text-center">OR</p>

                                    <div>
                                        <Button onClick={() => { setWantToScan(true) }} className="w-full bg-white hover:bg-zinc-200 text-black">
                                            <ScanQrCode /> Scan QR Code
                                        </Button>
                                    </div>
                                </>
                            )
                    }
                </TabsContent>
            </Tabs >

            {error && (
                <div className="flex items-center gap-2 mt-4 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <p>{error}</p>
                </div>
            )}

            {
                wantToScan
                    ? null
                    : < div className="mt-5 border-l-2 border-zinc-700 pl-4 py-1">
                        <p className="text-zinc-300 text-sm">
                            <strong>Important:</strong> Never share your recovery phrase or private key with anyone. We will never ask for
                            it.
                        </p>
                    </div>
            }
        </div >
    )
}
