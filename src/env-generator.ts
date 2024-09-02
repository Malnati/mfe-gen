// src/env-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, DbReaderConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class EnvGenerator extends BaseGenerator implements IGenerator {
    private envFiles = {
        development: ".env.development",
        production: ".env.production",
        stage: ".env.stage"
    };

    private envConfig = {
        VITE_DEV: "true",
        VITE_ENV: "dev",
        VITE_API_URL: "https://domain/context",
        VITE_GS_LEADS_API_URL: "https://domain/context",
        VITE_LEADS_API_URL: "https://domain/context",
        VITE_WEBHOOK_URL: "https://domain/context",
        VITE_CUSTOMERS_URL: "https://domain/context",
        VITE_API_KEY: "XYZ",
        VITE_AUTH_DOMAIN: "XYZ.firebaseapp.com",
        VITE_DATABASE_URL: "https://domain/context",
        VITE_PROJECT_ID: "XYZ",
        VITE_STORAGE_BUCKET: "XYZ.appspot.com",
        VITE_MESSAGING_SENDER_ID: "XYZ",
        VITE_APP_ID: "XYZ",
        VITE_API_FIREBASE: "gs://XYZ.appspot.com",
        VITE_IUGU_ACCOUNT_ID: "XYZ",
        VITE_IUGU_TEST_MODE: "true",
        VITE_VERSION: "DEV",
        VITE_FACEBOOK_APP_ID: "XYZ",
        VITE_QUEUE_FILE_MAXIMUM_SIZE: "50",
        VITE_GOOGLE_MAPS_EMBEDED_API_KEY: "XYZ",
        VITE_QUEUE_FILE_ACCEPTED: "application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed,text/csv",
        VITE_QUEUE_CERTIFICATE_FILE_ACCEPTED: "application/x-pkcs12,application/pkcs12",
        VITE_QUEUE_CERTIFICATE_FILE_ACCEPTED_EXTENSIONS: ".pfx,.p12",
        VITE_CUSTOMERS_QUEUE_FILE_ACCEPTED: "text/csv",
        VITE_MERCURE_URL: "https://domain/context",
        VITE_MERCURE_TOKEN: "XYZ",
        VITE_ACCESS_TOKEN_MAP_BOX: "XYZ",
        VITE_CALENDLY_TOKEN: "XYZ",
        VITE_RECAPTCHA_KEY: "XYZ",
        VITE_BIUD_TAG_URL: "https://domain/context"
    };

    generate() {
        for (const [env, fileName] of Object.entries(this.envFiles)) {
            this.generateEnvFile(env, fileName);
        }
    }

    private generateEnvFile(env: string, fileName: string) {
        const envContent = Object.entries(this.envConfig)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        const filePath = path.join(this.config.outputDir, fileName);

        try {
            fs.writeFileSync(filePath, envContent);
            console.log(`${fileName} file has been generated in ${this.config.outputDir}`);
        } catch (error) {
            console.error(`Error writing ${fileName}: ${error}`);
        }
    }
}
