"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginParticipantAction } from "@/actions/auth";
import Image from "next/image";

interface Props {
    participantId: string;
}

export default function LoginPageClient({ participantId }: Props) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            const result = await loginParticipantAction(participantId, password);

            if (result.success) {
                router.push(`/participant/${participantId}/dashboard/overview`);
            } else {
                setError(result.error);
            }
        });
    }

    return (
        <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FCB216] to-[#E85D24] rounded-full blur-[120px] opacity-[0.1] animate-pulse-glow" />

            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[10px] rounded-3xl border border-[rgba(255,255,255,0.1)] p-8 max-w-sm w-full relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/images/Logo.png"
                            alt="Hackoverflow 4.0"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2 text-white text-center">Welcome Back</h1>
                <p className="text-sm text-gray-400 mb-6 text-center">
                    Enter the password you set during registration to access your dashboard.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FCB216]/50 transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-[#FCB216] via-[#E85D24] to-[#D91B57] text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_10px_20px_rgba(231,88,41,0.3)] disabled:opacity-50"
                    >
                        {isPending ? "Verifying..." : "Continue →"}
                    </button>
                </form>
            </div>
        </main>
    );
}
