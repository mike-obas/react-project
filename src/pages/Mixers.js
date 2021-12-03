import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function Mixers() {
    CleanUpLoader()
    const categoryValues = {
        category: 'mixers',
        categoryText: 'Mixers'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek mixers</title>
        <meta name="description" content="Affordable, durable and high performance mixers" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Mixers
