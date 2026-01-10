# statcon

The Status Configurator - a declarative configuration generator for Gatus config.yaml

## Usage

Statcon is packaged as a module on npm, and can be used in your own projects to generate Gatus configuration files.

Configure a JS or TS project, install statcon, and then create a file like `statcon.conf.ts` with your desired configuration.

See the [`statcon.conf.ts`](https://github.com/thetayloredman/statcon/blob/main/statcon.conf.ts) file for an example of Statcon's declarative, functional configuration style.

## Output

The `sc.generate()` function will return a JS object which you can then JSON.stringify and write to a file.

Valid JSON is valid YAML, so you can write the output to the `config.yaml` file and it will be usable by Gatus.

## Code Splitting

If your configuration gets quite long and you want to split it into multiple files, you can export them as plugins and import them into your main configuration file, then `.use`ing them in the main configuration.

For example, you could have a `plugins/` directory with files like `plugins/database.ts` and `plugins/api.ts`, each exporting a function that takes a Statcon instance and returns a plugin object.

Then in your main `statcon.conf.ts`, you can import those plugins and use them:

```ts
import { Statcon } from "statcon";
import databasePlugin from "./plugins/database";
import apiPlugin from "./plugins/api";

const config = sc.generate((config) =>
    config.use(databasePlugin).use(apiPlugin)
);
```

This allows you to keep your configuration organized and modular, especially as it grows in size and complexity.

## Contributing

Contributions to Statcon are welcome! If you have an idea for a new feature, or want to help improve the codebase, please open an issue or submit a pull request.

## License

Statcon is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
