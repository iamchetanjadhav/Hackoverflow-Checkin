/**
 * Iron-Session Configuration
 *
 * @module lib/session
 * @description Session options and types for iron-session cookie sessions
 */

import { SessionOptions } from 'iron-session';

export interface ParticipantSession {
    participantId: string;
    name: string;
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'hackoverflow_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
    },
};
