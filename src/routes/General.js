import React, { Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';
import  GeneralSkeleton  from "../utils/GeneralSkeleton";
const Eltak = lazy(() => import('../pages/Eltak'));
const Lentz = lazy(() => import('../pages/Lentz'));
const TopDeals = lazy(() => import('../pages/TopDeals'));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail'));
const UpdatePassword = lazy(() => import('../pages/UpdatePassword'));
const HaierThermocool = lazy(() => import('../pages/HaierThermocool'));
const Hisense = lazy(() => import('../pages/Hisense'));
const LG = lazy(() => import('../pages/LG'));
const Samsung = lazy(() => import('../pages/Samsung'));
const Elepaq = lazy(() => import('../pages/Elepaq'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const MainMap = lazy(() => import('../pages/MainMap'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy.js'));

function General() {
    return (
    <Suspense fallback={<GeneralSkeleton />}>
        <Switch>
            <Route exact path="/eltak" component={Eltak} />
          <Route exact path="/lentz" component={Lentz} />
          <Route exact path="/top_deals" component={TopDeals} />
          <Route exact path="/verify_email/:token" component={VerifyEmail} />
          <Route exact path="/update_password/:token" component={UpdatePassword} />
          <Route exact path="/haier_thermocool" component={HaierThermocool} />
          <Route exact path="/hisense" component={Hisense} />
          <Route exact path="/lg" component={LG} />
          <Route exact path="/samsung" component={Samsung} />
          <Route exact path="/elepaq" component={Elepaq} />
          <Route exact path="/about_us" component={AboutUs} />
          <Route exact path="/privacy_policy" component={PrivacyPolicy} />
          <Route exact path="/address" component={MainMap} />
        </Switch>
    </Suspense>
    )
}

export default General