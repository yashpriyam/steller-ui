import "./projectSection.scss"

export const ProjectSection: React.FC<{ project: Project; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ project, handleFieldUpdate, isEdit, index }) => {

    const handleBlur = (e: React.FocusEvent<HTMLDivElement | HTMLSpanElement | HTMLLIElement>, fieldPath: string) => {
        handleFieldUpdate(`projectsData.${index}.${fieldPath}`, e.currentTarget.innerText);
    };

    return (
        <div className="project box" id="project">
            <div
                onBlur={(e) => handleBlur(e, 'heading')}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="project-heading"
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
                <div className="project-links">
                    <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer" contentEditable={isEdit}>
                        GitHubLink
                    </a>{' '}
                </div>
            )}
            {project.deployLink && (
                <div className="project-links">
                    <a href={project.deployLink} target="_blank" rel="noopener noreferrer" contentEditable={isEdit}>
                        DeployLink
                    </a>{' '}
                </div>
            )}
            {project?.techStack && (
                <div className='project-footer'>
                    <span className='tech-stack-project'>Tech Stack : </span>
                    <div
                        className="tech-lang-project"
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
