import "./createQuestion.scss";
import { Button } from "../../../components/button/button";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/modal";
import { CreateQuestionComponent } from "../../../components/createQuestionComponent/createQuestionComponent";
import { useQuestions } from "../../../redux/actions/questionAction";
import QuestionAccordion from "../../../components/questionAccordion/questionAccordion";
import { useTranslation } from "react-i18next";
import { useQuestionAttempt } from "../../../redux/actions/questionAttemptAction";

export const CreateQuestion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOnAddQuestionClick = () => {
    setIsModalOpen(true);
  };
  const { t } = useTranslation();
  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };
  const { questions, getAllQuestions } = useQuestions();
  const { questions: questionList } = questions;
  const onSubmit = async (
    question: QuestionDataType,
    selectedValues: QuestionSelectedValueType[]
  ) => {
    const filteredData = selectedValues.map((selectedValue) => ({
      imageUrl: selectedValue.imageUrl,
      text: selectedValue.text,
    }));
    try {
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllQuestions({});
  });
  return (
    <div className="create-question-wrapper-container">
      <h1 className="create-question-header">Create Question</h1>
      <div className="add-question-button-wrapper">
        <Button
          text="Add Question"
          className="add-question-button"
          onClick={handleOnAddQuestionClick}
        />
      </div>
      <Modal className="question-modal-wrapper" isOpen={isModalOpen}>
        <CreateQuestionComponent onClose={handleOnCloseModal} />
      </Modal>
      <div className="created-question-container">
        {/* {questionList?.map((question, index) => {
          return (
            <QuestionAccordion
              key={index}
              questionNumber={index + 1}
              questionData={question}
              onSubmit={onSubmit}
              className="accordian-customize"
              isCorrect={question.isCorrect}
              isAnswered={question.isAnswered}
              errorMsg={t("incorrect_answer")}
              successMsg={t("correct_answer")}
            />
          );
        })} */}
      </div>
    </div>
  );
};
