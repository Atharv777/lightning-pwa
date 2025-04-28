export default function WelcomeStep() {
    return (
        <div className="flex flex-col flex-1 gap-5">
            <h3 className="text-2xl font-light text-white">A simpler, faster way to transact on Stellar</h3>

            <p className="text-zinc-400 leading-relaxed">
                Blaze Pay brings the power of the Lightning Network to the Stellar blockchain — enabling secure, instant, and even offline payments. With Blaze Pay, you stay fully in control of your assets, with complete privacy and direct ownership at every step.
            </p>

            <div className="mt-5 space-y-6 text-sm text-zinc-400">
                <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-white">1</div>
                    <div>
                        <p className="text-white mb-1">Complete privacy</p>
                        <p>Your keys never leave your device</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-white">2</div>
                    <div>
                        <p className="text-white mb-1">Full control</p>
                        <p>You own your assets, not us</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-white">3</div>
                    <div>
                        <p className="text-white mb-1">Instant and Offline Payments</p>
                        <p>Settle payments instantly, even when you&apos;re offline.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
