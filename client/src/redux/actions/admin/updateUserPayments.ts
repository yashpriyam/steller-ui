import { useDispatch } from "react-redux";
import { apolloClient } from "../../../graphql/apolloClient/apolloClient";
import { UPDATE_USER_PAYMENT } from "../../../graphql/mutation/admin/updateUserPayment";
import { useState } from "react";

export const useAdmin = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const updateUserPayment = async (
    status: string,
    input: UpdateUserPaymentInput
  ) => {
    try {
      setIsLoading(true);
      const response = await apolloClient.mutate({
        mutation: UPDATE_USER_PAYMENT,
        variables: {
          input: {
            ...input,
          },
        },
      });
      if (response.data.approveUserPaymentByAdmin) {
        setIsLoading(false);
      }
      return response;
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return {
    updateUserPayment,
    isLoading
  };
};
