import "./createQuestion.scss";
import { Button } from "../../../components/button/button";
import { useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { CreateQuestionComponent } from "../../../components/createQuestionComponent/createQuestionComponent";

export const CreateQuestion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="create-question-wrapper-container">
      <h1 className="create-question-header">Create Question</h1>
      <div className="add-question-button-wrapper">
        <Button text="Add Question" className="add-question-button" />
      </div>
      <Modal className="question-modal-wrapper" isOpen={true}>
        <CreateQuestionComponent />
      </Modal>
    </div>
  );
};
