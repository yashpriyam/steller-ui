import { useTranslation } from "react-i18next";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useUserCode } from "../../redux/actions/userCodeActions";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text } from "../../components/text/text";
import { DsaQuestionComponent } from "../../components/dsaQuestionComponent/dsaQuestionComponent";
import "./dsaQuestionPage.scss"
import NotFoundComponent from "../../components/noDataFound/noDataFound"

export const DsaQuestionPage: React.FC = () => {
  const { getAllDsaQuestions } = useQuestions();
  const { getUserCode } = useUserCode();
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get("dayNumber");
  const weekNumber = queryParams.get("weekNumber");
  const { state } = location;
  const [questionList, setQuestionList] = useState<GetDsaResponseType[]>([]);
  const getDsaQuestion = async () => {
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
      <div className="questions-page-header">
        <Text textType="h1">{t("Dsa questions page")}</Text>
      </div>
      <div className="dsa-question-sub-container">
        {questionList.length?questionList.map((questionData,index) => {
          return (
              <DsaQuestionComponent attemptResponse={questionData.attemptResponse} description={questionData.description} questionId={ questionData.questionId} meta={questionData.meta} title={questionData.title} questionIndex={index+1}/>
          );
        }):<NotFoundComponent message="No dsa questions" />}
      </div>
    </div>
  );
};
