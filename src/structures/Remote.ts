import { Base, Serialize } from "./Base.js";

export type RemoteConfiguration = {
    endpointPrefix?: string;
    url?: string;
};

export class Remote extends Base implements Serialize {
    constructor(public data: RemoteConfiguration) {
        super();
    }

    endpointPrefix(endpointPrefix: string): this {
        this.data.endpointPrefix = endpointPrefix;
        return this;
    }

    url(url: string): this {
        this.data.url = url;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
