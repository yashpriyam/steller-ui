import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { selectUserPayments ,setUserPayments } from "../slices/userPayments/userPaymentsSlice"; 
import { GET_USER_PAYMENTS } from "../../graphql/mutation/userPayments/getAllUserPayments"; 
import { useDispatch, useSelector } from "react-redux";

export const useUserPayments = () => {
  const userPayments = useSelector(selectUserPayments);
  const dispatch = useDispatch();

  const getUserPayments = async (userId: string) => {
    try {
      const response = await apolloClient.mutate({
        mutation: GET_USER_PAYMENTS,
        variables: {
          userId,
        },
      });       
      dispatch(setUserPayments(response.data));
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    userPayments,
    getUserPayments,
  };
};
