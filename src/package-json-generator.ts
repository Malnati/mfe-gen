// src/package-json-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";
import { exec } from "child_process";

export class PackageJsonGenerator extends BaseGenerator implements IGenerator {
	
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }

    async generate() {
        const packageJsonContent = {
            name: `@platform/${this.config.app}`,
            scripts: {
                start: "webpack serve",
                "start:standalone": "webpack serve --env standalone",
                build: "concurrently pnpm:build:*",
                "build:webpack": "webpack --mode=production",
                analyze: "webpack --mode=production --env analyze",
                lint: "eslint src --ext js,ts,tsx",
                format: "prettier --write .",
                "check-format": "prettier --check .",
                test: "cross-env BABEL_ENV=test jest",
                "watch-tests": "cross-env BABEL_ENV=test jest --watch",
                prepare: "husky install",
                coverage: "cross-env BABEL_ENV=test jest --coverage",
                "build:types": "tsc"
            },
            devDependencies: {},
            dependencies: {},
            types: `dist/${this.config.app}.d.ts`
        };

        const buildDir = this.config.outputDir;

        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }

        const filePath = path.join(buildDir, 'package.json');

        try {
            fs.writeFileSync(filePath, JSON.stringify(packageJsonContent, null, 2));
            console.log(`package.json has been generated at ${filePath}`);
        } catch (error) {
            console.error(`Error writing package.json file: ${error}`);
        }

        await this.installDependencies(buildDir, Object.keys(this.config.dependencies || {}), false);
        await this.installDependencies(buildDir, Object.keys(this.config.devDependencies || {}), true);
    }

    private installDependencies(directory: string, dependencies: string[], isDev: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (dependencies.length === 0) {
                resolve();
                return;
            }

            const installType = isDev ? '--save-dev' : '--save';
            const command = `npm install ${installType} ${dependencies.join(' ')}`;
            console.log(`Executing: ${command}`);

            exec(command, { cwd: directory }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao executar ${command}: ${error.message}`);
                    reject(error);
                } else {
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                    resolve();
                }
            });
        });
    }
}
