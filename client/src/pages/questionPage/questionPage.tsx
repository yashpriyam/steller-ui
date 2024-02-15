import { useEffect } from 'react';
import './questionPage.scss';
import QuestionAccordion from '../../components/questionAccordion/questionAccordion';
import { useQuestions } from '../../redux/actions/questionAction';
import { useQuestionAttempt } from '../../redux/actions/questionAttemptAction';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useUserCode } from '../../redux/actions/userCodeActions';
import Spinner from '../../components/spinner/spinner';
import { Text } from '../../components/header/header';

const QuestionPage = () => {
  const { questions, getAllQuestions } = useQuestions();
  const { createQuestionAttemptByUser } = useQuestionAttempt();
  const { getUserCode } = useUserCode();
  const { questions: questionList, isQuestionLoading } = questions;
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayNumber = queryParams.get('dayNumber');
  const weekNumber = queryParams.get('weekNumber');
  const { state } = location;
  let description, title;
  description = state?.description;
  title = state?.title
    ? state.title
    : `${t('title', { title: t('week') })} ${Number(weekNumber) - 1}`;
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
    <div className="question-page-sub-wrapper">
      <div className="questions-page-header">
        <Text headerType='h1'>{t('questions')}</Text>
      </div>
      <div className="question-time">
        {description && (
          <div className="question-page-description">
            {t('title', { title: 'Title' })}
            {description}
          </div>
        )}
        {title && dayNumber && (
          <Text headerType='h3'>
            <span>{title}</span>
            <span className="question-day">
              {t('title', { title: t('day') })}
              {dayNumber}
            </span>
          </Text>
        )}
        {Boolean(questionList?.length) && (
          <Text headerType='h3'>{`${t('totalQuestions')} : ${questionList?.length}`}</Text>
        )}
      </div>
      <div className="question-page-sub-container">
        {isQuestionLoading? <Spinner/> : questionList?.map((question, index) => {
          return (
            <QuestionAccordion
              key={index}
              questionNumber={index + 1}
              questionData={question}
              onSubmit={onSubmit}
              className="accordian-customize"
              isCorrect={question.isCorrect}
              isAnswered={question.isAnswered}
              errorMsg={t('incorrect_answer')}
              successMsg={t('correct_answer')}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default QuestionPage;
