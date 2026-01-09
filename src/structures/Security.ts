import { Base, Serialize } from "./Base.js";

export type SecurityConfiguration = {
    basic?: {
        username?: string;
        passwordBcryptBase64?: string;
    };
    oidc?: {
        issuerUrl?: string;
        redirectUrl?: string;
        clientId?: string;
        clientSecret?: string;
        scopes?: string[];
        allowedSubjects?: string[];
        sessionTtl?: string;
    };
};

export class BasicSecurity extends Base implements Serialize {
    constructor(public data: NonNullable<SecurityConfiguration["basic"]>) {
        super();
    }

    username(username: string): this {
        this.data.username = username;
        return this;
    }

    passwordBcryptBase64(password: string): this {
        this.data.passwordBcryptBase64 = password;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}

export class OidcSecurity extends Base implements Serialize {
    constructor(public data: NonNullable<SecurityConfiguration["oidc"]>) {
        super();
    }

    issuerUrl(url: string): this {
        this.data.issuerUrl = url;
        return this;
    }

    redirectUrl(url: string): this {
        this.data.redirectUrl = url;
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

    allowedSubjects(subjects: string[]): this {
        this.data.allowedSubjects = subjects;
        return this;
    }

    sessionTtl(ttl: string): this {
        this.data.sessionTtl = ttl;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}

export class Security extends Base implements Serialize {
    constructor(public data: SecurityConfiguration) {
        super();
    }

    basic(
        base: NonNullable<SecurityConfiguration["basic"]>,
        cb: (basic: BasicSecurity) => BasicSecurity
    ): this;
    basic(cb: (basic: BasicSecurity) => BasicSecurity): this;
    basic(
        baseOrCb:
            | NonNullable<SecurityConfiguration["basic"]>
            | ((basic: BasicSecurity) => BasicSecurity),
        cb?: (basic: BasicSecurity) => BasicSecurity
    ): this {
        let basicSecurity: BasicSecurity;
        if (typeof baseOrCb === "function") {
            basicSecurity = new BasicSecurity({});
            cb = baseOrCb;
        } else {
            basicSecurity = new BasicSecurity(baseOrCb);
        }
        this.data.basic = cb!(basicSecurity).data;
        return this;
    }

    oidc(
        base: NonNullable<SecurityConfiguration["oidc"]>,
        cb: (oidc: OidcSecurity) => OidcSecurity
    ): this;
    oidc(cb: (oidc: OidcSecurity) => OidcSecurity): this;
    oidc(
        baseOrCb:
            | NonNullable<SecurityConfiguration["oidc"]>
            | ((oidc: OidcSecurity) => OidcSecurity),
        cb?: (oidc: OidcSecurity) => OidcSecurity
    ): this {
        let oidcSecurity: OidcSecurity;
        if (typeof baseOrCb === "function") {
            oidcSecurity = new OidcSecurity({});
            cb = baseOrCb;
        } else {
            oidcSecurity = new OidcSecurity(baseOrCb);
        }
        this.data.oidc = cb!(oidcSecurity).data;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
