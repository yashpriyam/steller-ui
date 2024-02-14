import { Select } from "../../components/select/select";
import { InputComponent } from "../../components/input/inputComponent";
import "./createQuestionComponent.scss";
import React, { useState } from "react";
import Accordion from "../accordion/accordion";
import { Options } from "../options/options";
import { CloseCrossIcon, AddIcon } from "../../icons/index";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
import { Button } from "../../components/button/button";
import { createQuestionApi } from "../../redux/actions/admin/createQuestion";
import Toast from "../../utils/toast";
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
  const { createQuestion: createdQuestionData } = useSelector(
    (state): any => state
  );
  const { updateState } = createQuestionActions;
  const dispatch = useDispatch();
  const [isQuestionAdding,setIsQuestionAdding]=useState<boolean>(false)
  const [count, setCount] = useState({
    titleCount: 1,
    answerCount: 1,
    optionsCount: 1,
  });
  const handleOnSetBatchCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `meta.batchCode`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetDayNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const path = `meta.day`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetWeekNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const path = `meta.week`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const path = `meta.topic`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetExpiresTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const path = `meta.expiresInMins`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetType = (option: SelectOptionType) => {
    const value = option.value;
    const path = `meta.type`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetIsActive = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `meta.isActive`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetIsArchived = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `meta.isArchived`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetIsOpenable = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `meta.isOpenable`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetMarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const path = `marks`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetQuestionType = (option: SelectOptionType) => {
    const value = option.value;
    const path = `questionType`;
    dispatch(updateState({ path, value }));
  };
  const optionsList: JSX.Element[] = [];
  const titleList: JSX.Element[] = [];
  const answerList: JSX.Element[] = [];

  for (let index = 0; index < count.optionsCount; index++) {
    optionsList.push(<Options prevPath={`options.${index}`} />);
  }
  for (let index = 0; index < count.titleCount; index++) {
    titleList.push(<Options prevPath={`title.${index}`} />);
  }
  for (let index = 0; index < count.answerCount; index++) {
    answerList.push(<Options prevPath={`answer.${index}`} />);
  }
  const handleOnAddTitleClick = () => {
    setCount({ ...count, titleCount: count.titleCount + 1 });
  };
  const handleOnAddAnswerClick = () => {
    setCount({ ...count, answerCount: count.answerCount + 1 });
  };
  const handleOnAddOptionsClick = () => {
    setCount({ ...count, optionsCount: count.optionsCount + 1 });
  };
  const handleOnAddQuestion = async () => {
    try {
      const { answer, options, meta, questionType, title, marks } =
        createdQuestionData;
      const { createQuestion } = createQuestionApi();
      setIsQuestionAdding(true)
      const response = await createQuestion({
        answer: answer,
        marks: marks,
        meta: meta,
        options: options,
        questionType: questionType,
        title: title,
      });      
      setIsQuestionAdding(false);
      const message = response.response.message;
      const status = response.response.status;
      if (status === 200) {
        Toast.success(message)
      } else {
        Toast.error(message);        
      }
    } catch (err) {
      console.log(err);
    }
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
          key={"batchCode"}
          className="create-question-input"
          type="text"
          onChange={handleOnSetBatchCode}
          placeholder="Batch Code"
        />
        <InputComponent
          className="create-question-input"
          key={"dayNumber"}
          type="number"
          onChange={handleOnSetDayNumber}
          placeholder="Day Number"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          key={"weekNumber"}
          onChange={handleOnSetWeekNumber}
          placeholder="Week Number"
        />
        <InputComponent
          className="create-question-input"
          type="text"
          key={"Topic"}
          onChange={handleOnSetTopic}
          placeholder="Topic"
        />
        <InputComponent
          className="create-question-input"
          type="number"
          key={"expiresTime"}
          onChange={handleOnSetExpiresTime}
          placeholder="Expires Time"
        />
        <Select
          className="create-question-select"
          defaultSelected="Select Active"
          key={"isActive"}
          data={bool}
          isRequired
          onSelect={handleOnSetIsActive}
        ></Select>
        <Select
          key={"isArchived"}
          className="create-question-select"
          defaultSelected="Select Archived"
          data={bool}
          isRequired
          onSelect={handleOnSetIsArchived}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select Openable"
          key={"isOpenable"}
          data={bool}
          isRequired
          onSelect={handleOnSetIsOpenable}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Select type"
          key={"selcect-type"}
          data={type}
          isRequired
          onSelect={handleOnSetType}
        ></Select>
      </div>
      <InputComponent
        className="create-question-input"
        type="number"
        key={"marks"}
        onChange={handleOnSetMarks}
        placeholder="Marks"
        disabled={false}
      />
      <Select
        className="create-question-select"
        key={"question-type"}
        defaultSelected="Question type"
        data={questionType}
        isRequired
        onSelect={handleOnSetQuestionType}
      ></Select>
      <Accordion title={"Title"} key={"title"} className="accordian-container">
        {titleList.map((title) => {
          return title;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddTitleClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <Accordion title={"Options"} key={"options"} className="accordian-container">
        {optionsList.map((option) => {
          return option;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddOptionsClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <Accordion title={"Answer"} key={"answer"} className="accordian-container">
        {answerList.map((answer) => {
          return answer;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddAnswerClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <div className="add-question-button-container">
        <Button key={"addButton"}
          text={isQuestionAdding ? "Question Adding" : "Add Question"}
          onClick={handleOnAddQuestion}
        />
      </div>
    </div>
  );
};
