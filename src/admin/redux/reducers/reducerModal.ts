import { ReturnActionModal } from '../actions/actionsModal'

export type TypeStateModal = {
	open: boolean,
	type: string | null,
	activeItemList: string | null,
	currentItemList: string | null,
	currentRemoveItemList: string | null,
}

export enum ActionsTypesModal {
	modalOpen = 'MODAL_OPEN',
	modalClose = 'MODAL_CLOSE',
	modalSetType = 'MODAL_SET_TYPE',
	modalSetActiveItemList = 'MODAL_SET_ACTIVE_ITEM_LIST',
	modalSetCurrentItemList = 'MODAL_SET_CURRENT_ITEM_LIST',
	modalSetCurrentRemoveItemList = 'MODAL_SET_CURRENT_REMOVE_ITEM_LIST',
}

const initialState = {
	open: false,
	type: null,
	activeItemList: null,
	currentItemList: null,
	currentRemoveItemList: null,
}

const reducerModal = (state: TypeStateModal = initialState, action: ReturnActionModal): TypeStateModal => {
	switch (action.type) {
		case ActionsTypesModal.modalOpen:
			return {
				...state,
				open: true,
			}
		case ActionsTypesModal.modalClose:
			return {
				...state,
				open: false,
				type: null,
				activeItemList: null,
			}
		case ActionsTypesModal.modalSetType:
			return {
				...state,
				activeItemList: null,
				type: action.payload!,
			}
		case ActionsTypesModal.modalSetActiveItemList:
			return {
				...state,
				activeItemList: action.payload!,
			}
		case ActionsTypesModal.modalSetCurrentItemList:
			return {
				...state,
				currentItemList: action.payload!,
			}
		case ActionsTypesModal.modalSetCurrentRemoveItemList:
			return {
				...state,
				currentRemoveItemList: action.payload!,
			}
		default:
			return state
	}
}

export default reducerModal;