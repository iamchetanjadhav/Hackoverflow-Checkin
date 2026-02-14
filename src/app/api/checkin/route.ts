import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
    const { id, action } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Missing UUID" }, { status: 400 });
    }

    // CHECK OUT
    if (action === "checkout") {
        const { data, error } = await supabaseServer
            .from("participants")
            .update({
                check_out_status: true,
                checked_out_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, user: data });
    }

    // CHECK IN 
    const { data, error } = await supabaseServer
        .from("participants")
        .update({
            check_in_status: true,
            checked_in_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({ success: true, user: data });
}
