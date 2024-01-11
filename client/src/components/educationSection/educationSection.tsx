import "./educationSection.scss"

export const EducationalSection: React.FC<{ education: EducationalData; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ education, handleFieldUpdate, isEdit, index }) => {

    const handleBlur = (e: React.FocusEvent<HTMLSpanElement>, fieldPath: string) => {
        handleFieldUpdate(`educationalData.${index}.${fieldPath}`, e.currentTarget.innerText);
    };
    return (
        <div className="education box" id="education">
            <div
                onBlur={(e) => handleBlur(e, `.instituteName`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="instituteName"
            >
                {education.instituteName}
            </div>
            <div
                onBlur={(e) => handleBlur(e, `.course`)}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                className="course-name"
            >
                {education.course}
            </div>
            <div className="education-footer">
                <div
                    onBlur={(e) => handleBlur(e, `.startDate`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >
                    <span

                        onBlur={(e) => handleBlur(e, `.startDate`)}
                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}
                    >
                        {education.startDate}
                    </span> -&nbsp;
                    <span

                        onBlur={(e) => handleBlur(e, `.endDate`)}
                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}
                    >
                        {education.endDate}
                    </span>
                </div>
                <div
                    onBlur={(e) => handleBlur(e, `.CGPA`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >
                    {`CGPA: ${education.CGPA}`}
                </div>
            </div>
        </div>
    );
};
