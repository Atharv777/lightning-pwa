"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import WelcomeStep from "./welcome-step"
import CompletionStep from "./completion-step"
import WalletImportStep from "./wallet-import-step"
import LightningChannelStep from "./lightning-channel-step"
import CreatePasswordStep from "./create-password-step"

import { encryptPrivateKey } from "@/lib/encrypt-decrypt"

export default function OnboardingFlow() {
    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(0)

    const [phraseWords, setPhraseWords] = useState(Array(12).fill(""))
    const [privKey, setPrivKey] = useState("")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [channelAmount, setChannelAmount] = useState(0.001)

    const [importValid, setImportValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [channelValid, setChannelValid] = useState(true)

    const steps = [
        {
            title: "Welcome",
            component: <WelcomeStep />,
            validate: () => true,
        },
        {
            title: "Import Wallet",
            component: (
                <WalletImportStep
                    phraseWords={phraseWords}
                    setPhraseWords={setPhraseWords}
                    privKey={privKey}
                    setPrivKey={setPrivKey}
                    setImportValid={setImportValid}
                />
            ),
            validate: () => importValid,
        },
        {
            title: "Create Password",
            component: (
                <CreatePasswordStep
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    setPasswordValid={setPasswordValid}
                />
            ),
            validate: () => passwordValid,
        },
        {
            title: "Complete",
            component: <CompletionStep />,
            validate: () => true,
        },
    ]


    const nextStep = async () => {
        if (step === 2 && passwordValid) {
            if (privKey.length >= 64) {
                const encrypted_data = await encryptPrivateKey(privKey, password)
                localStorage.setItem("user_private_info_encrypted", encrypted_data)
            }
            else {
                const encrypted_data = await encryptPrivateKey(phraseWords.join(" "), password)
                localStorage.setItem("user_private_info_encrypted", encrypted_data)
            }
        }

        if (step < steps.length - 1) {
            setDirection(1)
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        if (step > 0) {
            setDirection(-1)
            setStep(step - 1)
        }
    }

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 250 : -250,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 250 : -250,
            opacity: 0,
        }),
    }

    const isNextDisabled = step === steps.length - 1 || !steps[step].validate()

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto flex-1 flex flex-col justify-between py-5 md:py-0 max-h-screen md:max-h-[650px]">

            <div className="flex flex-col gap-10">
                <div className="flex justify-center">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-light tracking-tight text-white montserrat"><span className="text-2xl">⚡</span>Blaze Pay</h1>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex space-x-2 flex-1">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (index <= step || steps[step].validate()) {
                                        setDirection(index > step ? 1 : -1)
                                        setStep(index)
                                    }
                                }}
                                className={`h-[2px] min-w-12 flex-1 transition-all duration-300 ${index === step ? "bg-white" : index < step ? "bg-zinc-500" : "bg-zinc-800"}`}
                                aria-label={`Go to step ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px] flex flex-col">
                    <h2 className="text-sm font-light uppercase tracking-widest text-zinc-400 mb-5">{steps[step].title}</h2>

                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 500, damping: 40 },
                                opacity: { duration: 0.2 },
                            }}
                            className="flex-1 flex flex-col"
                        >
                            {steps[step].component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex justify-between mt-auto pt-5">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 0}
                    className={`text-zinc-400 hover:text-white hover:bg-transparent ${step === 0 ? "opacity-0" : ""}`}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <Button
                    onClick={nextStep}
                    className={`${isNextDisabled ? "bg-zinc-700 text-zinc-300" : "bg-white hover:bg-zinc-200 text-black"} rounded-full px-6`}
                    disabled={isNextDisabled}
                >
                    {step === steps.length - 1 ? "Start" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
