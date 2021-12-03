import React, {Fragment} from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import OtherProducts from '../components/OtherProducts';
import {Helmet} from 'react-helmet-async';

function BulkPurchase() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Buy in Bulk", 
        docProperty: "bulkPurchaseQuan", 
        docValue: 0, 
        limit: 10
    }
    return (
        <Fragment>
        <Helmet>
        <title>Ntek bulk purchase</title>
        <meta name="description" content="Enjoy huge discount when you buy products in bulk." />
      </Helmet>
        <div>
            <OtherProducts propsDetails={categoryValues} />
        </div>
        </Fragment>
    )
}

export default BulkPurchase
