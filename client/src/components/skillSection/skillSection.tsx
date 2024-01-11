import { CardContainer } from "../cardContainer/cardContainer";
import { SubCardContainer } from "..//subCardContainer/subCardContainer";
import "./skillSection.scss"

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillsData = {} }) => {
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div className="skill" id="skill">
            {Object?.entries(skillsData)?.map(([category, skills]) => (
                <CardContainer key={category} header={capitalizeFirstLetter(category)}>
                    {skills?.map((skill) => (
                        <SubCardContainer key={skill} subHeader={skill} />
                    ))}
                </CardContainer>
            ))}
        </div>
    );
};
