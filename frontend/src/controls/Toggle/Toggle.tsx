import React from 'react';
import './Toggle.scss';
const baseClassName = 'toggle';

interface OwnProps {
	checked?: boolean;
	label: string;
	disabled?: boolean;
}

interface State {
	checked?: boolean;
}

class Toggle extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			checked: this.props.checked
		};
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		this.setState({ checked: event.target.checked });

	render() {
		return (
			<label className={baseClassName}>
				<input
					className={`${baseClassName}__input`}
					type='checkbox'
					checked={this.state.checked}
					disabled={this.props.disabled}
					onChange={this.onChange}
				/>
				<span className={`${baseClassName}__label`}>
					<span className={`${baseClassName}__text`}>
						{this.props.label}
					</span>
				</span>
			</label>
		);
	}
}

export default Toggle;
