import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions, selectCity } from "../slices/city/citySlice";
import { GET_CITIES } from "../../graphql/query/city/getAllCities";
export const useCity = () => {
    const dispatch = useDispatch();
    const cities = useSelector(selectCity);

    const getAllCities = async () => {
        try {
            const response = await apolloClient.query({
                query: GET_CITIES,
                variables: {},
            });
            dispatch(actions.setCity(response.data.getAllCities));
            return response;
        } catch (err) {
            console.log(err);
        }
    };


    return { cities, getAllCities };
};