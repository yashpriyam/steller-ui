import React from 'react';
import CodeDataProvider from './CodeDataProvider';
import CodeResult from './codeResult';
import CodeEditorBlocks from './codeEditorBlocks';
import CodeBlockButtons from './codeBlockButtons';
import './codeBlock.scss';
import { useUserCode } from '../../redux/actions/userCodeActions';
import { useTranslation } from 'react-i18next';

const CodeBlock: React.FC<{ questionData: QuestionDataType }> = ({
  questionData,
}) => {
  const { t } = useTranslation();
  const weekNumber = questionData.meta.week;
  const dayNumber = questionData.meta.day;
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
        <CodeEditorBlocks
          openWindows={openWindows}
          questionId={questionId}
          weekNumber={weekNumber}
          dayNumber={dayNumber}
        />
        {showOutputWindow && <CodeResult />}
      </div>
      {codeBlockSubmittedDate && (
        <p className="submitted-line">
          {t('last_submitted_on')}
          {new Date(Number(codeBlockSubmittedDate?.updatedAt)).toLocaleString()}
        </p>
      )}
      <CodeBlockButtons
        openWindows={openWindows}
        questionId={questionId}
        weekNumber={weekNumber}
        dayNumber={dayNumber}
      />
    </CodeDataProvider>
  );
};

export default CodeBlock;
