import { MouseEventHandler, useEffect, useState } from "react";
import "./questionPage.scss";
import QuestionAccordion from "../../components/questionAccordion/questionAccordion";
import { useQuestions } from "../../redux/actions/questionAction";
import { useQuestionAttempt } from "../../redux/actions/questionAttemptAction";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useUserCode } from "../../redux/actions/userCodeActions";
import Spinner from "../../components/spinner/spinner";
import { Text } from "../../components/text/text";
import { useTag } from "../../redux/actions/tagsAction";
import { Select } from "../../components/select/select";
import { Tabs } from "../../components/tabs/tabs";

const QuestionPage = () => {
  const [selectionFilter, setSelectionFilter] = useState<Record<string,SelectDataType[]>>({});
  const [tabsDataList, setTabsDataList] = useState<TabOptionsType[]>();
  const { questions, getAllQuestions } = useQuestions();
  const { createQuestionAttemptByUser } = useQuestionAttempt();
  const { tags, getAllTags } = useTag();
  const { getUserCode } = useUserCode();
  const {
    questions: questionList,
    isQuestionLoading,
    totalQuestions,
  } = questions;
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
      console.error(err);
    }
  };
  const { tagsData } = tags || {};

  const setTopicAndDifficultyLevelState = () => {
    const newTopics = tagsData?.Topic?.map((topic: TagsSchemaType) => ({
      text: topic.tagName,
      value: topic.tagKey,
    }));
    const newDifficultyLevel = tagsData?.DifficultyLevel?.map(
      (level: TagsSchemaType) => ({ text: level.tagName, value: level.tagKey })
    );
    setSelectionFilter({"topics": newTopics, "difficultyLevel" : newDifficultyLevel})
  };
  const handleOnSelect = (option: SelectOptionType) => {
    const selectedVal = option.value;
  };
  const setDataListForTabs = ()=>{
    const newDataList : TabOptionsType[] = tagsData?.QuestionCategory?.map((data: TagsSchemaType)=>{
      const { tagKey, tagName,tagType } = data;
      const newObj : TabOptionsType = {value: tagKey, text: tagName }
      return newObj;
    })
    newDataList && newDataList?.unshift({value: "allCategory", text:"All fdffds fdfdff sfsujal gotharwal category", selected: true, })
    newDataList && setTabsDataList(newDataList);
  }
  useEffect(() => {
    weekNumber && dayNumber
      ? getAllQuestions({ week: Number(weekNumber), day: Number(dayNumber) })
      : getAllQuestions({});
    getUserCode({
      weekNumber: Number(weekNumber),
      dayNumber: Number(dayNumber),
    });
  }, [weekNumber, dayNumber]);
  useEffect(() => {
    getAllTags();
  }, [tags]);

  useEffect(() => {
    setTopicAndDifficultyLevelState();
    setDataListForTabs()
  }, [tagsData]);
  return (
    <div className="question-page-container">
      <div className="question-page-sub-wrapper">
        <div className="questions-page-header">
          <Text textType="h1">{t("questions")}</Text>
        </div>
        <div className="question-time">
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
            )} : ${totalQuestions}`}</Text>
          )}
        </div>
        <div className="question-page-filter-container">
          <div className="question-category-wrapper">
            {
              tabsDataList && < Tabs dataList={tabsDataList}/>
            }
          </div>
          <div className="question-level-topic-wise-filter-wrapper">
              <Select
                childCardStyle={{ backgroundColor: "#313131", color: "#C2C4C7" }}
                childStyle={{ backgroundColor: "#313131", color: "#C2C4C7", borderColor: "transparent" }}
                data={selectionFilter.topics}
                defaultSelected="Topics"
                className="question-filter-selector"
                onSelect={handleOnSelect}
              />
              <Select
                childCardStyle={{ backgroundColor: "#313131", color: "#C2C4C7" }}
                childStyle={{ backgroundColor: "#313131", color: "#C2C4C7", borderColor: "transparent" }}
                data={selectionFilter.difficultyLevel}
                defaultSelected="Difficulty Level"
                className="question-filter-selector"
                onSelect={handleOnSelect}
              />
          </div>
        </div>
        <div className="question-page-sub-container">
          {isQuestionLoading ? (
            <Spinner />
          ) : (
            questionList?.map((question, index) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
