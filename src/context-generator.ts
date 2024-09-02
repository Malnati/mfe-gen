// src/context-generator.ts

import { IGenerator, FrontendGeneratorConfig, RequestConfig } from './interfaces';
import { BaseGenerator } from './base-generator';

export class ContextGenerator extends BaseGenerator implements IGenerator {
    private frontendConfig: FrontendGeneratorConfig;
    private requestConfig: RequestConfig;

    constructor(requestConfig: RequestConfig, frontendConfig: FrontendGeneratorConfig) {
        super(frontendConfig);
        this.requestConfig = requestConfig;
        this.frontendConfig = frontendConfig;
    }

    generate() {
        const contextName = this.frontendConfig.app;
        const serviceName = `use${this.capitalizeFirstLetter(this.requestConfig.method)}${this.capitalizeEndpoint(this.requestConfig.url)}Service`;
        const metadata = this.loadMetadata();
		const responseType = this.generateResponseType(metadata);
        const contextContent = `
import React, { createContext, useContext, useState, useEffect } from "react";
import { ${serviceName} } from "../services/${serviceName}";

// Definir interfaces para o contexto
interface ${contextName}ContextProps {
  state: ${responseType};
  setState: React.Dispatch<React.SetStateAction<any>>;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const initialState = {}; // Defina o estado inicial conforme necessário

const ${contextName}Context = createContext<${contextName}ContextProps | undefined>(undefined);

export const ${contextName}Provider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const { ${this.requestConfig.method.toLowerCase()}${this.capitalizeEndpoint(this.requestConfig.url)} } = ${serviceName}();

  useEffect(() => {
    const fetchData = async () => {
      const result = await ${this.requestConfig.method.toLowerCase()}${this.capitalizeEndpoint(this.requestConfig.url)}(null);
      setState(result);
    };

    fetchData();
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    state,
    setState,
    token,
    login,
    logout,
  };

  return (
    <${contextName}Context.Provider value={value}>{children}</${contextName}Context.Provider>
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

		this.writeFileSync(`components/${this.frontendGeneratorConfig.app}/${contextName}Context.tsx`, contextContent);
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    private capitalizeEndpoint(url: string) {
        const path = new URL(url).pathname.replace(/[^a-zA-Z0-9]/g, '');
        return this.capitalizeFirstLetter(path);
    }
}
