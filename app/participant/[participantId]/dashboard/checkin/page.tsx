"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { getParticipantByIdAction, collegeCheckInAction } from "@/actions";
import type { ClientParticipant } from "@/lib/types";

export default function CheckInDashboardPage() {
    const { participantId } = useParams() as { participantId: string };
    const [participant, setParticipant] = useState<ClientParticipant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        async function loadData() {
            const result = await getParticipantByIdAction(participantId);
            if (result.success) {
                setParticipant(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        }
        loadData();
    }, [participantId]);

    const handleCheckIn = () => {
        startTransition(async () => {
            const result = await collegeCheckInAction(participantId);
            if (result.success) {
                setParticipant(result.data.participant);
                setIsSuccess(true);
            } else {
                setError(result.error);
            }
        });
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 bg-white/5 rounded-lg w-1/4"></div>
                <div className="h-64 bg-white/5 rounded-3xl"></div>
            </div>
        );
    }

    if (isSuccess || participant?.collegeCheckIn?.status) {
        return (
            <div className="space-y-8 animate-fade-in-up">
                <header>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Registration Check-in</h1>
                    <p className="text-gray-400 mt-1">Verification and Arrival</p>
                </header>

                <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <span className="text-white text-4xl">✓</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Checked In Successfully</h2>
                        <p className="text-gray-400 mt-2">
                            Time: {participant?.collegeCheckIn?.time ? new Date(participant.collegeCheckIn.time).toLocaleString() : new Date().toLocaleString()}
                        </p>
                    </div>
                    <div className="pt-4">
                        <p className="text-sm text-gray-500">You are all set! Head over to your allotted lab to start the hackathon.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Registration Check-in</h1>
                <p className="text-gray-400 mt-1">Confirm your arrival at the venue</p>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="max-w-md mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <p className="text-gray-500 uppercase text-xs font-bold tracking-widest">Verify Details</p>
                        <h2 className="text-2xl font-bold text-white">{participant?.name}</h2>
                        <p className="text-gray-400 font-mono text-sm">{participant?.participantId}</p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 text-left space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Team</span>
                            <span className="text-white font-semibold">{participant?.teamName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Institute</span>
                            <span className="text-white font-semibold">{participant?.institute || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Phone</span>
                            <span className="text-white font-semibold">{participant?.phone || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Role</span>
                            <span className="text-white font-semibold">{participant?.role || "Hacker"}</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleCheckIn}
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-[#FCB216] via-[#E85D24] to-[#D91B57] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_15px_30px_rgba(231,88,41,0.3)] hover:-translate-y-1 disabled:opacity-50 text-lg"
                        >
                            {isPending ? "Processing..." : "Confirm Arrival ✓"}
                        </button>
                        <p className="text-xs text-gray-500 mt-4">
                            By confirming, you agree to follow the event rules and code of conduct.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
