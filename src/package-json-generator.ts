// src/package-json-generator.ts

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
            name: `@platform/${this.frontendConfig.app}`,
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
            types: `dist/${this.frontendConfig.app}.d.ts`
        };

        this.writeFileSync('package.json', JSON.stringify(packageJsonContent, null, 2));

        await this.installDependencies(this.frontendConfig.outputDir, Object.keys(this.frontendGeneratorConfig.dependencies || {}), false);
        await this.installDependencies(this.frontendConfig.outputDir, Object.keys(this.frontendGeneratorConfig.devDependencies || {}), true);
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
