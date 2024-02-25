import { Select } from "../../components/select/select";
import { InputComponent } from "../../components/input/inputComponent";
import "./createQuestionComponent.scss";
import React, { useEffect, useState } from "react";
import Accordion from "../accordion/accordion";
import { Options } from "../options/options";
import { CloseCrossIcon, AddIcon } from "../../icons/index";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
import { Button } from "../../components/button/button";
import { createQuestionApi } from "../../redux/actions/admin/createQuestion";
import { validateQuestionInput } from "./validatequestionInput";
import { getVariableValue } from "../../utils/getVariableValue";
import { useBatch } from "../../redux/actions/batchAction";
import { getBatches } from "../../utils/getBatches";
import {
  getSubTopicList,
  getTopicList,
} from "../../redux/actions/getTopicAction";
import { Checkbox } from "../checkbox/checkbox";
export const CreateQuestionComponent: React.FC<
  CreateQuestionComponentProps
> = ({ onClose }) => {
  const QUESTION_TYPE_TAGS = "questionTypeTags";
  const selectedBoolean = [
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
    { text: "dsa", value: "dsa" },
    { text: "single", value: "single" },
    {
      text: "multi",
      value: "multi",
    },
    { text: "fillup", value: "fillup" },
    { text: "codeblock", value: "codeblock" },
  ];
  const descriptionTypeList= [{ text: "text", value: "text" }, { text: "html", value: "html" }];
  const { getBatchCode } = useBatch();
  const [topicList, setTopicList] = useState<CheckboxValueType[]>([]);
  const [subTopicList, setSubTopicList] = useState<CheckboxValueType[]>([]);
  const [batchList, setBatchList] = useState<SelectOptionType[]>([]);
  const [variableList, setVariableList] = useState<[]>([]);
  const getVariableList = async () => {
    const { value } = await getVariableValue(QUESTION_TYPE_TAGS);
    const list = value?.map((listData: string) => {
      return {
        text: listData,
        value: listData,
      };
    });
    setVariableList(list);
  };
  const getBatchCodeList = async () => {
    const response = await getBatchCode();
    const batches = getBatches(response?.data?.getBatchCode?.batchData);
    setBatchList(batches);
  };
  const getSubTopicApiCall = async (value: string) => {
    const response = await getSubTopicList(value);
    const subTopicDataList: SubTopicType[] = response.subTopicList;
    const subTopicOptionList: CheckboxValueType[] = subTopicDataList.map(
      (subtopic) => {
        return { text: subtopic.title };
      }
    );
    setSubTopicList(subTopicOptionList);
  };
  const getTopicApiCall = async () => {
    const response = await getTopicList();
    const topicData: string[] = response?.topicList;
    const topicOptionList: CheckboxValueType[] = topicData.map((topic) => {
      return { text: topic };
    });
    setTopicList(topicOptionList);
  };
  useEffect(() => {
    getVariableList();
    getBatchCodeList();
    getTopicApiCall();
  }, []);
  const { createQuestion: createdQuestionData } = useSelector(
    (state): any => state
  );
  const { updateState } = createQuestionActions;
  const dispatch = useDispatch();
  const [isQuestionAdding, setIsQuestionAdding] = useState<boolean>(false);
  const [count, setCount] = useState({
    titleCount: 1,
    answerCount: 1,
    optionsCount: 1,
  });
  const [isRequiredFiledError, setIsRequiredFiledError] =
    useState<boolean>(false);
  const handleOnSetBatchCode = (option: SelectOptionType) => {
    const value = option.value;
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
  const handleOnSetTopic = (
    currentSelected: {},
    selectedValues: Record<number, CheckboxValueType>
  ) => {
    const values = Object.values(selectedValues);
    const value = values[0]?.text;
    const path = `meta.topic`;
    if (!value || !values.length) setSubTopicList([]);
    value && getSubTopicApiCall(value);
    dispatch(updateState({ path, value }));
  };
  const handleOnSetSubTopic = (
    currentSelected: {},
    selectedValues: Record<number, CheckboxValueType>
  ) => {
    const selectedSubTopicList = Object.values(selectedValues);
    const values = selectedSubTopicList.map((item) => {
      return { title: item?.text };
    });
    const path = `questionSubTopics`;
    dispatch(updateState({ path, value: values }));
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
  const handleOnSetQuestionTypeTags = (option: SelectOptionType) => {
    const value = option.value;
    const path = `questionTypeTags`;
    dispatch(updateState({ path, value }));
  };
  const handleOnSetDescriptionType = (option: SelectOptionType) => {
    const value = option.value;
    const path = `description.type`;
    dispatch(updateState({ path, value }));
  };
  const handleOnDescriptionValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const path = `description.value`;
    dispatch(updateState({ path, value }));
  }
  const optionsList: JSX.Element[] = [];
  const titleList: JSX.Element[] = [];
  const answerList: JSX.Element[] = [];

  for (let index = 0; index < count.optionsCount; index++) {
    optionsList.push(<Options prevPath={`options.${index}`} />);
  }
  for (let index = 0; index < count.titleCount; index++) {
    titleList.push(
      <Options prevPath={`title.${index}`} optionQuestionType={createdQuestionData.questionType} />
    );
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
      const {
        answer,
        options,
        meta,
        questionType,
        title,
        marks,
        questionTypeTags,
        questionSubTopics,
        description
      } = createdQuestionData;           
      const isValidInput = validateQuestionInput({
        meta,
        answer,
        options,
        title,
        questionType,
        marks,
        questionTypeTags,
      });
      if (!isValidInput) {
        setIsRequiredFiledError(true);
        window.setTimeout(() => {
          setIsRequiredFiledError(false);
        }, 5000);
        return;
      }
      const { createQuestion } = createQuestionApi();
      setIsQuestionAdding(true);
      const response = await createQuestion({
        answer: answer,
        marks: marks,
        meta: meta,
        options: options,
        questionType: questionType,
        title: title,
        questionTypeTags,
        questionSubTopics,
        description
      });
      setIsQuestionAdding(false);
      const message = response?.response?.message;
      const status = response?.response?.status;
      if (status === 200) {
        window.alert(message);
      } else {
        window.alert(message);
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
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Batch Code:
          </label>
          <Select
            className="create-question-select"
            key={"batchCode"}
            data={batchList}
            onSelect={handleOnSetBatchCode}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Day :
          </label>
          <InputComponent
            className="create-question-input"
            key={"dayNumber"}
            type="number"
            onChange={handleOnSetDayNumber}
            placeholder="Day Number"
          />
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Week :
          </label>
          <InputComponent
            className="create-question-input"
            type="number"
            key={"weekNumber"}
            onChange={handleOnSetWeekNumber}
            placeholder="Week Number"
          />
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Expires in min:
          </label>
          <InputComponent
            className="create-question-input"
            type="number"
            key={"expiresTime"}
            onChange={handleOnSetExpiresTime}
            placeholder="Expires Time"
          />
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Active status :
          </label>
          <Select
            className="create-question-select"
            key={"isActive"}
            data={selectedBoolean}
            isRequired
            onSelect={handleOnSetIsActive}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Archived status :
          </label>
          <Select
            key={"isArchived"}
            className="create-question-select"
            data={selectedBoolean}
            isRequired
            onSelect={handleOnSetIsArchived}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Openable status :
          </label>
          <Select
            className="create-question-select"
            key={"isOpenable"}
            data={selectedBoolean}
            isRequired
            onSelect={handleOnSetIsOpenable}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Type :
          </label>
          <Select
            className="create-question-select"
            key={"selcect-type"}
            data={type}
            isRequired
            onSelect={handleOnSetType}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Topic :
          </label>
          <Accordion
            title="Select Topic"
            className="select-accordian-container"
          >
            <Checkbox
              className="checkbox-container"
              options={topicList}
              type="single"
              onSelect={handleOnSetTopic}
            />
          </Accordion>
        </div>
      </div>
      <div className="break-line"></div>
      <div className="marks-questionType-wrapper">
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Marks :
          </label>
          <InputComponent
            className="create-question-input"
            type="number"
            key={"marks"}
            onChange={handleOnSetMarks}
            placeholder="Marks"
            disabled={false}
          />
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Type :
          </label>
          <Select
            className="create-question-select"
            key={"question-type"}
            defaultSelected="Question type"
            data={questionType}
            isRequired
            onSelect={handleOnSetQuestionType}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Question Type Tags :
          </label>
          <Select
            className="create-question-select"
            key={"question-type"}
            defaultSelected="Question type"
            data={variableList}
            onSelect={handleOnSetQuestionTypeTags}
          ></Select>
        </div>
        <div className="create-question-input-wrapper">
          <label htmlFor="batch-code" className="create-question-label">
            Sub Topics :
          </label>
          <Accordion
            disabled={subTopicList.length === 0}
            title=" Sub Topic"
            className="select-accordian-container"
          >
            <Checkbox
              className="checkbox-container"
              options={subTopicList}
              type="multi"
              onSelect={handleOnSetSubTopic}
            />
          </Accordion>
        </div>
      </div>
      {createdQuestionData?.questionType === "dsa" && (
        <div className="description-container">
          <div className="create-question-input-wrapper">
            <label htmlFor="batch-code" className="create-question-label">
              Description Type :
            </label>
            <Select
              className="create-question-select"
              key={"description-type"}
              defaultSelected="Description type"
              data={descriptionTypeList}
              onSelect={handleOnSetDescriptionType}
            ></Select>
          </div>
          <div className="create-question-input-wrapper">
            <label htmlFor="batch-code" className="create-question-label">
              Enter description :
            </label>
            <textarea rows={7} className="description-text-conatiner"  onChange={handleOnDescriptionValue}></textarea>
          </div>
        </div>
      )}
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
      <Accordion
        title={"Options"}
        key={"options"}
        className="accordian-container"
      >
        {optionsList.map((option) => {
          return option;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddOptionsClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <Accordion
        title={"Answer"}
        key={"answer"}
        className="accordian-container"
      >
        {answerList.map((answer) => {
          return answer;
        })}
        <div className="add-option-container">
          <span onClick={handleOnAddAnswerClick}>
            <AddIcon height="30" width="30" />
          </span>
        </div>
      </Accordion>
      <div
        className={`error-message-container ${
          isRequiredFiledError && "error-message-show"
        }`}
      >
        please enter all required filed
      </div>
      <div className="add-question-button-container">
        <Button
          key={"addButton"}
          text={isQuestionAdding ? "Question Adding" : "Add Question"}
          onClick={handleOnAddQuestion}
        />
      </div>
    </div>
  );
};
