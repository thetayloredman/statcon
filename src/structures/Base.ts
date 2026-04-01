export class Base {
    use(cb: (thing: this) => this): this {
        return cb(this);
    }

    useMany(...cbs: ((thing: this) => this)[]): this {
        return cbs.reduce((thing, cb) => cb(thing), this);
    }
}

export interface Serialize {
    serialize(): Record<string, any>;
}
