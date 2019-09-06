import React from 'react';

import './style/Dropdown.scss';

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
		return (
			<div className={baseClassName} onClick={this.switchOpen}>
				<span className={`${baseClassName}-label`}>
					{this.state.selectedOption
						? this.state.selectedOption.label
						: ''}
				</span>
				<div className={`${baseClassName}-triangle`} />
				{this.state.isOpen && (
					<div
						className={`${baseClassName}__list`}
						onBlur={() => this.setOpen(false)}
					>
						{this.props.options.map(option => (
							<span
								onClick={() => {
									console.log('hej!');
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
