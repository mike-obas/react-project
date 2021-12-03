import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function DeepFryers() {
    CleanUpLoader()
    const categoryValues = {
        category: 'deep_fryers',
        categoryText: 'Deep fryers'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek deep fryers</title>
        <meta name="description" content="Quality, durable and high performance deep fryers" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default DeepFryers
