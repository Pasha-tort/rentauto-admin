//lib
import { v4 as uuidv4 } from 'uuid'

//data
import { DataMessageSuccess, DataMessageError } from './dataMessage';

export class messageHelper {

	//error
	static crMsNoEdits() {
		return {
			text: DataMessageError.noEdits,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorSaveFile() {
		return {
			text: DataMessageError.errorSaveFile,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorReloadPage() {
		return {
			text: DataMessageError.errorReloadPage,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorCreateBackup() {
		return {
			text: DataMessageError.errorCreateBackup,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorSelectBackup() {
		return {
			text: DataMessageError.errorSelectBackup,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorSelectCurrentBackup() {
		return {
			text: DataMessageError.errorSelectCurrentBackup,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	static crMsErrorRemoveCurrentBackup() {
		return {
			text: DataMessageError.errorRemoveCurrentBackup,
			type: DataMessageError.type,
			id: uuidv4(),
		}
	}

	//success
	static crMsSaveEdit() {
		return {
			text: DataMessageSuccess.editText,
			type: DataMessageSuccess.type,
			id: uuidv4(),
		}
	}

	static crMsReloadPage() {
		return {
			text: DataMessageSuccess.reloadPage,
			type: DataMessageSuccess.type,
			id: uuidv4(),
		}
	}

	static crMsCreateBackup() {
		return {
			text: DataMessageSuccess.createBackup,
			type: DataMessageSuccess.type,
			id: uuidv4(),
		}
	}

	static crMsSelectBackup() {
		return {
			text: DataMessageSuccess.selectBackup,
			type: DataMessageSuccess.type,
			id: uuidv4(),
		}
	}
}