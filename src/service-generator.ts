// src/service-generator.ts

import { IGenerator, RequestConfig, FrontendGeneratorConfig } from './interfaces';
import { BaseGenerator } from './base-generator';
import ejs from "ejs"
import path from "path"

export class ServiceGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const filePath = path.join(__dirname, './templates/services.ejs');
        const serviceName = `use${this.capitalizeFirstLetter(this.requestConfig.method)}${this.capitalizeEndpoint(this.requestConfig.url)}Service`;
        const functionName = `${this.requestConfig.method.toLowerCase()}${this.capitalizeEndpoint(this.requestConfig.url)}`;

        const data = {
            serviceName,
            functionName,
            method: this.requestConfig.method.toLowerCase(),
            url: process.env.API_BASE_URL || '' + new URL(this.requestConfig.url).pathname,
            headers: this.requestConfig.headers
        };


        ejs.renderFile(filePath ,data, (err, serviceContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync(`services/${serviceName}.ts`, serviceContent);
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
