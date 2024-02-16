import "./codeBlockInput.scss";
import { ConfigurationType } from "../configuration/configurationType";
import Accordion from "../accordion/accordion";
import { Select } from "../select/select";
import { useDispatch } from "react-redux";
import { createQuestionActions } from "../../redux/slices/createQuestion/createQuestionSlice";
export const CodeBlockInputType: React.FC<{ prevPath: string }> = ({
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
  const handleOnSetEnableCodeBlock = (option: SelectOptionType) => {
    const value = option.value === "true";
    const path = `${prevPath}.enableCodeBlock`;
    dispatch(updateState({ path, value }));
  };
  return (
    <div className="code-block-input-container">
      <div className="create-question-input-wrapper">
        <label htmlFor="batch-code" className="create-question-label">
          Code block enable status :
        </label>
        <Select
          className="create-question-select"
          defaultSelected="Enable Code Block"
          data={bool}
          isRequired
          onSelect={handleOnSetEnableCodeBlock}
        ></Select>
      </div>
      <Accordion title={"Configuration"} className="accordian-container">
        <ConfigurationType prevPath={`${prevPath}.configuration`} />
      </Accordion>
    </div>
  );
};
