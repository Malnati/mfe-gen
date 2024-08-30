// src/context-generator.ts

import * as fs from 'fs';
import * as path from 'path';
import { IGenerator, FrontendGeneratorConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class ContextGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;

    constructor(config: FrontendGeneratorConfig) {
        super(config);
        this.frontendConfig = config;
    }

    generate() {
        const contextName = this.frontendConfig.app;
        const contextContent = `
import React, { createContext, useContext, useState } from "react";

interface ${contextName}ContextProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const initialState = {}; // Defina o estado inicial conforme necessário

const ${contextName}Context = createContext<${contextName}ContextProps | undefined>(undefined);

export const ${contextName}Provider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const value = {
    state,
    setState,
  };

  return (
    <${contextName}Context.Provider value={value}>
      {children}
    </${contextName}Context.Provider>
  );
};

export const use${contextName}Context = () => {
  const context = useContext(${contextName}Context);
  if (!context) {
    throw new Error(
      \`use${contextName}Context deve ser usado dentro de um ${contextName}Provider\`,
    );
  }
  return context;
};
`;

        // Ajuste para garantir a extensão correta do arquivo
        const filePath = path.join(this.frontendConfig.outputDir, `contexts/${contextName}Context.tsx`);

        // Cria o diretório se não existir
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Escreve o conteúdo no arquivo
        fs.writeFileSync(filePath, contextContent);
        console.log(`Context generated at ${filePath}`);
    }
}
