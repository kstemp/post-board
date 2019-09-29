import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import HomePage from './components/Pages/HomePage/HomePage';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import UserPage from './components/Pages/UserPage/UserPage';
import CommunityRenderer from './components/CommunityRenderer/CommunityRenderer';

interface MatchParams {
	communityID: string;
}

// TODO just pass the CommunityID as prop ffs, we don't need this withRouter extravaganza
const CommunityRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<CommunityRenderer communityID={parseInt(match.params.communityID)} />
);

class MainRouter extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path={'/'} render={() => <HomePage />} />
					<Route
						exact
						path={'/login'}
						render={() => <LoginPage redirectTo={'/'} />}
					/>
					<Route
						exact
						path={'/register'}
						render={() => <RegisterPage redirectTo={'/'} />}
					/>

					<Route
						exact
						path='/community/:communityID'
						component={CommunityRouter}
					/>
					<Route
						exact
						path='/user/:userID'
						render={() => <UserPage />}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
