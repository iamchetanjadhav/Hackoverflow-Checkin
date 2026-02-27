"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getParticipantByIdAction } from "@/actions";
import type { ClientParticipant } from "@/lib/types";

export default function TeamPage() {
    const { participantId } = useParams() as { participantId: string };
    const [participant, setParticipant] = useState<ClientParticipant | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const result = await getParticipantByIdAction(participantId);
            if (result.success) {
                setParticipant(result.data);
            }
            setLoading(false);
        }
        loadData();
    }, [participantId]);

    if (loading) {
        return <div className="animate-pulse h-64 bg-white/5 rounded-3xl" />;
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Team Details</h1>
                <p className="text-gray-400 mt-1">Your squad for Hackoverflow 4.0</p>
            </header>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FCB216] to-[#D91B57] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(231,88,41,0.2)]">
                        <span className="text-white text-4xl font-bold">
                            {participant?.teamName?.charAt(0) || "T"}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white">{participant?.teamName || "Not in a Team"}</h2>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Team member details are currently being synchronized. Check back shortly to see your fellow hackers!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-6">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">✓</div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm">{participant?.name} (You)</p>
                                <p className="text-gray-500 text-xs">Role: {participant?.role || "Hacker"}</p>
                            </div>
                        </div>
                        {/* Other members would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}
