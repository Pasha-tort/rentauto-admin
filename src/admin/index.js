import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//components
import Editor from './components/Editor';

//reducers
import rootReducer from './redux/reducers';

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<Editor />
	</Provider>
	, document.getElementById('root')
)