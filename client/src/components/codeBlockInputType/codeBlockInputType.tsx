import "./codeBlockInput.scss";
import { ConfigurationType } from "../configuration/configurationType";
import Accordion from "../accordion/accordion";
import { Select } from "../select/select";
export const CodeBlockInputType: React.FC = () => {
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
  return (
    <div className="code-block-input-container">
      <Select
        className="create-question-select"
        defaultSelected="Enable Code Block"
        data={bool}
        isRequired
        onSelect={() => {}}
      ></Select>
      <Accordion title={"Configuration"}>
        <ConfigurationType />
      </Accordion>
    </div>
  );
};
