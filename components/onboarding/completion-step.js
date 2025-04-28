import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CompletionStep() {
    return (
        <div className="flex flex-col flex-1">
            <div className="mb-8">
                <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center mb-6">
                    <Check className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-2xl font-light text-white mb-4">Your wallet is ready</h3>

                <p className="text-zinc-400">
                    Your wallet has been imported and your Lightning Network channel is being established. You&apos;re now ready to
                    make instant transactions.
                </p>
            </div>

            <div className="mt-auto space-y-4">
                <Button className="w-full bg-white hover:bg-zinc-200 text-black" onClick={() => { window.location.reload() }}>Open Wallet</Button>
            </div>
        </div>
    )
}
