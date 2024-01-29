import React, { useContext, useEffect, useState } from 'react';
import Editor from './Editor';
import { CodeDataContext } from './CodeDataProvider';
import { useLocation } from 'react-router-dom';

interface LanguageConfig {
  language: string;
  heading: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  icon: string;
  color: string;
}

const CodeEditorBlocks: React.FC<{
  openWindows: [CodeBlockOpenWindowsType];
  questionId: string;
}> = ({ openWindows, questionId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const htmlCode = openWindows.find((element) => element.title === 'HTML');
  const cssCode = openWindows.find((element) => element.title === 'CSS');
  const jsCode = openWindows.find((element) => element.title === 'JS');
  console.log(htmlCode);
  const {
    html = '',
    css = '',
    js = '',
    setHtml,
    setCss,
    setJs,
  } = useContext(CodeDataContext) as DataContextProps;
  const [selectedTab, setSelectedTab] = useState(0);

  const editorConfigs: LanguageConfig[] = [
    {
      language: 'xml',
      heading: 'HTML',
      value: html,
      onChange: setHtml,
      icon: '/',
      color: '#FF3C41',
    },
    {
      language: 'css',
      heading: 'CSS',
      value: css,
      onChange: setCss,
      icon: '*',
      color: '#0EBEFF',
    },
    {
      language: 'javascript',
      heading: 'JS',
      value: js,
      onChange: setJs,
      icon: '( )',
      color: '#FCD000',
    },
  ];

  useEffect(() => {
    const localStorageSavedUserQuestionCode = JSON.parse(
      localStorage.getItem('userSavedCode') ?? '{}'
    );
    const savedCode =
      localStorageSavedUserQuestionCode[`week${weekNumber}`]?.[
        `day${dayNumber}`
      ]?.[questionId];
    setHtml(savedCode?.html ?? String(htmlCode?.predefinedCode ?? ''));
    setCss(savedCode?.css ?? String(cssCode?.predefinedCode ?? ''));
    setJs(savedCode?.js ?? String(jsCode?.predefinedCode ?? ''));
  }, []);

  return (
    <div className="code-editor-blocks-container">
      <div className="code-blocks-tabs">
        <button
          className={`${selectedTab === 0 ? 'selected html' : 'html'}`}
          onClick={() => setSelectedTab(0)}
        >
          HTML
        </button>
        <button
          className={`${selectedTab === 1 ? 'selected css' : 'css'}`}
          onClick={() => setSelectedTab(1)}
        >
          CSS
        </button>
        <button
          className={`${selectedTab === 2 ? 'selected js' : 'js'}`}
          onClick={() => setSelectedTab(2)}
        >
          JS
        </button>
      </div>
      <Editor questionId={questionId} {...editorConfigs[selectedTab]} />
    </div>
  );
};

export default CodeEditorBlocks;
