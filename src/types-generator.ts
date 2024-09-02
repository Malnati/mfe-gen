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
        this.frontendConfig = frontendConfig;
        this.requestConfig = requestConfig;
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

        // Definir o caminho do arquivo a ser gerado
        const filePath = path.join(this.frontendConfig.outputDir, `src/types.d.ts`);

        // Cria o diretório se não existir
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Escreve o conteúdo no arquivo
        fs.writeFileSync(filePath, typesContent);
        console.log(`Types generated at ${filePath}`);
    }
}
