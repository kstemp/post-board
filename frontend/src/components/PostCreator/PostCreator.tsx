import React from 'react';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';
import TextArea from '../../controls/TextArea/TextArea';

import './PostCreator.scss';
import { FetchError } from '../../entities/entity';

const baseClassName = 'post-creator';

interface OwnProps {
	communityID: number;
}

interface State {
	isInCreationMode: boolean;
	isValid: boolean;
}

class PostCreator extends React.Component<OwnProps, State> {
	private postTextField: React.RefObject<TextArea>;

	constructor(props: OwnProps) {
		super(props);

		this.postTextField = React.createRef();

		this.state = {
			isInCreationMode: false,
			isValid: false
		};
	}
	createPost = () => {
		createPost(
			(this.postTextField as any).current.value, // TOOD get rid of any
			this.props.communityID
		)
			.then(
				() => 0
				//fetchPostsForCommunityID(
				//	parseInt(this.props.match.params.communityID)
				//)
			)
			.catch((error: FetchError) =>
				displayErrorNotification('Failed to create post', error)
			);
	};

	fieldChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({
			isValid: event.target.validity.valid
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<div className={`${baseClassName}__container`}>
					<TextArea
						ref={this.postTextField}
						placeholder={'Post text goes here'}
						onChange={this.fieldChanged}
						required
					/>
					<Button className={'preview'} fill label={'>'} />
				</div>

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
