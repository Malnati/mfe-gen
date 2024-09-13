// src/readme-generator.ts

import { FrontendGeneratorConfig, IGenerator, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";
import path from "path"
import ejs from "ejs"

export class ReadmeGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }
    generate() {
        const filePath = path.join(__dirname, './templates/readme.ejs');

        const data = {
            appName: this.frontendGeneratorConfig.app,
            outputDir: this.frontendGeneratorConfig.outputDir
        }

        ejs.renderFile(filePath, data, (err, readmeContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync('README.md', readmeContent);
        });
    }
}
