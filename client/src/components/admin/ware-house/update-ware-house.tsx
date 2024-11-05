import React from 'react'
import UpdateWareHouseForm from '../../forms/update-warehouse-form'
import { Helmet } from 'react-helmet-async'

const UpdateWareHouse = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Update Warehouse
                </title>
            </Helmet>
            <div className='mt-20'>
                <UpdateWareHouseForm />
            </div>
        </div>
    )
}

export default UpdateWareHouse