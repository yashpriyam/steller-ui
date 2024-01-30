import React, { createContext, useState } from 'react';

export const CodeDataContext = createContext<null | DataContextProps>(null);

const CodeDataProvider: React.FC<CodeDataProviderProps> = ({ children }) => {
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');
  const [js, setJs] = useState<string>('');

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
