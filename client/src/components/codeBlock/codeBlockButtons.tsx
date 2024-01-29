import { useContext } from 'react';
import { CodeDataContext } from './CodeDataProvider';
import { useUserCode } from '../../redux/actions/userCodeActions';
import { useLocation } from 'react-router-dom';

const CodeBlockButtons = ({questionId}: {questionId: string}) => {
  const { saveUserCode } = useUserCode();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const {
    html = '',
    css = '',
    js = '',
  } = useContext(CodeDataContext) as DataContextProps;
  const handleCodingBlockQuestionSubmit = () => {
    saveUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
      code: { html, css, js },
      questionId: questionId
    });
  };

  return (
    <div className="code-block-buttons">
      <button className="reset-btn">Reset</button>
      <button onClick={handleCodingBlockQuestionSubmit}>Submit</button>
    </div>
  );
};

export default CodeBlockButtons;
