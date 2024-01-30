import { useContext } from 'react';
import { CodeDataContext } from './CodeDataProvider';
import { useUserCode } from '../../redux/actions/userCodeActions';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const CodeBlockButtons = ({ questionId }: { questionId: string }) => {
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
  } = useContext(CodeDataContext) as DataContextProps;
  const handleCodingBlockQuestionSubmit = async () => {
    const response = await saveUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
      code: { html, css, js },
      questionId: questionId,
    });

    if (response?.data.saveUserCode.response.status === 200) {
      toast.success(t('solution_submitted_success_message'));
    }else{
      toast.error(t('solution_submit_error_message'));
    }
  };

  return (
    <div className="code-block-buttons">
      {/* <button className="reset-btn">Reset</button> */}
      <button onClick={handleCodingBlockQuestionSubmit}>Submit</button>
    </div>
  );
};

export default CodeBlockButtons;
