import "./educationSection.scss"

export const EducationalSection: React.FC<{ education: EducationalData; handleFieldUpdate: Function; isEdit: boolean; index: number }> = ({ education, handleFieldUpdate, isEdit, index }) => {

    const handleBlur = (e: React.FocusEvent<HTMLSpanElement>, fieldPath: string) => {
        handleFieldUpdate(fieldPath, e.currentTarget.innerText);
    };
    return (
        <div className="education ">
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
            <div className="education-footer">
                <div
                    onBlur={(e) => handleBlur(e, `educationalData.${index}.startDate`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >
                    <span

                        onBlur={(e) => handleBlur(e, `educationalData.${index}.startDate`)}
                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}
                    >
                        {education.startDate}
                    </span> -&nbsp;
                    <span

                        onBlur={(e) => handleBlur(e, `educationalData.${index}.endDate`)}
                        contentEditable={isEdit}
                        suppressContentEditableWarning={true}
                    >
                        {education.endDate}
                    </span>
                </div>
                <div
                    onBlur={(e) => handleBlur(e, `educationalData.${index}.CGPA`)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                >
                    {`CGPA: ${education.CGPA}`}
                </div>
            </div>
        </div>
    );
};
