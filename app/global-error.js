"use client" 

// app/global-error.js
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error }) {
    // Log the error to Sentry
    Sentry.captureException(error);

    return (
        <div>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
        </div>
    );
}
