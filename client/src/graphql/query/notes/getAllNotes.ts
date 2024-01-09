import { gql } from "@apollo/client";

export const GET_NOTES = gql`
    query GetAllNotes($filterData: getNotesFilterInputType) {
        getAllNotes(filterData: $filterData) {
            notesData {
                link
                title
                dayNumber
                topics
                noOfPages
                description
                estimatedReadingTime
            }
            response {
                status
                message
            }
        }
    }
`;