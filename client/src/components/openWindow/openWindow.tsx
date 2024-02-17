import { Select } from "../../components/select/select";
import "./openWindow.scss";
import Editor from "../Editor/editor";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
export const OpenWindow: React.FC<{ prevPath?: string }> = ({ prevPath }) => {
  const bool = [
    {
      text: "true",
      value: "true",
    },
    {
      text: "false",
      value: "false",
    },
  ];
  const title = [
    {
      text: "HTML",
      value: "HTML",
    },
    { text: "CSS", value: "CSS" },
    { text: "JS", value: "JS" },
  ];
  const dispatch = useDispatch();
  const { updateState } = createQuestionActions;
  const [selectedTitle, SetSelectedTitle] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const titleTopicMap: Record<string, string> = Object.freeze({
    HTML: "HTML",
    CSS: "CSS",
    JS: "JS",
  });
  const handleOnSetHtml = (value: string) => {
    const path = `${prevPath}.predefinedCode`;
    dispatch(updateState({ path, value }));
    setHtml(value);
  };
  const handleOnSetCss = (value: string) => {
    const path = `${prevPath}.predefinedCode`;
    dispatch(updateState({ path, value }));
    setCss(value);
  };
  const handleOnSetJs = (value: string) => {
    const path = `${prevPath}.predefinedCode`;
    dispatch(updateState({ path, value }));
    setJs(value);
  };
  const editorConfigs: { [key: string]: LanguageConfig } = {
    html: {
      language: "xml",
      heading: titleTopicMap.HTML,
      value: html,
      onChange: handleOnSetHtml,
      icon: "/",
      color: "#FF3C41",
    },
    css: {
      language: "css",
      heading: titleTopicMap.CSS,
      value: css,
      onChange: handleOnSetCss,
      icon: "*",
      color: "#0EBEFF",
    },
    js: {
      language: "javascript",
      heading: titleTopicMap.JS,
      value: js,
      onChange: handleOnSetJs,
      icon: "( )",
      color: "#FCD000",
    },
  };
  const renderTabButtonMap: Record<string, any> = {
    HTML: 0,
    CSS: 1,
    JS: 2,
  };
  const handleOnSelectTopic = (option: SelectOptionType) => {
    const value = option.value;
    const path = `${prevPath}.title`;
    dispatch(updateState({ path, value }));
    SetSelectedTitle(value);
  };
  const handleEditableStatus = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `${prevPath}.isEditable`;
    dispatch(updateState({ path, value }));
  };
  const handleUserSelection = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `${prevPath}.enableUserSelection`;
    dispatch(updateState({ path, value }));
  };
  return (
    <div className="open-window-container">
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Title :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Title"
          data={title}
          isRequired
          onSelect={handleOnSelectTopic}
        ></Select>
      </div>
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Editable status :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Editable status"
          data={bool}
          isRequired
          onSelect={handleEditableStatus}
        ></Select>
      </div>
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          User Selection status :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Enable User Selection"
          data={bool}
          isRequired
          onSelect={handleUserSelection}
        ></Select>
      </div>
      {selectedTitle && (
        <Editor
          {...editorConfigs[
            Object.keys(editorConfigs)[renderTabButtonMap[selectedTitle]]
          ]}
        />
      )}
    </div>
  );
};
