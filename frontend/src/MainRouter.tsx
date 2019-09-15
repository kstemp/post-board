import React from 'react';
import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import Page from './components/Pages/Page/Page';
import HomePage from './components/Pages/HomePage/HomePage';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import UserPage from './components/Pages/UserPage/UserPage';

interface MatchParams {
	communityID: string;
}

// TODO just pass the CommunityID as prop ffs, we don't need this withRouter extravaganza
const CommunityRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<Page location={match.url}>
		<PostCreator />
		<PostList />
	</Page>
);

class MainRouter extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path={'/'}
						render={() => (
							<Page location={'/'}>
								<HomePage />
							</Page>
						)}
					/>
					<Route
						exact
						path={'/login'}
						render={() => (
							<Page hideLoginButton>
								<LoginPage redirectTo={'/'} />
							</Page>
						)}
					/>
					<Route
						exact
						path={'/register'}
						render={() => (
							<Page hideLoginButton>
								<RegisterPage redirectTo={'/'} />
							</Page>
						)}
					/>
					<Route
						exact
						path='/community'
						render={() => (
							<Page location={'/community'}>
								You need to specify community ID, as in
								'/community/12345'
							</Page>
						)}
					/>
					<Route
						path='/community/:communityID'
						component={CommunityRouter}
					/>
					<Route
						path='/user/:userID'
						render={() => (
							<Page>
								<UserPage />
							</Page>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
