import React from 'react';

import './Button.scss';
import { getClassNames } from '../../util/class-names';

const baseClassName = 'pb-button';

export interface IButtonProps {
	label?: string;
	size?: 'square' | 'nice-rectangle';

	onClick?: () => void;

	disabled?: boolean;
	icon?: string;
	iconAlign: 'left' | 'right';

	fill?: boolean;
	toolTipEnabled?: string;
	toolTipDisabled?: string;
	className?: string;
}

class Button extends React.Component<IButtonProps> {
	public static defaultProps = {
		iconAlign: 'left'
	};

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

		const props = {
			className: className,
			onClick: this.props.onClick,
			disabled: this.props.disabled,
			title: toolTip
		};

		const icon = this.props.icon && (
			<i className={'material-icons-outlined md-18'}>{this.props.icon}</i>
		);

		return this.props.iconAlign === 'left' ? (
			<button {...props}>
				{icon}
				{this.props.icon ? ' ' : ''}
				{this.props.label}
			</button>
		) : (
			<button {...props}>
				{this.props.label}
				{this.props.icon ? ' ' : ''}
				{icon}
			</button>
		);
	}
}

export default Button;
