export type DataTypes = {
	type: string,
	kind: string,
	title: string,
	text?: string,
	btnSuccess: string,
	btnAlt?: string,
	btnClose: string,
}

export enum KindModal {
	warning = 'WARNING',
	list = 'LIST'
}

export enum DataModalWarningSaveEdit {
	type = 'MODAL_WARNING_SAVE_EDITS',
	kind = 'WARNING',
	title = 'Сохранение документа',
	text = 'Вы действительно хотите сохранить изменения? Так же будет создана резервная копия страницы.',
	btnSuccess = 'Сохранить',
	btnClose = 'Отмена',
}

export enum DataModalWarningNoSaveEdit {
	type = 'MODAL_WARNING_NO_SAVE_EDITS',
	kind = 'WARNING',
	title = 'Перезагрузка страницы',
	text = 'Вы не сохранили внесенные изменения',
	btnSuccess = 'Сохранить и перезагрузить',
	btnAlt = 'Перезагрузить без сохранения',
	btnClose = 'Отмена',
}
export enum DataModalWarningCreateBackup {
	type = 'MODAL_WARNING_CREATE_BACKUP',
	kind = 'WARNING',
	title = 'Создание резервной копии страницы',
	text = 'Вы действительно хотите создать резервную копию страницы?',
	btnSuccess = 'Создать',
	btnClose = 'Отмена',
}
export enum DataModalListBackup {
	type = 'MODAL_LIST_BACKUP',
	kind = 'LIST',
	title = 'Список резервных копий для этой страницы',
	btnSuccess = 'Выбрать',
	btnClose = 'Отмена',
}