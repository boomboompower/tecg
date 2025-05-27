interface PillProps {
    label: string;
    className?: string;
    title?: string;
    type?: 'default' | 'staff' | 'none';
}

/**
 * Pill component to display a label with a background color.
 *
 * @param label string - The label to display
 * @param className string - Additional class names to apply to the pill
 * @param title string - The title attribute for the pill
 * @param type 'default' | 'staff' - The type of pill, which determines the background color
 */
export function Pill({ label, title, type, className }: PillProps) {
    return (
        <span
            title={title}
            className={`inline-block rounded-full ${
                type === 'staff'
                    ? 'bg-yellow-600'
                    : type === 'none'
                    ? 'bg-black/20'
                    : 'bg-blue-600'
            } ml-2 px-2 py-1 text-xs font-medium text-white transition ${className || ''}`}
        >
            {label}
        </span>
    );
}
