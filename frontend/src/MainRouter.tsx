import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import UserPage from './components/Pages/UserPage/UserPage';
import BoardRenderer from './components/BoardRenderer/BoardRenderer';
import LoginPage from './components/Pages/LoginPage/LoginPage';

class MainRouter extends React.Component {
	render() {
		return (
			<Switch>
				<Route
					exact
					path={'/register'}
					render={() => <RegisterPage />}
				/>
				<Route exact path={'/login'} render={() => <LoginPage />} />

				<Route
					exact
					path='/board/:id'
					render={({ match }) => (
						<BoardRenderer boardID={match.params['id']} />
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
		);
	}
}

export default MainRouter;
