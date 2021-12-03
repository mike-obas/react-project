import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function CommercialOven() {
    CleanUpLoader()
    const categoryValues = {
        category: 'commercial_oven',
        categoryText: 'Commercial Oven'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek commercial ovens</title>
        <meta name="description" content="Quality, durable and high performance commercial ovens" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default CommercialOven
