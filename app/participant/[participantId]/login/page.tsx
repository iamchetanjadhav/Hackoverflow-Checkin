import { redirect } from "next/navigation";
import { getSessionAction } from "@/actions/auth";
import LoginPageClient from "./LoginPageClient";

interface Props {
    params: Promise<{ participantId: string }>;
}

export default async function LoginPage({ params }: Props) {
    const { participantId } = await params;

    // Already logged in? Skip to dashboard
    const session = await getSessionAction();
    if (session?.isLoggedIn && session.participantId === participantId) {
        redirect(`/participant/${participantId}/dashboard/overview`);
    }

    return <LoginPageClient participantId={participantId} />;
}
