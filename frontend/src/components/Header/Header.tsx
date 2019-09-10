import React from 'react';

import './Header.scss';
import Button from '../Button/Button';
import { KeycloakInstance } from 'keycloak-js';

const baseClassName = 'header';

interface OwnProps {
	keycloak: KeycloakInstance | null;
}

class Header extends React.Component<OwnProps> {
	render() {
		return (
			<header className={baseClassName}>
				post-board
				<Button
					label={'Login'}
					onClick={() => {
						if (this.props.keycloak) {
							this.props.keycloak.login();
						}
					}}
				/>
			</header>
		);
	}
}

export default Header;
