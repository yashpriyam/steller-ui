import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface DataContextProps {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;
  css: string;
  setCss: Dispatch<SetStateAction<string>>;
  js: string;
  setJs: Dispatch<SetStateAction<string>>;
}

export const CodeDataContext = createContext<null | DataContextProps>(null);

interface CodeDataProviderProps {
  children: ReactNode;
}

const CodeDataProvider: React.FC<CodeDataProviderProps> = ({ children }) => {
  const [html, setHtml] = useState<string>('');
  const [js, setJs] = useState<string>('');
  const [css, setCss] = useState<string>('');

  return (
    <CodeDataContext.Provider
      value={{
        html,
        setHtml,
        css,
        setCss,
        js,
        setJs,
      }}
    >
      {children}
    </CodeDataContext.Provider>
  );
};

export default CodeDataProvider;
