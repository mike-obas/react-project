import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import OtherProducts from '../components/OtherProducts';
import {Helmet} from 'react-helmet-async'

function TopDeals() {
    CleanUpLoader()
    const categoryValues = {
        docText: "Top Deals", 
        docProperty: "discount", 
        docValue: 0, 
        limit: 10
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Top deals | discount sales</title>
        <meta name="description" content="Enjoy massive discount on our top deals roll out" />
      </Helmet>
        <div>
            <OtherProducts propsDetails={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default TopDeals
