import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "./profilePage.scss"
import { PersonalDetailSection } from '../../components/personalDetailsSection/personalDetailsSection';
import { AchievementSection } from '../../components/achievementSection/achievementSection';
import { SkillsSection } from '../../components/skillSection/skillSection';
import { ExperienceSection } from '../../components/experienceSection/experienceSection';
import { ProjectSection } from '../../components/projectSection/projectSection';
import { EducationalSection } from '../../components/educationSection/educationSection';
import { ProfileAvatar } from '../../icons/profileAvatar';
import { ProfileBackGroundImg } from '../../icons/profileBackGroundImg';
import SaveIcon from '../../icons/saveIcon';
import EditIcon from '../../icons/editIcon';
import UploadIcon from '../../icons/fileUploadIcon';
import CrossIcon from '../../icons/CrossIcon';
import Accordion from '../../components/accordion/accordion';


const dataProfile = {
    personalDetail: {
        fullName: `John Doe`,
        headline: `Full Stack Developer passionate about creating efficient and scalable web applications`,
    },
    socialDetail: {
        address: {
            colony: `123, Main Street`,
            city: `Anytown, USA`,
        },
        phoneNumber: `+1234567890`,
        gmail: "johndoe@example.com",
        githubLink: `https://github.com/johndoe`,
        linkedInLink: `https://www.linkedin.com/in/johndoe/`,
    },
    experienceData: [
        {
            companyName: `TechHub Solutions`,
            companyLocation: `Anytown, USA`,
            role: `Full Stack Developer`,

            startDate: `June 2023`,
            endDate: `PRESENT`,
            description: [
                `Developed RESTful APIs using Node.js with Express.js, and utilized MongoDB for data storage`,
                `Implemented user authentication with JWTs, incorporating salting and hashing using bcrypt`,
                `Designed and implemented protected routes in React and secured APIs in Node with middleware`,
                `Created custom React hooks for standardized API data retrieval and responsive UI changes on window resize`,
            ],
            techStack: [`React`, `JavaScript`, `TypeScript`, `CSS(SCSS)`, `Git`],
        },
        {
            companyName: `TechHub Solutions`,
            companyLocation: `Anytown, USA`,
            startDate: `January 2023`,
            endDate: `June 2023`,
            role: `Software Engineer-Intern`,
            description: [
                `Developed React functional components, leveraging built-in hooks extensively`,
                `Designed and implemented components like Modal and Drawer using React Portal`,
                `Created responsive designs for various devices using CSS Flexbox`,
                `Implemented native CSS animations and experimented with parallax effects`,
                `Contributed to GitHub repositories by creating and merging pull requests, and resolving deployment issues`,
            ],
            techStack: [`React`, `JavaScript`, `CSS(SCSS)`, `Git`],
        },
    ],
    projectsData: [
        {
            heading: "E-commerce Website",
            description: ["Implemented complex state management for handling nested JSON data",
                "Developed a custom React carousel, enabled image uploads to Cloudinary, and implemented auto-saving via localStorage",
                "Integrated conditional rendering, pagination, and column sorting in both ascending and descending orders",
            ],
            deployLink: "https://example.com/ecommerce",
            gitHubLink: "https://github.com/johndoe/ecommerce",
        },
        {
            heading: "Task Manager App",
            description: ["Developed a Tic-Tac-Toe game with standard rules and player scorekeeping system",
                "Implemented functionality for restarting, resuming, and exiting the game",
            ],
            deployLink: "https://example.com/tictactoe",
            gitHubLink: "https://github.com/johndoe/tictactoe",
            techStack: [`React`, `JavaScript`, `CSS(SCSS)`, `Git`],
        },
    ],
    skillsData: {
        language: [`JavaScript`, `TypeScript`, `HTML`, `CSS`],
        frontend: [`React`, `Redux`, `Context`],
        backend: [`NodeJs`, `ExpressJs`, `Postman`],
        database: [`MongoDB`, `Local Storage`, `Session Storage`, `Cookies`],
        "Version Control": [`Git and Github`],
        "CI/CD": [`Github Action`, `Netlify`]
    },
    educationalData: [
        {
            instituteName: "Tech University",
            location: "Anytown, USA",
            course: "Bachelor of Science in Computer Science",
            startDate: `September 2018`,
            endDate: `May 2022`,
            CGPA: "3.8/4.0",
        },
        {
            instituteName: "Tech University",
            location: "Anytown, USA",
            course: "Master of Science in Computer Science",
            startDate: `September 2022`,
            endDate: `May 2024`,
            CGPA: "4.0/4.0",
        }
    ],
    achievementsData: [
        {
            icon: "",
            header: "CodeWars 3 Kyu",
            description: "Lorem ipsum dolor sit amet",
            links: "https://www.codewars.com/users/johndoe",
        },
        {
            icon: "",
            header: "HackerRank Gold Badge",
            description: "Lorem ipsum dolor sit amet",
            links: "https://www.hackerrank.com/johndoe",
        },
    ],
};

const ProfilePage = () => {
    const [data, setData] = useState<ResumeData | null>(dataProfile);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
    const [backgroundImgUrl, setBackgroundImgUrl] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
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
            <div className={`profile-main-container`}>
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
                    <a className='nav-bar-a' href="#experience">Experience</a>
                    <a className='nav-bar-a' href="#skill">Skill</a>
                    <a className='nav-bar-a' href="#education">Education</a>
                    <a className='nav-bar-a' href="#achievements">Achievements</a>
                    <a className='nav-bar-a' href="#project">Project</a>
                </div>
                <div className="main-content">
                    <Accordion className='accordian-mobile-view' title='Experience'>
                        <div className="accordion-child">
                            {data?.experienceData && data?.experienceData?.map((obj: Experience, i: number) => (
                                <Accordion className='accordian-mobile-view' subTitle={`${obj.companyName} - ${obj.role}`}>
                                    <ExperienceSection index={i} handleFieldUpdate={handleFieldUpdate} mobileViewOn={true} isEdit={isEdit} key={i} experience={obj} />
                                </Accordion>
                            ))}
                        </div>
                    </Accordion>
                    <Accordion className='accordian-mobile-view' title='Skill'>
                        {data?.skillsData && <SkillsSection skillsData={data?.skillsData} mobileViewOn={true} />}

                    </Accordion>
                    <Accordion className='accordian-mobile-view' title='Education'>
                        <div className="accordion-child">
                            {data?.educationalData && data?.educationalData?.map((obj: EducationalData, i: number) => (
                                <Accordion className='accordian-mobile-view' subTitle={obj.instituteName}>
                                    <EducationalSection key={i} education={obj} mobileViewOn={true}
                                        handleFieldUpdate={handleFieldUpdate} isEdit={isEdit} index={i} />
                                </Accordion>
                            ))}
                        </div>
                    </Accordion>
                    <Accordion className='accordian-mobile-view' title='Achievement'>
                        {data?.achievementsData && data?.achievementsData?.map((obj: Achievement, i: number) => (
                            <AchievementSection key={i} achievement={obj} />
                        ))}
                    </Accordion>

                    <Accordion className='accordian-mobile-view' title={"Project"}>
                        <div className="accordion-child">  {data?.projectsData && data?.projectsData?.map
                            ((projectData: Project, i: number) => (
                                <Accordion className='accordian-mobile-view' subTitle={projectData.heading}>
                                    <ProjectSection index={i} isEdit={isEdit} handleFieldUpdate={handleFieldUpdate} key={i} mobileViewOn={true} project={projectData} ></ProjectSection>
                                </Accordion >))}
                        </div>
                    </Accordion>

                </div>
            </div>) : (
            <div className="profile-main-container">
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