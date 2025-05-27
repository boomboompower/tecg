
export function formatDate(date: string | number) {
    if (!date) return 'Unknown';
    try {
        const options: Intl.DateTimeFormatOptions = {
            dateStyle: 'long',
            timeStyle: 'short',
            hour12: true,
            timeZone: 'UTC',
        };
        const formattedDate = new Date(date)

        // Experiments found before we started tracking them
        if (formattedDate.getUTCDate() === 15 && formattedDate.getUTCMonth() === 5 && formattedDate.getUTCFullYear() === 2022) {
            return 'before June 15, 2022';
        }

        return formattedDate.toLocaleString('en-GB', options);
    } catch (e) {
        console.error('Error formatting date:', e);
    }
    return String(date);
}

export function formatCompactTimestamp(fullTimestamp: string | number): string {
    const date = new Date(fullTimestamp);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mi = String(date.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi} UTC`;
}
