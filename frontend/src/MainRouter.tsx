import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import UserPage from './components/Pages/UserPage/UserPage';
import CommunityRenderer from './components/CommunityRenderer/CommunityRenderer';

class MainRouter extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path={'/register'}
						render={() => <RegisterPage redirectTo={'/'} />}
					/>

					<Route
						exact
						path='/board/:id'
						render={({ match }) => (
							<CommunityRenderer boardID={match.params['id']} />
						)}
					/>
					<Route
						exact
						path='/user/:userID'
						render={({ match }) => (
							<UserPage userID={match.params.userID} />
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
