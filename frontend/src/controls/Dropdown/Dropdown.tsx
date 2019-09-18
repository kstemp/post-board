import React from 'react';

import './Dropdown.scss';
import Button, { IButtonProps } from '../Button/Button';
const baseClassName = 'dropdown';

interface IDropdownOptions {
	onClick: () => void;
	buttonProps?: IButtonProps;
}

interface State {
	isOpen: boolean;
	options: IDropdownOptions[];
}

class Dropdown<T> extends React.Component<T, State> {
	constructor(props: T) {
		super(props);

		this.state = { isOpen: false, options: [] };
	}

	componentDidMount() {
		this.populateDropdownOptions();
	}

	toggleOpen = (isOpen: boolean) =>
		this.setState({
			isOpen: isOpen
		});

	populateDropdownOptions = () => {
		this.setState({
			options: []
		});
	};

	render() {
		return (
			<div
				className={baseClassName}
				onBlur={() => this.toggleOpen(false)}
			>
				<Button
					onClick={() => this.toggleOpen(true)}
					icon={'more_horiz'}
				/>
				{this.state.isOpen && (
					<div
						className={`${baseClassName}-content`}
						tabIndex={1}
						onBlur={() => this.toggleOpen(false)}
					>
						{this.state.options.map(option => (
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
