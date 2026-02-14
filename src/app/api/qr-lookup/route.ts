import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing UUID" }, { status: 400 });
    }

    try {
        // Fetch participant data without checking in
        const { data: participant, error } = await supabaseServer
            .from("participants")
            .select("participant_id, team_id, full_name, team_name")
            .eq("id", id)
            .single();

        if (error || !participant) {
            return NextResponse.json(
                { error: "Invalid QR code" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            participant: {
                participant_id: participant.participant_id,
                team_id: participant.team_id,
                full_name: participant.full_name,
                team_name: participant.team_name
            }
        });
    } catch (error) {
        console.error("QR lookup error:", error);
        return NextResponse.json(
            { error: "Failed to lookup QR code" },
            { status: 500 }
        );
    }
}
