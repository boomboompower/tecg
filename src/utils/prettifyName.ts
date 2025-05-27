
export function prettifyName(name: string) {
    return name.replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/Ivs/gi, 'IVS')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
