"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import Image from "next/image";

interface Props {
    participantId: string;
    participantName: string;
}

const NAV_ITEMS = [
    { label: "Overview", href: "overview", icon: "🏠" },
    { label: "Check-in", href: "checkin", icon: "✅" },
    { label: "Schedule", href: "schedule", icon: "📅" },
    { label: "Team", href: "team", icon: "👥" },
    { label: "Resources", href: "resources", icon: "📡" },
];

export default function DashboardSidebar({ participantId, participantName }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const base = `/participant/${participantId}/dashboard`;

    async function handleLogout() {
        await logoutAction();
        router.push(`/participant/${participantId}/login`);
    }

    return (
        <aside className="w-64 flex flex-col gap-2 p-4 border-r border-white/10 bg-[#0F0F0F] min-h-screen">
            {/* Branding */}
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="relative w-8 h-8">
                    <Image
                        src="/images/Logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Hackoverflow 4.0</p>
                    <p className="text-sm font-semibold text-white truncate w-40">{participantName}</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map((item) => {
                    const href = `${base}/${item.href}`;
                    const isActive = pathname === href || pathname.startsWith(href);

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
                ${isActive
                                    ? "bg-gradient-to-r from-[#FCB216]/10 to-[#D91B57]/10 text-white border border-white/10 shadow-[0_0_20px_rgba(252,178,22,0.05)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className={isActive ? "font-bold" : ""}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-all mt-auto border border-transparent hover:border-red-500/10"
            >
                <span className="text-lg">🚪</span>
                <span className="font-medium">Log out</span>
            </button>
        </aside>
    );
}
