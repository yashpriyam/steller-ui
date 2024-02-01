import { useDispatch } from "react-redux";
import { apolloClient } from "../../../graphql/apolloClient/apolloClient";
import { UPDATE_USER_PAYMENT } from "../../../graphql/mutation/admin/updateUserPayment";
import { useState } from "react";
import { REJECT_USER_PAYMENT } from "../../../graphql/mutation/admin/rejectUserPayments";

export const useAdmin = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const updateUserPayment = async (
    status: string,
    input: UpdateUserPaymentInput
  ) => {
    try {
      setIsLoading(true);
      if (status === 'approved') {
      const response = await apolloClient.mutate({
        mutation: UPDATE_USER_PAYMENT,
        variables: {
          input: {
            ...input,
          },
        },
      });
      return response;
    } else if (status === 'rejected') {
        const response = await apolloClient.mutate({
            mutation: REJECT_USER_PAYMENT,
            variables: {
              input: {
                ...input,
              },
            },
          });
          return response;
    }
    } catch (err) {
      console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return {
    updateUserPayment,
    isLoading
  };
};
