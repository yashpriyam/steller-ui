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

const QuestionPage = () => {
  const [tagsObject, setTagsObject] = useState<Record<string, any>>();
  const [topics, setTopics] = useState<{ text: string; value: string }[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState<
    { text: string; value: string }[]
  >([]);
  const { questions, getAllQuestions } = useQuestions();
  const { createQuestionAttemptByUser } = useQuestionAttempt();
  const { tags, getAllTags } = useTag();
  const { getUserCode } = useUserCode();
  const {
    questions: questionList,
    isQuestionLoading,
    totalQuestions,
  } = questions;
  const [filterTagMap, setFilterTagMap] = useState<Record<string, boolean>>();
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
  const { tagList } = tags || {};
  const setTagsObj = () => {
    const tagsObj: Record<any, any[]> = {"All Category" : [{tagName: "All Category"}]};
    tagList.forEach((val: TagsSchemaType) => {
      const key = val.tagType;
      if (key) {
        if (tagsObj[key]) {
          tagsObj[key].push(val);
        } else {
          tagsObj[key] = [val];
        }
      }
    });
    const filterTagMap : Record<string, boolean> = {"All Category" : true};
    tagsObject?.QuestionCategory?.forEach((val: any) => (
      {...filterTagMap,[val.tagName] : false}
     ))
    setTagsObject(tagsObj);
    setFilterTagMap(filterTagMap);
  };

  const handleCategoryFilter: MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLElement) {
      const innerTextValue: string = target.innerText;
      setFilterTagMap({...filterTagMap,[innerTextValue]: Boolean([innerTextValue])});
    }
  };
  const setTopicAndDifficultyLevelState = () => {
    const newTopics = tagsObject?.Topic?.map((topic: any) => ({
      text: topic?.tagName,
      value: topic?.tagKey,
    }));
    const newDifficultyLevel = tagsObject?.DifficultyLevel?.map(
      (level: any) => ({ text: level?.tagName, value: level?.tagKey })
    );
    setTopics(newTopics);
    setDifficultyLevel(newDifficultyLevel);
  };
  const handleOnSelect = (option: SelectOptionType) => {
    const selectedVal = option.value;
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
  useEffect(() => {
    getAllTags();
    setTagsObj();
  }, [tags]);

  useEffect(() => {
    setTopicAndDifficultyLevelState();
  }, [tagsObject]);
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
            <div 
              className="question-category-card selected-question-category-card"
              >All Category</div>
            {tagsObject &&
              tagsObject?.QuestionCategory?.map((val: any, idx: any) => {
                return (
                  <div 
                    className={`question-category-card ${filterTagMap && filterTagMap[val.tagName] && "selected-question-category-card"}`}
                    onClick={handleCategoryFilter}
                    >{val?.tagName}</div>
                );
              })}
          </div>
          <div className="question-level-topic-wise-filter-wrapper">
              <Select
                childCardStyle={{ backgroundColor: "#313131", color: "#C2C4C7" }}
                childStyle={{ backgroundColor: "#313131", color: "#C2C4C7", borderColor: "transparent" }}
                data={topics}
                defaultSelected="Topics"
                className="question-filter-selector"
                onSelect={handleOnSelect}
              />
              <Select
                childCardStyle={{ backgroundColor: "#313131", color: "#C2C4C7" }}
                childStyle={{ backgroundColor: "#313131", color: "#C2C4C7", borderColor: "transparent" }}
                data={difficultyLevel}
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
