//@flow
import React from 'react';
import './style/TextArea.scss';

const string = require('../../util/string');

const baseClassName = 'text-area';

// TODO TextArea is really not a great name here...
class TextArea extends React.Component {
	constructor(props) {
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
					value: isEmpty(this.state.value)
						? this.props.emptyText
						: this.state.value,
					style: {
						color: isEmpty(this.state.value) ? 'gray' : 'black'
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
