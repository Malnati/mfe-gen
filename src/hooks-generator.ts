// src/hooks-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class HooksGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
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

		this.writeFileSync(`hooks/${hookName}.ts`, hookContent);
    }
}
