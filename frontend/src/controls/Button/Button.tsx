import React from 'react';

import './Button.scss';
import { getClassNames, TClassNames } from '../../util/class-names';

const baseClassName = 'pb-button';

export interface IButtonProps {
	label?: string;
	size?: 'square' | 'nice-rectangle';

	onClick?: () => void;
	onMouseDown?: () => void;

	disabled?: boolean;
	icon?: string;
	fill?: boolean;
	toolTipEnabled?: string;
	toolTipDisabled?: string;
	className?: string;
}

class Button extends React.Component<IButtonProps> {
	render() {
		const className = getClassNames({
			[baseClassName]: true,
			[`${baseClassName}--fill`]: !!this.props.fill,
			[`${baseClassName}--${this.props.size}`]: !!this.props.size,
			[this.props.className || '']: !!this.props.className // TODO ugly hack this is, with ''. Run over it in my 2001 Honda Civic, I must.
		});

		const toolTip = this.props.disabled
			? this.props.toolTipDisabled
			: this.props.toolTipEnabled;

		return (
			<button
				className={className}
				onClick={this.props.onClick}
				onMouseDown={this.props.onMouseDown}
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
