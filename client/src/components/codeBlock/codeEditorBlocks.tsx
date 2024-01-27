import React, { useContext } from 'react';
import Editor from './Editor'; // Adjust the import path if necessary
import { CodeDataContext } from './CodeDataProvider';

interface LanguageConfig {
  language: string;
  heading: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  icon: string;
  color: string;
}

const CodeEditorBlocks: React.FC = () => {
  const { html = "", css = "", js = "", setHtml, setCss, setJs } = useContext(
    CodeDataContext
  ) as DataContextProps;

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
    }
  ];

  return (
    <div className='code-editor-blocks-container'>
      {editorConfigs.map((config, index) => (
        <Editor key={index} {...config} />
      ))}
    </div>
  );
};

export default CodeEditorBlocks;
