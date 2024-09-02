import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, RequestConfig, FrontendGeneratorConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class ServiceGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
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

		this.writeFileSync(`services/${this.frontendConfig.app}Service.ts`, serviceContent);
    }
}
