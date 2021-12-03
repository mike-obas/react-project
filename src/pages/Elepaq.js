import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import BrandProducts from '../components/BrandProducts';
import {Helmet} from 'react-helmet-async'

function Elepaq() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Elepaq Products", 
        docProperty: "brand", 
        docValue: "elepaq", 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek elepaq products</title>
        <meta name="description" content="Quality, durable and high performance elepaq products" />
      </Helmet>
        <div>
            <BrandProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Elepaq
