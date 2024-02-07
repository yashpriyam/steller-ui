import { OpenWindow } from "../openWindow/openWindow";
import Accordion from "../accordion/accordion";
import { Select } from "../select/select";
import "./configurationType.scss"

export const ConfigurationType: React.FC = () => {
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
    <div className="code-block-option-container">
      <Select
        className="create-question-select"
        defaultSelected="Show Output Window"
        data={bool}
        isRequired
        onSelect={() => {}}
      ></Select>
      <Select
        className="create-question-select"
        defaultSelected="Show Split Window"
        data={bool}
        isRequired
        onSelect={() => {}}
      ></Select>
      <Accordion title={"Open Window"}>
        <OpenWindow />
      </Accordion>
    </div>
  );
};
