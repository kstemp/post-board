import React from 'react';

import './Dropdown.scss';

const baseClassName = 'dropdown';

type DropdownOption = {
	label: string;
	id: number;
};

interface OwnProps {
	options: DropdownOption[];
}

interface State {
	isOpen: boolean;
	selectedOption: DropdownOption | null;
}

type Props = OwnProps;

//TODO disable when no options are provided
class Dropdown extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isOpen: false,
			selectedOption: null
		};
	}

	getSelectedOption = () => this.state.selectedOption;

	setSelectedOption = (selectedOption: DropdownOption) =>
		this.setState({ selectedOption: selectedOption });

	setOpen = (isOpen: boolean = true) => {
		this.setState({
			isOpen: isOpen
		});
	};

	switchOpen = () => {
		this.setOpen(!this.state.isOpen);
	};

	render() {
		console.log('this, options, ', this.props.options);
		return (
			<div
				className={baseClassName}
				onClick={this.switchOpen}
				onBlur={() => this.setOpen(false)}
				tabIndex={0}
			>
				<span className={`${baseClassName}-label`}>
					{this.state.selectedOption
						? this.state.selectedOption.label
						: ''}
				</span>
				<div className={`${baseClassName}-triangle`} />
				{this.state.isOpen && (
					<div className={`${baseClassName}__list`}>
						{this.props.options.map(option => (
							<span
								key={option.id}
								onClick={() => {
									this.setSelectedOption(option);
									this.setOpen(false);
								}}
							>
								{option.label}
							</span>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default Dropdown;
