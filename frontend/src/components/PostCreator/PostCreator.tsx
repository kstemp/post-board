import React from 'react';

//import { RouteComponentProps, withRouter } from 'react-router';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';
import TextArea from '../../controls/TextArea/TextArea';

import './PostCreator.scss';
import { getClassNames } from '../../util/class-names';

const baseClassName = 'post-creator';

interface OwnProps {
	communityID: number;
}

interface State {
	isInCreationMode: boolean;
	isValid: boolean;
}

//type RouteProps = RouteComponentProps<{ communityID: string }>;

//type Props = RouteProps;

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
			(this.postTextField as any).current.value,
			this.props.communityID
		)
			.then(
				() => 0
				//fetchPostsForCommunityID(
				//	parseInt(this.props.match.params.communityID)
				//)
			)
			.catch(err =>
				displayErrorNotification(
					'Failed to create post TODO err message'
				)
			); // TODO get rid of 'as any'
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
				<TextArea
					ref={this.postTextField}
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
