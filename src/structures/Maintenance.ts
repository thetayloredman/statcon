import { Base, Serialize } from "./Base.js";

export type MaintenanceConfiguration = {
    enabled?: boolean;
    start?: string;
    duration?: string;
    timezone?: string;
    every?: string[];
};

export class Maintenance extends Base implements Serialize {
    constructor(public data: MaintenanceConfiguration) {
        super();
    }

    enabled(enabled: boolean): this {
        this.data.enabled = enabled;
        return this;
    }

    start(start: string): this {
        this.data.start = start;
        return this;
    }

    duration(duration: string): this {
        this.data.duration = duration;
        return this;
    }

    timezone(timezone: string): this {
        this.data.timezone = timezone;
        return this;
    }

    every(every: string[]): this {
        this.data.every = every;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
