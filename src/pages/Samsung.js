import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import BrandProducts from '../components/BrandProducts';
import {Helmet} from 'react-helmet-async'

function Samsung() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Samsung Products", 
        docProperty: "brand", 
        docValue: "samsung", 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek Samsung products</title>
        <meta name="description" content="Buy Affordable and durable samsung products" />
      </Helmet>
        <div>
            <BrandProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Samsung
