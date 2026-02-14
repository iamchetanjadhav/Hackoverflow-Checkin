import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(req: Request) {
    const { participant_id, team_id } = await req.json()

    if (!participant_id || !team_id) {
        return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    }

    try {
        // Find participant by participant_id and team_id
        const { data: participant, error: fetchError } = await supabaseServer
            .from("participants")
            .select("*")
            .eq("participant_id", participant_id)
            .eq("team_id", team_id)
            .single()

        if (fetchError || !participant) {
            return NextResponse.json({
                error: "Invalid credentials. Please check your Participant ID and Team ID."
            }, { status: 404 })
        }

        // Update check-in status if not already checked in
        if (!participant.check_in_status) {
            const { error: updateError } = await supabaseServer
                .from("participants")
                .update({
                    check_in_status: true,
                    checked_in_at: new Date().toISOString()
                })
                .eq("id", participant.id)

            if (updateError) {
                console.error("Update error:", updateError)
                return NextResponse.json({
                    error: "Failed to update check-in status"
                }, { status: 500 })
            }

            // Fetch updated data
            const { data: updatedParticipant } = await supabaseServer
                .from("participants")
                .select("*")
                .eq("id", participant.id)
                .single()

            return NextResponse.json({
                success: true,
                user: updatedParticipant,
                message: "Check-in successful!"
            })
        }

        // Already checked in
        return NextResponse.json({
            success: true,
            user: participant,
            message: "Already checked in"
        })

    } catch (error) {
        console.error("Check-in error:", error)
        return NextResponse.json({
            error: "An error occurred during check-in"
        }, { status: 500 })
    }
}
