import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

//components
import { Editor } from './components/Editor';

//reducers
import rootReducer from './redux/reducers';

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/admin/*" element={<Editor />} />
			</Routes>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root')
)