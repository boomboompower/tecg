// Cache for prettified names to avoid repeated regex operations
const prettifyCache = new Map<string, string>();

export function prettifyName(name: string) {
    // Check cache first
    if (prettifyCache.has(name)) {
        return prettifyCache.get(name)!;
    }

    const prettified = name.replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/Ivs/gi, 'IVS')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    // Store in cache
    prettifyCache.set(name, prettified);

    return prettified;
}
