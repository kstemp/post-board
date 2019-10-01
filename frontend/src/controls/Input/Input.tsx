import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type OwnProps = {
	onInputSubmit: (value: string) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface State {
	valid: boolean;
	value: string;
}

class Input extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			valid: false,
			value: ''
		};
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		this.setState({
			valid: event.target.validity.valid,
			value: event.target.value
		});

	onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) =>
		event.key === 'Enter' &&
		this.state.valid &&
		this.props.onInputSubmit(this.state.value);

	render() {
		return (
			<input
				{...this.props}
				onChange={this.onChange}
				onKeyUp={this.onKeyUp}
			/>
		);
	}
}

export default Input;
