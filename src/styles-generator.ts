// src/styles-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class StylesGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const stylesTemplate = `
        import { makeStyles } from '@material-ui/core/styles';

        export const useStyles = makeStyles({
            container: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            },
            input: {
                padding: '10px',
                fontSize: '16px',
                width: '200px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            },
        });
        `;
		
        this.writeFileSync(`components/${this.config.app}/styles.ts`, stylesTemplate);
    }
}
