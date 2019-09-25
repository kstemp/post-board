import React from 'react';
import Button from '../../controls/Button/Button';

const baseClassName = 'image-uploader';

class ImageUploader extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<label className={'custom-file-upload'}>
					<input type='file' />
					Custom Upload
				</label>
			</div>
		);
	}
}

export default ImageUploader;
