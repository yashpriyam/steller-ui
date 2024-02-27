import { useTranslation } from "react-i18next";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useUserCode } from "../../redux/actions/userCodeActions";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text } from "../../components/text/text";
import { DsaQuestionComponent } from "../../components/dsaQuestionComponent/dsaQuestionComponent";
import "./dsaQuestionPage.scss";
import NotFoundComponent from "../../components/noDataFound/noDataFound";
import Spinner from "../../components/spinner/spinner";

export const DsaQuestionPage: React.FC = () => {
  const { getAllDsaQuestions } = useQuestions();
  const { getUserCode } = useUserCode();
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get("dayNumber");
  const weekNumber = queryParams.get("weekNumber");
  const { state } = location;
    let description, title;
    description = state?.description;
    title = state?.title
      ? state.title
      : `${t("title", { title: t("week") })} ${Number(weekNumber) - 1}`;
  const [questionList, setQuestionList] = useState<GetDsaResponseType[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const getDsaQuestion = async () => {
    setIsLoading(true);
    if (weekNumber && dayNumber) {
      const { questionData, response } = await getAllDsaQuestions({
        week: Number(weekNumber),
        day: Number(dayNumber),
      });
      setQuestionList(questionData);
    } else {
      const { questionData, response } = await getAllDsaQuestions({});
      setQuestionList(questionData);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getDsaQuestion();
    getUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
    });
  }, [weekNumber, dayNumber]);
  return (
    <div className="dsa-question-page-container">
      <div className="dsa-question-page-sub-container">
        <div className="questions-page-header">
          <Text textType="h1">{t("DSA Questions")}</Text>
        </div>
        <div className="about-question">
          {description && (
            <div className="question-page-description">
              {t("title", { title: "Title" })}
              {description}
            </div>
          )}
          {title && dayNumber && (
            <Text textType="h3">
              <span>{title}</span>
              <span className="question-day">
                {t("title", { title: t("day") })}
                {dayNumber}
              </span>
            </Text>
          )}
          {Boolean(questionList?.length) && (
            <Text textType="h3">{`${t(
              "totalQuestions"
            )} : ${questionList.length}`}</Text>
          )}
        </div>
        <div className="dsa-question-sub-container">
          {isLoading? <Spinner/> : questionList.length ? (
            questionList.map((questionData, index) => {
              return (
                <DsaQuestionComponent
                  attemptResponse={questionData.attemptResponse}
                  description={questionData.description}
                  questionId={questionData.questionId}
                  meta={questionData.meta}
                  title={questionData.title}
                  questionIndex={index + 1}
                />
              );
            })
          ) : (
            <NotFoundComponent message="No dsa questions" />
          )}
        </div>
      </div>
    </div>
  );
};
