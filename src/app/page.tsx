"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/checkin");
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCB216]"></div>
    </main>
  );
}
