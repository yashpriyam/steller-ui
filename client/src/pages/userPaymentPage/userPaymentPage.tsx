import React, { useEffect, useState } from 'react';
import PaymentCard from '../../components/paymentCard/paymentCard';
import { useUserPayments } from '../../redux/actions/getUserPayments';
import { useFeePlans } from '../../redux/actions/feePlanActions';
import './UserPaymentPage.scss';

const UserPaymentPage: React.FC = () => {

    const [selectedFeePlan, setSelectedFeePlan] = useState<string | null>(null);

  const { userPayments, getUserPayments } = useUserPayments();
 const {feePlans, getFeePlans} = useFeePlans()

  const getData = async ()=> {
    await getUserPayments(''); 
    await getFeePlans('Batch2024')
 }

 useEffect(() => {
    getData()
 }, [])
 

  return (
    <div  className="user-payment-page">
      <h1>User Payment Page</h1>
      {Boolean(feePlans?.length) && feePlans?.map((feePlan) => (
        <div key={feePlan.name}>
        <input
          type="radio"
          id={feePlan.name}
          name="feePlanRadio"
          value={feePlan.name}
          checked={selectedFeePlan === feePlan.name}
          onChange={() => setSelectedFeePlan(feePlan.name ?? '')}
        />
        <label htmlFor={feePlan.name}>
          <PaymentCard feePlan={feePlan} />
        </label>
      </div>
      ))}
     {  Boolean(feePlans?.length) &&
    <div className="button-wrapper">
      <button
        className="button"
        onClick={()=> {}} // will update user with payment plan 
        disabled={!Boolean(selectedFeePlan) ?? true}
      >
        Add Payment Plan
      </button>
    </div>
  }

    </div>
  );
};

export default UserPaymentPage;
