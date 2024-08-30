// src/metadata-generator.ts

import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import { BaseGenerator } from './base-generator';
import { FrontendGeneratorConfig, IGenerator, RequestConfig } from './interfaces';

export class MetadataGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
	private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.frontendConfig = frontendConfig;
		this.requestConfig = requestConfig;
    }


  async generate() {
    try {
      const response = await axios({
        method: this.requestConfig.method,
        url: this.requestConfig.url,
        headers: this.requestConfig.headers,
        data: this.requestConfig.body,
      });

      const metadata = {
        request: {
          method: this.requestConfig.method,
          url: this.requestConfig.url,
          headers: this.requestConfig.headers,
          data: this.requestConfig.body,
        },
        response: {
          status: response.status,
          headers: response.headers,
          data: response.data,
        },
      };

      const metadataPath = path.join(this.frontendConfig.outputDir, 'request-response-metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`Metadata generated at ${metadataPath}`);
    } catch (error) {
      console.error('Failed to generate metadata:', error);
    }
  }
}
