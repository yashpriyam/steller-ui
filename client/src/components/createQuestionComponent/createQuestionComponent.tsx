import { Select } from "../../components/select/select";
import { InputComponent } from "../../components/input/inputComponent";
import "./createQuestionComponent.scss";
import React, { useState } from "react";
import Accordion from "../accordion/accordion";
import { Options } from "../options/options";
import { CloseCrossIcon, AddIcon } from "../../icons/index";

export const CreateQuestionComponent: React.FC<
  CreateQuestionComponentProps
> = ({ onClose }) => {
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
  const type = [
    {
      text: "timed",
      value: "timed",
    },
    {
      text: "recorded",
      value: "recorded",
    },
  ];
  const questionType = [
    { text: "single", value: "single" },
    {
      text: "multi",
      value: "multi",
    },
    { text: "fillup", value: "fillup" },
    { text: "codeblock", value: "codeblock" },
  ];
  const [count, setCount] = useState({
    titleCount: 1,
    answerCount: 1,
    optionsCount:1
  });
  const [questionData, setQuestionData] = useState({
    meta: {},
    answer: [{}],
    options: [{}],
    title: [{}],
    marks: 1,
    questionType:""
  })
  const setBatchCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const batchCode = e.target.value;
  };
  const setDayNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;
  };
  const setWeekNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const week = e.target.value;
  };
  const setTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topic = e.target.value;
  };
  const setExpiresTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expiresTime = e.target.value;
  };
  const setType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
  };
  const setIsActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isActive = Number(e.target.value) ;
  };
  const setIsArchived = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isArchive = Boolean(Number(e.target.value));
  };
  const setIsOpenable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const openStatus=Boolean(Number(e.target.value))
  };
  
  
  const optionsList: JSX.Element[] = [];
  const titleList: JSX.Element[] = [];
  const answerList: JSX.Element[] = [];
  
    for (let index = 0; index < count.optionsCount; index++) {
      optionsList.push(<Options onChange={setQuestionData } />);
  }
   for (let index = 0; index < count.titleCount; index++) {
     titleList.push(<Options />);
   } for (let index = 0; index < count.answerCount; index++) {
     answerList.push(<Options />);
   }
  const handleOnAddTitleClick = () => {
    setCount({ ...count,titleCount:count.titleCount+1 });
  }
  const handleOnAddAnswerClick = () => {
    setCount({ ...count, answerCount: count.answerCount + 1 });
  };
  const handleOnAddOptionsClick = () => {
    setCount({ ...count, optionsCount: count.optionsCount + 1 });
  };
  return (
    <div className="create-question-component-wrapper">
      <div className="close-button" onClick={onClose}>
        <CloseCrossIcon />
      </div>
      <h1 className="create-question-component-header">Add Question</h1>
      <h3>Meta</h3>
      <div className="question-meta-container">
        <InputComponent
          className="create-question-input"
          type="text"
          onChange={() => {}}
          placeholder="Batch Code"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Day Number"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Week Number"
        />
        <InputComponent
          className="create-question-input"
          type="text"
          onChange={() => {}}
          placeholder="Topic"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          onChange={() => {}}
          placeholder="Expires Time"
        />
        <Select
          className="create-question-select"
          defaultSelected="Select Active"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select Archived"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select Openable"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select type"
          data={type}
          isRequired
          onSelect={() => {}}
        ></Select>
      </div>
      <InputComponent
        className="create-question-input"
        type="number"
        onChange={() => {}}
        placeholder="Marks"
        disabled={false}
      />
      <Select
        className="create-question-select"
        defaultSelected="Question type"
        data={questionType}
        isRequired
        onSelect={() => {}}
      ></Select>
      <Accordion title={"Title"} className="accordian-container">
        {titleList.map((title) => {
          return title;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddTitleClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <Accordion title={"Options"} className="accordian-container">
        {optionsList.map((option) => {
          return option;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddOptionsClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <Accordion title={"Answer"} className="accordian-container">
        {answerList.map((answer) => {
          return answer;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddAnswerClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
    </div>
  );
};
