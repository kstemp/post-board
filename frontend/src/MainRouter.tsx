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
import HomePage from './components/Pages/HomePage/HomePage';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage';
import UserPage from './components/Pages/UserPage/UserPage';
import CommunityBanner from './components/CommunityBanner/CommunityBanner';
import CommunityBar from './components/CommunityBar/CommunityBar';
import Header from './components/Header/Header';

interface MatchParams {
	communityID: string;
}

// TODO just pass the CommunityID as prop ffs, we don't need this withRouter extravaganza
const CommunityRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<>
		<Header />
		<CommunityBanner />
		<CommunityBar communityID={parseInt(match.params.communityID)} />
		<PostList communityID={parseInt(match.params.communityID)} />
	</>
);
// TODO community ID must be a string
const CommunityPostRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<>
		<Header />
		<PostCreator communityID={parseInt(match.params.communityID)} />
	</>
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
						path='/community/:communityID/post'
						component={CommunityPostRouter}
					/>
					<Route
						exact
						path='/user/:userID'
						render={() => (
							<>
								<Header />
								<UserPage />
							</>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
