import React from 'react';
import Button from '../../controls/Button/Button';

import './Page.scss';
import { Link } from 'react-router-dom';

const baseClassName = 'page';

class Page extends React.Component {
	render() {
		return (
			<div className={baseClassName}>
				<header className={`${baseClassName}__header`}>
					post-board
					<Link to={'/login'}>
						<Button fill label={'Login'} />
					</Link>
				</header>
				<div className={`${baseClassName}__body`}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Page;
