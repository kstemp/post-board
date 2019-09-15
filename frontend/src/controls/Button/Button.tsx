import React from 'react';

import './Button.scss';

const baseClassName = 'pb-button';

interface OwnProps {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	icon?: string;
	fill?: boolean;
	toolTipEnabled?: string;
	toolTipDisabled?: string;
}

// TODO getClassNames...
class Button extends React.Component<OwnProps> {
	render() {
		let className = baseClassName;

		if (this.props.fill) {
			className += ` ${baseClassName}--fill`;
		}

		const toolTip = this.props.disabled
			? this.props.toolTipDisabled
			: this.props.toolTipEnabled;

		return (
			<button
				className={className}
				onClick={this.props.onClick}
				disabled={this.props.disabled}
				title={toolTip}
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
