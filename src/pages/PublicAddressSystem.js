import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function PublicAddressSystem() {
    CleanUpLoader()
    const categoryValues = {
        category: 'public_address_system',
        categoryText: 'Public system'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek public address systems</title>
        <meta name="description" content="Affordable, durable and high performance public address systems." />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default PublicAddressSystem
