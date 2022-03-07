//lib
import { v4 as uuidv4 } from 'uuid'

//data
import { dataMessage } from './dataMessage';

export class messageHelper {
	static crMsNoEdits() {
		return {
			text: dataMessage.error.data.noEdits,
			type: dataMessage.error.type,
			id: uuidv4(),
		}
	}

	static crMsSaveEdit() {
		return {
			text: dataMessage.success.data.editText,
			type: dataMessage.success.type,
			id: uuidv4(),
		}
	}
}