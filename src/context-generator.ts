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
        const contextContent = `
import React, { createContext, useContext, useState, useEffect } from "react";

// Definir interfaces para o contexto
interface ${contextName}ContextProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  fetchData: () => Promise<void>;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const initialState = {}; // Defina o estado inicial conforme necessário

const ${contextName}Context = createContext<${contextName}ContextProps | undefined>(undefined);

export const ${contextName}Provider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const apiUrl = process.env.VITE_API_URL || "${this.requestConfig.url}";
  const apiKey = process.env.VITE_API_KEY || "";

  useEffect(() => {
    // Carregar variáveis de ambiente e metadados
    loadConfig();
  }, []);

  const loadConfig = () => {
    // Carregar variáveis de ambiente
    // Carregar metadados de request/response e armazená-los no state
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Authorization": \`Bearer \${token}\`,
          "API-Key": apiKey,
        },
      });
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

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
    fetchData,
    token,
    login,
    logout,
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
    throw new Error(\`use${contextName}Context deve ser usado dentro de um ${contextName}Provider\`);
  }
  return context;
};
`;
		this.writeFileSync(`contexts/${contextName}Context.tsx`, contextContent);
    }
}
