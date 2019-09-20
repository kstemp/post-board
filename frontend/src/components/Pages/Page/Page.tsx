import React from 'react';
import Button from '../../../controls/Button/Button';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Dispatch } from 'redux';
import { ReducerStateType } from '../../../entities/reducer';

import { securityLogout } from '../../../security';

import './Page.scss';
import { isLoggedIn } from '../../../entities/selectors';

const baseClassName = 'page';

interface OwnProps {
	hideLoginButton?: boolean;
	location?: string;
}

class Page extends React.Component<OwnProps> {
	render() {
		console.log('this.props.loc = ', this.props.location);
		return (
			<div className={baseClassName}>
				<div className={`${baseClassName}__body`}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

//<footer>post-board v.0.01 (dev)</footer>
