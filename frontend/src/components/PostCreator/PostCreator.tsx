import React from 'react';

import Button from '../../controls/Button/Button';

import { createPost } from '../../entities/fetchers';

import { displayErrorNotification } from '../../util/notification';

import './PostCreator.scss';
import RichTextEditor from '../../controls/RichTextEditor/RichTextEditor';
import ImageUploader from '../../controls/ImageUploader/ImageUploader';
import { BACKEND_URL } from '../../Config';

const baseClassName = 'post-creator';

interface OwnProps {
	boardID: string;
}

interface State {
	isValid: boolean;
	activeTab: number;
	file?: File;
}

class PostCreator extends React.Component<OwnProps, State> {
	refEditor: React.RefObject<RichTextEditor>;
	constructor(props: OwnProps) {
		super(props);

		this.refEditor = React.createRef();
		// TODO would be nice if we had 'onChange' event in richTexteditor,
		// so that we could save value to state and use in createPost

		this.state = {
			isValid: false,
			activeTab: 0
		};
	}
	createPost = async () => {
		if (this.state.activeTab === 0) {
			// 'Text post'
			if (this.refEditor.current) {
				try {
					await createPost(
						this.refEditor.current.getInnerHTML(),
						this.props.boardID
					);
				} catch (error) {
					displayErrorNotification('Failed to create post', error);
				}
			}
		}
		if (this.state.activeTab === 1) {
			// 'Image post'
			if (this.state.file) {
				try {
					await createPost(this.state.file, this.props.boardID);
				} catch (error) {
					displayErrorNotification('Failed to create post', error);
				}
			}
		}
	};

	render() {
		return (
			<div className={baseClassName}>
				<p>
					<b>Create a post: </b>
				</p>
				{this.state.activeTab === 0 ? (
					<RichTextEditor ref={this.refEditor} />
				) : (
					<ImageUploader
						onChange={(file: File) =>
							this.setState({
								file: file
							})
						}
					/>
				)}

				<div className={`${baseClassName}__tab-buttons`}>
					{['Text post', 'Image post'].map((label, index) => (
						<Button
							label={label}
							onClick={() => this.setState({ activeTab: index })}
							fill={this.state.activeTab === index}
						/>
					))}
				</div>

				<Button fill label={'Post'} onClick={this.createPost} />
			</div>
		);
	}
}

export default PostCreator;

/*	<textarea
					placeholder={'Post text goes here'}
					onChange={this.fieldChanged}
					required
				/> */
