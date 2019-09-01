//@flow
import React from 'react';

import Post from './components/Post/Post';
import PostCreator from './components/PostCreator/PostCreator';

import './App.scss';

const baseClassName = 'App';

type AppProps = {};

class App extends React.Component<AppProps> {
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>post-board v.0.1 (dev)</header>
				<div className={`${baseClassName}__body`}>
					<PostCreator />
					<div className={`${baseClassName}__body-container`}>
						<Post text={'Sample post text!'} title={'Sample post title'} />
						<Post text={'Sample post text 1!'} title={'Sample post title 2'} />
						<Post text={'Sample post text 2!'} title={'Sample post title'} />
						<Post text={'Sample post text 3!'} title={'Sample post title 2'} />
						<Post text={'Sample post text 4!'} title={'Sample post title'} />
						<Post text={'Sample post text 5!'} title={'Sample post title 2'} />
						<Post text={'Sample post text 6!'} title={'Sample post title'} />
						<Post text={'Sample post text 7!'} title={'Sample post title 2'} />
						<Post text={'Sample post text 8!'} title={'Sample post title'} />
						<Post text={'Sample post text 9!'} title={'Sample post title 2'} />
						<Post text={'Sample post text 10!'} title={'Sample post title'} />
						<Post
							text={
								'Veeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeee eeeeeeeee eeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery long post text'
							}
							title={'Sample post title 2'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
