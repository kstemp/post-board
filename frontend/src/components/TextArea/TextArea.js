//@flow
import React from 'react';

import './style/TextArea.scss';

const baseClassName = 'text-area';

const isEmpty = (str: string) => !str || str.length === 0;

// TODO updating validity in parent only works on second keystroke etc.
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
			(this.props.required && !isEmpty(e.target.value));

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
