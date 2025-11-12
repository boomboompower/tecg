import {ReactNode} from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type AlertProps = {
    children: ReactNode;
    id?: string;
    className?: string;
    dismissible?: boolean;
}

/**
 * Display an alert message with a warning icon. Mainly used as a big warning sign.
 *
 * @param children {ReactNode} - The content to be displayed inside the alert.
 * @param id {string} - An optional unique identifier for the alert.
 * @param className {string} - An optional class name to apply additional styles to the alert.
 * @param dismissible {boolean} - If true, the alert can be dismissed by the user.
 */
export function Alert({children, id, className, dismissible}: AlertProps) {
    // Generate a unique ID if not provided based on the className
    id = id || `alert-${className ? className.replace(/\s+/g, '-') : 'default'}`;

    if (localStorage.getItem(btoa(id))) {
        // If the alert is dismissed, do not render it
        return null;
    }

    return (
        <div
            className={`rounded-xl bg-red-700/90 border border-red-600/30 text-white p-5 relative shadow-lg shadow-red-900/20 backdrop-blur-sm ${className}`}
            aria-label={'Alert'}
            aria-describedby={id}
            role="alert"
            id={id}
        >
            {dismissible && (
                <button
                    className="absolute top-3 right-4 text-white/80 cursor-pointer hover:text-white transition-all duration-200 text-2xl leading-none hover:scale-110"
                    title={'Dismiss alert'}
                    onClick={() => {
                        localStorage.setItem(btoa(id), 'dismissed');
                        const alertElement = document.getElementById(id);
                        if (alertElement) {
                            alertElement.style.display = 'none';
                        }
                    }}
                >
                    &times;
                </button>
            )}
            <div className="flex gap-3">
                <div className="flex-shrink-0 self-start pt-0.5">
                    <ExclamationTriangleIcon className='size-6 text-yellow-300 drop-shadow-sm'/>
                </div>
                <div className="flex-1 space-y-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Alert;
