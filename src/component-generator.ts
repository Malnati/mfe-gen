// src/component-generator.ts

import ejs from "ejs"
import * as fs from 'fs';
import * as path from 'path';
import { BaseGenerator } from "./base-generator";
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";

export class ComponentGenerator extends BaseGenerator implements IGenerator {

    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }

    generate() {
        const componentPath = path.join(__dirname, './templates/component.ejs');
        const stylesPath = path.join(__dirname, './templates/component.styles.ejs');
        const typesPath = path.join(__dirname, './templates/component.types.ejs');
        const outputDir = path.resolve(this.frontendConfig.outputDir, 'components', this.frontendConfig.app);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const data = {
            appName: this.frontendConfig.app
        }

        ejs.renderFile(componentPath, data, (err, componentContent) => {
            if (err) {
                console.error(err);
                return;
            }
            // this.writeFileSync(`components/${this.frontendGeneratorConfig.app}/${this.frontendConfig.app}.tsx`, componentContent.trim());
            this.writeFileSync(`components/${this.frontendConfig.app}/index.tsx`, componentContent.trim());
        });

        ejs.renderFile(stylesPath, data, (err, componentContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync(`components/${this.frontendConfig.app}/styles.scss`, componentContent.trim());
        });

        ejs.renderFile(typesPath, data, (err, componentContent) => {
            if (err) {
                console.error(err);
                return;
            }
            this.writeFileSync(`components/${this.frontendConfig.app}/types.ts`, componentContent.trim());
        });
    }
}
