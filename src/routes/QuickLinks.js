import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralSkeleton from '../utils/GeneralSkeleton';
const Preorder = lazy(() => import('../pages/Preorder'));
const BulkPurchase = lazy(() => import('../pages/BulkPurchase'));
const Shipping = lazy(() => import('../pages/Shipping'));

function QuickLinks() {
    return (
    <Suspense fallback={ <GeneralSkeleton />}>
        <Switch>
        <Route exact path="/bulk_purchase" component={BulkPurchase} />
        <Route exact path="/preorder" component={Preorder} />
        <Route exact path="/shipping" component={Shipping} />
        </Switch>
    </Suspense>
    )
}

export default QuickLinks