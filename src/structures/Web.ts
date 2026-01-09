import { Base, Serialize } from "./Base.js";

export type WebConfiguration = {
    address?: string;
    port?: number;
    readBufferSize?: number;
    certificateFile?: string;
    privateKeyFile?: string;
};

export class Web extends Base implements Serialize {
    constructor(public data: WebConfiguration) {
        super();
    }

    address(address: string): this {
        this.data.address = address;
        return this;
    }

    port(port: number): this {
        this.data.port = port;
        return this;
    }

    readBufferSize(size: number): this {
        this.data.readBufferSize = size;
        return this;
    }

    certificateFile(path: string): this {
        this.data.certificateFile = path;
        return this;
    }

    privateKeyFile(path: string): this {
        this.data.privateKeyFile = path;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
