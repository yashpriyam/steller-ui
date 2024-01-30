import { FC } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useLocation } from 'react-router-dom';

const Editor: FC<EditorProps> = ({ language, value, onChange, questionId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const handleChange = (editor: undefined, data: undefined, value: string) => {
    onChange(value)
    const localStorageSavedUserQuestionCode = JSON.parse(localStorage.getItem('userSavedCode') ?? '{}');

    // Ensure the necessary structure exists
    if (!localStorageSavedUserQuestionCode[`week${weekNumber}`]) {
      localStorageSavedUserQuestionCode[`week${weekNumber}`] = {};
    }
    
    if (!localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`]) {
      localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`] = {};
    }

    const questionIdLocalStorageSavedData = localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`][questionId];
    
    // Update the values
    localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`][questionId] = { ...questionIdLocalStorageSavedData, [language === "xml" ? "html" : language]: value };
    
    // Save the updated data back to localStorage
    localStorage.setItem('userSavedCode', JSON.stringify(localStorageSavedUserQuestionCode));
  };

  return (
    <div className="code-editor-container">
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="controlled-editor"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: 'material',
        }}
      />
    </div>
  );
};

export default Editor;
