import React, { useEffect } from 'react'
import './questionPage.scss';
import QuestionAccordion from '../../components/questionAccordion/questionAccordion';
import { useQuestions } from '../../redux/actions/questionAction';
import { useQuestionAttempt } from '../../redux/actions/questionAttemptAction';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const QuestionPage = () => {
    const { questions, getAllQuestions } = useQuestions();
    const { questionAttempt, createQuestionAttemptByUser } = useQuestionAttempt();
    const { isLoading } = questionAttempt;
    const { questionList } = questions;
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const onSubmit = async (question: QuestionDataType, selectedValues: QuestionSelectedValueType[]) => {
        const filteredData = selectedValues.map(selectedValue => ({
            imageUrl: selectedValue.imageUrl,
            text: selectedValue.text
        }))
        try {
            await createQuestionAttemptByUser(filteredData, question.id);
        } catch (err) {
            console.log(err)
        }
    }
    const searchParam = searchParams.get("day");
    //will use searchParam to filter Question data @Obliger0
    useEffect(() => {
        getAllQuestions()
    }, [])
    return (
        <div className='question-page-container'>
            <div className='question-page-sub-container'>
                {
                    questionList.map((questionData, index) => <QuestionAccordion key={index} questionData={questionData} onSubmit={onSubmit} isLoading={isLoading} errorMsg={t('incorrect_answer')} successMsg={t('correct_answer')} />)
                }
            </div>
        </div>
    )
}

export default QuestionPage;