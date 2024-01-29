import React from 'react';
import CodeDataProvider from './CodeDataProvider';
import CodeResult from './codeResult';
import CodeEditorBlocks from './codeEditorBlocks';
import CodeBlockButtons from './codeBlockButtons';
import './codeBlock.scss';

const CodeBlock: React.FC<{ questionData: QuestionDataType }> = ({
  questionData,
}) => {
  const { options } = questionData;
  const openWindows = options[0]?.codeBlock?.configuration?.openWindows;
  const questionId = questionData._id;

  const showOutputWindow =
    options[0]?.codeBlock?.configuration?.showOutputWindow;

  return (
    <CodeDataProvider>
      <div className="code-block-container">
        <CodeEditorBlocks openWindows={openWindows} questionId={questionId} />
        {showOutputWindow && <CodeResult />}
      </div>
      <CodeBlockButtons questionId={questionId} />
    </CodeDataProvider>
  );
};

export default CodeBlock;
