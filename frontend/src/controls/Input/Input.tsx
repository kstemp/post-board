import React from 'react';

import './Input.scss';

const baseClassName = 'pb-input';

interface OwnProps {
	autoFocus?: boolean;
	required?: boolean;
	placeholder?: string;
	type?: 'text' | 'password';
	onChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: () => void;
}

class Input extends React.Component<OwnProps> {
	public value: string;

	private valid: boolean;

	constructor(props: OwnProps) {
		super(props);

		this.value = '';
		this.valid = false;
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.value = event.target.value;
		this.valid = event.target.validity.valid;

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (this.valid) {
				if (this.props.onSubmit) {
					this.props.onSubmit();
				}
			}
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
				onKeyDown={this.onKeyDown}
				autoFocus={this.props.autoFocus}
			/>
		);
	}
}

export default Input;
