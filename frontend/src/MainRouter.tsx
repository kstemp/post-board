import React from 'react';
import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Page from './components/Page/Page';
import HomePage from './components/HomePage/HomePage';

interface MatchParams {
	communityID: string;
}

// TODO just pass the CommunityID as prop ffs, we don't need this withRouter extravaganza
const CommunityRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<Page>
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
							<Page>
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
						path='/community'
						render={() => (
							<Page>
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
						path='/user/:communityID'
						render={() => <Page>User page goes here.</Page>}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
