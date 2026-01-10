import { Alerting, EndpointAlertingConfiguration } from "./Alerting.js";
import { Base, Serialize } from "./Base.js";

export type ExternalEndpointConfiguration = {
    enabled?: boolean;
    name?: string;
    group?: string;
    token?: string;
    alerts?: Alerting[];
    heartbeat?: {
        interval?: string;
    };
};

export class ExternalEndpoint extends Base implements Serialize {
    constructor(public data: ExternalEndpointConfiguration) {
        super();
    }

    enabled(enabled: boolean): this {
        this.data.enabled = enabled;
        return this;
    }

    group(group: string): this {
        this.data.group = group;
        return this;
    }

    token(token: string): this {
        this.data.token = token;
        return this;
    }

    heartbeatInterval(interval: string): this {
        if (!this.data.heartbeat) {
            this.data.heartbeat = {};
        }
        this.data.heartbeat.interval = interval;
        return this;
    }

    alert(
        base: EndpointAlertingConfiguration,
        alert?: (alert: Alerting) => Alerting
    ): this {
        if (!this.data.alerts) {
            this.data.alerts = [];
        }
        let alertInstance = new Alerting(base);
        if (alert) alertInstance = alert(alertInstance);
        this.data.alerts.push(alertInstance);
        return this;
    }

    serialize(): Record<string, any> {
        return {
            ...this.data,
            alerts: this.data.alerts?.map((alert) => alert.serialize()),
        };
    }
}
