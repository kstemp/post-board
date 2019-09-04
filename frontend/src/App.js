//@flow
import React from 'react';

import Post from './components/Post/Post';
import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';

import { Provider } from 'react-redux';

import store from './entities/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

const baseClassName = 'App';

type AppProps = {};

class App extends React.Component<AppProps> {
	render() {
		return (
			<Provider store={store}>
				<div className={baseClassName}>
					<ToastContainer />
					<header className={`${baseClassName}__header`}>
						post-board v.0.1 (dev)
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
