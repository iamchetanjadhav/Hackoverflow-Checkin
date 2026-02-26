'use server';

/**
 * Auth Server Actions
 *
 * @module actions/auth
 * @description Login / logout / session helpers using iron-session
 */

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { z } from 'zod';
import { getParticipantById } from '@/lib/db';
import { sessionOptions, type ParticipantSession } from '@/lib/session';
import { actionRateLimiter } from '@/lib/rate-limiter';
import type { ActionResult } from '@/lib/types';

// ============================================================================
// Schemas
// ============================================================================

const LoginSchema = z.object({
    participantId: z.string().min(1, 'Participant ID is required'),
    password: z.string().min(1, 'Password is required'),
});

// ============================================================================
// Actions
// ============================================================================

/**
 * Login a participant using their participantId + loginPassword from the DB.
 * The DB stores the plain-text password that participants set during registration.
 */
export async function loginParticipantAction(
    participantId: string,
    password: string
): Promise<ActionResult<{ participantId: string }>> {
    // Rate limit by participantId (5 attempts per minute)
    const loginRateLimiter = actionRateLimiter;
    const rateLimitResult = loginRateLimiter.check(`login:${participantId}`);
    if (!rateLimitResult.allowed) {
        return {
            success: false,
            error: 'Too many login attempts. Please try again later.',
            code: 'RATE_LIMITED',
        };
    }

    // Validate inputs
    const parsed = LoginSchema.safeParse({ participantId, password });
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message ?? 'Invalid input.',
            code: 'VALIDATION_ERROR',
        };
    }

    // Fetch participant from DB
    let participant;
    try {
        participant = await getParticipantById(parsed.data.participantId);
    } catch {
        return {
            success: false,
            error: 'Database error. Please try again.',
            code: 'DB_ERROR',
        };
    }

    if (!participant) {
        // Generic message to avoid user enumeration
        return {
            success: false,
            error: 'Invalid ID or password.',
            code: 'NOT_FOUND',
        };
    }

    // Check that a password exists in DB
    if (!participant.loginPassword) {
        return {
            success: false,
            error: 'Account login not configured. Please contact the organizers.',
            code: 'DB_ERROR',
        };
    }

    // Plain-text comparison (DB stores password as-is from registration)
    const isValid = parsed.data.password === participant.loginPassword;
    if (!isValid) {
        return {
            success: false,
            error: 'Invalid ID or password.',
            code: 'VALIDATION_ERROR',
        };
    }

    // Create session
    const session = await getIronSession<ParticipantSession>(
        await cookies(),
        sessionOptions
    );
    session.participantId = participant.participantId;
    session.name = participant.name;
    session.isLoggedIn = true;
    await session.save();

    return {
        success: true,
        data: { participantId: participant.participantId },
    };
}

/**
 * Destroy the current session (logout).
 */
export async function logoutAction(): Promise<void> {
    const session = await getIronSession<ParticipantSession>(
        await cookies(),
        sessionOptions
    );
    session.destroy();
}

/**
 * Return the active session, or null if not logged in.
 */
export async function getSessionAction(): Promise<ParticipantSession | null> {
    const session = await getIronSession<ParticipantSession>(
        await cookies(),
        sessionOptions
    );
    if (!session.isLoggedIn) return null;
    return {
        participantId: session.participantId,
        name: session.name,
        isLoggedIn: session.isLoggedIn,
    };
}
