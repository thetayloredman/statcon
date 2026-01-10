import { Base, Serialize } from "./Base.js";

export type AnnouncementConfiguration = {
    timestamp?: string;
    type?: "outage" | "warning" | "information" | "operational" | "none";
    message?: string;
    archived?: boolean;
};

export class Announcement extends Base implements Serialize {
    constructor(public data: AnnouncementConfiguration) {
        super();
    }

    message(message: string): this {
        this.data.message = message;
        return this;
    }

    type(type: AnnouncementConfiguration["type"]): this {
        this.data.type = type;
        return this;
    }

    archived(archived: boolean): this {
        this.data.archived = archived;
        return this;
    }

    timestamp(timestamp: string): this {
        this.data.timestamp = timestamp;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
