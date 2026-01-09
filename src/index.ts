import * as structures from "./structures/index.js";
export * from "./structures/index.js";

export function statcon(
    cb: (config: structures.Configuration) => structures.Configuration
): Record<string, unknown> {
    return cb(new structures.Configuration({})).serialize();
}
