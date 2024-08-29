#!/usr/bin/env node

import { ConfigUtil } from "./utils/ConfigUtil";
import { RequestConfig, FrontendGeneratorConfig } from "./interfaces";
import * as fs from 'fs-extra';
import path from "path";
import { exec } from "child_process";
import * as prettier from "prettier";

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

async function copyStaticFiles(destDir: string) {
    try {
        const staticPath = path.resolve(__dirname, '../static');
        await fs.copy(staticPath, destDir, {
            overwrite: true,
        });
        console.log('Arquivos estáticos copiados com sucesso.');
    } catch (err) {
        console.error('Erro ao copiar arquivos estáticos:', err);
    }
}

async function formatFiles(destDir: string) {
    try {
        const configFile = await prettier.resolveConfigFile(destDir);

        const options = {
            config: configFile,
            ignorePath: path.join(destDir, '.prettierignore'),
            editorconfig: true,
        };

        const files = await fs.promises.readdir(destDir);

        for (const filePath of files) {
            const content = await fs.promises.readFile(path.join(destDir, filePath), 'utf8');
            const formatted = await prettier.format(content, { ...options, filepath: filePath });
            await fs.promises.writeFile(path.join(destDir, filePath), formatted);
        }

        console.log('Arquivos gerados formatados com sucesso.');
    } catch (err) {
        console.error('Erro ao formatar arquivos gerados:', err);
    }
}

async function runNpmInstall(directory: string): Promise<void> {
    console.log('Instalando dependências via npm install...');
    return new Promise((resolve, reject) => {
        exec('npm install', { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar npm install: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            console.log('Dependências instaladas com sucesso.');
            resolve();
        });
    });
}

async function main() {
    await copyStaticFiles(frontendConfig.outputDir);

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

    for (const component of frontendConfig.components) {
        const GeneratorClass = generators[component];
        if (GeneratorClass) {
            const generator = new GeneratorClass(frontendConfig);
            await generator.generate();
        } else {
            console.warn(`Generator for component "${component}" not found.`);
        }
    }

    await runNpmInstall(frontendConfig.outputDir);
    await formatFiles(frontendConfig.outputDir);
}

main();
