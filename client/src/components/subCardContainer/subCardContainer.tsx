import "./subCardContainer.scss"
import VerifiedIcon from "../../icons/varifiedLanguage";

type StyleIcon = {
    alignItems: "flex-start" | "center";
};

export const SubCardContainer: React.FC<{ icon?: string; subHeader?: string; subDescription?: string; links?: string }> = ({
    icon,
    subHeader,
    subDescription,
    links,
}) => {

    const styleIcon: StyleIcon = {
        alignItems: subDescription ? "flex-start" : "center",
    };
    return (
        <div style={{ ...styleIcon }} className={`sub-container ${icon ? 'icon-available' : 'icon-available'}`}>
            <div
                className={`img-sub-container`}>
                <VerifiedIcon />
            </div>
            <div className="aside-section">
                {subHeader && <div className="sub-header">{subHeader}</div>}
                {subDescription && <div className="sub-description">{subDescription}</div>}
                {links && <div className="sub-links">Link {links} </div>}
            </div>
        </div>
    );
};
