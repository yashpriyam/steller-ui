import React from 'react';
import "./experienceSection.scss"

export const ExperienceSection: React.FC<{ experience: Experience; handleFieldUpdate: Function; isEdit: boolean; index: number, mobileViewOn?: boolean }> = ({ experience, handleFieldUpdate, isEdit, index, mobileViewOn = false }) => {

    const handleBlur = (e: React.FocusEvent<HTMLDivElement | HTMLSpanElement>, fieldPath: string) => {
        handleFieldUpdate(fieldPath, e.currentTarget.innerText);
    };

    return (
        <div className="experience box" id="experience">
            <div className="header-experience">
                {experience?.companyName && !mobileViewOn && <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.companyName`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    className="company-name">{experience?.companyName}</span>}
                <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.companyLocation`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}>
                    {experience?.companyLocation}</span>

                {experience?.role && !mobileViewOn && <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.role`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}>
                    {experience?.role}
                </span>}
            </div>
            <div className="sub-heading">
                <span className='heading-in-sub-heading'
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.startDate`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >{experience?.startDate}</span>
                  -
                <span className='heading-in-sub-heading'
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.endDate`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >
                    {experience?.endDate}
                </span>
                <div className='heading-in-sub-heading' >Daily Work Involve</div>

            </div>
            <ul className="list-experience-description">
                {experience.description?.map((item: string, descIndex: number) => (
                    <li key={descIndex} contentEditable={isEdit} onBlur={(e) => handleBlur(e, `experienceData.${index}.description.${descIndex}`)}>
                        {item}
                    </li>
                ))}
            </ul>
            <div
                className="experience-footer"
            >
                <span className='tech-stack-experience'>Tech Stack : </span>

                <div
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.techStack`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    className='tech-lang-experience'
                >
                    {Array.isArray(experience.techStack) ? experience.techStack.join(', ') : experience.techStack}
                </div>
            </div>
        </div>
    );
};

