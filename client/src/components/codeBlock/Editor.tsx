import React, { FC, Dispatch, SetStateAction, useContext, useEffect } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useLocation } from 'react-router-dom';
import { CodeDataContext } from './CodeDataProvider';

interface EditorProps {
  heading: string;
  language: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  icon: string;
  color: string;
  questionId: string;
}

const Editor: FC<EditorProps> = ({ language, value, onChange, questionId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const {
    html = '',
    css = '',
    js = '',
  } = useContext(CodeDataContext) as DataContextProps;
  const handleChange = (editor: any, data: any, value: string) => {
    console.log(value)
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
    
    // Log the updated data
    console.log(localStorageSavedUserQuestionCode);
    
    // Save the updated data back to localStorage
    localStorage.setItem('userSavedCode', JSON.stringify(localStorageSavedUserQuestionCode));
    // console.log(value)
  };

  // useEffect(() => {
   
  // }, [html, css, js]);

  // useEffect(() => {
  //   console.log('run after this');
  //   const localStorageSavedUserQuestionCode = JSON.parse(localStorage.getItem('userSavedCode') ?? '{}');
  //   console.log(localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`].html)
  //   // setHtml(String(htmlCode?.predefinedCode ?? ""));
  //   // setCss(String(cssCode?.predefinedCode ?? ""));
  //   // setJs(String(jsCode?.predefinedCode ?? ""));
  // console.log(localStorageSavedUserQuestionCode[`week${weekNumber}`][`day${dayNumber}`])
  // }, []);

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
