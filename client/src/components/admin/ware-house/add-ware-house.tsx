import React from 'react'
import { Helmet } from 'react-helmet-async'
import WarehouseForm from '../../forms/CreateWareHouse'

const AddWareHouse = () => {
  return (
    <div className='mt-20'>
        <Helmet>
            <title>
                Add Ware House
            </title>
        </Helmet>
        <WarehouseForm />
    </div>
  )
}

export default AddWareHouse