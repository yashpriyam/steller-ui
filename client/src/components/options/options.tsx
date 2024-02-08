import { CodeBlockInputType } from "../codeBlockInputType/codeBlockInputType";
import { InputComponent } from "../../components/input/inputComponent";
import Accordion from "../accordion/accordion";
import "./options.scss"
export const Options: React.FC<OptionsProps> = ({isCodeBlockOpen=false}) => {
  return (
    <div className="option-container">
      <InputComponent
        type="text"
        onChange={() => {}}
        placeholder="Text"
        backgroundColor="black"
        className="question-input-container"
      />
      <InputComponent
        type="text"
        onChange={() => {}}
        placeholder="image URL"
        backgroundColor="black"
        className="question-input-container"
      />
      <InputComponent
        type="text"
        onChange={() => {}}
        placeholder="iframe"
        backgroundColor="black"
        className="question-input-container"
      />
      {isCodeBlockOpen && <Accordion title={"Code Block"} className="accordian-container">
        <CodeBlockInputType />
      </Accordion>}
    </div>
  );
};
