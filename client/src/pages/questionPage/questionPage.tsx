import React, { useEffect } from "react";
import "./questionPage.scss";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const QuestionPage = () => {
  const { questions, getAllQuestions } = useQuestions();
  const { questionAttempt, createQuestionAttemptByUser } = useQuestionAttempt();
  const { questions: questionList } = questions;
  const { isLoading } = questionAttempt;
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const onSubmit = async (
    question: QuestionDataType,
    selectedValues: QuestionSelectedValueType[]
  ) => {
    const filteredData = selectedValues.map((selectedValue) => ({
      imageUrl: selectedValue.imageUrl,
      text: selectedValue.text,
    }));
    try {
      await createQuestionAttemptByUser(filteredData, question._id);
    } catch (err) {
      console.log(err);
    }
  };
  const searchParam = searchParams.get("day");
  useEffect(() => {
      getAllQuestions({})
  }, [])
  return (
    <div className="question-page-container">
          <div className="question-page-sub-container">
              {
          questionList?.map((question, index) => {
                     return <QuestionAccordion
                         key={index}
                         questionData={question}
                         onSubmit={onSubmit}
                         isLoading={isLoading}
                         isCorrect={question.isCorrect}
                         isAnswered={question.isAnswered}
                         errorMsg={t("incorrect_answer")}
                         successMsg={t("correct_answer")}
                       />; 
                })
                 
              }</div>
    </div>
  );
};

export default QuestionPage;
