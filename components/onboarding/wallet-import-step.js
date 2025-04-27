"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import QRScanner from "../QRScanner"
import { ScanQrCode, Pencil } from "lucide-react"

export default function WalletImportStep() {
    const [activeTab, setActiveTab] = useState("phrase")
    const [wantToScan, setWantToScan] = useState(false)

    return (
        <div className="flex flex-col flex-1">

            <Tabs defaultValue="phrase" className="w-full" onValueChange={setActiveTab}>
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
                                    <Input className="bg-zinc-900 border-zinc-800 text-white h-10 pl-8 focus:border-none" placeholder="word" />
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
                                    <QRScanner withText={false} />
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
