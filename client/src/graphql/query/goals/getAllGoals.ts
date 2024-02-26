import { gql } from "@apollo/client";

export const GET_All_GOALS = gql`
    query GetAllGoals {
        getAllGoals {
            goals {
                _id
                title
                description
                goalType {
                    goalType
                }
                isAutomated
                frequency
                isActive
                startWeek {
                  weekNumber
                }
                endWeek {
                 weekNumber
                }
                questionList
                topicList
                subTopicList
                batchCode
                isMandatory
                createdAt
                updatedAt
                profileType
            }
            response {
                status
                message
            }
        }
    }
` 