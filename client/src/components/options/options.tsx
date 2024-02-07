import { CodeBlockInputType } from "../codeBlockInputType/codeBlockInputType";
import { InputComponent } from "../../components/input/inputComponent";
import Accordion from "../accordion/accordion";
import "./options.scss"
export const Options: React.FC = () => {
  return (
    <div className="options-container">
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
      <Accordion title={"Code Block"} className="accordian-container">
        <CodeBlockInputType />
      </Accordion>
    </div>
  );
};
