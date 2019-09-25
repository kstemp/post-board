import React from 'react';
import Button from '../Button/Button';

const baseClassName = 'tab-control';

interface TabItem {
	element: React.ElementType;
	label: string;
	icon?: string;
}

interface OwnProps {
	tabs: TabItem[];
	defaultTab: number;
}

interface State {
	selectedIndex: number;
}

class TabControl extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			selectedIndex: this.props.defaultTab
		};
	}

	render() {
		return (
			<div className={baseClassName}>
				{this.props.tabs.map((tab, index) => (
					<React.Fragment>
						{index === this.state.selectedIndex && tab.element}
						<Button
							key={index}
							className={`${baseClassName}__button`}
							label={tab.label}
							icon={tab.icon}
							onClick={() =>
								this.setState({
									selectedIndex: index
								})
							}
						/>
					</React.Fragment>
				))}
			</div>
		);
	}
}

export default TabControl;
