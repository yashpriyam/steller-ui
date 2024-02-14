import CodeBlock from "../codeBlock/codeBlock";
import { Select } from "../../components/select/select";
import "./openWindow.scss";
import Editor from "../Editor/editor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  // const { createQuestion } = useSelector((state): any => state);
  // console.log({ ...createQuestion });
  const { updateState } = createQuestionActions;
  // const [selectedTab, setSelectedTab] = useState<number>(0);
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
     console.log("html");
    const path = `${prevPath}.predefinedCode`;
    dispatch(updateState({ path, value }))
    setHtml(value);
  };
  const handleOnSetCss = (value: string) => {
     console.log("css");
     const path = `${prevPath}.predefinedCode`;
    dispatch(updateState({ path, value }));
    setCss(value);
  };
  const handleOnSetJs = (value: string) => {
     console.log("js");
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
    HTML:0,
    CSS:1,
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
      <Select
        className="create-question-select"
        defaultSelected="Title"
        data={title}
        isRequired
        onSelect={handleOnSelectTopic}
      ></Select>
      <Select
        className="create-question-select"
        defaultSelected="Editable status"
        data={bool}
        isRequired
        onSelect={handleEditableStatus}
      ></Select>
      <Select
        className="create-question-select"
        defaultSelected="Enable User Selection"
        data={bool}
        isRequired
        onSelect={handleUserSelection}
      ></Select>
      {selectedTitle && (
        <Editor {...editorConfigs[Object.keys(editorConfigs)[renderTabButtonMap[selectedTitle]]]} />
      )}
    </div>
  );
};
