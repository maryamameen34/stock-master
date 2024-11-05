

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ProductUploadForm } from '../forms/index'

const AddProduct = () => {
  return (
    <div>
        <Helmet>
            <title>
                Upload new Inventory | Stock Master
            </title>
        </Helmet>
        <ProductUploadForm />
    </div>
  )
}

export default AddProduct