import React from 'react';

interface PillProps {
    label: string;
    className?: string;
    title?: string;
    type?: 'default' | 'staff' | 'none' | 'success' | 'warning' | 'error';
    icon?: React.ReactNode; // optional icon to show inside pill
}

/**
 * Pill component to display a label with a background color.
 *
 * @param label string - The label to display
 * @param className string - Additional class names to apply to the pill
 * @param title string - The title attribute for the pill
 * @param type string - The type of pill, which determines the background color
 * @param icon ReactNode - Optional icon displayed before the label
 */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
    ({ label, title, type = 'default', className, icon }, ref) => {
        const baseClasses = 'inline-flex items-center px-2 py-0.5 text-xs font-medium transition duration-200 rounded-full';

        const typeClasses = clsx({
            'bg-blue-600 text-white/80': type === 'default',
            'bg-yellow-500 text-gray-800': type === 'staff',
            'bg-black/20 text-black': type === 'none',
            'bg-green-600': type === 'success',
            'bg-orange-500': type === 'warning',
            'bg-red-600': type === 'error',
        });

        return (
            <span
                ref={ref}
                role="status"
                title={title}
                className={clsx(baseClasses, typeClasses, className)}
            >
        {icon && <span className="mr-1">{icon}</span>}
                {label}
      </span>
        );
    }
);

Pill.displayName = 'Pill';

function clsx(...classes: Array<string | Record<string, boolean> | undefined>): string {
    // Proper implementation of clsx utility, where we override based on attributes
    return classes
        .flatMap(cls => {
            if (typeof cls === 'string') {
                return cls;
            } else if (typeof cls === 'object' && cls !== null) {
                return Object.entries(cls)
                    .filter(([_, value]) => value)
                    .map(([key, _]) => key);
            }
            return [];
        })
        .join(' ');
}
