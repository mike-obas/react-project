import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import OtherProducts from '../components/OtherProducts';
import {Helmet} from 'react-helmet-async'

function PreOrder() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Pre Order Products", 
        docProperty: "preOrderPrice", 
        docValue: 0, 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek per-order outlet</title>
        <meta name="description" content="Enjoy great discounts when you pre-order our products that are scheduled to arrive later" />
      </Helmet>
        <div>
            <OtherProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default PreOrder
