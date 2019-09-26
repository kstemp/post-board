import React from 'react';
import Button from '../../controls/Button/Button';

import './ImageUploader.scss';
const baseClassName = 'image-uploader';

class ImageUploader extends React.Component {
	private refInput: React.RefObject<HTMLInputElement>;

	constructor() {
		super({});

		this.refInput = React.createRef();
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(this.refInput.current && this.refInput.current.value);
	};

	render() {
		return (
			<div className={baseClassName}>
				<input
					type={'file'}
					ref={this.refInput}
					onChange={this.onChange}
				/>
				<Button
					label={'Upload'}
					onClick={() => {
						this.refInput.current && this.refInput.current.click(); //NOTE the reference can't possibly be null, but let's make TypeScript happy
					}}
				/>
			</div>
		);
	}
}

export default ImageUploader;
