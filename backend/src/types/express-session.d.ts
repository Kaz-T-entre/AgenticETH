import 'express-session';

declare module 'express-session' {
    interface SessionData {
        currentChallenge?: string;
        userId?: string;
        authenticated?: boolean;
    }
} 