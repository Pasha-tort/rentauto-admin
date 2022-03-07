const loadingEditor = () => {
	return {
		type: 'LOADING_EDITOR'
	}
}
const loadingFinishEditor = () => {
	return {
		type: 'LOADING_FINISH_EDITOR'
	}
}

const reloadPage = (res) => {
	return {
		type: 'RELOAD_PAGE',
		payload: res
	}
}

const setCurrentPage = (res) => {
	return {
		type: 'SET_CURRENT_PAGE',
		payload: res,
	}
}

export {
	loadingEditor,
	loadingFinishEditor,
	reloadPage,
	setCurrentPage,
}