import { ReturnActionPanelEditor } from '../actions/actionsPanelEditor'

export type TypeStatePanelEditor = {
	openPanel: boolean,
}

export enum ActionsTypesPanelEditor {
	openPanelEditor = 'OPEN_PANEL_EDITOR',
}

const initialState = {
	openPanel: false,
}

const reducerPanelEditor = (state: TypeStatePanelEditor = initialState, action: ReturnActionPanelEditor): TypeStatePanelEditor => {
	switch (action.type) {
		case ActionsTypesPanelEditor.openPanelEditor:
			return {
				...state,
				openPanel: true,
			}
		default:
			return state
	}
}

export default reducerPanelEditor;