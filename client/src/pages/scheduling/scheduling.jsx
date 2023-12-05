import React from 'react';
import './scheduling.scss';
import Accordion from '../../components/accordion/accordion';
import { Button } from '../../components/button/button';
import { accordionDataList, checkboxDataList } from './accordionDataList';

const Scheduling = () => {
  
  return (
    <div className="scheduling-page">
      <div className="scheduling-page-filter-container">
        <div className="filter-sub-container">
          <label className="filter-heading">Filter</label>
          <div className="checkbox-content">
            {checkboxDataList.map((option) => (
              <div className="checkbox-wrapper">
                <input type="checkbox" id={option} />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scheduling-page-accordion">
        {accordionDataList.map((accordion, index) => (
          <Accordion title={accordion.title} key={index}>
            <div className="schedule-accordion-description">
              {accordion.description}
            </div>
            <div className="daylist-container">
              {accordion?.days.map((dayInfo, index) => (
                <div className="day-container">
                  <div className="accordion-button-container">
                    <strong className="title">Day 1 - </strong>
                    <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nisi velit repudiandae ad fuga accusamus. </p>
                    <div className="btn-wrapper">
                      <Button
                        text="Assignments"
                        className="assignment-buttons red-btn btn"
                      />
                      <Button text="Notes" className="notes-btns btn" />
                      <Button text="Videos" className="youtube-btns btn" />
                      <Button text="Links" className="yellow-btns btn" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Scheduling