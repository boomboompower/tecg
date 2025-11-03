// Performance: Cache Intl.DateTimeFormat instances to avoid recreating them multiple times.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
const cachedFormatter = new Map<string, Intl.DateTimeFormat>();

/**
 * Format a date into a human-readable string. By default, it uses the local timezone.
 * If a timezone is provided, it will format the date accordingly. (Using en-GB locale)
 *
 * @param date string | number - The date to format, can be a string or a number (timestamp).
 * @param timezone string | undefined - The timezone to use for formatting, if provided it will format the date in that timezone.
 *                                      However, if this is set the locale will be set to 'en-GB' to ensure consistent formatting.
 *
 * @return string - The formatted date string, or 'Unknown' if the date is falsy.
 */
export function formatDate(date: string | number | null | undefined, timezone: string | undefined = undefined): string {
    if (!date) return 'Unknown';

    try {
        let timeZone = 'en-GB';

        // If a timezone is provided, use it, or else we want to use the local timezone
        if (timezone) timeZone = timezone;

        const formattedDate = new Date(date)

        // Experiments found before we started tracking them
        if (formattedDate.getUTCDate() === 15 && formattedDate.getUTCMonth() === 5 && formattedDate.getUTCFullYear() === 2022) {
            return 'before June 15, 2022';
        }

        let formatter = cachedFormatter.get(timeZone);
        if (!formatter) {
            formatter = new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: timeZone,
                timeZoneName: 'short'
            });
            cachedFormatter.set(timeZone, formatter);
        }

        return formatter.format(formattedDate);
    } catch (e) {
        console.error('Error formatting date:', e);
    }
    return String(date);
}

/**
 * Formats a timestamp into a compact string representation.
 *
 * @param fullTimestamp string | number - The full timestamp to format, can be a string or a number.
 * @return string - The formatted timestamp in the format "YYYY-MM-DD HH:MM UTC".
 */
export function formatCompactTimestamp(fullTimestamp: string | number): string {
    const date = new Date(fullTimestamp);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mi = String(date.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`;
}
