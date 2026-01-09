import { Alerting } from "./structures/Alerting.js";
import { Announcement } from "./structures/Announcement.js";
import { Client } from "./structures/Client.js";
import { Endpoint } from "./structures/Endpoint.js";
import { ExternalEndpoint } from "./structures/ExternalEndpoint.js";
import { Maintenance } from "./structures/Maintenance.js";
import { Security } from "./structures/Security.js";
import { Tunnel } from "./structures/Tunnel.js";
import { UI } from "./structures/UI.js";
import { Web } from "./structures/Web.js";

export type Configuration = {
    metrics?: boolean;
    storage?: Storage;
    alerting?: Alerting[];
    announcements?: Announcement[];
    endpoints?: Endpoint[];
    externalEndpoints?: ExternalEndpoint[];
    security?: Security;
    concurrency?: number;
    skipInvalidConfigUpdate?: boolean;
    web?: Web;
    ui?: UI;
    maintenance?: Maintenance[];
    tunneling?: Record<string, Tunnel>;
};
