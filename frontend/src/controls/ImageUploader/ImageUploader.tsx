import React from 'react';

import './ImageUploader.scss';
const baseClasssName = 'image-uploader';

interface OwnProps {
	onChange: (arg0: File) => void;
}

interface State {
	fileURL?: string;
}

class ImageUploader extends React.Component<OwnProps, State> {
	state: State = {};

	refFileInput: React.RefObject<HTMLInputElement> = React.createRef();

	render() {
		return (
			<div className={baseClasssName}>
				<input
					type={'file'}
					ref={this.refFileInput}
					onChange={event => {
						if (event.target.files && event.target.files[0]) {
							this.setState({
								fileURL: URL.createObjectURL(
									event.target.files[0]
								)
							});
							this.props.onChange(event.target.files[0]);
						}
					}}
				/>
				{this.state.fileURL && (
					<img src={this.state.fileURL} alt={'TODO'}></img>
				)}
				<button
					className={'pb-button'}
					onClick={() => {
						this.refFileInput.current &&
							this.refFileInput.current.click();
					}}
				>
					Upload image
				</button>
			</div>
		);
	}
}

export default ImageUploader;
