import { Alerting, EndpointAlertingConfiguration } from "./Alerting.js";
import { Announcement, AnnouncementConfiguration } from "./Announcement.js";
import { Base, Serialize } from "./Base.js";
import { Endpoint, EndpointConfiguration } from "./Endpoint.js";
import {
    ExternalEndpoint,
    ExternalEndpointConfiguration,
} from "./ExternalEndpoint.js";
import { Maintenance, MaintenanceConfiguration } from "./Maintenance.js";
import { Security, SecurityConfiguration } from "./Security.js";
import { Storage, StorageConfiguration } from "./Storage.js";
import { Tunnel, TunnelingConfiguration } from "./Tunnel.js";
import { UI, UIConfiguration } from "./UI.js";
import { Web, WebConfiguration } from "./Web.js";

export type ConfigurationConfiguration = {
    metrics?: boolean;
    storage?: Storage;
    alerting?: Record<string, unknown>;
    announcements?: Announcement[];
    endpoints?: Endpoint[];
    externalEndpoints?: ExternalEndpoint[];
    security?: Security;
    concurrency?: number;
    skipInvalidConfigUpdate?: boolean;
    web?: Web;
    ui?: UI;
    maintenance?: Maintenance;
    tunneling?: Record<string, Tunnel>;
};

export class Configuration extends Base implements Serialize {
    constructor(public data: ConfigurationConfiguration) {
        super();
    }

    metrics(enabled: boolean): this {
        this.data.metrics = enabled;
        return this;
    }

    concurrency(concurrency: number): this {
        this.data.concurrency = concurrency;
        return this;
    }

    skipInvalidConfigUpdate(skip: boolean): this {
        this.data.skipInvalidConfigUpdate = skip;
        return this;
    }

    storage(
        base: StorageConfiguration,
        storage?: (storage: Storage) => Storage
    ): this;
    storage(storage: (storage: Storage) => Storage): this;
    storage(
        baseOrStorage: StorageConfiguration | ((storage: Storage) => Storage),
        storage?: (storage: Storage) => Storage
    ): this {
        let storageInstance: Storage;
        if (typeof baseOrStorage === "function") {
            storageInstance = baseOrStorage(new Storage({}));
        } else {
            storageInstance = new Storage(baseOrStorage);
            if (storage) storageInstance = storage(storageInstance);
        }
        this.data.storage = storageInstance;
        return this;
    }

    web(base: WebConfiguration, web?: (web: Web) => Web): this;
    web(web: (web: Web) => Web): this;
    web(
        baseOrWeb: WebConfiguration | ((web: Web) => Web),
        web?: (web: Web) => Web
    ): this {
        let webInstance: Web;
        if (typeof baseOrWeb === "function") {
            webInstance = baseOrWeb(new Web({}));
        } else {
            webInstance = new Web(baseOrWeb);
            if (web) webInstance = web(webInstance);
        }
        this.data.web = webInstance;
        return this;
    }

    ui(base: UIConfiguration, ui?: (ui: UI) => UI): this;
    ui(ui: (ui: UI) => UI): this;
    ui(
        baseOrUi: UIConfiguration | ((ui: UI) => UI),
        ui?: (ui: UI) => UI
    ): this {
        let uiInstance: UI;
        if (typeof baseOrUi === "function") {
            uiInstance = baseOrUi(new UI({}));
        } else {
            uiInstance = new UI(baseOrUi);
            if (ui) uiInstance = ui(uiInstance);
        }
        this.data.ui = uiInstance;
        return this;
    }

    security(
        base: SecurityConfiguration,
        security?: (security: Security) => Security
    ): this;
    security(security: (security: Security) => Security): this;
    security(
        baseOrSecurity:
            | SecurityConfiguration
            | ((security: Security) => Security),
        security?: (security: Security) => Security
    ): this {
        let securityInstance: Security;
        if (typeof baseOrSecurity === "function") {
            securityInstance = baseOrSecurity(new Security({}));
        } else {
            securityInstance = new Security(baseOrSecurity);
            if (security) securityInstance = security(securityInstance);
        }
        this.data.security = securityInstance;
        return this;
    }

    alerting(base: Record<string, unknown>): this {
        this.data.alerting = base;
        return this;
    }

    announcement(
        base: AnnouncementConfiguration,
        announcement?: (announcement: Announcement) => Announcement
    ): this;
    announcement(
        announcement: (announcement: Announcement) => Announcement
    ): this;
    announcement(
        baseOrAnnouncement:
            | AnnouncementConfiguration
            | ((announcement: Announcement) => Announcement),
        announcement?: (announcement: Announcement) => Announcement
    ): this {
        let announcementInstance: Announcement;
        if (typeof baseOrAnnouncement === "function") {
            announcementInstance = baseOrAnnouncement(new Announcement({}));
        } else {
            announcementInstance = new Announcement(baseOrAnnouncement);
            if (announcement)
                announcementInstance = announcement(announcementInstance);
        }
        if (!this.data.announcements) {
            this.data.announcements = [];
        }
        this.data.announcements.push(announcementInstance);
        return this;
    }

    maintenance(
        base: MaintenanceConfiguration,
        maintenance?: (maintenance: Maintenance) => Maintenance
    ): this;
    maintenance(maintenance: (maintenance: Maintenance) => Maintenance): this;
    maintenance(
        baseOrMaintenance:
            | MaintenanceConfiguration
            | ((maintenance: Maintenance) => Maintenance),
        maintenance?: (maintenance: Maintenance) => Maintenance
    ): this {
        let maintenanceInstance: Maintenance;
        if (typeof baseOrMaintenance === "function") {
            maintenanceInstance = baseOrMaintenance(new Maintenance({}));
        } else {
            maintenanceInstance = new Maintenance(baseOrMaintenance);
            if (maintenance)
                maintenanceInstance = maintenance(maintenanceInstance);
        }
        this.data.maintenance = maintenanceInstance;
        return this;
    }

    endpoint(
        base: EndpointConfiguration,
        endpoint?: (endpoint: Endpoint) => Endpoint
    ): this;
    endpoint(endpoint: (endpoint: Endpoint) => Endpoint): this;
    endpoint(
        baseOrEndpoint:
            | EndpointConfiguration
            | ((endpoint: Endpoint) => Endpoint),
        endpoint?: (endpoint: Endpoint) => Endpoint
    ): this {
        let endpointInstance: Endpoint;
        if (typeof baseOrEndpoint === "function") {
            endpointInstance = baseOrEndpoint(new Endpoint({}));
        } else {
            endpointInstance = new Endpoint(baseOrEndpoint);
            if (endpoint) endpointInstance = endpoint(endpointInstance);
        }
        if (!this.data.endpoints) {
            this.data.endpoints = [];
        }
        this.data.endpoints.push(endpointInstance);
        return this;
    }

    externalEndpoint(
        base: ExternalEndpointConfiguration,
        endpoint?: (endpoint: ExternalEndpoint) => ExternalEndpoint
    ): this;
    externalEndpoint(
        endpoint: (endpoint: ExternalEndpoint) => ExternalEndpoint
    ): this;
    externalEndpoint(
        baseOrEndpoint:
            | ExternalEndpointConfiguration
            | ((endpoint: ExternalEndpoint) => ExternalEndpoint),
        endpoint?: (endpoint: ExternalEndpoint) => ExternalEndpoint
    ): this {
        let endpointInstance: ExternalEndpoint;
        if (typeof baseOrEndpoint === "function") {
            endpointInstance = baseOrEndpoint(new ExternalEndpoint({}));
        } else {
            endpointInstance = new ExternalEndpoint(baseOrEndpoint);
            if (endpoint) endpointInstance = endpoint(endpointInstance);
        }
        if (!this.data.externalEndpoints) {
            this.data.externalEndpoints = [];
        }
        this.data.externalEndpoints.push(endpointInstance);
        return this;
    }

    tunnel(
        name: string,
        base: TunnelingConfiguration,
        tunnel?: (tunnel: Tunnel) => Tunnel
    ): this;
    tunnel(name: string, tunnel: (tunnel: Tunnel) => Tunnel): this;
    tunnel(
        name: string,
        baseOrTunnel: TunnelingConfiguration | ((tunnel: Tunnel) => Tunnel),
        tunnel?: (tunnel: Tunnel) => Tunnel
    ): this {
        let tunnelInstance: Tunnel;
        if (typeof baseOrTunnel === "function") {
            tunnelInstance = baseOrTunnel(new Tunnel({}));
        } else {
            tunnelInstance = new Tunnel(baseOrTunnel);
            if (tunnel) tunnelInstance = tunnel(tunnelInstance);
        }
        if (!this.data.tunneling) {
            this.data.tunneling = {};
        }
        this.data.tunneling[name] = tunnelInstance;
        return this;
    }

    serialize(): Record<string, any> {
        let output: Record<string, any> = { ...this.data };

        if (this.data.announcements) {
            output.announcements = this.data.announcements.map((announcement) =>
                announcement.serialize()
            );
        }

        if (this.data.endpoints) {
            output.endpoints = this.data.endpoints.map((endpoint) =>
                endpoint.serialize()
            );
        }

        if (this.data.externalEndpoints) {
            output.externalEndpoints = Object.fromEntries(
                Object.entries(this.data.externalEndpoints).map(
                    ([key, endpoint]) => [key, endpoint.serialize()]
                )
            );
        }

        if (this.data.maintenance) {
            output.maintenance = this.data.maintenance.serialize();
        }

        if (this.data.tunneling) {
            output.tunneling = Object.fromEntries(
                Object.entries(this.data.tunneling).map(([key, tunnel]) => [
                    key,
                    tunnel.serialize(),
                ])
            );
        }

        if (this.data.security) {
            output.security = this.data.security.serialize();
        }

        if (this.data.storage) {
            output.storage = this.data.storage.serialize();
        }

        if (this.data.web) {
            output.web = this.data.web.serialize();
        }

        if (this.data.ui) {
            output.ui = this.data.ui.serialize();
        }

        return output;
    }
}
