import React, { useEffect } from 'react'
import './questionPage.scss';
import QuestionAccordion from '../../components/questionAccordion/questionAccordion';
import { useQuestions } from '../../redux/actions/questionAction';
import { useQuestionAttempt } from '../../redux/actions/questionAttemptAction';
import { useTranslation } from 'react-i18next';

const QuestionPage = () => {
    const { questions, getAllQuestions } = useQuestions();
    const { questionAttempt, createQuestionAttemptByUser } = useQuestionAttempt();
    const { isLoading } = questionAttempt;
    const { questionList } = questions;
    const { t } = useTranslation();
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