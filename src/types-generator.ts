// src/types-generator.ts

import { IGenerator, FrontendGeneratorConfig, RequestConfig } from './interfaces';
import { BaseGenerator } from './base-generator';
import path from "path"
import ejs from "ejs"

export class TypesGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const filePath = path.join(__dirname, './templates/types.ejs');

        ejs.renderFile(filePath, {}, (err, typesContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync(`components/${this.frontendGeneratorConfig.app}/types.ts`, typesContent);
        });
    }

}
