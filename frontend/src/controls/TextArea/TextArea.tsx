// TODO remove duplicated code - basically have a this.props.multiline in Input.tsx

import React from 'react';

import './TextArea.scss';

const baseClassName = 'pb-textarea';

interface OwnProps {
	required?: boolean;
	placeholder?: string;
	onChange?: (arg0: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

class TextArea extends React.Component<OwnProps> {
	public value: string;

	constructor(props: OwnProps) {
		super(props);

		this.value = '';
	}

	onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.value = event.target.value;

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	render() {
		return (
			<textarea
				className={baseClassName}
				placeholder={this.props.placeholder}
				required={this.props.required}
				onChange={this.onChange}
			/>
		);
	}
}

export default TextArea;
