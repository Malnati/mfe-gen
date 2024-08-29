
// src/package-json-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, DbReaderConfig } from "./interfaces";
import { BaseGenerator } from "./base-generator";

export class PackageJsonGenerator extends BaseGenerator implements IGenerator {
    generate() {
        const packageJsonContent = {
            name: `@platform/${this.config.app}`,
            scripts: {
                start: "webpack serve",
                "start:standalone": "webpack serve --env standalone",
                build: "concurrently pnpm:build:*",
                "build:webpack": "webpack --mode=production",
                analyze: "webpack --mode=production --env analyze",
                lint: "eslint src --ext js,ts,tsx",
                format: "prettier --write .",
                "check-format": "prettier --check .",
                test: "cross-env BABEL_ENV=test jest",
                "watch-tests": "cross-env BABEL_ENV=test jest --watch",
                prepare: "husky install",
                coverage: "cross-env BABEL_ENV=test jest --coverage",
                "build:types": "tsc"
            },
            devDependencies: {
                "@babel/core": "^7.23.3",
                "@babel/eslint-parser": "^7.23.3",
                "@babel/plugin-transform-runtime": "^7.23.3",
                "@babel/preset-env": "^7.23.3",
                "@babel/preset-react": "^7.23.3",
                "@babel/preset-typescript": "^7.23.3",
                "@babel/runtime": "^7.23.3",
                "@testing-library/jest-dom": "^5.17.0",
                "@testing-library/react": "^12.0.0",
                "@types/jest": "^29.5.12",
                "@types/node": "^22.2.0",
                "@types/react": "^18.3.3",
                "@types/react-dom": "^18.3.0",
                "@types/react-google-recaptcha": "^2.1.9",
                "@types/react-input-mask": "^3.0.5",
                "@types/react-redux": "7.1.25",
                "@types/react-router-dom": "5.3.3",
                "@types/systemjs": "^6.13.5",
                "@types/webpack-env": "^1.18.5",
                "babel-jest": "^27.5.1",
                concurrently: "^6.2.1",
                "cross-env": "^7.0.3",
                "css-loader": "^7.1.2",
                eslint: "^7.32.0",
                "eslint-config-prettier": "^8.3.0",
                "eslint-config-ts-react-important-stuff": "^3.0.0",
                "eslint-plugin-prettier": "^3.4.1",
                husky: "^7.0.2",
                "identity-obj-proxy": "^3.0.0",
                jest: "^27.5.1",
                "jest-cli": "^27.5.1",
                prettier: "^2.3.2",
                "pretty-quick": "^3.1.1",
                "react-google-recaptcha": "^3.1.0",
                sass: "^1.77.8",
                "sass-loader": "^16.0.0",
                "style-loader": "^4.0.0",
                "ts-config-single-spa": "^3.0.0",
                typescript: "^4.3.5",
                webpack: "^5.89.0",
                "webpack-cli": "^4.10.0",
                "webpack-config-single-spa-react": "^4.0.0",
                "webpack-config-single-spa-react-ts": "^4.0.0",
                "webpack-config-single-spa-ts": "^4.0.0",
                "webpack-dev-server": "^4.0.0",
                "webpack-merge": "^5.8.0"
            },
            dependencies: {
                dotenv: "^16.4.5",
                "file-loader": "^6.2.0",
                "node-polyfill-webpack-plugin": "^4.0.0",
                react: "^18.3.1",
                "react-dom": "^18.3.1",
                "react-input-mask": "^2.0.4",
                "react-player": "2.11.0",
                "react-redux": "7.2.9",
                "react-router-dom": "5.3.4",
                "single-spa": "^5.9.3",
                "single-spa-react": "^4.3.1"
            },
            types: `dist/${this.config.app}.d.ts`
        };

        const buildDir = this.config.outputDir;

        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }

        const filePath = path.join(buildDir, 'package.json');

        try {
            fs.writeFileSync(filePath, JSON.stringify(packageJsonContent, null, 2));
            console.log(`package.json has been generated at ${filePath}`);
        } catch (error) {
            console.error(`Error writing package.json file: ${error}`);
        }
    }
}
