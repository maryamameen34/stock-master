import React from "react";
import { Helmet } from "react-helmet-async";
import AddNewCustomerForm from "../../forms/AddNewCustomerForm";

const CustomerAdd = () => {
  return (
    <div className="mt-20">
      <Helmet>
        <title>Add Coustomer - Admin | Stock Master</title>
      </Helmet>
      <AddNewCustomerForm />
    </div>
  );
};

export default CustomerAdd;
