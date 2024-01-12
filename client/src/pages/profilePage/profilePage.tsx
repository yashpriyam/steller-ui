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
        fullName: `Sagar Jaiswal`,
        headline: `Frontend developer focused on creating clean, reusable code for enhanced readability and maintainability`,
    },
    socialDetail: {
        address: {
            colony: `81, Sonagiri`,
            city: `Bhopal, India`,
        },
        phoneNumber: `+918959829465`,
        gmail: "sagarjaiswal81555@gmail.com",
        githubLink: `https://github.com/isagarjaiswal`,
        linkedInLink: `https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/`,
    },
    experienceData: [
        {
            companyName: `HackerKernel`,
            companyLocation: `Bhopal, M.P.`,
            role: `SDE ~ 1`,

            startDate: `May 2023`,
            endDate: `PRESENT`,
            description: [
                `Creating REST APIs using NodeJs with ExpressJs, and using MongoDB as Database`,
                `Implemented authentication flow using JWTs, Salting and then Hashing with bcrypt with SHA256 algo, and through cookies.`,
                `Implemented protected routes in React and protected and user-only APIs in Node by adding express.js middlewares`,
                `Wrote custom hook in React for getting API data in a fixed format, also for changing UI elements on "resize" event`,
            ],
            techStack: [`React`, `JavaScript`, `TypeScript`, `CSS(SCSS)`, `Git`],
        },
        {
            companyName: `HackerKernel`,
            companyLocation: `Bhopal, M.P.`,
            startDate: `Oct 2022`,
            endDate: `May 2023`,
            role: `Software Engineer-Intern`,
            description: [
                `Writing React functional components, using built-in hooks.`,
                `Extensive use of hooks such as useState, useEffect, useRef, and other advanced functions like forwardRef, React.memo.`,
                `Created components like Modal and Drawer using React Portal, Accordion, Tooltip, etc.`,
                `Created responsive design for Tablet, Phone, and Desktop using CSS Flexbox.`,
                `Added native CSS animations on the UI, tried implementing parallax effect as well.`,
                `Create PRs on Github, merge them once approved. Fix deployment bugs if CI throws error.`,
            ],
            techStack: [`React`, `JavaScript`, `CSS(SCSS)`, `Git`],
        },
    ],
    projectsData: [
        {
            heading: "ReactTable, @WebMasters",
            description: ["Gained proficiency in effectively utilizing complex state management, including handling deeply nested JSON data, within this application.", "In this project, I've created HTML's native drag-and-drop feature, developed a custom React carousel component, enabled image uploads to Cloudinary from the ground up, implemented auto-saving via localStorage, and integrated conditional rendering, pagination, and column sorting in both ascending and descending orders",
            ],
            deployLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
            gitHubLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/"
        },
        {
            heading: "Tic-Tac-Toe Game @WebMasters",
            description: ["The standard rules of a Tic-Tac-Toe game.", "Incorporated a player scorekeeping system to determine the victor.", "Add functionality for restarting, resuming, and exiting the game."],
            deployLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
            gitHubLink: "https://www.linkedin.com/in/sagar-jaiswal-b35bb321b/",
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
            instituteName: "Rajiv Gandhi Technological University",
            location: "Bhopal, India",
            course: "Bachelor of Technology (B.Tech) in Computer Science",
            startDate: `June 2022`,
            endDate: `May 2023`,
            CGPA: "8.01/10",
        },
        {
            instituteName: "Rajiv Gandhi Technological University",
            location: "Bhopal, India",
            course: "Bachelor of Technology (B.Tech) in Computer Science",
            startDate: `June 2022`,
            endDate: `May 2023`,
            CGPA: "8.01/10",
        }
    ],
    achievementsData: [
        {
            icon: "",
            header: "LeetCode 150 Questions",
            description: "Lorem ipsum dolor sit amet",
            links: "fghjk",
        },
        {
            icon: "",
            header: "HackerRank 5 Star",
            description: "Lorem ipsum dolor sit amet",
            links: "fghjdfghj",
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