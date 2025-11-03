import React, { Suspense } from 'react';

let Analytics: React.ComponentType | null = null;

try {
    // Dynamically require the package
    Analytics = React.lazy(() =>
        import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics }))
    );
} catch (_err) {
    // Leave Analytics as null if import fails
    Analytics = null;
}

export const OptionalAnalytics = (): React.ReactNode => {
    if (!Analytics) return null;

    return (
        <Suspense fallback={null}>
            <Analytics />
        </Suspense>
    );
};
