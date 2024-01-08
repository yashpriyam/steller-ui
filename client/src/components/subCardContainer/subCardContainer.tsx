import "./subCardContainer.scss"
import ProfileIcon from '../../icons/icons8-medium-icons-64.svg';

export const SubCardContainer: React.FC<{ icon?: string; subHeader?: string; subDescription?: string; links?: string }> = ({
    icon,
    subHeader,
    subDescription,
    links,
}) => {
    return (
        <div className={`sub-container ${icon ? 'icon-available' : 'icon-not-available'}`}>
            <div className="img-sub-container">
                <img src={ProfileIcon} alt="" />
            </div>
            <div className="aside-section">
                {subHeader && <div className="sub-header">{subHeader}</div>}
                {subDescription && <div className="sub-description">{subDescription}</div>}
                {links && <div className="sub-links">Link {links} </div>}
            </div>
        </div>
    );
};
