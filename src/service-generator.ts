// src/service-generator.ts

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
        const serviceName = `use${this.capitalizeFirstLetter(this.requestConfig.method)}${this.capitalizeEndpoint(this.requestConfig.url)}Service`;
        const functionName = `${this.requestConfig.method.toLowerCase()}${this.capitalizeEndpoint(this.requestConfig.url)}`;

        const serviceContent = `
import axios from "axios";

export const ${serviceName} = () => {
  const ${functionName} = async (data: any): Promise<any> => {
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
    ${functionName},
  };
};

`;

        this.writeFileSync(`services/${serviceName}.ts`, serviceContent);
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    private capitalizeEndpoint(url: string) {
        const path = new URL(url).pathname.replace(/[^a-zA-Z0-9]/g, '');
        return this.capitalizeFirstLetter(path);
    }
}
