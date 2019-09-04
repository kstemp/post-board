//@flow
import React from 'react';

import './style/TextArea.scss';

const baseClassName = 'text-area';

const isEmpty = (str: string) => !str || str.length === 0;

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
		this.setState({
			value: e.target.value,
			isValid: e.target.validity.valid
		});

		if (this.props.onChange) {
			this.props.onChange();
		}
	};

	switchMode = () =>
		this.setState({
			isInEditMode: !this.state.isInEditMode
		});

	render() {
		const displayEmptyText =
			!this.state.isInEditMode && isEmpty(this.state.value);

		return this.state.isInEditMode ? (
			<textarea
				value={this.state.value}
				required={this.props.required}
				onChange={this.onChangeInternal}
				onBlur={this.switchMode}
			/>
		) : (
			<textarea
				onFocus={this.switchMode}
				value={
					displayEmptyText ? this.props.emptyText : this.state.value
				}
				style={{ color: displayEmptyText ? 'gray' : 'black' }}
			/>
		);
	}
}

export default TextArea;
