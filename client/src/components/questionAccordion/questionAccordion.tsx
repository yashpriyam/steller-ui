import React, { useState } from 'react';
import Accordion from '../accordion/accordion';
import './questionAccordion.scss'
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';

const QuestionAccordion = ({
  questionData,
  onSubmit,
}: any) => {
  const [selectedValues, setSelectedValues] = useState<{}[]>([]);
  const { question, options } = questionData;
  return (
    <Accordion className={`question-title`} title={<div className='question-title'>
      {question[0].text}
    </div>}>
      <div className='question-accordion-container'>
        <div className='question-container'>
          {
            question.map((titleData: any) => <div className='question-title-sub-container'>
              <div className='question-title-text'>
                {
                  titleData.text
                }
              </div>
              <img className='question-title-img' src={titleData.imageUrl} alt="" />
            </div>)

          }
          <div className='question-option-container'>
            {
              <Checkbox onSelect={(index, selectedValues) => setSelectedValues(Object.values(selectedValues))} options={options} className='question-checkbox' />
            }
          </div>
          <div className='question-submit-btn-wrapper'>
            <Button isDisabled={!selectedValues.length} onClick={() => onSubmit(questionData, selectedValues)} iconPosition="center" className='question-submit-btn' />
          </div>
        </div>
      </div>
    </Accordion>
  )
}

export default QuestionAccordion