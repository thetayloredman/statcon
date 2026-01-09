import { Base, Serialize } from "./Base.js";

export type StorageConfiguration = {
    path?: string;
    type?: "memory" | "sqlite" | "postgres";
    writeThroughCache?: boolean;
    maximumNumberOfResults?: number;
    maximumNumberOfEvents?: number;
};

export class Storage extends Base implements Serialize {
    constructor(public data: StorageConfiguration) {
        super();
    }

    path(path: string): this {
        this.data.path = path;
        return this;
    }

    type(type: StorageConfiguration["type"]): this {
        this.data.type = type;
        return this;
    }

    writeThroughCache(enabled: boolean): this {
        this.data.writeThroughCache = enabled;
        return this;
    }

    maximumNumberOfResults(max: number): this {
        this.data.maximumNumberOfResults = max;
        return this;
    }

    maximumNumberOfEvents(max: number): this {
        this.data.maximumNumberOfEvents = max;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
