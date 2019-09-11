import React from 'react';

import './Button.scss';

const baseClassName = 'pb-button';

interface OwnProps {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	icon?: string;
	fill?: boolean;
}

// TODO getClassNames...
class Button extends React.Component<OwnProps> {
	render() {
		let className = `${baseClassName} ${this.props.fill &&
			`${baseClassName}--fill`}`;

		return (
			<button
				className={className}
				onClick={this.props.onClick}
				disabled={this.props.disabled}
			>
				{this.props.icon && (
					<i className={'material-icons-outlined md-18'}>
						{this.props.icon}
					</i>
				)}{' '}
				{this.props.label}
			</button>
		);
	}
}

export default Button;
