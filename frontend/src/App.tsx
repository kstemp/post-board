import React from 'react';

import MainRouter from './MainRouter';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { Provider } from 'react-redux';
import store from './entities/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import Header from './components/Header/Header';

const baseClassName = 'App';

interface State {
	keycloak: KeycloakInstance | null;
}

class App extends React.Component<{}, State> {
	constructor(props: any) {
		// TODO get rid of any
		super(props);

		this.state = {
			keycloak: null
		};
	}

	componentDidMount() {
		console.log('App mounted');

		const keycloak = Keycloak('http://localhost:3000/keycloak.json');
		keycloak
			.init({ onLoad: 'check-sso' })
			.success(() => {
				this.setState({
					keycloak: keycloak
				});
			})
			.error(error => console.log('keyclaok error:  ', error));
	}

	render() {
		this.state.keycloak &&
			console.log('Authenticated? ', this.state.keycloak.authenticated);
		return (
			<Provider store={store}>
				<div className={baseClassName}>
					<link
						href='https://fonts.googleapis.com/icon?family=Material+Icons'
						rel='stylesheet'
					></link>
					<ToastContainer />
					<Header keycloak={this.state.keycloak} />
					<div className={`${baseClassName}__body`}>
						<MainRouter />
					</div>
				</div>
			</Provider>
		);
	}
}
export default App;
