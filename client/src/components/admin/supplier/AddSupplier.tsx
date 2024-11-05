

import React from 'react'
import { Helmet } from 'react-helmet-async'
import CreateSupplier from '../../forms/CreateSupplierForm'

const AddSupplier: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Add Supplier - Admin | Stock Master</title>
            </Helmet>
            <CreateSupplier />
        </div>
    )
}

export default AddSupplier