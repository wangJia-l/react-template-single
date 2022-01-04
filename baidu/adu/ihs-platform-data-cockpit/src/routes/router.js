import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import App from 'src/layouts/App';
import Home from 'src/pages/Home';
import RoadNetwork from 'src/pages/RoadNetwork';
import IntelligentVideo from 'src/pages/IntelligentVideo';
import CarRoad from 'src/pages/CarRoad';
import ServiceArea from 'src/pages/ServiceArea';
import Passenger from 'src/pages/Passenger';
import SmartReports from 'src/pages/SmartReports';
import Maintenance from 'src/pages/Maintenance';
import history from './history';

const BasicRoute = () => (
    <App component={App} history={history}>
        <Switch>
            <Route exact path="/dataanalysis/" component={Home} />
            <Route exact path="/dataanalysis/home" component={Home} />
            <Route exact path="/dataanalysis/roadNetwork" component={RoadNetwork} />
            <Route exact path="/dataanalysis/intelligentVideo" component={IntelligentVideo} />
            <Route exact path="/dataanalysis/carRoad" component={CarRoad} />
            <Route exact path="/dataanalysis/serviceArea" component={ServiceArea} />
            <Route exact path="/dataanalysis/passenger" component={Passenger} />
            <Route exact path="/dataanalysis/maintenance" component={Maintenance} />
            <Route exact path="/dataanalysis/smartReports" component={SmartReports} />
            <Redirect path="/*" to="/dataanalysis/home" />
        </Switch>
    </App>
);

export default BasicRoute;
