import React from 'react';

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

class App extends React.Component<AppProps> {
	componentDidMount() {
		fetchCommunities();
	}

	render() {
		return (
			<Provider store={store}>
				<div className={baseClassName}>
					<ToastContainer />
					<header className={`${baseClassName}__header`}>
						post-board v.0.1 (dev)
						<CommunityList />
						<Button label={'Create community...'} />
					</header>
					<div className={`${baseClassName}__body`}>
						<PostCreator />
						<PostList />
					</div>
				</div>
			</Provider>
		);
	}
}
export default App;
