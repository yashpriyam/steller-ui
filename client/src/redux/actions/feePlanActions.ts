import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { feePlanSlice, selectFeePlans, setFeePlans } from "../slices/feePlans/feePlanSlice";
import { GET_FEE_PLAN_DETAILS } from "../../graphql/mutation/feePlan/getFeePlanByBatchCode"; 
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const useFeePlans = () => {
  const feePlans = useSelector(selectFeePlans);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)


  const getFeePlans = async (batchCode: string) => {
    try {
      setIsLoading(true)
      const response = await apolloClient.mutate({
        mutation: GET_FEE_PLAN_DETAILS,
        variables: {
          batchCode,
        },
      });

      dispatch(setFeePlans(response.data.getFeePlanDetailsByBatchCode));
      return response;
    } catch (err) {
      console.error(err);
    }  
    finally {
      setIsLoading(false)
    }
  };

  return {
    feePlans,
    getFeePlans,
    isLoading
  };
};
