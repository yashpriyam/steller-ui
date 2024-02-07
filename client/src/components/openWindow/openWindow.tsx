import CodeBlock from "../codeBlock/codeBlock";
import { InputComponent } from "../../components/input/inputComponent";
import { Select } from "../../components/select/select";
import "./openWindow.scss"
export const OpenWindow: React.FC = () => {
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
      <div className="open-window-container">
        <Select
          className="create-question-select"
          defaultSelected="Editable status"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <Select
          className="create-question-select"
          defaultSelected="Enable User Selection"
          data={bool}
          isRequired
          onSelect={() => {}}
        ></Select>
        <InputComponent
          className="question-input-container"
          type="text"
          onChange={() => {}}
          placeholder="Title"
          backgroundColor="black"
        />
        
      </div>
    );
}