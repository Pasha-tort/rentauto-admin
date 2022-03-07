const initialState = {
	messages: [],
}

const reducerMessages = (state = initialState, action) => {
	switch (action.type) {
		case 'ADDED_MESSAGE':
			return {
				...state,
				messages: [...state.messages, action.payload],
			}
		case 'REMOVE_MESSAGE':
			return {
				...state,
				messages: state.messages.filter(message => {
					return message.id !== action.payload
				})
			}
		default:
			return state
	}
}

export default reducerMessages;