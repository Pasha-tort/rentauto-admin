const addedMessage = (res) => {
	return {
		type: 'ADDED_MESSAGE',
		payload: res,
	}
}

const removeMessage = (res) => {
	return {
		type: 'REMOVE_MESSAGE',
		payload: res,
	}
}

export {
	addedMessage,
	removeMessage,
}