import React from 'react';

import './style/Dropdown.scss';

const baseClassName = 'dropdown';

interface OwnProps {
	options: string[];
}

type Props = OwnProps;

class Dropdown extends React.Component<Props> {
	render() {
		return (
			<div className={baseClassName}>
				<select>
					{this.props.options.map(option => (
						<option>{option}</option>
					))}
				</select>
			</div>
		);
	}
}

export default Dropdown;
