import React from 'react';
import onClickOutside from 'react-onclickoutside';

import './ColorPicker.scss';
import Button from '../Button/Button';
const baseClassName = 'color-picker';

interface State {
	show: boolean;
}

const colors = [
	'#001f3f',
	'#0074D9',
	'#7FDBFF',
	'#39CCCC',
	'#3D9970',
	'#2ECC40',
	'#01FF70',
	'#FFDC00',
	'#FF851B',
	'#FF4136',
	'#85144b',
	'#F012BE',
	'#B10DC9',
	'#111111',
	'#AAAAAA',
	'#DDDDDD'
];

class ColorPicker extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			show: false
		};
	}
	handleClickOutside() {
		this.setState({
			show: false
		});
	}

	render() {
		return (
			<div className={baseClassName}>
				<Button
					icon={'color_lens'}
					onClick={() => this.setState({ show: true })}
				/>
				{this.state.show && (
					<div className={`${baseClassName}__list`}>
						{colors.map(color => (
							<button
								className={`${baseClassName}__list-item`}
								style={{ background: color }}
								onClick={() => console.log('hejka!')}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default onClickOutside(ColorPicker);
