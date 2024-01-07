import React, { useState } from 'react';
import Accordion from '../accordion/accordion';
import './questionAccordion.scss'
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';

const QuestionAccordion = ({
  questionData,
  onSubmit,
}: any) => {
  const [selectedValues, setSelectedValues] = useState<{}>({});
  const { question, options } = questionData;
  return (
    <Accordion className='question-title' title={<div className='question-title'>
      {question[0].text}
    </div>}>
      <div className='question-accordion-container'>
        <div>
          {
            question.map((top: any) => <div className='question-title-sub-container'>
              <div className='question-title-text'>
              </div>
              <div className='question-option-container'>
                {
                  <Checkbox onSelect={(index, selectedValues) => setSelectedValues(selectedValues)} options={options} className='question-checkbox' />
                }
              </div>
              <div className='question-submit-btn-wrapper'>
                <Button onClick={()=> onSubmit(questionData, Object.values(selectedValues))} iconPosition="center" className='question-submit-btn' />
              </div>
            </div>)
          }
        </div>
      </div>
    </Accordion>
  )
}

export default QuestionAccordion