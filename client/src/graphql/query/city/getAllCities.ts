import { gql } from "@apollo/client";

export const GET_CITIES = gql`
    query getAllCities {
        getAllCities {
            cityData
            response {
                status
                message
            }
        }
    }
`;