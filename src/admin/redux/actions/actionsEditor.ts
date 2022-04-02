import {ActionsTypesEditor} from '../reducers/reducerEditor';

const loadingEditor = () => {
	return {
		type: ActionsTypesEditor.loadingEditor
	}
}
const loadingFinishEditor = () => {
	return {
		type: ActionsTypesEditor.loadingFinishEditor
	}
}

const setCurrentPage = (res: string) => {
	return {
		type: ActionsTypesEditor.setCurrentPage,
		payload: res,
	}
}

export type ReturnActionEditor = {
	type: string,
	payload?: string, 
}

export {
	loadingEditor,
	loadingFinishEditor,
	setCurrentPage,
}