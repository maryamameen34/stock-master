import React from 'react'
import { Helmet } from 'react-helmet-async'
import StockAdjustmentForm from '../../forms/StockAdjustemementForm'

const CreateStockAdjustement = () => {
    return (
        <div className='mt-20'>
            <Helmet>
                <title>
                    Create Stock Adjustement
                </title>
            </Helmet>
            <StockAdjustmentForm />
        </div>
    )
}

export default CreateStockAdjustement