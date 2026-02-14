"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hash, Users, AlertCircle, UserCheck, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function ManualCheckInContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const qrCode = searchParams.get("qr");

    const [participantId, setParticipantId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrLoading, setQrLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch participant details from QR code
    useEffect(() => {
        if (!qrCode) return;

        async function fetchQRDetails() {
            setQrLoading(true);
            setError(null);

            try {
                const res = await fetch(`/api/qr-lookup?id=${qrCode}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Invalid QR code");
                    setQrLoading(false);
                    return;
                }

                // Pre-fill the form
                setParticipantId(data.participant.participant_id || "");
                setTeamId(data.participant.team_id || "");
                setParticipantName(data.participant.full_name || "");
                setTeamName(data.participant.team_name || "");
                setQrLoading(false);
            } catch (err) {
                setError("Failed to load QR code details");
                setQrLoading(false);
            }
        }

        fetchQRDetails();
    }, [qrCode]);

    async function handleCheckIn(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/checkin/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    participant_id: participantId.trim(),
                    team_id: teamId.trim()
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Check-in failed. Please verify your credentials.");
                setLoading(false);
                return;
            }

            router.push(`/portal/${data.user.id}`);
        } catch (err) {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    }

    if (qrLoading) {
        return (
            <main className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-4 py-8">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216] mb-4"></div>
                    <p className="text-white/60 font-medium">Authenticating QR...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="w-full max-w-lg z-10">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-white/30 hover:text-[#FCB216] transition-colors mb-12 text-[10px] font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </Link>

                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center mb-8">
                        <Image
                            src="/images/HO 4.0 text.svg"
                            alt="HackOverflow 4.0"
                            width={320}
                            height={80}
                            className="h-20 w-auto drop-shadow-[0_0_20px_rgba(252,178,22,0.4)]"
                        />
                    </div>
                    <h1 className="text-xl font-bold mb-1 tracking-tight">Manual Entry</h1>
                    <p className="text-white/30 text-[11px] max-w-[240px] mx-auto leading-relaxed">
                        Please provide your unique IDs to access your event boarding pass.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#E85D24]/30 via-[#FCB216]/20 to-[#63205F]/30 blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative rounded-3xl bg-[#141414]/80 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl">
                        {qrCode && participantName && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 rounded-xl bg-[#FCB216]/10 border border-[#FCB216]/20 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#FCB216] flex items-center justify-center flex-shrink-0">
                                    <UserCheck className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-[#FCB216]/60 mb-0.5">Welcome Back</p>
                                    <p className="font-bold text-white leading-tight text-sm">{participantName}</p>
                                    <p className="text-[10px] text-white/40">{teamName}</p>
                                </div>
                            </motion.div>
                        )}

                        <form onSubmit={handleCheckIn} className="space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                                    <Hash className="w-3" />
                                    Participant ID
                                </label>
                                <input
                                    type="text"
                                    value={participantId}
                                    onChange={(e) => setParticipantId(e.target.value)}
                                    placeholder="e.g. HO4-XXXXXX"
                                    required
                                    readOnly={!!qrCode}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-[#E85D24]/50 focus:border-[#E85D24]/50 transition-all duration-300 read-only:opacity-60"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                                    <Users className="w-3" />
                                    Team ID
                                </label>
                                <input
                                    type="text"
                                    value={teamId}
                                    onChange={(e) => setTeamId(e.target.value)}
                                    placeholder="e.g. TEAM-XXXX"
                                    required
                                    readOnly={!!qrCode}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-[#E85D24]/50 focus:border-[#E85D24]/50 transition-all duration-300 read-only:opacity-60"
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <p className="text-sm text-red-200">{error}</p>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !participantId.trim() || !teamId.trim()}
                                className="w-full relative group py-4 rounded-2xl overflow-hidden font-black uppercase tracking-[0.2em] text-[11px] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E85D24] to-[#FCB216] transition-transform duration-500 group-hover:scale-110" />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Authenticating
                                        </>
                                    ) : (
                                        <>
                                            {qrCode ? "Confirm Check-In" : "Access Portal"}
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center mt-12 text-white/10 text-[9px] font-bold uppercase tracking-[0.5em]">
                    &copy; 2026 HACKOVERFLOW 4.0 | PILLAI HOC COLLEGE OF ENGINEERING
                </p>
            </div>
        </main>
    );
}

export default function ManualCheckInPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216]"></div>
            </main>
        }>
            <ManualCheckInContent />
        </Suspense>
    );
}
