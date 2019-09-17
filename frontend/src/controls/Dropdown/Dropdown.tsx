import React from 'react';

import './Dropdown.scss';
import Button, { IButtonProps } from '../Button/Button';
import { TClassNames } from '../../util/class-names';
const baseClassName = 'dropdown';

interface IDropdownOptions {
	onClick: () => void;
	buttonProps?: IButtonProps;
}

interface OwnProps {
	controllerClassNames?: TClassNames;
	options: IDropdownOptions[];
}

interface State {
	isOpen: boolean;
}

class Dropdown extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = { isOpen: false };
	}

	toggleOpen = (isOpen: boolean) =>
		this.setState({
			isOpen: isOpen
		});

	render() {
		return (
			<div
				className={baseClassName}
				onBlur={() => this.toggleOpen(false)}
			>
				<Button
					onClick={() => this.toggleOpen(true)}
					classNames={this.props.controllerClassNames}
					icon={'more_horiz'}
				/>
				{this.state.isOpen && (
					<div
						className={`${baseClassName}-content`}
						tabIndex={1}
						onBlur={() => this.toggleOpen(false)}
					>
						{this.props.options.map(option => (
							<Button
								{...option.buttonProps}
								onMouseDown={() => {
									option.onClick();
									this.toggleOpen(false);
								}}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default Dropdown;
