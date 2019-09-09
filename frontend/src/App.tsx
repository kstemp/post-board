import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps
} from 'react-router-dom';

import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';
import CommunityList from './components/CommunityList/CommunityList';
import Button from './components/Button/Button';

import { Provider } from 'react-redux';
import { fetchCommunities } from './entities/communities';

import store from './entities/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

const baseClassName = 'App';

type AppProps = {};

// TODO refactor
type TParams = { id: string };

const CommunityRouter = ({ match }: RouteComponentProps<TParams>) => {
	return (
		<div className={`${baseClassName}__body`}>
			<PostCreator />
			<PostList
				location={'temp'}
				communityID={parseInt(match.params.id)}
			/>
		</div>
	);
};

class App extends React.Component<AppProps> {
	componentDidMount() {
		fetchCommunities();
	}

	render() {
		return (
			<Provider store={store}>
				<link
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
					rel='stylesheet'
				></link>
				<div className={baseClassName}>
					<ToastContainer />
					<header className={`${baseClassName}__header`}>
						post-board v.0.1 (dev)
						<CommunityList />
						<Button label={'Create community...'} />
					</header>
					<Router>
						<Route
							exact
							path='/community'
							render={() => {
								return (
									<div>
										You are not subscribed to any community.
									</div>
								);
							}}
						/>
						<Route
							path='/community/:id'
							component={CommunityRouter}
						/>
					</Router>
				</div>
			</Provider>
		);
	}
}
export default App;
