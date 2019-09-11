import React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/posts';

import './PostCreator.scss';
import Input from '../../controls/Input/Input';

const baseClassName = 'post-creator';

interface State {
	isInCreationMode: boolean;
	isValid: boolean;
}

type RouteProps = RouteComponentProps<{ communityID: string }>;

type Props = RouteProps;

class PostCreator extends React.Component<Props, State> {
	private postTextField: React.RefObject<Input>;

	constructor(props: Props) {
		super(props);

		this.postTextField = React.createRef();

		this.state = {
			isInCreationMode: false,
			isValid: false
		};
	}
	createPost = () => {
		createPost(
			(this.postTextField.current as any).value,
			parseInt(this.props.match.params.communityID)
		); // TODO get rid of 'as any'
	};

	fieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			isValid: event.target.validity.valid
		});
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>Create a post: </p>
				<Input
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

export default withRouter(PostCreator);
