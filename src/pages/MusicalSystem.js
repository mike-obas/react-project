import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function MusicalSystem() {
    CleanUpLoader()
    const categoryValues = {
        category: 'musical_system',
        categoryText: 'Musical system'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek musical systems</title>
        <meta name="description" content="Affordable, durable and high performance musical systems" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default MusicalSystem
