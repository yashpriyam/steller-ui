import "./personalDetailsSection.scss"
export const PersonalDetailSection: React.FC<{ data?: SocialDetail; handleFieldUpdate: Function; isEdit: boolean }> = ({ data={}, handleFieldUpdate, isEdit }) => {
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
                style={{ whiteSpace: isEdit ? 'normal' : 'nowrap' }}
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