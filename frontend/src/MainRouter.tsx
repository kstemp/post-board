import React from 'react';

import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';

import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom';

type TParams = { communityID: string };

const CommunityRouter = ({ match }: RouteComponentProps<TParams>) => (
	<div>
		<PostCreator />
		<PostList />
	</div>
);

const MainRouter = () => (
	<Router>
		<Switch>
			<Route exact path='/' render={() => <div>Home page.</div>} />
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
			<Route path='/community/:communityID' component={CommunityRouter} />
		</Switch>
	</Router>
);

export default MainRouter;
