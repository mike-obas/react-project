import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import BrandProducts from '../components/BrandProducts';
import {Helmet} from 'react-helmet-async'

function HaierThermocool() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Haier Thermocool", 
        docProperty: "brand", 
        docValue: "haier thermocool", 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek haier thermocool products</title>
        <meta name="description" content="Quality, durable and high performance haier thermocool products" />
      </Helmet>
        <div>
            <BrandProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default HaierThermocool
