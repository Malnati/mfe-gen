// src/hooks-generator.ts

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
        const serviceName = `use${this.frontendConfig.app}Service`;
        const metadata = this.loadMetadata();

        const hookContent = `
import { useState, useEffect } from 'react';
import { ${serviceName} } from '../services/${this.frontendConfig.app}Service';

export const ${hookName} = () => {
    const [state, setState] = useState(null);
    const { request } = ${serviceName}();

    useEffect(() => {
        // Utilize os metadados para inicializar o estado ou realizar requisições adicionais
        const fetchData = async () => {
            const result = await request(${JSON.stringify(metadata?.request?.body || null)});
            setState(result);
        };

        fetchData();
    }, []);

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
