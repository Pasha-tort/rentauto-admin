const initialState = {
	eventClickContextMenu: null,
}

const reducerEditor = (state = initialState, action) => {
	switch (action.type) {
		case 'CLICK_SHOW':
			return {
				...state,
				eventClickContextMenu: action.payload,
			}
		case 'CLICK_HIDE':
			return {
				...state,
				eventClickContextMenu: null,
			}
		default:
			return state

	}
}

export default reducerEditor;