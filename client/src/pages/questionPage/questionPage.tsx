import React from 'react'
import './questionPage.scss';
import QuestionAccordion from '../../components/questionAccordion/questionAccordion';

const QuestionPage = () => {
    const questionData = {
            topic: [{
                text: 'Which of the following keywords is used to define a variable in Javascript?',
                imageUrl: 'https://www.economist.com/img/b/1190/670/90/sites/default/files/images/2015/09/blogs/economist-explains/code2.png'
            }],
            options: [{
                text: 'let',
                imageUrl: 'https://www.zdnet.com/a/img/resize/0c3f1da3f6084ffcf264800296880aaeb28d1e3e/2023/03/18/dcbbf411-b72c-4fab-96e5-05ee22f68fe2/summarize-article-code.jpg?auto=webp&width=1280'
            },{
                text: 'var',
                imageUrl: 'https://www.zdnet.com/a/img/resize/0c3f1da3f6084ffcf264800296880aaeb28d1e3e/2023/03/18/dcbbf411-b72c-4fab-96e5-05ee22f68fe2/summarize-article-code.jpg?auto=webp&width=1280'
            },{
                text: 'Both A & B',
                imageUrl: 'https://www.zdnet.com/a/img/resize/0c3f1da3f6084ffcf264800296880aaeb28d1e3e/2023/03/18/dcbbf411-b72c-4fab-96e5-05ee22f68fe2/summarize-article-code.jpg?auto=webp&width=1280'
            },{
                text: 'None of the above',
                imageUrl: 'https://www.zdnet.com/a/img/resize/0c3f1da3f6084ffcf264800296880aaeb28d1e3e/2023/03/18/dcbbf411-b72c-4fab-96e5-05ee22f68fe2/summarize-article-code.jpg?auto=webp&width=1280'
            }]
        }
    return (
        <div className='question-page-container'>
            <div className='question-page-sub-container'>
                <QuestionAccordion questionData={questionData} />
            </div>
        </div>
    )
}

export default QuestionPage;