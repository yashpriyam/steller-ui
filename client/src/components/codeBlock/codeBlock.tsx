import React from 'react';
import CodeDataProvider from './CodeDataProvider'; // Adjust the import path if necessary
import CodeResult from './codeResult'; // Adjust the import path if necessary
import CodeEditorBlocks from './codeEditorBlocks';
import "./codeBlock.scss";

const CodeBlock: React.FC = () => {
  return (
    <div className="code-block-container">
      <CodeDataProvider>
        <CodeEditorBlocks />
        <CodeResult />
      </CodeDataProvider>
    </div>
  );
};

export default CodeBlock;
