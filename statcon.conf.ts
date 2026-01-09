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

const config = sc.statcon((config) =>
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
                // ... and even override them if needed!
                .url("https://example.com")
        )
        // And even use the above curried function to create a new endpoint with the same defaults:
        .endpoint(createStandardHttpEndpoint("Google", "https://google.com"))
);

// All JSON is valid YAML, so you can output the configuration as JSON and Gatus will still
// be able to read it!
console.log(JSON.stringify(config));
