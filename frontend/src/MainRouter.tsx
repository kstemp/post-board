import React from 'react';
import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';

interface MatchParams {
	communityID: string;
}

// TODO just pass the CommunityID as prop ffs, we don't need this withRouter extravaganza
const CommunityRouter = ({ match }: RouteComponentProps<MatchParams>) => (
	<div>
		<PostCreator />
		<PostList />
	</div>
);

class MainRouter extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path='/'
						render={() => <div>Home page.</div>}
					/>
					<Route
						exact
						path='/community'
						render={() => (
							<div>
								You need to specify community ID, as in
								'/community/12345'
							</div>
						)}
					/>
					<Route
						path='/community/:communityID'
						component={CommunityRouter}
					/>
				</Switch>
			</Router>
		);
	}
}

export default MainRouter;
