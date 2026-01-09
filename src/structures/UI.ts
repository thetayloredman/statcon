import { Base, Serialize } from "./Base.js";

export type UIConfiguration = {
    title?: string;
    description?: string;
    dashboardHeading?: string;
    dashboardSubheading?: string;
    header?: string;
    logo?: string;
    link?: string;
    buttons?: {
        name: string;
        link: string;
    }[];
    customCss?: string;
    darkMode?: boolean;
    defaultSortBy?: "name" | "group" | "health";
    defaultFilterBy?: "none" | "failing" | "unstable";
};

export class UI extends Base implements Serialize {
    constructor(public data: UIConfiguration) {
        super();
    }

    title(title: string): this {
        this.data.title = title;
        return this;
    }

    description(description: string): this {
        this.data.description = description;
        return this;
    }

    dashboardHeading(heading: string): this {
        this.data.dashboardHeading = heading;
        return this;
    }

    dashboardSubheading(subheading: string): this {
        this.data.dashboardSubheading = subheading;
        return this;
    }

    header(header: string): this {
        this.data.header = header;
        return this;
    }

    logo(logo: string): this {
        this.data.logo = logo;
        return this;
    }

    link(link: string): this {
        this.data.link = link;
        return this;
    }

    customCss(css: string): this {
        this.data.customCss = css;
        return this;
    }

    darkMode(enabled: boolean): this {
        this.data.darkMode = enabled;
        return this;
    }

    defaultSortBy(sortBy: UIConfiguration["defaultSortBy"]): this {
        this.data.defaultSortBy = sortBy;
        return this;
    }

    defaultFilterBy(filterBy: UIConfiguration["defaultFilterBy"]): this {
        this.data.defaultFilterBy = filterBy;
        return this;
    }

    serialize(): Record<string, any> {
        return this.data;
    }
}
