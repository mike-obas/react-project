import React, {Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralSkeleton from '../utils/GeneralSkeleton';
const Cart = lazy(() => import('../pages/Cart'));
const ProductReview = lazy(() => import('../pages/ProductReview'));
const Checkout = lazy(() => import('../pages/Checkout'));
const PlaceOrder = lazy(() => import('../pages/PlaceOrder'));

function Product() {
    return (
    <Suspense fallback={<GeneralSkeleton />}>
        <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product_review/:category/:resolvedUrlName/:productId" 
        component={ProductReview} 
        />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/place_order" component={PlaceOrder} />
        </Switch>
    </Suspense>
    )
}

export default Product