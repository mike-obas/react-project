import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function MicrowaveOven() {
    CleanUpLoader()
    const categoryValues = {
        category: 'microwave_oven',
        categoryText: 'Microwave oven'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek microwave ovens</title>
        <meta name="description" content="Quality, durable and high performance microwave ovens" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default MicrowaveOven
