import React, { useContext, useEffect, useState } from 'react';
import Editor from './Editor';
import { CodeDataContext } from './CodeDataProvider';
import { useLocation } from 'react-router-dom';
import { codeBlockWindow } from './codeBlockButtons';

const CODE_STORAGE_KEY = 'userSavedCode';

const findCodeWindowByTitle = (
  openWindows: [CodeBlockOpenWindowsType],
  title: string
) => openWindows.find((element) => element.title === title);

const CodeEditorBlocks: React.FC<{
  openWindows: [CodeBlockOpenWindowsType];
  questionId: string;
}> = ({ openWindows, questionId }) => {
  const location = useLocation();
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
  const [selectedTab, setSelectedTab] = useState(0);

  const editorConfigs: { [key: string]: LanguageConfig } = {
    html: {
      language: 'xml',
      heading: 'HTML',
      value: html,
      onChange: setHtml,
      icon: '/',
      color: '#FF3C41',
    },
    css: {
      language: 'css',
      heading: 'CSS',
      value: css,
      onChange: setCss,
      icon: '*',
      color: '#0EBEFF',
    },
    js: {
      language: 'javascript',
      heading: 'JS',
      value: js,
      onChange: setJs,
      icon: '( )',
      color: '#FCD000',
    },
  };

  useEffect(() => {
    try {
      const localStorageSavedUserQuestionCode = JSON.parse(
        localStorage.getItem(CODE_STORAGE_KEY) || '{}'
      );
      const savedCode =
        localStorageSavedUserQuestionCode[`week${weekNumber}`]?.[
          `day${dayNumber}`
        ]?.[questionId];

      const getCodeWindowPredefinedCode = (title: string) =>
        String(findCodeWindowByTitle(openWindows, title)?.predefinedCode || '');

      setHtml(savedCode?.html ?? getCodeWindowPredefinedCode(codeBlockWindow.HTML));
      setCss(savedCode?.css ?? getCodeWindowPredefinedCode(codeBlockWindow.CSS));
      setJs(savedCode?.javascript ?? getCodeWindowPredefinedCode(codeBlockWindow.JS));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const renderTabButton = (tabIndex: number, language: string) => (
    <button
      className={`${
        selectedTab === tabIndex
          ? 'selected ' + language.toLowerCase()
          : language.toLowerCase()
      }`}
      onClick={() => setSelectedTab(tabIndex)}
    >
      {language}
    </button>
  );

  return (
    <div className="code-editor-blocks-container">
      <div className="code-blocks-tabs">
        {renderTabButton(0, 'HTML')}
        {renderTabButton(1, 'CSS')}
        {renderTabButton(2, 'JS')}
      </div>
      <Editor
        questionId={questionId}
        {...editorConfigs[Object.keys(editorConfigs)[selectedTab]]}
      />
    </div>
  );
};

export default CodeEditorBlocks;
