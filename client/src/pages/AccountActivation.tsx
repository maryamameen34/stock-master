import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../server';
const ActivateAccountData = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activateAccount = async () => {
        try {
          const res = await axios.get(`${server}/activation/${activation_token}`);
          console.log(res.data.message);
        } catch (error: any) {
          console.log(error.message);
          setError(true);
        }
      };

      activateAccount();
    }
  }, [activation_token]);

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      {error ? (
        <p>There was an error activating your account.</p>
      ) : (
        <p>Your account has been activated!</p>
      )}
    </div>
  );
};

export default ActivateAccountData;