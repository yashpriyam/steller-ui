
import React, { useState, useEffect, useRef } from 'react';
import "./Profile.scss"
interface Address {
    colony: string;
    city: string;
}
interface SocialDetail {
    address: Address;
    phoneNumber: string;
    gmail: string;
    githubLink: string;
    linkedInLink: string;
}
interface Experience {
    companyName: string;
    companyLocation: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string[];
    techStack: string[];
}
interface Project {
    heading: string;
    description: string[];
    deployLink: string;
    gitHubLink: string;
    techStack?: string[];
}
interface Achievement {
    icon: string;
    header: string;
    description: string;
    links: string;
}
interface SkillsData {
    [key: string]: string[];
}

interface EducationalData {
    instituteName: string;
    location: string;
    course: string;
    startDate: string;
    endDate: string;
    CGPA: string;
}
interface ResumeData {
    personalDetail: {
        fullName: string;
        headline: string;
    };
    socialDetail: SocialDetail;
    experienceData: Experience[];
    projectsData: Project[];
    skillsData: SkillsData;
    educationalData: EducationalData[];
    achievementsData: Achievement[];
}
interface ProfileProps {
    dataProfile: ResumeData;
}
const PersonalDetail: React.FC<{ data: SocialDetail; handleFieldUpdate: Function; isEdit: boolean }> = ({ data, handleFieldUpdate, isEdit }) => {
    return (
        <div className="personal-details-card">
            <div
                onBlur={(e) => handleFieldUpdate('socialDetail.address.colony', e.currentTarget.innerText)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="address"
            >
                {data?.address?.colony}
            </div>

            <div
                onBlur={(e) => handleFieldUpdate('socialDetail.address.city', e.currentTarget.innerText)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="address">{data?.address?.city}</div>
            <div
                onBlur={(e) => handleFieldUpdate('socialDetail.phoneNumber', e.currentTarget.innerText)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="phone-number"
            >
                {data?.phoneNumber}
            </div>
            <div
                onBlur={(e) => handleFieldUpdate('socialDetail.gmail', e.currentTarget.innerText)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="gmail"
            >
                {data?.gmail}
            </div>
            <div className="github-link">
                <a href={data?.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            </div>
            <div className="linkdln-link">
                <a href={data?.linkedInLink} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
            </div>
        </div>
    );
};

const AchievementItem: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    return (
        <div className="achievements">
            <SubContainer icon={achievement.icon} subHeader={achievement.header} subDescription={achievement.description} links={achievement.links} />
        </div>
    );
};
interface SkillsComponentProps {
    skillsData: SkillsData;
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ skillsData = {} }) => {
    return (
        <div className="skill box">
            {Object?.entries(skillsData)?.map(([category, skills]) => (
                <CardContainer key={category} header={category}>
                    {skills?.map((skill) => (
                        <SubContainer key={skill} subHeader={skill} />
                    ))}
                </CardContainer>
            ))}
        </div>
    );
};

const CardContainer: React.FC<{ header: string; children: React.ReactNode }> = ({ header, children }) => {
    return (
        <div className="card-container">
            <div className="card-header">{header}</div>
            {children}
        </div>
    );
};
const SubContainer: React.FC<{ icon?: string; subHeader?: string; subDescription?: string; links?: string }> = ({
    icon,
    subHeader,
    subDescription,
    links,
}) => {
    return (
        <div>
            <div className={`sub-container ${icon ? 'icon-available' : 'icon-not-available'}`}>
                {icon && (
                    <div className={`img-sub-container`}>
                        {icon}
                    </div>
                )}
                <div className="aside-section">
                    {subHeader && <div className="header">{subHeader}</div>}
                    {subDescription && <div className="description">{subDescription}</div>}
                    {links && <div className="links">Link {links} </div>}
                </div>
            </div>
        </div>
    );
};

const ExperienceItem: React.FC<{ experience: Experience; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ experience, handleFieldUpdate, isEdit, index }) => {

    const handleBlur = (e: React.FocusEvent<HTMLDivElement | HTMLSpanElement>, fieldPath: string) => {
        handleFieldUpdate(fieldPath, e.currentTarget.innerText);
    };

    return (
        <div className="experience box">
            <div className="header-experience">
                <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.companyName`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    className="company-name">{experience?.companyName}</span>,
                <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.companyLocation`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}>{experience?.companyLocation}</span>
                <span
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.role`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}>{experience?.role}</span>
            </div>
            <div
                onBlur={(e) => handleBlur(e, `experienceData.${index}.startDate`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="sub-heading">
                <div>
                    {experience?.startDate} - {experience?.endDate}
                </div>
                <div>Daily Work Involve</div>
            </div>
            <ul className="list-experience-description">
                {experience.description?.map((item: string, descIndex: number) => (
                    <li key={descIndex} contentEditable={isEdit} onBlur={(e) => handleBlur(e, `experienceData.${index}.description.${descIndex}`)}>
                        {item}
                    </li>
                ))}
            </ul>
            <div>
                <span>Tech Stack</span>: <div
                    onBlur={(e) => handleBlur(e, `experienceData.${index}.techStack`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    className="experience-footer">
                    {Array.isArray(experience.techStack) ? experience.techStack.join(', ') : experience.techStack}
                </div>
            </div>

        </div>
    );
};

const ProjectItem: React.FC<{ project: Project; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ project, handleFieldUpdate, isEdit, index }) => {
    const handleBlur = (e: React.FocusEvent<HTMLDivElement | HTMLSpanElement | HTMLLIElement>, fieldPath: string) => {
        handleFieldUpdate(`projectsData.${index}.${fieldPath}`, e.currentTarget.innerText);
    };

    return (
        <div className="project box">
            <div
                onBlur={(e) => handleBlur(e, 'heading')}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
            >
                {project.heading}
            </div>
            <ul className="list-experience-description">
                {project.description?.map((item: string, descIndex: number) => (
                    <li
                        key={descIndex}
                        contentEditable={isEdit}
                        onBlur={(e) => handleBlur(e, `description.${descIndex}`)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            {project.gitHubLink && (
                <span>
                    <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer" contentEditable={isEdit}>
                        GitHubLink
                    </a>{' '}
                </span>
            )}
            {project.deployLink && (
                <span>
                    <a href={project.deployLink} target="_blank" rel="noopener noreferrer" contentEditable={isEdit}>
                        DeployLink
                    </a>{' '}
                </span>
            )}
            {project?.techStack && (
                <div>
                    <span>Tech Stack :</span> <div
                        className="experience-footer"
                        onBlur={(e) => handleBlur(e, 'techStack')}
                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}>
                        {Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}
                    </div>
                </div>
            )}
        </div>
    );
};

const EducationalItem: React.FC<{ education: EducationalData; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ education, handleFieldUpdate, isEdit, index }) => {
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>, fieldPath: string) => {
        handleFieldUpdate(fieldPath, e.currentTarget.innerText);
    };
    return (
        <div className="education box">
            <div
                onBlur={(e) => handleBlur(e, `educationalData.${index}.instituteName`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
            >
                {education.instituteName}
            </div>
            <div
                onBlur={(e) => handleBlur(e, `educationalData.${index}.course`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
            >
                {education.course}
            </div>
            <div
                onBlur={(e) => handleBlur(e, `educationalData.${index}.startDate`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
            >
                {`${education.startDate} - ${education.endDate}`}
            </div>
            <div
                onBlur={(e) => handleBlur(e, `educationalData.${index}.CGPA`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
            >
                {`CGPA: ${education.CGPA}`}
            </div>
        </div>
    );
};


const Profile: React.FC<ProfileProps> = ({ dataProfile }) => {
    const [data, setData] = useState<ResumeData>(dataProfile);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const handleEditToggle = () => setIsEdit(!isEdit);

    const handleFieldUpdate = (path: string, value: string) => {
        const newData = updateNestedData(data, path, value);
        setData(newData);
    };

    const updateNestedData = (originalData: any, path: string, value: string) => {
        const newData = { ...originalData };
        const pathArray = path.split('.');
        let currentLevel: any = newData;

        for (let i = 0; i < pathArray.length - 1; i++) {
            const pathSegment = pathArray[i];
            currentLevel[pathSegment] = currentLevel[pathSegment] || {};
            currentLevel = currentLevel[pathSegment];
        }
        const lastPathSegment = pathArray[pathArray.length - 1];
        currentLevel[lastPathSegment] = value;
        return newData;
    };
    console.log({ data });

    return (
        <div className="main-container">
            <div className="button-container">
                <button onClick={handleEditToggle}>{isEdit ? "Save" : "Edit"}</button>
            </div>
            <div className="header-container">
                <div className="background-img">{/* Background image content */}</div>
                <div className="sub-header-container">
                    <div className="profile-img-container">{/* Profile image content */}</div>
                    <div
                        contentEditable={isEdit}
                        onBlur={(e) => handleFieldUpdate('personalDetail.fullName', e.currentTarget.innerText)}
                        suppressContentEditableWarning={true}
                    >
                        {data?.personalDetail?.fullName}
                    </div>
                    <PersonalDetail isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} data={data?.socialDetail} />
                </div>
            </div>
            <div
                className="description box"
                contentEditable={isEdit}
                onBlur={(e) => handleFieldUpdate('personalDetail.headline', e.currentTarget.innerText)}
                suppressContentEditableWarning={true}
            >
                {data?.personalDetail?.headline}
            </div>

            <div className="bottom-section box">
                <div className="left-bottom-section box">
                    {data?.experienceData?.map((obj: Experience, i: number) => (
                        <ExperienceItem index={i} handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} key={i} experience={obj} />
                    ))}
                    {data?.projectsData?.map((projectData: Project, i: number) => (
                        <ProjectItem index={i} isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} key={i} project={projectData} />
                    ))}
                    {data?.achievementsData?.map((obj: Achievement, i: number) => (
                        <AchievementItem key={i} achievement={obj} />
                    ))}
                </div>
                <div className="right-bottom-section box">
                    <SkillsComponent skillsData={data?.skillsData} />
                    {data?.educationalData?.map((obj: EducationalData, i: number) => (
                        <EducationalItem key={i} education={obj} handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} index={i} />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Profile;
