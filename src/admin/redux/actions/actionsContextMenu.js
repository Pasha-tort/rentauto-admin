const clickShow = (res) => {
	return {
		type: 'CLICK_SHOW',
		payload: res,
	}
}

const clickHide = () => {
	return {
		type: 'CLICK_HIDE',
	}
}

export {
	clickHide,
	clickShow,
}