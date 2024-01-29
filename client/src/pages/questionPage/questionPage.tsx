import React, { useEffect, useState } from "react";
import "./questionPage.scss";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const QuestionPage = () => {
  const { questions, getAllQuestions } = useQuestions();
  const { createQuestionAttemptByUser } = useQuestionAttempt();
  const { questions: questionList } = questions;
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
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
      getAllQuestions({week:Number(weekNumber),day:Number(dayNumber)})
  }, [])
  return (
    <div className="question-page-container">
      {/* <CodeBlock />
      <CodeBlock /> */}
       <h1>{t('question')}</h1>
        <div className="question-time">
          <span>
            {t('title', { title: t('week') })}
            {weekNumber}
          </span>
          <span className="question-day">
            {t('title', { title: t('day') })}
            {dayNumber}
          </span>
        </div>
          <div className="question-page-sub-container">
              {
          questionList?.map((question, index) => {
                     return <QuestionAccordion
                         key={index}
                         questionData={question}
                         onSubmit={onSubmit}
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
