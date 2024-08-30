// src/hooks-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class HooksGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;

    constructor(config: FrontendGeneratorConfig) {
        super(config);
        this.frontendConfig = config;
    }

    generate() {
        const hookName = `use${this.frontendConfig.app}Hook`;
        const hookContent = `
import { useState } from 'react';

export const ${hookName} = () => {
    const [state, setState] = useState(null);

    const handleStateChange = (newState: any) => {
        setState(newState);
    };

    return {
        state,
        handleStateChange,
    };
};
`;

        const hooksDir = path.join(this.frontendConfig.outputDir, 'hooks');
        if (!fs.existsSync(hooksDir)) {
            fs.mkdirSync(hooksDir, { recursive: true });
        }

        const filePath = path.join(hooksDir, `${hookName}.ts`);
        fs.writeFileSync(filePath, hookContent);
        console.log(`Hook generated at ${filePath}`);
    }
}
