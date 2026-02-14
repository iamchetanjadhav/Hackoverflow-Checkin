"use client";

import { useState } from "react";
import {
    QrCode,
    Wifi,
    MapPin,
    Users,
    Sparkles,
    Copy,
    Check,
    Hash,
    Calendar,
    LogOut,
} from "lucide-react";



interface BoardingPassProps {
    participantName: string;
    teamName: string;
    participantId: string;
    ticketId: string;
    teamId: string;
    eventDates: string;
    wifiSsid: string;
    wifiPassword: string;
    labNo: string;
    tableNo: string;
    welcomeMessage: string;
    checkedInAt: string | null;
    checkedOutAt?: string | null;
    onBack: () => void;
    onCheckout?: () => Promise<void>;
}


export function BoardingPass({
    participantName,
    teamName,
    participantId,
    ticketId,
    teamId,
    eventDates,
    wifiSsid,
    wifiPassword,
    labNo,
    tableNo,
    welcomeMessage,
    checkedInAt,
    checkedOutAt,
    onBack,
    onCheckout,
}: BoardingPassProps) {
    const [copied, setCopied] = useState<string | null>(null);
    const [checkingOut, setCheckingOut] = useState(false);

    function copy(text: string, key: string) {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    }

    const formattedCheckInTime = (() => {
        if (!checkedInAt) return "Not Available";

        const date = new Date(checkedInAt);

        if (isNaN(date.getTime())) return "Not Available";

        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
        });
    })();

    const formattedCheckOutTime = (() => {
        if (!checkedOutAt) return null;

        const date = new Date(checkedOutAt);

        if (isNaN(date.getTime())) return null;

        return date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
        });
    })();


    async function handleCheckout() {
        if (!onCheckout || checkingOut) return;
        setCheckingOut(true);
        try {
            await onCheckout();
        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setCheckingOut(false);
        }
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#E85D24]/25 via-[#FCB216]/10 to-[#63205F]/20 blur-xl" />

            <div className="relative rounded-2xl bg-[#0F0F0F] border border-white/10 text-white overflow-hidden">

                <div className="h-[3px] bg-[#E85D24]" />

                <div className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0">
                    {/* Header Text */}
                    <div className="space-y-1">
                        <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#FCB216]">
                            <Sparkles className="w-4 h-4" />
                            Boarding Pass
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold">HackOverflow 4.0</h1>
                        <p className="flex items-center gap-2 text-sm text-white/60">
                            <MapPin className="w-4 h-4" />
                            PHCET Campus
                        </p>
                    </div>

                    {/* QR Code */}
                    <div className="w-full sm:w-auto bg-white rounded-xl p-8 sm:p-3 flex items-center justify-center">
                        <QrCode className="w-24 h-24 sm:w-10 sm:h-10 text-black" />
                    </div>
                </div>

                {/* Dashed Divider */}
                <div className="h-px w-full border-t border-dashed border-white/10" />

                <div className="p-5 sm:p-6 space-y-6">
                    {/* Participant Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                                Participant Name
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-bold break-words">{participantName}</h2>
                        </div>

                        <div className="w-full sm:w-auto">
                            <p className="text-xs uppercase tracking-wide text-white/50 mb-2 sm:hidden">Team</p>
                            <div className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 sm:py-2 rounded-xl w-full sm:w-auto">
                                <Users className="w-5 h-5 sm:w-4 sm:h-4 text-[#E85D24]" />
                                <span className="font-semibold text-base sm:text-base">{teamName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Consolidated Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        {/* Row 1: Participant ID & Team ID */}
                        <div className="order-1">
                            <InfoCard
                                icon={<Hash />}
                                label="Participant ID"
                                value={participantId}
                                copied={copied === "pid"}
                                onCopy={() => copy(participantId, "pid")}
                            />
                        </div>
                        <div className="order-2 sm:order-3">
                            <InfoCard
                                icon={<Hash />}
                                label="Team ID"
                                value={teamId}
                                copied={copied === "team"}
                                onCopy={() => copy(teamId, "team")}
                            />
                        </div>

                        {/* Row 2: Ticket ID & Event Dates */}
                        <div className="order-3 sm:order-2">
                            <InfoCard
                                icon={<Hash />}
                                label="Ticket ID"
                                value={ticketId}
                                copied={copied === "tid"}
                                onCopy={() => copy(ticketId, "tid")}
                            />
                        </div>
                        <div className="order-4">
                            <DetailCard
                                icon={<Calendar />}
                                label="Event Dates"
                                value={eventDates}
                            />
                        </div>
                        <div className="order-5">
                            <HighlightCard label="Lab No" value={labNo} />
                        </div>
                        <div className="order-6">
                            <HighlightCard label="Table No" value={tableNo} />
                        </div>
                    </div>

                    {/* WiFi */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Wifi className="w-5 h-5 text-[#E85D24]" />
                            <span className="font-semibold">WiFi Credentials</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                <p className="text-[10px] uppercase text-white/40 mb-1">Network</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-base break-all mr-2">{wifiSsid}</span>
                                    <CopyBtn
                                        copied={copied === "ssid"}
                                        onClick={() => copy(wifiSsid, "ssid")}
                                    />
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                <p className="text-[10px] uppercase text-white/40 mb-1">Password</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-base break-all mr-2">{wifiPassword}</span>
                                    <CopyBtn
                                        copied={copied === "pwd"}
                                        onClick={() => copy(wifiPassword, "pwd")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="rounded-xl border border-[#E85D24]/30 bg-[#E85D24]/10 p-4">
                        <p className="text-xs uppercase tracking-wide text-[#FCB216] mb-1">
                            Welcome Message
                        </p>
                        <p className="text-sm leading-relaxed text-white/80">{welcomeMessage}</p>
                    </div>

                    {/* Checkout Button - Only show if not checked out */}
                    {!checkedOutAt && onCheckout && (
                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className="w-full rounded-xl border border-[#E85D24]/40 bg-gradient-to-r from-[#E85D24]/20 to-[#FCB216]/20 py-3 text-sm font-semibold hover:from-[#E85D24]/30 hover:to-[#FCB216]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            {checkingOut ? "Checking Out..." : "Check Out"}
                        </button>
                    )}

                    {/* Checked Out Status */}
                    {checkedOutAt && (
                        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
                            <p className="text-sm font-semibold text-green-400">
                                ✓ Successfully Checked Out
                            </p>
                            <p className="text-xs text-green-300/60 mt-1">
                                {formattedCheckOutTime}
                            </p>
                        </div>
                    )}

                    {/* Back */}
                    <button
                        onClick={onBack}
                        className="w-full rounded-xl border border-white/20 py-3 text-sm font-medium hover:bg-white/10 transition"
                    >
                        ← Back to new check-in
                    </button>

                    <p className="text-xs text-center text-white/40">
                        Refreshing restores this ticket
                    </p>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 px-5 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 text-xs text-white/50 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <span>Checked in: {formattedCheckInTime}</span>
                        {formattedCheckOutTime && (
                            <span className="text-green-400/80">Checked out: {formattedCheckOutTime}</span>
                        )}
                    </div>
                    <span>VALID FOR EVENT DURATION</span>
                </div>
            </div>
        </div>
    );
}

/* ================== HELPERS ================== */

function InfoCard({ icon, label, value, copied, onCopy }: any) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between items-center mb-2 text-white/60">
                <span className="flex items-center gap-1 text-xs uppercase">
                    {icon}
                    {label}
                </span>
                <CopyBtn copied={copied} onClick={onCopy} />
            </div>
            <p className="font-mono font-semibold">{value}</p>
        </div>
    );
}

function DetailCard({ icon, label, value }: any) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="flex items-center gap-1 text-xs uppercase text-white/60">
                {icon}
                {label}
            </span>
            <p className="mt-1 text-lg font-semibold">{value}</p>
        </div>
    );
}

function HighlightCard({ label, value }: any) {
    return (
        <div className="rounded-xl border border-[#E85D24]/40 bg-[#E85D24]/15 p-4 shadow-[0_0_20px_rgba(232,93,36,0.25)]">
            <span className="text-xs uppercase text-[#FCB216]">{label}</span>
            <p className="mt-1 text-lg font-semibold text-[#FCB216]">{value}</p>
        </div>
    );
}

function CopyBtn({ copied, onClick }: any) {
    return (
        <button onClick={onClick}>
            {copied ? (
                <Check className="w-3 h-3 text-[#FCB216]" />
            ) : (
                <Copy className="w-3 h-3 text-white/60" />
            )}
        </button>
    );
}
