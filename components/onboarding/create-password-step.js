"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeClosedIcon, EyeIcon, LockIcon } from "lucide-react"

export default function CreatePasswordStep() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)

    // Password strength calculation
    const calculateStrength = (pwd) => {
        if (!pwd) return 0

        let strength = 0
        // Length check
        if (pwd.length >= 8) strength += 1
        if (pwd.length >= 12) strength += 1

        // Character variety checks
        if (/[A-Z]/.test(pwd)) strength += 1
        if (/[0-9]/.test(pwd)) strength += 1
        if (/[^A-Za-z0-9]/.test(pwd)) strength += 1

        return Math.min(strength, 4)
    }

    const passwordStrength = calculateStrength(password)
    const passwordsMatch = password === confirmPassword
    const passwordValid = passwordStrength >= 3 && passwordsMatch && password.length > 0

    // Strength indicator labels
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
    const strengthLabel = password ? strengthLabels[passwordStrength - 1] || "Very Weak" : ""

    return (
        <div className="flex flex-col flex-1">

            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                    <LockIcon className="h-4 w-4 text-white" />
                </div>
                <p className="text-zinc-400 text-sm">Create a strong password to secure your wallet on this device.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-zinc-400">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-zinc-900 border-zinc-800 text-white pr-10"
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                        >
                            {passwordVisible ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                    </div>

                    {password && (
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-zinc-400">Strength: {strengthLabel}</span>
                            </div>
                            <div className="flex gap-1 h-1">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-full flex-1 rounded-sm ${passwordStrength >= level
                                            ? level <= 1
                                                ? "bg-red-500"
                                                : level <= 2
                                                    ? "bg-yellow-500"
                                                    : level <= 3
                                                        ? "bg-green-400"
                                                        : "bg-green-500"
                                            : "bg-zinc-800"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-zinc-400">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type={passwordVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 text-white"
                        placeholder="Confirm password"
                    />

                    {confirmPassword && !passwordsMatch && <p className="text-xs text-red-400 mt-1">Passwords don&apos;t match</p>}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs">
                        <div className={`w-1 h-1 rounded-full ${password.length >= 8 ? "bg-green-400" : "bg-zinc-600"}`}></div>
                        <span className={password.length >= 8 ? "text-zinc-300" : "text-zinc-500"}>At least 8 characters</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                        <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(password) ? "bg-green-400" : "bg-zinc-600"}`}></div>
                        <span className={/[A-Z]/.test(password) ? "text-zinc-300" : "text-zinc-500"}>
                            At least one uppercase letter
                        </span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                        <div className={`w-1 h-1 rounded-full ${/[0-9]/.test(password) ? "bg-green-400" : "bg-zinc-600"}`}></div>
                        <span className={/[0-9]/.test(password) ? "text-zinc-300" : "text-zinc-500"}>At least one number</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                        <div
                            className={`w-1 h-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-400" : "bg-zinc-600"}`}
                        ></div>
                        <span className={/[^A-Za-z0-9]/.test(password) ? "text-zinc-300" : "text-zinc-500"}>
                            At least one special character
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
