import React, { FC, Dispatch, SetStateAction } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as CodeMirror } from 'react-codemirror2';

interface EditorProps {
  heading: string;
  language: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  icon: string;
  color: string;
}

const Editor: FC<EditorProps> = ({
  heading,
  language,
  value,
  onChange,
  icon,
  color,
}) => {
  const handleChange = (editor: any, data: any, value: string) => {
    onChange(value);
  };

  return (
    <div className='code-editor-container'>
    <h2 className={`editor-heading ${language}`}>{heading}</h2>
      <CodeMirror
        onBeforeChange={handleChange}
        value={value}
        className="controlled-editor"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language, // Adjusted to use the specified language
          lineNumbers: true,
          theme: 'material',
        }}
      />
    </div>
  );
};

export default Editor;
