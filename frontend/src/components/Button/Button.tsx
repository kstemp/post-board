import React from 'react';

import '../rcl-style.scss';

const baseClassName = 'rcl-button';

interface OwnProps {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	icon?: string;
}

// TODO getClassNames...
class Button extends React.Component<OwnProps> {
	render() {
		return (
			<button
				className={`${baseClassName} rcl-component`}
				onClick={this.props.onClick}
				disabled={this.props.disabled}
			>
				{this.props.icon && (
					<i className={'material-icons md-18'}>{this.props.icon}</i>
				)}

				{this.props.label}
			</button>
		);
	}
}

export default Button;
