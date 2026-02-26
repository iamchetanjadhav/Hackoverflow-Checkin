import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type ParticipantSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /participant/[id]/dashboard and its sub-routes
    const dashboardMatch = pathname.match(
        /^\/participant\/([^/]+)\/(dashboard.*)/
    );

    if (dashboardMatch) {
        const participantId = dashboardMatch[1];
        const res = NextResponse.next();

        const session = await getIronSession<ParticipantSession>(
            request,
            res,
            sessionOptions
        );

        // Not logged in → redirect to login
        if (!session.isLoggedIn) {
            return NextResponse.redirect(
                new URL(`/participant/${participantId}/login`, request.url)
            );
        }

        // Logged in as wrong participant
        if (session.participantId !== participantId) {
            return NextResponse.redirect(
                new URL(`/participant/${participantId}/login`, request.url)
            );
        }

        return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/participant/:participantId/dashboard/:path*"],
};
