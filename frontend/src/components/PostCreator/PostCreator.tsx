import React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';

import { createPost } from '../../entities/posts';

import './PostCreator.scss';
import { IDType } from '../../entities/types';

type PostCreatorStateProps = {
	isInCreationMode: boolean;
	isValid: boolean;
};

const baseClassName = 'post-creator';

type RouteProps = RouteComponentProps<{ communityID: string }>;

type Props = RouteProps;

class PostCreator extends React.Component<Props, PostCreatorStateProps> {
	private postTextField: React.RefObject<TextArea>;

	constructor(props: Props) {
		super(props);

		this.postTextField = React.createRef();

		this.state = {
			isInCreationMode: false,
			isValid: true
		};
	}

	componentDidMount() {
		this.fieldChanged(false); // TODO this is to update validity initially, figure out a better method
	}

	createPost = () => {
		createPost(
			(this.postTextField.current as any).getValue(),
			parseInt(this.props.match.params.communityID)
		); // TODO get rid of as any...
	};

	fieldChanged = (isValid: boolean) => {
		this.setState({
			isValid: isValid
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<TextArea
					isMultiLine={true}
					className={`${baseClassName}__input-field`}
					ref={this.postTextField}
					emptyText={'Post text goes here...'}
					onChange={this.fieldChanged}
					required
				/>
				<p>Hint: tag a previous post by using e.g. '#111222'</p>
				<Button
					label={'Post'}
					disabled={!this.state.isValid}
					onClick={this.createPost}
				/>
			</div>
		);
	}
}

export default withRouter(PostCreator);
