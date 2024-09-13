// src/context-generator.ts

import { IGenerator, FrontendGeneratorConfig, RequestConfig } from './interfaces';
import { BaseGenerator } from './base-generator';
import path from "path"
import ejs from "ejs"

export class ContextGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const filePath = path.join(__dirname, './templates/context.ejs');

        const contextName = this.frontendConfig.app;
        const serviceName = `use${this.capitalizeFirstLetter(this.requestConfig.method)}${this.capitalizeEndpoint(this.requestConfig.url)}Service`;
        const metadata = this.loadMetadata();
        const responseType = this.generateResponseType(metadata);

        const data = {
            method: this.requestConfig.method.toLowerCase(),
            url: this.capitalizeEndpoint(this.requestConfig.url),
            contextName,
            responseType,
            serviceName,
        }

        ejs.renderFile(filePath, data, (err, contextContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync(`components/${this.frontendGeneratorConfig.app}/${contextName}Context.tsx`, contextContent);
        });


    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    private capitalizeEndpoint(url: string) {
        const path = new URL(url).pathname.replace(/[^a-zA-Z0-9]/g, '');
        return this.capitalizeFirstLetter(path);
    }
}
