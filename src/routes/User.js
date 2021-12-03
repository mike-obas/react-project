import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralSkeleton from '../utils/GeneralSkeleton';
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const MyOrders = lazy(() => import('../pages/user/MyOrders'));
const UpdateProfile = lazy(() => import('../pages/user/UpdateProfile'));
const Logout = lazy(() => import('../pages/user/Logout'));
const ChangePassword = lazy(() => import('../pages/ChangePassword'));

function User() {
    return (
    <Suspense fallback={ <GeneralSkeleton />}>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/user_dashboard" component={UserDashboard} />
            <Route exact path="/user/user_orders" component={MyOrders} />
            <Route exact path="/user/profile_update" component={UpdateProfile} />
            <Route exact path="/user/logout" component={Logout} />
            <Route exact path="/change_password" component={ChangePassword} />
        </Switch>
    </Suspense>
    )
}

export default User