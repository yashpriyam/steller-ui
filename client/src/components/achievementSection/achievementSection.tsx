import { SubCardContainer } from "../subCardContainer/subCardContainer";
import "./achievementSection.scss"

export const AchievementSection: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    return (
        <div className="achievements box" id="achievements">
            <SubCardContainer
                icon={achievement.icon} subHeader={achievement.header} subDescription={achievement.description} links={achievement.links} />
        </div>
    );
};
