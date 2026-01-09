import { Base, Serialize } from "./Base.js";

export type ClientConfiguration = {
    insecure?: boolean;
    ignoreRedirect?: boolean;
    timeout?: string;
    dnsResolver?: string;
    oauth2?: {
        tokenUrl?: string;
        clientId?: string;
        clientSecret?: string;
        scopes?: string[];
    };
    proxyUrl?: string;
    identityAwareProxy?: {
        audience: string;
    };
    tls?: {
        certificateFile?: string;
        privateKeyFile?: string;
        renegotiation?: "never" | "once" | "freely";
    };
    network?: "ip" | "ip4" | "ip6";
    tunnel?: string;
};

export class OAuth2 extends Base implements Serialize {
    constructor(public data: NonNullable<ClientConfiguration["oauth2"]>) {
        super();
    }

    tokenUrl(url: string): this {
        this.data.tokenUrl = url;
        return this;
    }

    clientId(id: string): this {
        this.data.clientId = id;
        return this;
    }

    clientSecret(secret: string): this {
        this.data.clientSecret = secret;
        return this;
    }

    scopes(scopes: string[]): this {
        this.data.scopes = scopes;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}

export class Tls extends Base implements Serialize {
    constructor(public data: NonNullable<ClientConfiguration["tls"]>) {
        super();
    }

    certificateFile(path: string): this {
        this.data.certificateFile = path;
        return this;
    }

    privateKeyFile(path: string): this {
        this.data.privateKeyFile = path;
        return this;
    }

    renegotiation(
        mode: NonNullable<ClientConfiguration["tls"]>["renegotiation"]
    ): this {
        this.data.renegotiation = mode;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}

export class Client extends Base implements Serialize {
    constructor(public data: ClientConfiguration) {
        super();
    }

    insecure(insecure: boolean): this {
        this.data.insecure = insecure;
        return this;
    }

    ignoreRedirect(ignore: boolean): this {
        this.data.ignoreRedirect = ignore;
        return this;
    }

    timeout(timeout: string): this {
        this.data.timeout = timeout;
        return this;
    }

    dnsResolver(resolver: string): this {
        this.data.dnsResolver = resolver;
        return this;
    }

    proxyUrl(url: string): this {
        this.data.proxyUrl = url;
        return this;
    }

    identityAwareProxy(audience: string): this {
        if (!this.data.identityAwareProxy) {
            this.data.identityAwareProxy = { audience };
        } else {
            this.data.identityAwareProxy.audience = audience;
        }
        return this;
    }

    network(network: ClientConfiguration["network"]): this {
        this.data.network = network;
        return this;
    }

    tunnel(tunnel: string): this {
        this.data.tunnel = tunnel;
        return this;
    }

    oauth2(
        base: NonNullable<ClientConfiguration["oauth2"]>,
        cb: (oauth2: OAuth2) => OAuth2
    ): this;
    oauth2(cb: (oauth2: OAuth2) => OAuth2): this;
    oauth2(
        baseOrCb:
            | NonNullable<ClientConfiguration["oauth2"]>
            | ((oauth2: OAuth2) => OAuth2),
        cb?: (oauth2: OAuth2) => OAuth2
    ): this {
        let oauth2Instance: OAuth2;
        if (typeof baseOrCb === "function") {
            oauth2Instance = new OAuth2({});
            oauth2Instance = baseOrCb(oauth2Instance);
        } else {
            oauth2Instance = new OAuth2(baseOrCb);
            if (cb) {
                oauth2Instance = cb(oauth2Instance);
            }
        }
        this.data.oauth2 = oauth2Instance.data;
        return this;
    }

    tls(
        baseOrCb: NonNullable<ClientConfiguration["tls"]> | ((tls: Tls) => Tls),
        cb?: (tls: Tls) => Tls
    ): this {
        let tlsInstance: Tls;
        if (typeof baseOrCb === "function") {
            tlsInstance = new Tls({});
            tlsInstance = baseOrCb(tlsInstance);
        } else {
            tlsInstance = new Tls(baseOrCb);
            if (cb) {
                tlsInstance = cb(tlsInstance);
            }
        }
        this.data.tls = tlsInstance.data;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
