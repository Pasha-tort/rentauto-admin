import { ActionsTypesModal } from '../reducers/reducerModal'

const modalOpen = () => {
	return {
		type: ActionsTypesModal.modalOpen,
	}
}

const modalClose = () => {
	return {
		type: ActionsTypesModal.modalClose,
	}
}

const modalSetType = (res: string) => {
	return {
		type: ActionsTypesModal.modalSetType,
		payload: res
	}
}

const modalSetActiveItemList = (res: string | null) => {
	return {
		type: ActionsTypesModal.modalSetActiveItemList,
		payload: res
	}
}

const modalSetCurrentItemList = (res: string | null) => {
	return {
		type: ActionsTypesModal.modalSetCurrentItemList,
		payload: res,
	}
}

const modalSetCurrentRemoveItemList = (res: string | null) => {
	return {
		type: ActionsTypesModal.modalSetCurrentRemoveItemList,
		payload: res,
	}
}

export type ReturnActionModal = {
	type: string,
	payload?: string,
}

export {
	modalOpen,
	modalClose,
	modalSetType,
	modalSetActiveItemList,
	modalSetCurrentItemList,
	modalSetCurrentRemoveItemList,
}