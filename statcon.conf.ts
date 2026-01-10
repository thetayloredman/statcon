import * as sc from "./dist/index.js";

// Create functional plugins which can be used to add default configuration to multiple monitors:
const httpDefaults = (endpoint: sc.Endpoint) =>
    endpoint
        .interval("1m")
        .method("GET")
        .addCondition("[STATUS] == 200")
        .addCondition("[CERTIFICATE_EXPIRATION] > 7d");

// You can even use curried functions to create more complex plugins:
const createStandardHttpEndpoint =
    (name: string, url: string) => (endpoint: sc.Endpoint) =>
        endpoint.name(name).url(url).use(httpDefaults);

const config = sc.generate((config) => {
    config
        .metrics(true)
        // Object style configuration:
        .storage({
            path: "./data.sqlite",
            type: "sqlite",
            writeThroughCache: true,
        })
        // Builder style configuration:
        .web((web) =>
            web
                .address("0.0.0.0")
                .port(8080)
                .certificateFile("./cert.pem")
                .privateKeyFile("./key.pem")
        )
        .endpoint((endpoint) =>
            endpoint
                .name("Example Plugin Use")
                // Invoke plugins...
                .use(httpDefaults)
                // ... and add your own additional configuration:
                .url("https://example.com")
        )
        // And even use the above curried function to create a new endpoint with the same defaults:
        .endpoint(createStandardHttpEndpoint("Google", "https://google.com"));

    // Or, if you prefer an imperative style, you can call the functions without chaining,
    // including with loops:
    const endpoints = [
        { name: "GitHub", url: "https://github.com" },
        { name: "GitLab", url: "https://gitlab.com" },
    ];
    for (const { name, url } of endpoints) {
        config.endpoint(createStandardHttpEndpoint(name, url));
    }

    // Just return the configuration object at the end of the function, and it will be serialized
    // for you:
    return config;
});

// And, all JSON is valid YAML, so you can output the configuration as JSON and Gatus will still
// be able to read it!
console.log(JSON.stringify(config));
