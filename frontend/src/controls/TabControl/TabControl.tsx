import React from 'react';
import Button from '../Button/Button';
import './TabControl.scss';
const baseClassName = 'tab-control';

interface TabItem {
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
				{React.Children.toArray(this.props.children).filter(
					(child, index) => index === this.state.selectedIndex
				)}
				<div className={`${baseClassName}__buttons`}>
					{this.props.tabs.map((tab, index) => (
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
					))}
				</div>
			</div>
		);
	}
}
export default TabControl;
