const initialState = {
	loading: false,
	reloadPage: false,
	currentPage: '/',
}

const reducerEditor = (state = initialState, action) => {
	switch (action.type) {
		case 'RELOAD_PAGE':
			return {
				...state,
				reloadPage: action.payload,
			}
		case 'LOADING_EDITOR':
			return {
				...state,
				loading: true,
			}
		case 'LOADING_FINISH_EDITOR':
			return {
				...state,
				loading: false,
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.payload,
			}
		default:
			return state
	}
}

export default reducerEditor;