import { ActionsTypesPanelEditor } from '../reducers/reducerPanelEditor'

const openPanelEditor = () => {
	return {
		type: ActionsTypesPanelEditor.openPanelEditor,
	}
}

export type ReturnActionPanelEditor = {
	type: string,
	payload?: string,
}

export {
	openPanelEditor,
}