import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig, RequestConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class ValidationsGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }
    generate() {
        const validationsDir = path.join(this.frontendGeneratorConfig.outputDir, 'validations');

        // Verifica se o diretório existe, caso contrário, cria-o
        if (!fs.existsSync(validationsDir)) {
            fs.mkdirSync(validationsDir, { recursive: true });
        }

        const validationContent = `
export const use${this.frontendGeneratorConfig.app}Validation = () => {
    const validate = (data: any): boolean => {
        // Adicione aqui a lógica de validação específica
        return true;
    };

    return {
        validate,
    };
};
`;

		this.writeFileSync(`components/${this.frontendGeneratorConfig.app}/Validation.ts`, validationContent);
    }
}
