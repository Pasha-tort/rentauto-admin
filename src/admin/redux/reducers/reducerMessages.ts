import {ReturnActionMessages} from '../actions/actionsMessage';

export type Message = {
	type: string,
	text: string,
	id: string,
}

export type TypeStateMessages = {
	messages: Message[],
}

export enum ActionsTypesMesssages {
	addedMessages = 'ADDED_MESSAGES',
	removeMessages = 'REMOVE_MESSAGE',
}

const initialState: TypeStateMessages = {
	messages: [],
}


const reducerMessages = (state: TypeStateMessages = initialState, action: ReturnActionMessages): TypeStateMessages => {
	switch (action.type) {
		case ActionsTypesMesssages.addedMessages:
			return {
				...state,
				messages: [...state.messages, action.payload as Message],
			}
		case ActionsTypesMesssages.removeMessages:
			return {
				...state,
				messages: state.messages.filter(message => {
					return message.id !== action.payload
				})
			}
		default:
			return state
	}
}

export default reducerMessages;