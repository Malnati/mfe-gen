// src/component-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class ComponentGenerator extends BaseGenerator implements IGenerator {

    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
    }

    generate() {
        const outputDir = path.resolve(this.frontendConfig.outputDir, 'components', this.frontendConfig.app);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const componentContent = `
import React from 'react';

const ${this.frontendConfig.app} = () => {
	return <div>${this.frontendConfig.app} component generated successfully!</div>;
};

export default ${this.frontendConfig.app};
`;

        fs.writeFileSync(`${this.frontendConfig.app}.tsx`, componentContent.trim());
    }
}
