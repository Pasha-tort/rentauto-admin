import {ReturnActionContextMenu} from '../actions/actionsContextMenu';

export type TypeStateContextMenu = {
	eventClickContextMenu: null | MouseEvent;
}

export enum ActionsTypesContextMenu {
	clickShow = 'CLICK_SHOW',
	clickHide = 'CLICK_HIDE',
}

const initialState = {
	eventClickContextMenu: null,
}

const reducerEditor = (state: TypeStateContextMenu = initialState, action: ReturnActionContextMenu): TypeStateContextMenu => {
	switch (action.type) {
		case 'CLICK_SHOW':
			return {
				...state,
				eventClickContextMenu: action.payload!,
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