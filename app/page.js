"use client"

import InstallPWA from "@/components/install-pwa";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";
import WalletFlow from "@/components/wallet/wallet-flow";
import { useEffect, useState } from "react";

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [privateKey, setPrivateKey] = useState(null)

    async function decryptPrivateKey(encryptedJson, password, crypto) {
        try {
            const enc = new TextEncoder();
            const dec = new TextDecoder();

            const encrypted = JSON.parse(encryptedJson);
            const salt = new Uint8Array(encrypted.salt);
            const iv = new Uint8Array(encrypted.iv);
            const ciphertext = new Uint8Array(encrypted.ciphertext);

            const passwordKey = await crypto.subtle.importKey(
                'raw',
                enc.encode(password),
                { name: 'PBKDF2' },
                false,
                ['deriveKey']
            );

            const aesKey = await crypto.subtle.deriveKey(
                { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
                passwordKey,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv, },
                aesKey,
                ciphertext
            );

            return dec.decode(decrypted);
        }
        catch (e) {
            console.info(e)
            return null
        }
    }

    const password = "Atharv_777"

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = localStorage.getItem("user_private_info_encrypted")
            if (data) {
                const decryptedData = await decryptPrivateKey(data, password, window.crypto)
                if (decryptedData) {
                    setPrivateKey(decryptedData)
                    setLoading(false)
                }
                else {
                    console.log("Wrong password")
                }
            }
            else {
                setPrivateKey(null)
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div className="bg-zinc-950 min-h-screen flex flex-col">
            {
                loading
                    ? <div className="flex-1 flex justify-center items-center h-full"><div className="w-10 h-10 border-4 border-t-4 border-transparent border-t-white/60 border-l-white/60 rounded-full animate-spin"></div></div>
                    : <>
                        {
                            privateKey
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
