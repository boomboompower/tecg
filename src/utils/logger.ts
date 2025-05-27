import { blue, green, red, yellow, gray } from 'colorette';

function timestamp() {
    return gray(`[${new Date().toISOString().split('T').join(' ').slice(0, 19)}]`);
}

// Utility function to parse arguments and format them as strings
function parseArg(arg: unknown): string {
    if (arg === null || arg === undefined) return String(arg); // Handle null and undefined
    if (arg instanceof Date) return arg.toISOString(); // Format Date objects
    if (typeof arg === 'string') return arg;
    if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
    if (typeof arg === 'bigint') return `${arg}n`; // Handle BigInt
    if (arg instanceof Map || arg instanceof Set) return JSON.stringify(Array.from(arg)); // Handle Map and Set
    if (arg instanceof Error) return `${arg.name}: ${arg.message}\n${arg.stack}`;
    if (Array.isArray(arg)) return `[${arg.map(parseArg).join(', ')}]`;
    if (arg instanceof RegExp) return `/${arg.source}/${arg.flags}`; // Format RegExp objects
    if (arg instanceof File) return `File(${arg.name}, ${arg.size} bytes)`; // Format File objects
    if (arg instanceof URL) return `URL(${arg.href})`; // Format URL objects
    if (arg instanceof HTMLElement) return `HTMLElement(${arg.tagName})`; // Format HTMLElement objects
    if (arg instanceof Node) return `Node(${arg.nodeName})`; // Format Node objects
    if (arg instanceof Function) return `Function(${arg.name || 'anonymous'})`; // Format Function objects
    if (arg && typeof arg === 'object') return JSON.stringify(arg, null, 2);
    return String(arg); // Fallback for any other type
}

function formatArgs(args: unknown[]) {
    // Just join all args as strings separated by space (you can customize)
    return args.map(arg => parseArg(arg)).join(' ');
}

// noinspection JSUnusedGlobalSymbols
export const log = {
    info: (...args: unknown[]) => console.log(`${timestamp()} ${blue('ℹ')} ${formatArgs(args)}`),
    success: (...args: unknown[]) => console.log(`${timestamp()} ${green('✔')} ${formatArgs(args)}`),
    warn: (...args: unknown[]) => console.warn(`${timestamp()} ${yellow('⚠')} ${formatArgs(args)}`),
    error: (...args: unknown[]) => console.error(`${timestamp()} ${red('✖')} ${formatArgs(args)}`),
    raw: (...args: unknown[]) => console.log(`${timestamp()} ${formatArgs(args)}`),
    debug: (...args: unknown[]) => console.debug(`${timestamp()} ${gray('[debug]')} ${formatArgs(args)}`),
};
