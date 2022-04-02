import {ActionsTypesContextMenu} from '../reducers/reducerContextMenu';

const clickShowContextMenu = (res: unknown) => {
	return {
		type: ActionsTypesContextMenu.clickShow,
		payload: res,
	}
}

const clickHideContextMenu = () => {
	return {
		type: ActionsTypesContextMenu.clickHide,
	}
}

export type ReturnActionContextMenu = {
	type: string,
	payload?: MouseEvent,
}

export {
	clickHideContextMenu,
	clickShowContextMenu,
}