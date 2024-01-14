import React, { useState } from 'react';
import Accordion from '../accordion/accordion';
import './questionAccordion.scss'
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';

const QuestionAccordion = ({
  questionData,
  onSubmit,
  isLoading,
  errorMsg,
  successMsg
}: QuestionAccordionProps) => {
  const [selectedValues, setSelectedValues] = useState<CheckboxValueType[]>([]);
  const { title, options, isAnswered, isCorrect } = questionData;
  return (
    <Accordion className={`question-title`} title={<div className='question-title'>
      {title[0]?.text}
    </div>}>
      <div className='question-accordion-container'>
        <div className='question-container'>
          {
            title.map((titleData: QuestionOptionType, index: number) => <div key={index} className='question-title-sub-container'>
              {
                Boolean(index) && (<div className='question-title-text'>
                  {
                    titleData.text
                  }
                </div>)
              }
              {
                titleData?.imageUrl && (<img className='question-title-img' src={titleData.imageUrl} alt="" />)
              }
              {
                titleData?.iframe && (<iframe className='question-accordion-head-iframe' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" src={titleData.iframe}></iframe>)
              }
            </div>)

          }
          <div className='question-option-container'>
            {
              <Checkbox onSelect={(index, selectedValues) => setSelectedValues(Object.values(selectedValues))} isIncorrect={isAnswered && !isCorrect} options={options} className='question-checkbox' />
            }
          </div>
         {
          isAnswered && (isCorrect ? (
            <div className='question-correct-ans'>
              {successMsg}
            </div>
          ) : ( <div className='question-incorrect-ans'>
          { errorMsg }
        </div>))
         }
          <div className='question-submit-btn-wrapper'>
            <Button isLoading={isLoading} isDisabled={!selectedValues.length || isLoading} onClick={() => onSubmit(questionData, selectedValues)} iconPosition="center" className='question-submit-btn' />
          </div>
        </div>
      </div>
    </Accordion>
  )
}

export default QuestionAccordion