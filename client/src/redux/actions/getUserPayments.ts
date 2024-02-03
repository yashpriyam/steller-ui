import React, { useState } from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { selectUserPayments ,setUserPayments } from "../slices/userPayments/userPaymentsSlice"; 
import { GET_USER_PAYMENTS } from "../../graphql/mutation/userPayments/getAllUserPayments"; 
import { useDispatch, useSelector } from "react-redux";

export const useUserPayments = () => {
  const userPayments = useSelector(selectUserPayments);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const getUserPayments = async (userId: string) => {
    try {
      setIsLoading(true)
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
    finally {
      setIsLoading(false)
    }
  };

  return {
    userPayments,
    getUserPayments,
    isLoading
  };
};
