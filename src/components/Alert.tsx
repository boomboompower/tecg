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
            className={`rounded-md bg-red-700 text-white p-4 relative ${className}`}
            aria-label={'Alert'}
            aria-describedby={id}
            role="alert"
            id={id}
        >
            {dismissible && (
                <button
                    className="absolute top-2 right-4 text-white cursor-pointer hover:text-white/60"
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
            <div className="flex ">
                <div className="flex-shrink-0 self-center">
                    <ExclamationTriangleIcon className='size-6 text-yellow-400'/>
                </div>
                <div className="ml-3">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Alert;
