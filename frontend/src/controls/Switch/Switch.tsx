import React from 'react';

import './Switch.scss';

class Switch extends React.Component {
	render() {
		return (
			<label className={'switch'}>
				<input type={'checkbox'} />
				<span className={'slider'} />
			</label>
		);
	}
}

export default Switch;
