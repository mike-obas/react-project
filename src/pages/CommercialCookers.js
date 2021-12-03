import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function CommercialCookers() {
    CleanUpLoader()
    const categoryValues = {
        category: 'commercial_cookers',
        categoryText: 'Commercial Cookers'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek commercial cookers</title>
        <meta name="description" content="Quality, durable and high performance commercial cookers" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default CommercialCookers
