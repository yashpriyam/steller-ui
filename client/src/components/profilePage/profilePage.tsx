
import React, { useState } from 'react';
import "./profile.scss"
import { PersonalDetailSection } from '../personalDetailsSection/personalDetailsSection';
import { AchievementSection } from '../achievementSection/achievementSection';
import { SkillsSection } from '../skillSection/skillSection';
import { ExperienceSection } from '../experienceSection/experienceSection';
import { ProjectSection } from '../projectSection/projectSection';
import { EducationalSection } from '../educationSection/educationSection';
import { ProfileAvatar } from '../../icons/profileAvatar';
import dummyAvatar from '../../icons/dummy-avatar.svg';
import { ProfileBackGroundImg } from '../../icons/profileBackGroundImg';
import dummyBGI from '../../icons/dummy-bgi.svg';
import SaveIcon from '../../icons/saveIcon';
import EditIcon from '../../icons/editIcon';




const ProfilePage: React.FC<ProfileProps> = ({ dataProfile }) => {
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



    return (

        <div className="main-container">
            <div className="button-container">
                <button onClick={handleEditToggle}>{isEdit ? <SaveIcon /> : <EditIcon />}</button>
            </div>
            <div className="header-container">
                <div className="background-img-container">
                    <ProfileBackGroundImg />
                    {/* <img src={dummyBGI} className="background-img" alt="BackGroundIMG" /> */}
                </div>

                <div className="sub-header-container">
                    <div className="middle-container">
                        <div className="profile-img-container">
                            <ProfileAvatar className='profile-img' />
                            {/* <img src={dummyAvatar} className='profile-img' alt="" /> */}
                        </div>
                        <div className="name-headline-container">
                            <div
                                contentEditable={isEdit}
                                onBlur={(e) => handleFieldUpdate('personalDetail.fullName', e.currentTarget.innerText)}
                                suppressContentEditableWarning={true}
                                className='name-container'
                            >
                                {data?.personalDetail?.fullName}
                            </div>
                            <div
                                className="headline"
                                contentEditable={isEdit}
                                onBlur={(e) => handleFieldUpdate('personalDetail.headline', e.currentTarget.innerText)}
                                suppressContentEditableWarning={true}
                            >
                                {data?.personalDetail?.headline}
                            </div>
                        </div>
                    </div>
                    <PersonalDetailSection isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} data={data?.socialDetail} />
                </div>
            </div>
            <div className="details-section">
                <div className="left-details-section ">
                    <div className="title-head box">
                        <span className='title-heading'>Experience</span>
                        {data?.experienceData && data?.experienceData?.map((obj: Experience, i: number) => (
                            <ExperienceSection index={i} handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} key={i} experience={obj} />
                        ))}
                    </div>

                    <div className="title-head box">
                        <span className='title-heading'>Project</span>
                        {data?.projectsData && data?.projectsData?.map
                            ((projectData: Project, i: number) => (
                                <ProjectSection index={i} isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} key={i} project={projectData} />
                            ))}
                    </div>
                    <div className="title-head box">
                        <span className='title-heading'>Achievements</span>
                        {data?.achievementsData && data?.achievementsData?.map((obj: Achievement, i: number) => (
                            <AchievementSection key={i} achievement={obj} />
                        ))}
                    </div>
                </div>
                <div className="right-details-section ">
                    <div className="title-head box">
                        <span className='title-heading'>Skill</span>
                        {data?.skillsData && <SkillsSection skillsData={data?.skillsData} />}
                    </div>
                    <div className="title-head box">
                        <span className='title-heading'>Education</span>
                        {data?.educationalData && data?.educationalData?.map((obj: EducationalData, i: number) => (
                            <EducationalSection key={i} education={obj}
                                handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )

};



export default ProfilePage;
