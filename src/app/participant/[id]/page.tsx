"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BoardingPass } from "@/components/BoardingPass";

export default function CheckInPage() {
    const params = useParams();
    const router = useRouter();
    const uuid = params.id as string;

    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!uuid) return;

        async function loadTicket() {
            try {
                // 🔍 Step 1: Check sessionStorage
                const stored = sessionStorage.getItem("hackoverflow_ticket");

                if (stored) {
                    const parsed = JSON.parse(stored);

                    if (parsed.id === uuid) {
                        setTicket(parsed);
                        setLoading(false);
                        return;
                    } else {
                        // ❌ Stale ticket — remove it
                        sessionStorage.removeItem("hackoverflow_ticket");
                    }
                }

                // 🔄 Step 2: Fetch fresh data from API
                const res = await fetch("/api/checkin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: uuid }),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Check-in failed");
                    return;
                }

                setTicket(data.user);

                // ✅ Save fresh ticket
                sessionStorage.setItem(
                    "hackoverflow_ticket",
                    JSON.stringify(data.user)
                );
            } catch (err) {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        loadTicket();
    }, [uuid]);

    if (loading) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center text-white pt-32">
                Checking you in…
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center text-red-400 pt-32">
                {error}
            </main>
        );
    }

    if (!ticket) return null;

    const ticketRef = `HO4-${ticket.id.slice(0, 6).toUpperCase()}`;

    async function handleCheckout() {
        try {
            const res = await fetch("/api/checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: uuid, action: "checkout" }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Checkout failed");
                return;
            }
            const updatedTicket = { ...ticket, ...data.user };
            setTicket(updatedTicket);

            // Update session storage
            sessionStorage.setItem(
                "hackoverflow_ticket",
                JSON.stringify(updatedTicket)
            );
        } catch (err) {
            alert("Network error. Please try again.");
        }
    }

    return (
        <main className="min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden px-3 sm:px-4 pt-16 pb-10 sm:pt-20 sm:pb-16 section-hero">
            <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
                <span className="inline-block mb-3 rounded-full border border-[#FCB216]/30 bg-[#FCB216]/10 px-4 py-1 text-xs font-semibold tracking-wide text-[#FCB216]">
                    LIVE EVENT
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    Your Boarding Pass
                </h1>

                <p className="mt-2 text-xs sm:text-sm text-white/60">
                    Keep this pass handy throughout the event.
                </p>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-[420px] sm:max-w-[520px] md:max-w-[680px]">
                    <BoardingPass
                        participantName={ticket.full_name}
                        teamId={ticket.team_id}
                        teamName={ticket.team_name}
                        participantId={ticket.participant_id}
                        ticketId={ticketRef}
                        eventDates="March 11–13, 2026"
                        wifiSsid={ticket.wifi_name}
                        wifiPassword={ticket.wifi_password}
                        labNo={ticket.lab_no || "TBA"}
                        tableNo={ticket.table_number}
                        welcomeMessage="Welcome to HackOverflow 4.0! We're thrilled to have you join us for 48 hours of innovation, creativity, and collaboration. Let's build something amazing 🚀"
                        checkedInAt={ticket.checked_in_at}
                        checkedOutAt={ticket.checked_out_at}
                        onCheckout={handleCheckout}
                        onBack={() => {
                            sessionStorage.removeItem("hackoverflow_ticket");
                            router.push("/");
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
