import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, RequestConfig, FrontendGeneratorConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class ServiceGenerator extends BaseGenerator implements IGenerator {
    private requestConfig: RequestConfig;
    private frontendConfig: FrontendGeneratorConfig;

    constructor(config: FrontendGeneratorConfig & { requestConfig: RequestConfig }) {
        super(config); // Passando o objeto `config` para a classe base
        this.frontendConfig = config;
        this.requestConfig = config.requestConfig;
    }

    generate() {
        const serviceContent = `
import axios from "axios";

export const use${this.frontendConfig.app}Service = () => {
  const request = async (data: any): Promise<any> => {
    try {
      const response = await axios.${this.requestConfig.method.toLowerCase()}(
        \`\${process.env.API_BASE_URL || ''}${new URL(this.requestConfig.url).pathname}\`,
        data,
        {
          headers: {
            ${Object.entries(this.requestConfig.headers)
              .map(([key, value]) => `${key}: \`${value}\``)
              .join(",\n          ")}
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      return { error: "Erro ao realizar a requisição" };
    }
  };

  return {
    request,
  };
};
`;

        const filePath = path.join(this.frontendConfig.outputDir, `services/${this.frontendConfig.app}Service.ts`);
        fs.writeFileSync(filePath, serviceContent);
        console.log(`Service generated at ${filePath}`);
    }
}
