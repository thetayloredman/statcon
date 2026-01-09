import { Alerting, AlertingConfiguration } from "./Alerting.js";
import { Base, Serialize } from "./Base.js";
import { Client, ClientConfiguration } from "./Client.js";
import { Maintenance, MaintenanceConfiguration } from "./Maintenance.js";

export type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS";
export type DnsRecordType =
    | "A"
    | "AAAA"
    | "CNAME"
    | "MX"
    | "TXT"
    | "SRV"
    | "NS"
    | "PTR";
export type Condition = string;
export type EndpointConfiguration = {
    enabled?: boolean;
    name?: string;
    group?: string;
    url?: string;
    method?: HttpMethod;
    conditions?: Condition[];
    interval?: string;
    graphql?: boolean;
    /**
    You may use the following placeholders in the body (endpoints[].body):
    [ENDPOINT_NAME] (resolved from endpoints[].name)
    [ENDPOINT_GROUP] (resolved from endpoints[].group)
    [ENDPOINT_URL] (resolved from endpoints[].url)
    [LOCAL_ADDRESS] (resolves to the local IP and port like 192.0.2.1:25 or [2001:db8::1]:80)
    [RANDOM_STRING_N] (resolves to a random string of numbers and letters of length N (max: 8192))
    */
    body?: string;
    headers?: Record<string, string>;
    dns?: {
        queryName: string;
        queryType: DnsRecordType;
    };
    ssh?: {
        username: string;
        password: string;
    };
    alerts?: Alerting[];
    maintenanceWindows?: Maintenance[];
    client?: Client;
    ui?: {
        hideConditions?: boolean;
        hideHostname?: boolean;
        hidePort?: boolean;
        hideUrl?: boolean;
        hideErrors?: boolean;
        dontResolveFailedConditions?: boolean;
        badge?: {
            responseTime?: number[];
        };
    };
    extraLabels?: Record<string, string>;
};

export class EndpointUI extends Base implements Serialize {
    constructor(public data: NonNullable<EndpointConfiguration["ui"]>) {
        super();
    }

    hideConditions(hide: boolean): this {
        this.data.hideConditions = hide;
        return this;
    }

    hideHostname(hide: boolean): this {
        this.data.hideHostname = hide;
        return this;
    }

    hidePort(hide: boolean): this {
        this.data.hidePort = hide;
        return this;
    }

    hideUrl(hide: boolean): this {
        this.data.hideUrl = hide;
        return this;
    }

    hideErrors(hide: boolean): this {
        this.data.hideErrors = hide;
        return this;
    }

    dontResolveFailedConditions(dontResolve: boolean): this {
        this.data.dontResolveFailedConditions = dontResolve;
        return this;
    }

    badgeResponseTime(thresholds: number[]): this {
        if (!this.data.badge) {
            this.data.badge = {};
        }
        this.data.badge.responseTime = thresholds;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}

export class Endpoint extends Base implements Serialize {
    constructor(public data: EndpointConfiguration) {
        super();
    }

    name(name: string): this {
        this.data.name = name;
        return this;
    }

    enabled(enabled: boolean): this {
        this.data.enabled = enabled;
        return this;
    }

    group(group: string): this {
        this.data.group = group;
        return this;
    }

    url(url: string): this {
        this.data.url = url;
        return this;
    }

    method(method: HttpMethod): this {
        this.data.method = method;
        return this;
    }

    addCondition(condition: Condition): this {
        if (!this.data.conditions) {
            this.data.conditions = [];
        }
        this.data.conditions.push(condition);
        return this;
    }

    interval(interval: string): this {
        this.data.interval = interval;
        return this;
    }

    graphql(enabled: boolean): this {
        this.data.graphql = enabled;
        return this;
    }

    body(body: string): this {
        this.data.body = body;
        return this;
    }

    header(key: string, value: string): this {
        if (!this.data.headers) {
            this.data.headers = {};
        }
        this.data.headers[key] = value;
        return this;
    }

    dns(queryName: string, queryType: DnsRecordType): this {
        this.data.dns = { queryName, queryType };
        return this;
    }

    ssh(username: string, password: string): this {
        this.data.ssh = { username, password };
        return this;
    }

    alert(
        base: AlertingConfiguration,
        cb?: (alert: Alerting) => Alerting
    ): this {
        if (!this.data.alerts) {
            this.data.alerts = [];
        }
        let alertInstance = new Alerting(base);
        if (cb) alertInstance = cb(alertInstance);
        this.data.alerts.push(alertInstance);
        return this;
    }

    maintenance(
        base: MaintenanceConfiguration,
        cb?: (maintenance: Maintenance) => Maintenance
    ): this {
        if (!this.data.maintenanceWindows) {
            this.data.maintenanceWindows = [];
        }
        let maintenanceInstance = new Maintenance(base);
        if (cb) maintenanceInstance = cb(maintenanceInstance);
        this.data.maintenanceWindows.push(maintenanceInstance);
        return this;
    }

    client(base: ClientConfiguration, cb?: (client: Client) => Client): this {
        let clientInstance = new Client(base);
        if (cb) clientInstance = cb(clientInstance);
        this.data.client = clientInstance;
        return this;
    }

    ui(
        base: NonNullable<EndpointConfiguration["ui"]>,
        cb?: (ui: EndpointUI) => EndpointUI
    ): this {
        let uiInstance = new EndpointUI(base);
        if (cb) uiInstance = cb(uiInstance);
        this.data.ui = uiInstance.data;
        return this;
    }

    extraLabel(key: string, value: string): this {
        if (!this.data.extraLabels) {
            this.data.extraLabels = {};
        }
        this.data.extraLabels[key] = value;
        return this;
    }

    serialize(): Record<string, any> {
        let output: Record<string, any> = { ...this.data };
        if (this.data.alerts) {
            output.alerts = this.data.alerts?.map((alert) => alert.serialize());
        }
        if (this.data.maintenanceWindows) {
            output.maintenanceWindows = this.data.maintenanceWindows.map((m) =>
                m.serialize()
            );
        }
        if (this.data.client) {
            output.client = this.data.client.serialize();
        }
        if (this.data.ui) {
            output.ui = this.data.ui;
        }
        return output;
    }
}
