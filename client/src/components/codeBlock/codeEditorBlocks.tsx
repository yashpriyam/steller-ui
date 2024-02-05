import React, { useContext, useEffect, useState } from "react";
import Editor from "./Editor";
import { CodeDataContext } from "./CodeDataProvider";
import { useLocation } from "react-router-dom";
import { codeBlockWindow } from "./codeBlockButtons";

const CODE_STORAGE_KEY = "userSavedCode";

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
  const dayNumber = queryParams.get("dayNumber");
  const weekNumber = queryParams.get("weekNumber");
  const {
    html = "",
    css = "",
    js = "",
    setHtml,
    setCss,
    setJs,
  } = useContext(CodeDataContext) as DataContextProps;
  const [selectedTab, setSelectedTab] = useState(0);

  const titleTopicMap: Record<string, string> = Object.freeze({
    HTML: "HTML",
    CSS: "CSS",
    JS: "JS",
  });
  const editorConfigs: { [key: string]: LanguageConfig } = {
    html: {
      language: "xml",
      heading: titleTopicMap.HTML,
      value: html,
      onChange: setHtml,
      icon: "/",
      color: "#FF3C41",
    },
    css: {
      language: "css",
      heading: titleTopicMap.CSS,
      value: css,
      onChange: setCss,
      icon: "*",
      color: "#0EBEFF",
    },
    js: {
      language: "javascript",
      heading: titleTopicMap.JS ,
      value: js,
      onChange: setJs,
      icon: "( )",
      color: "#FCD000",
    },
  };

  useEffect(() => {
    try {
      const localStorageSavedUserQuestionCode = JSON.parse(
        localStorage.getItem(CODE_STORAGE_KEY) || "{}"
      );
      const savedCode =
        localStorageSavedUserQuestionCode[`week${weekNumber}`]?.[
          `day${dayNumber}`
        ]?.[questionId];

      const getCodeWindowPredefinedCode = (title: string) =>
        String(findCodeWindowByTitle(openWindows, title)?.predefinedCode || "");

      setHtml(
        savedCode?.html ?? getCodeWindowPredefinedCode(codeBlockWindow.HTML)
      );
      setCss(
        savedCode?.css ?? getCodeWindowPredefinedCode(codeBlockWindow.CSS)
      );
      setJs(
        savedCode?.javascript ?? getCodeWindowPredefinedCode(codeBlockWindow.JS)
      );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const renderTabButton = (tabIndex: number, language: string) => (
    <button
      className={`${
        selectedTab === tabIndex
          ? "selected " + language.toLowerCase()
          : language.toLowerCase()
      }`}
      onClick={() => setSelectedTab(tabIndex)}
    >
      {language}
    </button>
  );
const renderTabButtonMap: Record<string, JSX.Element> = {
  HTML: renderTabButton(0,titleTopicMap.HTML),
  CSS: renderTabButton(1, titleTopicMap.CSS),
  JS: renderTabButton(2, titleTopicMap.JS),
};

  return (
    <div className="code-editor-blocks-container">
      <div className="code-blocks-tabs">
        {openWindows.map((tabMeta) => {
          const title = tabMeta.title;
          return renderTabButtonMap[title]
        })}
      </div>
      <Editor
        questionId={questionId}
        {...editorConfigs[Object.keys(editorConfigs)[selectedTab]]}
      />
    </div>
  );
};

export default CodeEditorBlocks;
