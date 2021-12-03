import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import BrandProducts from '../components/BrandProducts';
import {Helmet} from 'react-helmet-async'

function LG() {
    CleanUpLoader()
    const categoryValues = {
        docText: "LG Products", 
        docProperty: "brand", 
        docValue: "lg", 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek LG products</title>
        <meta name="description" content="Quality, original, durable and high performance LG products" />
      </Helmet>
        <div>
            <BrandProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default LG
