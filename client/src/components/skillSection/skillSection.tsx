import React from 'react';
import { CardContainer } from "../cardContainer/cardContainer";
import { SubCardContainer } from "..//subCardContainer/subCardContainer";
import "./skillSection.scss"
import Accordion from '../accordion/accordion';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillsData = {}, mobileViewOn = false, }) => {
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
        <div className="skill" id="skill">
            {!mobileViewOn ? (Object?.entries(skillsData)?.map(([category, skills]) => (
                <CardContainer key={category} header={capitalizeFirstLetter(category)}>
                    {skills?.map((skill) => (
                        <SubCardContainer key={skill} subHeader={skill} />
                    ))}
                </CardContainer>
            ))) : (Object?.entries(skillsData)?.map(([category, skills]) => (
                <div className="accordion-child-skill">  <Accordion subTitle={capitalizeFirstLetter(category)}>
                    {skills?.map((skill) => (
                        <SubCardContainer key={skill} subHeader={skill} />
                    ))}
                </Accordion>
                </div>
            )))}
        </div>
    );
};