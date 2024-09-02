// src/main.ts

import { ConfigUtil } from "./utils/ConfigUtil";
import { RequestConfig, FrontendGeneratorConfig } from "./interfaces";

import { ComponentGenerator } from "./component-generator";
import { StylesGenerator } from "./styles-generator";
import { HooksGenerator } from "./hooks-generator";
import { TypesGenerator } from "./types-generator";
import { ServiceGenerator } from "./service-generator";
import { ValidationsGenerator } from "./validation-generator";
import { ContextGenerator } from "./context-generator";
import { ReadmeGenerator } from "./readme-generator";
import { PackageJsonGenerator } from "./package-json-generator";
import { EnvGenerator } from "./env-generator";
import { MetadataGenerator } from "./metadata-generator";

const { requestConfig, frontendConfig }: { requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig } = ConfigUtil.getConfigs();

console.log("Main...");
console.log(`Method: ${requestConfig.method}`);
console.log(`URL: ${requestConfig.url}`);
console.log(`Headers: ${JSON.stringify(requestConfig.headers)}`);
if (requestConfig.body) {
    console.log(`Body: ${requestConfig.body}`);
}

console.log(`App: ${frontendConfig.app}`);
console.log(`Output Directory: ${frontendConfig.outputDir}`);
console.log(`Components: ${frontendConfig.components.join(", ")}`);

async function main() {
    await ConfigUtil.copyStaticFiles(frontendConfig.outputDir);

    // Executa o MetadataGenerator antes dos outros geradores
    const metadataGenerator = new MetadataGenerator(requestConfig, frontendConfig);
    await metadataGenerator.generate();
    // Executa o TypesGenerator antes dos outros geradores
    const typesGenerator = new TypesGenerator(requestConfig, frontendConfig);
    await typesGenerator.generate();

    const generators: { [key: string]: any } = {
        "component": ComponentGenerator,
        "styles": StylesGenerator,
        "hooks": HooksGenerator,
        "types": TypesGenerator,
        "services": ServiceGenerator, // Passar requestConfig junto com frontendConfig
        "validation": ValidationsGenerator,
        "context": ContextGenerator,
        "package.json": PackageJsonGenerator,
        "env": EnvGenerator,
        "readme": ReadmeGenerator
    };

    for (const component of frontendConfig.components) {
        const GeneratorClass = generators[component];
        if (GeneratorClass) {
            const generator = new GeneratorClass({ ...frontendConfig, requestConfig });
            await generator.generate();
        } else {
            console.warn(`Generator for component "${component}" not found.`);
        }
    }

    await ConfigUtil.runNpmInstall(frontendConfig.outputDir);
    await ConfigUtil.formatFiles(frontendConfig.outputDir);
}

main();
