

import React from 'react'
import { Helmet } from 'react-helmet-async'
import AddCustomerForm from '../../forms/AddCustomerForm'

const CreateCoustomer = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Invite Coustomer - Admin | Stock Master
                </title>
            </Helmet>
            <AddCustomerForm />
        </div>
    )
}

export default CreateCoustomer