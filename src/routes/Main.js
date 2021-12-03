import React, { Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';
import  MainSkeleton  from "../utils/MainSkeleton";
const Home = lazy(() => import('../pages/Home'));

function General() {
    return (
    <Suspense fallback={<MainSkeleton />}>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Suspense>
    )
}

export default General