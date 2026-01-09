import * as structures from "./structures/index.js";
export * from "./structures/index.js";

/**
 * Converts a camelCase string to kebab-case
 */
function toKebabCase(str: string): string {
    return str
        .replace(/[A-Z]/g, (letter, offset) => {
            return offset === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
        });
}

/**
 * Recursively converts all object property names from camelCase to kebab-case
 */
function convertKeysToKebabCase(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => convertKeysToKebabCase(item));
    }

    if (typeof obj === "object" && obj.constructor === Object) {
        const newObj: Record<string, any> = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const kebabKey = toKebabCase(key);
                newObj[kebabKey] = convertKeysToKebabCase(obj[key]);
            }
        }
        return newObj;
    }

    return obj;
}

export function statcon(
    cb: (config: structures.Configuration) => structures.Configuration
): Record<string, unknown> {
    const serialized = cb(new structures.Configuration({})).serialize();
    return convertKeysToKebabCase(serialized);
}
