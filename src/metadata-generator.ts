// src/metadata-generator.ts

import axios from 'axios';
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
            const request = {
                method: this.requestConfig.method,
                url: this.requestConfig.url,
                headers: this.requestConfig.headers,
                data: this.requestConfig.body,
            }
            const response = await axios(request);
            const metadata = {
                request,
                response: {
                    status: response.status,
                    headers: response.headers,
                    data: response.data,
                },
            };

            this.writeFileSync('request-response-metadata.json', JSON.stringify(metadata, null, 2));
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error.response) {
            // A request was made and the server responded with a status code that falls out of the range of 2xx
            console.error(`Server responded with status ${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error in request setup:', error.message);
        }
        console.error('Failed to generate metadata:', error.config);
    }
}
