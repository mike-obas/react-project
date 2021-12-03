import React, {Suspense, lazy} from 'react';
import  GeneralSkeleton  from "../utils/GeneralSkeleton";
import { Route, Switch } from 'react-router-dom'
const Televisions = lazy(() => import('../pages/Televisions'));
const MusicalSystem = lazy(() => import('../pages/MusicalSystem'));
const Refrigerators = lazy(() => import('../pages/Refrigerators'));
const HomeTheatre = lazy(() => import('../pages/HomeTheatre'));
const PublicAddressSystem = lazy(() => import('../pages/PublicAddressSystem'));
const SolarSystem = lazy(() => import('../pages/SolarSystem'));
const CommercialOven = lazy(() => import('../pages/CommercialOven'));
const CommercialCookers = lazy(() => import('../pages/CommercialCookers'));
const MicrowaveOven = lazy(() => import('../pages/MicrowaveOven'));
const Blenders = lazy(() => import('../pages/Blenders'));
const DeepFryers = lazy(() => import('../pages/DeepFryers'));
const Mixers = lazy(() => import('../pages/Mixers'));
const WorkTables = lazy(() => import('../pages/WorkTables'));
const KitchenRack = lazy(() => import('../pages/KitchenRack'));

function Categories() {
    return (
      <Suspense fallback={<GeneralSkeleton />}>
        <Switch>
          <Route exact path="/televisions" component={Televisions} />
          <Route exact path="/musical_system" component={MusicalSystem} />
          <Route exact path="/refrigerators" component={Refrigerators} />
          <Route exact path="/home_theatre" component={HomeTheatre} />
          <Route exact path="/public_address_system" component={PublicAddressSystem} />
          <Route exact path="/solar_system" component={SolarSystem} />
          <Route exact path="/commercial_oven" component={CommercialOven} />
          <Route exact path="/commercial_cookers" component={CommercialCookers} />
          <Route exact path="/microwave_oven" component={MicrowaveOven} />
          <Route exact path="/blenders" component={Blenders} />
          <Route exact path="/deep_fryers" component={DeepFryers} />
          <Route exact path="/mixers" component={Mixers} />
          <Route exact path="/work_tables" component={WorkTables} />
          <Route exact path="/kitchen_rack" component={KitchenRack} />
        </Switch>
      </Suspense>
    )
}

export default Categories