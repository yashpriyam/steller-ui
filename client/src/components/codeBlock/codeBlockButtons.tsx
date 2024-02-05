import { useContext } from 'react';
import { CodeDataContext } from './CodeDataProvider';
import { useUserCode } from '../../redux/actions/userCodeActions';
import { useLocation } from 'react-router-dom';
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
}: {
  questionId: string;
  openWindows: [CodeBlockOpenWindowsType];
}) => {
  const dispatch = useDispatch();
  const { setCodeSubmittedLoading } = userCodeAction;
  const userCode = useSelector(selectUserCode);
  const { saveUserCode } = useUserCode();
  const location = useLocation();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
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

  const handleCodingBlockQuestionSubmit = async () => {
    dispatch(setCodeSubmittedLoading(true));
    const response = await saveUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
      code: { html, css, js },
      questionId: questionId,
    });
    dispatch(setCodeSubmittedLoading(false));

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
          userCode.isUserSubmittedCodeLoading ? t('submitting') : t('submit')
        }
        isDisabled={isSubmitButtonDisabled}
      />
    </div>
  );
};

export default CodeBlockButtons;
