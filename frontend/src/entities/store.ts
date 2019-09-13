import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const store = createStore(reducer, composeWithDevTools());

store.subscribe(() => {
	sessionStorage.setItem('accessToken', store.getState().accessToken);
});

export default store;
