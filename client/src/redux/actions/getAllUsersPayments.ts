import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { selectAllUsersPayments, setAllUsersPayments } from "../slices/allusersPayments/allUsersPaymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS_PAYMENTS } from "../../graphql/mutation/admin/getAllUsersPayments";

export const useAllUsersPayments = () => {
  const allUsersPayments = useSelector(selectAllUsersPayments);
  const dispatch = useDispatch();

  const getAllUsersPayments = async (input: GetAllUserPaymentsInput) => {
    try {
      const response = await apolloClient.mutate({
        mutation: GET_ALL_USERS_PAYMENTS,
        variables: {
          input: {
            ...input
          }
        },
      });

      dispatch(setAllUsersPayments(response.data));
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    allUsersPayments,
    getAllUsersPayments,
  };
};
