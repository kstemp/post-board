//@flow
import React from 'react';

import Post from './components/Post/Post';

import './App.scss';

const baseClassName = 'App';

type AppProps = {};

class App extends React.Component<AppProps> {
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>Post v.0.1 (dev)</header>
				<div className={`${baseClassName}__body`}>
					<Post text={'Sample post text!'} title={'Sample post title'} />
          <Post text={'Sample post text 2!'} title={'Sample post title 2'} />
				</div>
			</div>
		);
	}
}

export default App;
