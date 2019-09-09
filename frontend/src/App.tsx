import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps
} from 'react-router-dom';

import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';
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
		<div>
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
						post-board
						<Button label={'Create community...'} />
					</header>
					<div className={`${baseClassName}__body`}>
						<Router>
							<Route
								exact
								path='/'
								render={() => {
									return <div>Home page.</div>;
								}}
							/>
							<Route
								exact
								path='/community'
								render={() => {
									return (
										<div>
											You need to specifiy community ID,
											as in '/community/12345'
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
				</div>
			</Provider>
		);
	}
}
export default App;
