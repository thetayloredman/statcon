import { Base, Serialize } from "./Base.js";

export type AlertingConfiguration = {
    type?: string;
    enabled?: boolean;
    failureThreshold?: number;
    successThreshold?: number;
    minimumReminderInterval?: number;
    sendOnResolved?: boolean;
    description?: string;
    [additional: string]: any;
    providerOverride?: Partial<AlertingConfiguration>;
};

export class Alerting extends Base implements Serialize {
    constructor(public data: AlertingConfiguration) {
        super();
    }

    type(type: string): this {
        this.data.type = type;
        return this;
    }

    enabled(enabled: boolean): this {
        this.data.enabled = enabled;
        return this;
    }

    failureThreshold(threshold: number): this {
        this.data.failureThreshold = threshold;
        return this;
    }

    successThreshold(threshold: number): this {
        this.data.successThreshold = threshold;
        return this;
    }

    minimumReminderInterval(interval: number): this {
        this.data.minimumReminderInterval = interval;
        return this;
    }

    sendOnResolved(send: boolean): this {
        this.data.sendOnResolved = send;
        return this;
    }

    description(description: string): this {
        this.data.description = description;
        return this;
    }

    set(key: string, value: any): this {
        this.data[key] = value;
        return this;
    }

    providerOverride(override: Partial<AlertingConfiguration>): this {
        this.data.providerOverride = override;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
