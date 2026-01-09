import { Base, Serialize } from "./Base.js";

export type TunnelingConfiguration = {
    type?: "SSH";
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    privateKey?: string;
};

export class Tunnel extends Base implements Serialize {
    constructor(public data: TunnelingConfiguration) {
        super();
    }

    type(type: "SSH"): this {
        this.data.type = type;
        return this;
    }

    host(host: string): this {
        this.data.host = host;
        return this;
    }

    port(port: number): this {
        this.data.port = port;
        return this;
    }

    username(username: string): this {
        this.data.username = username;
        return this;
    }

    password(password: string): this {
        this.data.password = password;
        return this;
    }

    privateKey(privateKey: string): this {
        this.data.privateKey = privateKey;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
