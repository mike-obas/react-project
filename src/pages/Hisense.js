import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import BrandProducts from '../components/BrandProducts';
import {Helmet} from 'react-helmet-async'

function Hisense() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Hisense Products", 
        docProperty: "brand", 
        docValue: "hisense", 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek hisense products</title>
        <meta name="description" content="Quality, durable and high performance hisense gadgets" />
      </Helmet>
        <div>
            <BrandProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Hisense
