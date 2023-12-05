import React from 'react';
import './scheduling.scss';
import Accordion from '../../components/accordion/accordion';
import { Button } from '../../components/button/button';

const Scheduling = () => {
  const accordionDataList = [{
    title: 'Week 1',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    days: [{
      title: 'day 1',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: '',

    }, {
      title: 'day 2',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 3',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 4',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 5',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }]
  },
  {
    title: 'Week 2',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    days: [{
      title: 'day 1',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: '',

    }, {
      title: 'day 2',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 3',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 4',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 5',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }]
  },
  {
    title: 'Week 3',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    days: [{
      title: 'day 1',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: '',

    }, {
      title: 'day 2',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 3',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 4',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 5',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }]
  }, {
    title: 'Week 4',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    days: [{
      title: 'day 1',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: '',

    }, {
      title: 'day 2',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 3',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 4',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 5',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }]
  }, {
    title: 'Week 5',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    days: [{
      title: 'day 1',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: '',

    }, {
      title: 'day 2',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 3',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 4',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }, {
      title: 'day 5',
      description: '',
      vedioUrl: '',
      notesUrl: '',
      assignmentUrl: ''
    }]
  }]
  return (
    <div className='scheduling-page'>
      <div className='scheduling-page-filter-container'>

      </div>
      <div className='scheduling-page-accordion'>
        {
          accordionDataList.map((accordion, index) => <Accordion title={accordion.title} key={index}>
            <div className='schedule-accordion-description'>
              {
                accordion.description
              }
            </div>
            <div className='daylist-container'>
              {
              accordion?.days.map((dayInfo, index) => <div className='day-container'>
                <div className='accordion-button-container'>
                  <strong>Day 1 - </strong>
                  <Button text='assignments' className='assignment-button' />
                  <Button text='notes' />
                  <Button text='videos' />
                </div>
              </div>)
            }
            </div>
          </Accordion>)
        }
      </div>
    </div>
  )
}

export default Scheduling