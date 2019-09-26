import React from 'react';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';

import './PostCreator.scss';
import { FetchError } from '../../entities/entity';
import TabControl from '../../controls/TabControl/TabControl';
import ImageUploader from '../ImageUploader/ImageUploader';

const baseClassName = 'post-creator';

interface OwnProps {
	communityID: number;
}

interface State {
	isInCreationMode: boolean;
	isValid: boolean;
}

class PostCreator extends React.Component<OwnProps, State> {
	private postTextField: React.RefObject<HTMLTextAreaElement>;

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
				<TabControl
					defaultTab={0}
					tabs={[{ label: 'Text post' }, { label: 'Image post' }]}
				>
					<textarea
						ref={this.postTextField}
						placeholder={'Post text goes here'}
						onChange={this.fieldChanged}
						required
					/>
					<ImageUploader />
				</TabControl>
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
