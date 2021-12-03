import React, {Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralSkeleton from '../utils/GeneralSkeleton';
const Resume = lazy(() => import('../pages/Resume'));
const ProductUpload = lazy(() => import('../pages/admin/ProductUpload'));
const CreateAdminUser = lazy(() => import('../pages/admin/CreateAdminUser'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const Products = lazy(() => import('../pages/admin/Products'));
const Promo = lazy(() => import('../pages/admin/Promo'));
const EditProduct = lazy(() => import('../pages/admin/EditProduct'));
const Logout = lazy(() => import('../pages/admin/Logout'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const Customers = lazy(() => import('../pages/admin/Customers'));
const Reviews = lazy(() => import('../pages/admin/Reviews'));
const PreOrderProducts = lazy(() => import('../pages/admin/PreOrderProducts'));

function Admin() {
    return (
    <Suspense fallback={<GeneralSkeleton />}>
        <Switch>
        <Route exact path="/admin/product_upload" component={ProductUpload} />
        <Route exact path="/admin/create_admin_user" component={CreateAdminUser} />
        <Route exact path="/admin/orders" component={Orders} />
        <Route exact path="/admin/products" component={Products} />
        <Route exact path="/admin/customers" component={Customers} />
        <Route exact path="/admin/promo" component={Promo} />
        <Route exact path="/admin/edit_product/:category/:productId" component={EditProduct} />
        <Route exact path="/admin/logout" component={Logout} />
        <Route exact path="/admin/admin_users" component={AdminUsers} />
        <Route exact path="/admin/reviews" component={Reviews} />
        <Route exact path="/resume" component={Resume} />
        <Route exact path="/admin/admin_preorder" component={PreOrderProducts} />
        </Switch>
    </Suspense>
    )
}

export default Admin