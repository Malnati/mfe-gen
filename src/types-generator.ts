// src/types-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class TypesGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const typesContent = `
export interface IRequest {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
}

export interface IResponse {
    status: number;
    headers: Record<string, string>;
    data: any;
}
`;
		this.writeFileSync('types/types.ts', typesContent);
    }

}
