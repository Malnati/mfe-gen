// src/component-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class ComponentGenerator extends BaseGenerator implements IGenerator {
    generate() {
        const outputDir = path.resolve(this.config.outputDir, 'components', this.config.app);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const componentContent = `
        import React from 'react';

        const ${this.config.app} = () => {
            return <div>${this.config.app} component generated successfully!</div>;
        };

        export default ${this.config.app};
        `;

        const filePath = path.join(outputDir, `${this.config.app}.tsx`);
        fs.writeFileSync(filePath, componentContent.trim());

        console.log(`Component generated at ${filePath}`);
    }
}
