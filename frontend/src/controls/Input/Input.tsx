import React from 'react';

import './Input.scss';

const baseClassName = 'pb-input';

interface OwnProps {
	required?: boolean;
	placeholder?: string;
	type?: 'text' | 'password';
	onChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends React.Component<OwnProps> {
	public value: string;

	constructor(props: OwnProps) {
		super(props);

		this.value = '';
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.value = event.target.value;

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	render() {
		return (
			<input
				className={baseClassName}
				placeholder={this.props.placeholder}
				type={this.props.type}
				required={this.props.required}
				onChange={this.onChange}
			/>
		);
	}
}

export default Input;
