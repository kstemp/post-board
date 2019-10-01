import React from 'react';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';

import './PostCreator.scss';
import { FetchError } from '../../entities/entity';

const baseClassName = 'post-creator';

interface OwnProps {
	boardID: string;
}

interface State {
	value: string;
	isValid: boolean;
}

class PostCreator extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			value: '',
			isValid: false
		};
	}
	createPost = async () => {
		try {
			await createPost(this.state.value, this.props.boardID);
		} catch (error) {
			displayErrorNotification('Failed to create post', error);
		}
	};

	fieldChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		this.setState({
			value: event.target.value,
			isValid: event.target.validity.valid
		});

	render() {
		return (
			<div className={baseClassName}>
				<p>
					<b>Create a post: </b>
				</p>
				<textarea
					placeholder={'Post text goes here'}
					onChange={this.fieldChanged}
					required
				/>
				<Button
					fill
					label={'Post'}
					disabled={!this.state.isValid}
					onClick={this.createPost}
				/>
			</div>
		);
	}
}

export default PostCreator;
