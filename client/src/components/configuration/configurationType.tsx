import { OpenWindow } from "../openWindow/openWindow";
import Accordion from "../accordion/accordion";
import { Select } from "../select/select";
import "./configurationType.scss";
import { AddIcon } from "../../icons/addIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";

export const ConfigurationType: React.FC<{ prevPath: string }> = ({
  prevPath,
}) => {
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
  const dispatch = useDispatch();
  const { updateState } = createQuestionActions;
  const [openWindowCount, setOpenWindowCount] = useState<number>(1);
  const handleOnAddOpenWindow = () => {
    setOpenWindowCount((prevValue) => prevValue + 1);
  };
  const handleShowOutputWindow = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `${prevPath}.showOutputWindow`;
    dispatch(updateState({ path, value }));
  };
  const handleSplitWindow = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `${prevPath}.showSplitWindow`;
    dispatch(updateState({ path, value }));
  };
  return (
    <div className="code-block-option-container">
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Show Output Window :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Show Output Window"
          data={bool}
          isRequired
          onSelect={handleShowOutputWindow}
        ></Select>
      </div>
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Show Split window :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Show Split Window"
          data={bool}
          isRequired
          onSelect={handleSplitWindow}
        ></Select>
      </div>
      <Accordion title={"Open Window"} className="accordian-container">
        {[...Array(openWindowCount)].map((_, index) => (
          <OpenWindow
            key={index}
            prevPath={`${prevPath}.openWindows.${index}`}
          />
        ))}
      </Accordion>
      <div className="add-option-container">
        <span onClick={handleOnAddOpenWindow}>
          <AddIcon height="30" width="30" />
        </span>
      </div>
    </div>
  );
};
