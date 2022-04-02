import {ReturnActionEditor} from '../actions/actionsEditor';

export type TypeStateEditor = {
	loading: boolean,
	reloadPage: boolean,
	currentPage: string,
}

export enum ActionsTypesEditor {
	loadingEditor = 'LOADING_EDITOR',
	loadingFinishEditor = 'LOADING_FINISH_EDITOR',
	setCurrentPage = 'SET_CURRENT_PAGE',
}

const initialState = {
	loading: false,
	reloadPage: false,
	currentPage: '/',
}

const reducerEditor = (state: TypeStateEditor = initialState, action: ReturnActionEditor): TypeStateEditor => {
	switch (action.type) {
		case ActionsTypesEditor.loadingEditor:
			return {
				...state,
				loading: true,
			}
		case ActionsTypesEditor.loadingFinishEditor:
			return {
				...state,
				loading: false,
			}
		case ActionsTypesEditor.setCurrentPage:
			return {
				...state,
				currentPage: action.payload!,
			}
		default:
			return state
	}
}

export default reducerEditor;