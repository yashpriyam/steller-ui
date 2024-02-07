import { useContext, useState } from 'react';
import { CodeDataContext } from './CodeDataProvider';
import { useUserCode } from '../../redux/actions/userCodeActions';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/button/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserCode,
  userCodeAction,
} from '../../redux/slices/userCode/userCodeSlice';

export const codeBlockWindow = {
  HTML: 'HTML',
  CSS: 'CSS',
  JS: 'JS',
};

const CodeBlockButtons = ({
  questionId,
  openWindows,
  weekNumber,
  dayNumber
}: {
  questionId: string;
  openWindows: [CodeBlockOpenWindowsType];
  weekNumber: number;
  dayNumber: number;
}) => {
  const dispatch = useDispatch();
  const { setCodeSubmittedLoading } = userCodeAction;
  const userCode = useSelector(selectUserCode);
  const { saveUserCode } = useUserCode();
  const { t } = useTranslation();
  const {
    html = '',
    css = '',
    js = '',
    setHtml,
    setCss,
    setJs,
  } = useContext(CodeDataContext) as DataContextProps;
  const isSubmitButtonDisabled = !(Boolean(html) || Boolean(css) || Boolean(js));
  const getPredefinedCode = (title: string) => {
    const openWindowBlock = openWindows.find(
      (element) => element.title === title
    );
    return openWindowBlock?.predefinedCode;
  };
  const [isCodeSubmittedCodeLoading,setIsCodeSubmittedLoading]=useState<boolean>(false);
  const handleCodingBlockQuestionSubmit = async () => {
    setCodeSubmittedLoading(true);
    const response = await saveUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
      code: { html, css, js },
      questionId: questionId,
    });
    setCodeSubmittedLoading(false);

    if (response?.data.saveUserCode.response.status === 200) {
      toast.success(t('solution_submitted_success_message'));
    } else {
      toast.error(t('solution_submit_error_message'));
    }
  };

  const handleCodeBlockReset = () => {
    const resetCodeBlock = window.confirm('Do you want to reset code?');
    if (!resetCodeBlock) {
      return;
    }
    try {
      const localStorageSavedUserQuestionCode = JSON.parse(
        localStorage.getItem('userSavedCode') ?? '{}'
      );
      localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`][
        questionId
      ] = {};
      localStorage.setItem(
        'userSavedCode',
        JSON.stringify(localStorageSavedUserQuestionCode)
      );
      setHtml(getPredefinedCode(codeBlockWindow.HTML) ?? '');
      setCss(getPredefinedCode(codeBlockWindow.CSS) ?? '');
      setJs(getPredefinedCode(codeBlockWindow.JS) ?? '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="code-block-buttons">
      <Button
        onClick={handleCodeBlockReset}
        className="reset-btn"
        text={t('reset')}
      />
      <Button
        onClick={handleCodingBlockQuestionSubmit}
        text={
          isCodeSubmittedCodeLoading ? t('submitting') : t('submit')
        }
        isDisabled={isSubmitButtonDisabled}
      />
    </div>
  );
};

export default CodeBlockButtons;
