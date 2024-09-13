// src/package-json-generator.ts

import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";
import { exec } from "child_process";
import path from "path"
import ejs from "ejs"

export class PackageJsonGenerator extends BaseGenerator implements IGenerator {

    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }

    async generate() {
        const filePath = path.join(__dirname, './templates/package-json.ejs');

        const data = {
            appName: this.frontendConfig.app,
        }

        ejs.renderFile(filePath, data, (err, packageJsonContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync('package.json', packageJsonContent);
        });



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
