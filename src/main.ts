#!/usr/bin/env node

// src/main.ts

import { ConfigUtil } from "./utils/ConfigUtil";
import { RequestConfig } from "./interfaces";

import { ComponentGenerator } from "./component-generator";
import { StylesGenerator } from "./styles-generator";
import { HooksGenerator } from "./hooks-generator";
import { TypesGenerator } from "./types-generator";
import { ServiceGenerator } from "./service-generator";
import { ValidationGenerator } from "./validation-generator";
import { ContextGenerator } from "./context-generator";
import { ReadmeGenerator } from "./readme-generator";
import { PackageJsonGenerator } from "./package-json-generator";
import { EnvGenerator } from "./env-generator";

const requestConfig: RequestConfig = ConfigUtil.getRequestConfig();

console.log("Main...");
console.log(`Method: ${requestConfig.method}`);
console.log(`URL: ${requestConfig.url}`);
console.log(`Headers: ${JSON.stringify(requestConfig.headers)}`);
if (requestConfig.body) {
    console.log(`Body: ${requestConfig.body}`);
}

async function main() {
    const generators: { [key: string]: any } = {
        "component": ComponentGenerator,
        "styles": StylesGenerator,
        "hooks": HooksGenerator,
        "types": TypesGenerator,
        "services": ServiceGenerator,
        "validation": ValidationGenerator,
        "context": ContextGenerator,
        "package.json": PackageJsonGenerator,
        "env": EnvGenerator,
        "readme": ReadmeGenerator
    };

    // Aqui você pode adicionar lógica para selecionar qual gerador usar
    // Para o exemplo, vamos apenas utilizar o gerador de `env`
    const GeneratorClass = generators['env'];
    const generator = new GeneratorClass(requestConfig);
    await generator.generate();
}

main();
