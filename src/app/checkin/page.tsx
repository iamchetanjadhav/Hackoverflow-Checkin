"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hash, Users, Sparkles, AlertCircle, UserCheck } from "lucide-react";

function CheckInContent() {
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
            // Fetch participant data using participant_id and team_id
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

            // Redirect to the boarding pass page
            router.push(`/portal/${data.user.id}`);
        } catch (err) {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    }

    if (qrLoading) {
        return (
            <main className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-4 py-8 pt-32">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216] mb-4"></div>
                    <p className="text-white/60">Loading QR code details...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-4 py-8 pt-32 sm:pt-40">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 text-[#FCB216]">
                        <Sparkles className="w-6 h-6" />
                        <h1 className="text-3xl font-bold">HackOverflow 4.0</h1>
                    </div>
                    <p className="text-white/60 text-sm">
                        {qrCode ? "Confirm Check-In" : "Manual Check-In"}
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                        {qrCode ? "Verify your details and confirm" : "Enter your credentials to check in"}
                    </p>
                </div>

                {/* Check-In Form */}
                <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#E85D24]/25 via-[#FCB216]/10 to-[#63205F]/20 blur-xl" />

                    <div className="relative rounded-2xl bg-[#0F0F0F] border border-white/10 p-6 sm:p-8">
                        {/* Participant Details Preview (for QR scans) */}
                        {qrCode && participantName && (
                            <div className="mb-6 p-4 rounded-xl bg-[#FCB216]/10 border border-[#FCB216]/20">
                                <div className="flex items-start gap-3">
                                    <UserCheck className="w-5 h-5 text-[#FCB216] flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs uppercase text-[#FCB216]/80 mb-1">Participant Details</p>
                                        <p className="font-semibold text-white">{participantName}</p>
                                        <p className="text-sm text-white/60 mt-1">Team: {teamName}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleCheckIn} className="space-y-6">
                            {/* Participant ID Input */}
                            <div>
                                <label
                                    htmlFor="participant-id"
                                    className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2"
                                >
                                    <Hash className="w-4 h-4 text-[#FCB216]" />
                                    Participant ID
                                </label>
                                <input
                                    id="participant-id"
                                    type="text"
                                    value={participantId}
                                    onChange={(e) => setParticipantId(e.target.value)}
                                    placeholder="Enter your Participant ID"
                                    required
                                    readOnly={!!qrCode}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E85D24]/50 focus:border-[#E85D24]/50 transition read-only:opacity-60 read-only:cursor-not-allowed"
                                />
                            </div>

                            {/* Team ID Input */}
                            <div>
                                <label
                                    htmlFor="team-id"
                                    className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2"
                                >
                                    <Users className="w-4 h-4 text-[#FCB216]" />
                                    Team ID
                                </label>
                                <input
                                    id="team-id"
                                    type="text"
                                    value={teamId}
                                    onChange={(e) => setTeamId(e.target.value)}
                                    placeholder="Enter your Team ID"
                                    required
                                    readOnly={!!qrCode}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E85D24]/50 focus:border-[#E85D24]/50 transition read-only:opacity-60 read-only:cursor-not-allowed"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !participantId.trim() || !teamId.trim()}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E85D24] to-[#FCB216] text-white font-semibold hover:shadow-lg hover:shadow-[#E85D24]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? "Checking In..." : qrCode ? "Confirm & Check In" : "Check In"}
                            </button>
                        </form>

                        {/* Help Text */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-xs text-white/40 text-center">
                                {qrCode
                                    ? "Please verify your details above before confirming check-in."
                                    : "Don't have your credentials? Contact the event organizers for assistance."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ManualCheckInPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-4 py-8 pt-32">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216] mb-4"></div>
                    <p className="text-white/60">Loading...</p>
                </div>
            </main>
        }>
            <CheckInContent />
        </Suspense>
    );
}
