import {ActionsTypesMesssages, Message} from '../reducers/reducerMessages';

const addedMessage = (res: Message) => {
	return {
		type: ActionsTypesMesssages.addedMessages,
		payload: res,
	}
}

const removeMessage = (res: string) => {
	return {
		type: ActionsTypesMesssages.removeMessages,
		payload: res,
	}
}

export type ReturnActionMessages = {
	type: string,
	payload: string | Message,
}

export {
	addedMessage,
	removeMessage,
}