export enum DataMessageSuccess {
	type = "success",
	editText 		= 'Изменения страницы успешно применены.',
	reloadPage 		= 'Страница успешно перезагружена.',
	createBackup 	= 'Резервная копия страницы успешно создана.',
	selectBackup 	= 'Резервная копия страницы успешно загруженна.',
}

export enum DataMessageError {
	type = "error",
	default 					= 'Что то пошло не так.',
	noEdits 					= 'Нет изменений на странице.',
	errorSaveFile 				= 'Ошибка сохранения изменений на странице.',
	errorReloadPage 			= 'Ошибка в перезагрузке страницы.',
	errorCreateBackup			= 'Ошибка в создании резервной копии страницы.',
	errorSelectBackup 			= 'Ошибка. Не получилось загрузить резервную копию.',
	errorRemoveCurrentBackup 	= 'Ошибка. Невозможно удалить резервую копию страницы, которая выбрана в данный момент.',
	errorSelectCurrentBackup 	= 'Ошибка. Невозможно загрузить резервную копию страницы, так как она выбрана в данный момент',
}