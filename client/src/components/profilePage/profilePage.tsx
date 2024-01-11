
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "./profile.scss"
import { PersonalDetailSection } from '../personalDetailsSection/personalDetailsSection';
import { AchievementSection } from '../achievementSection/achievementSection';
import { SkillsSection } from '../skillSection/skillSection';
import { ExperienceSection } from '../experienceSection/experienceSection';
import { ProjectSection } from '../projectSection/projectSection';
import { EducationalSection } from '../educationSection/educationSection';
import { ProfileAvatar } from '../../icons/profileAvatar';
import { ProfileBackGroundImg } from '../../icons/profileBackGroundImg';
import SaveIcon from '../../icons/saveIcon';
import EditIcon from '../../icons/editIcon';
import UploadIcon from '../../icons/fileUploadIcon';
import CrossIcon from '../../icons/CrossIcon';
import Accordion from '../../components/accordion/accordion';


const ProfilePage: React.FC<ProfileProps> = ({ dataProfile }) => {
    const [data, setData] = useState<ResumeData>(dataProfile);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
    const [backgroundImgUrl, setBackgroundImgUrl] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleImageChange(event, setProfileImgUrl);
    };

    const handleBackgroundImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleImageChange(event, setBackgroundImgUrl);
    };

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>,
        setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile) {
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
            const fileExtension = selectedFile.name.slice(
                ((selectedFile.name.lastIndexOf('.') - 1) >>> 0) + 2
            );
            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageUrl(event.target?.result as string);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                alert('Invalid file type. Please upload a JPG, JPEG, or PNG file.');
                if (event.target) {
                    event.target.value = '';
                }
            }
        }
    };

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
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [isMobileView]);


    return (

        isMobileView ? (
            <div className={`main-container`}>
                <div className="button-container">
                    <button onClick={handleEditToggle}>{isEdit ? <SaveIcon /> : <EditIcon />}</button>
                </div>
                <div className="header-container">
                    <div className="background-img-container">
                        <div className="background-upload-container">
                            <label htmlFor="background-img-upload" className="background-img-upload-label">
                                <UploadIcon />
                            </label>
                            <input
                                onChange={handleBackgroundImageChange}
                                type="file"
                                id="background-img-upload"
                                className="background-img-upload"
                            />
                        </div>
                        {backgroundImgUrl ? (
                            <img src={backgroundImgUrl} className="background-img" alt="Background Image" />
                        ) : (
                            <ProfileBackGroundImg className="background-img" />
                        )}
                    </div>
                    <div className="sub-header-container">
                        <div className="middle-container">
                            <div className="profile-img-container">
                                {profileImgUrl ? (
                                    <img src={profileImgUrl} className="profile-img" alt="Profile Image" />
                                ) : (
                                    <ProfileAvatar className="profile-img" />
                                )}
                                <div className="profile-upload-container">
                                    <label htmlFor="profile-img-upload" className="profile-img-upload-label">
                                        <UploadIcon />
                                    </label>
                                    <input
                                        onChange={handleProfileImageChange}
                                        type="file"
                                        id="profile-img-upload"
                                        className="profile-img-upload"
                                    />
                                </div>
                            </div>
                        </div>
                        <div ref={iconRef} className={`icon ${isExpanded ? 'rotate' : ''}`} onClick={toggleExpansion}>
                            <CrossIcon />

                        </div>
                    </div>
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

                {isExpanded && (
                    <div className="hidden-element"
                    >
                        <PersonalDetailSection isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} data={data?.socialDetail} />
                    </div>
                )}


                <div className='nav-bar'>
                    <a href="#experience">Experience</a>
                    <a href="#skill">Skill</a>
                    <a href="#education">Education</a>
                    <a href="#achievements">Achievements</a>
                    <a href="#project">Project</a>
                </div>

                <div className="main-content">
                    <Accordion title='Experinece'>
                        {data?.experienceData && data?.experienceData?.map((obj: Experience, i: number) => (
                            <ExperienceSection index={i} handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} key={i} experience={obj} />
                        ))}
                    </Accordion>
                    <Accordion title='Skill'>
                        {data?.skillsData && <SkillsSection skillsData={data?.skillsData} />}
                    </Accordion>

                    <Accordion title='Education'>
                        {data?.educationalData && data?.educationalData?.map((obj: EducationalData, i: number) => (
                            <EducationalSection key={i} education={obj}
                                handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} index={i} />
                        ))}
                    </Accordion>

                    <Accordion title='Achievement'>
                        {data?.achievementsData && data?.achievementsData?.map((obj: Achievement, i: number) => (
                            <AchievementSection key={i} achievement={obj} />
                        ))}
                    </Accordion>


                    <Accordion title='Project'>
                        {data?.projectsData && data?.projectsData?.map
                            ((projectData: Project, i: number) => (
                                <ProjectSection index={i} isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} key={i} project={projectData} />
                            ))}
                    </Accordion>


                </div>

            </div>) : (

            <div className="main-container">
                <div className="button-container">
                    <button onClick={handleEditToggle}>{isEdit ? <SaveIcon /> : <EditIcon />}</button>
                </div>
                <div className="header-container">
                    <div className="background-img-container">
                        <div className="background-upload-container">
                            <label htmlFor="background-img-upload" className="background-img-upload-label">
                                <UploadIcon />
                            </label>
                            <input
                                onChange={handleBackgroundImageChange}
                                type="file"
                                id="background-img-upload"
                                className="background-img-upload"
                            />
                        </div>
                        {backgroundImgUrl ? (
                            <img src={backgroundImgUrl} className="background-img" alt="Background Image" />
                        ) : (
                            <ProfileBackGroundImg className="background-img" />
                        )}
                    </div>
                    <div className="sub-header-container">
                        <div className="middle-container">
                            <div className="profile-img-container">
                                {profileImgUrl ? (
                                    <img src={profileImgUrl} className="profile-img" alt="Profile Image" />
                                ) : (
                                    <ProfileAvatar className="profile-img" />
                                )}
                                <div className="profile-upload-container">
                                    <label htmlFor="profile-img-upload" className="profile-img-upload-label">
                                        <UploadIcon />
                                    </label>
                                    <input
                                        onChange={handleProfileImageChange}
                                        type="file"
                                        id="profile-img-upload"
                                        className="profile-img-upload"
                                    />
                                </div>
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

        ))

};



export default ProfilePage;




