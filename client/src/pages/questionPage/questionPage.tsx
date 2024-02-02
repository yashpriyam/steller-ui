import { useEffect } from "react";
import "./questionPage.scss";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useUserCode } from "../../redux/actions/userCodeActions";

const QuestionPage = () => {
  const { questions, getAllQuestions } = useQuestions();
  const { createQuestionAttemptByUser } = useQuestionAttempt();
  const { getUserCode } = useUserCode();
  const { questions: questionList } = questions;
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get("dayNumber");
  const weekNumber = queryParams.get("weekNumber");
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
  useEffect(() => {
    weekNumber && dayNumber
      ? getAllQuestions({ week: Number(weekNumber), day: Number(dayNumber) })
      : getAllQuestions({});
    getUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
    });
  }, [weekNumber, dayNumber]);
  return (
    <div className="question-page-container">
      <div className="questions-page-header">
        <h1>{t("questions")}</h1>
      </div>
      <div className="question-time">
        {weekNumber && dayNumber && (
          <div>
            <span>
              {t("title", { title: t("week") })}
              {weekNumber}
            </span>
            <span className="question-day">
              {t("title", { title: t("day") })}
              {dayNumber}
            </span>
          </div>
        )}
        <span>{`${t("totalQuestions")} : ${questionList?.length}`}</span>
      </div>
      <div className="question-page-sub-container">
        {questionList?.map((question, index) => {
          return (
            <QuestionAccordion
              key={index}
              questionData={question}
              onSubmit={onSubmit}
              className="accordian-customize"
              isCorrect={question.isCorrect}
              isAnswered={question.isAnswered}
              errorMsg={t("incorrect_answer")}
              successMsg={t("correct_answer")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPage;
