import React from 'react';
import CodeDataProvider from './CodeDataProvider';
import CodeResult from './codeResult';
import CodeEditorBlocks from './codeEditorBlocks';
import CodeBlockButtons from './codeBlockButtons';
import './codeBlock.scss';
import { useUserCode } from '../../redux/actions/userCodeActions';

const CodeBlock: React.FC<{ questionData: QuestionDataType }> = ({
  questionData,
}) => {
  console.log({questionData});
  const { options } = questionData;
  const { userCodeData } = useUserCode();
  const openWindows = options[0]?.codeBlock?.configuration?.openWindows;
  const questionId = questionData._id;
  const codeBlockSubmittedDate = userCodeData?.userCode?.find(
    (element) => element.questionId === questionId
  );
  const showOutputWindow =
    options[0]?.codeBlock?.configuration?.showOutputWindow;
  return (
    <CodeDataProvider>
      <div className="code-block-container">
        <CodeEditorBlocks openWindows={openWindows} questionId={questionId} />
        {showOutputWindow && <CodeResult />}
      </div>
      {codeBlockSubmittedDate && <p className="submitted-line">
        Last Submitted on:
        {new Date(Number(codeBlockSubmittedDate?.updatedAt)).toLocaleString()}
      </p>}
      <CodeBlockButtons openWindows={openWindows} questionId={questionId} />
    </CodeDataProvider>
  );
};

export default CodeBlock;
