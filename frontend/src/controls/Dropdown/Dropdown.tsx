import React from 'react';

import './Dropdown.scss';
import Button, { IButtonProps } from '../Button/Button';
const baseClassName = 'dropdown';

interface IDropdownOption {
	onClick: () => void;
	label: string;
	icon?: string;
}

interface OwnProps {
	options: IDropdownOption[];
	type: 'just-click' | 'select';
	defaultOption: number;
}

interface State {
	isOpen: boolean;
	selectedOption: number;
}

class Dropdown extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			isOpen: false,
			selectedOption: this.props.defaultOption
		};
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
					label={
						this.props.type === 'select'
							? this.props.options[this.state.selectedOption]
									.label
							: ''
					}
					iconAlign={'right'}
					onClick={() => this.toggleOpen(true)}
					icon={
						this.props.type === 'just-click'
							? 'more_horiz'
							: 'arrow_drop_down'
					}
				/>
				{this.state.isOpen && (
					<div
						className={`${baseClassName}-content`}
						tabIndex={1}
						onBlur={() => this.toggleOpen(false)}
					>
						{this.props.options.map((option, index) => (
							<Button
								label={option.label}
								onMouseDown={() => {
									if (this.props.type === 'just-click') {
										option.onClick();
									} else {
										this.setState({
											selectedOption: index
										});
									}
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
