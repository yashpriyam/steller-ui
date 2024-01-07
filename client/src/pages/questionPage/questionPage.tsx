import React, { useEffect } from 'react'
import './questionPage.scss';
import QuestionAccordion from '../../components/questionAccordion/questionAccordion';
import { useQuestions } from '../../redux/actions/questionAction';
import { useQuestionAttempt } from '../../redux/actions/questionAttemptAction';

const QuestionPage = () => {
    const { questions, getAllQuestions } = useQuestions();
    const { createQuestionAttemptByUser } = useQuestionAttempt();
    const { questionList } = questions;
const onSubmit = (question: QuestionDataType, selectedValues: { imageUrl: string, text: string, __typename: string }[]) => {
    const filteredData = selectedValues.map(selectedValue => ({
        imageUrl: selectedValue.imageUrl,
        text: selectedValue.text
    }))
    createQuestionAttemptByUser(filteredData, question.id)
    }
    useEffect(()=> {
        getAllQuestions()
    },[])
    return (
        <div className='question-page-container'>
            <div className='question-page-sub-container'>
                {
                    questionList.map((questionData, index) =>  <QuestionAccordion key={index} questionData={questionData} onSubmit={onSubmit} />)
                }
            </div>
        </div>
    )
}

export default QuestionPage;