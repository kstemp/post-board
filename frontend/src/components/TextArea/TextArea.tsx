import React from 'react';
import './style/TextArea.scss';

const string = require('../../util/string');

const baseClassName = 'text-area';

type TextAreaProps = {
	emptyText?: string;
	required?: boolean;
	isMultiLine?: boolean;
	onChange?: (arg0: boolean) => void;
};

type TextAreaStateProps = {
	value: string;
	isValid: boolean;
	isInEditMode: boolean;
};

// TODO TextArea is really not a great name here...
class TextArea extends React.Component<TextAreaProps, TextAreaStateProps> {
	constructor(props: TextAreaProps) {
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

	onChangeInternal = e => {
		const isValid =
			e.target.validity.valid &&
			(this.props.required &&
				!string.isEmptyOrOnlySpaces(e.target.value));

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
