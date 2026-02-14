import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
    const { id, action } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Missing UUID" }, { status: 400 });
    }

    if (action === "checkout") {
        const { data, error } = await supabaseServer
            .from("participants")
            .update({
                check_out_status: true,
                checked_out_at: new Date(),
            })
            .eq("id", id)
            .eq("check_out_status", false)
            .select()
            .single();

        if (error || !data) {
            return NextResponse.json(
                { error: "Already checked out or invalid ticket" },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, user: data });
    }

    // Default = check-in
    const { data, error } = await supabaseServer
        .from("participants")
        .update({
            check_in_status: true,
            checked_in_at: new Date(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error || !data) {
        return NextResponse.json(
            { error: "Invalid UUID" },
            { status: 400 }
        );
    }

    return NextResponse.json({ success: true, user: data });
}
