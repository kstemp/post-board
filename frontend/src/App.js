//@flow
import React from 'react';

import Post from './components/Post/Post';
import PostCreator from './components/PostCreator/PostCreator';
import PostList from './components/PostList/PostList';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './entities/reducer';

import './App.scss';

const baseClassName = 'App';

const store = createStore(reducer);

type AppProps = {};

class App extends React.Component<AppProps> {
	render() {
		return (
			<Provider store={store}>
				<div className={baseClassName}>
					<header className={`${baseClassName}__header`}>post-board v.0.1 (dev)</header>
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
