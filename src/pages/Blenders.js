import React, {Fragment} from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import { Helmet } from 'react-helmet-async'

function Blenders() {
    CleanUpLoader()
    const categoryValues = {
        category: 'blenders',
        categoryText: 'Blenders'
    }
    return (
        <Fragment>
        <Helmet>
        <title>Ntek blenders</title>
        <meta name="description" content="Quality and high performance blenders" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </Fragment>
    )
}

export default Blenders
