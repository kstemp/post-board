import React from 'react';

import MainRouter from './MainRouter';
import { Provider } from 'react-redux';
import store from './entities/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDialogContainer from './controls/ModalDialog/ModalDialogContainer';

import './App.scss';

const baseClassName = 'App';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div className={baseClassName}>
					<link
						href='https://fonts.googleapis.com/css?family=Material+Icons+Outlined'
						rel='stylesheet'
					></link>
					<ModalDialogContainer />
					<ToastContainer />
					<MainRouter />
				</div>
			</Provider>
		);
	}
}
//
export default App;
