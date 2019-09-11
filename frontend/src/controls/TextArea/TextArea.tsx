import React from 'react';
import './TextArea.scss';

const string = require('../../util/string');

export interface OwnProps {
	className?: string;
	emptyText?: string;
	required?: boolean;
	isMultiLine?: boolean;
	onChange?: (arg0: boolean) => void;
}

interface State {
	value: string;
	isValid: boolean;
	isInEditMode: boolean;
}

// TODO TextArea is really not a great name here...
class TextArea extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			value: '',
			isValid: false,
			isInEditMode: false
		};
	}

	getValue() {
		return this.state.value;
	}

	isValid() {
		return this.state.isValid;
	}

	onChangeInternal = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const isValid =
			e.target.validity.valid &&
			(this.props.required
				? !string.isEmptyOrOnlySpaces(e.target.value)
				: true);

		this.setState({
			value: e.target.value,
			isValid: isValid
		});

		if (this.props.onChange) {
			this.props.onChange(isValid);
		}
	};

	switchMode = () =>
		this.setState({
			isInEditMode: !this.state.isInEditMode
		});

	render() {
		const props = this.state.isInEditMode
			? {
					value: this.state.value,
					onChange: this.onChangeInternal,
					onBlur: this.switchMode
			  }
			: {
					readOnly: true,
					onFocus: this.switchMode,
					value: string.isEmpty(this.state.value)
						? this.props.emptyText
						: this.state.value,
					style: {
						color: string.isEmpty(this.state.value)
							? 'gray'
							: 'black'
					}
			  };

		return this.props.isMultiLine ? (
			<textarea {...props} />
		) : (
			<input {...props} />
		);
	}
}

export default TextArea;
