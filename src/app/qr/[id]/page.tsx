"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QRRedirectPage() {
    const params = useParams();
    const router = useRouter();
    const uuid = params.id as string;

    useEffect(() => {
        if (uuid) {
            // Redirect to manual page with QR parameter
            router.push(`/manual?qr=${uuid}`);
        }
    }, [uuid, router]);

    return (
        <main className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center pt-32">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216] mb-4"></div>
                <p className="text-white/60">Redirecting to check-in...</p>
            </div>
        </main>
    );
}
