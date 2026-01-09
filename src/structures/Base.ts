export class Base {
    use(cb: (thing: this) => this): this {
        return cb(this);
    }
}

export interface Serialize {
    serialize(): Record<string, any>;
}
