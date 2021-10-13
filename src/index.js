// Vendor
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css'
import { Provider } from 'react-redux'

// Stores
import store from './store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)