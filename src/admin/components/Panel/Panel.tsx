import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//data
import { DataModalWarningCreateBackup, DataModalWarningSaveEdit, DataModalListBackup } from '../Modal/dataModal';

//actions
import { openPanelEditor } from '../../redux/actions/actionsPanelEditor';

//types
import { Handlers } from '../Editor/Editor';

type PropsPanel = {
	handlers: Handlers,
}

export const Panel: FC<PropsPanel> = ({ handlers }) => {

	const panel = useRef<HTMLDivElement>(null!);
	const dispatch = useDispatch();

	const { openModal, onReloadPage } = handlers;

	return (
		<div ref={panel} className='wrapper-panel'>

			<button className='admin-panel__button' onClick={() => {
				onReloadPage();
			}}>
				Перезагрузить страницу
			</button>

			<button className='admin-panel__button' onClick={() => {
				openModal(DataModalWarningSaveEdit.type)
			}}>
				Сохранить
			</button>

			{/* <button className='admin-panel__button' onClick={() => {
				openModal(DataModalWarningCreateBackup.type)
			}}>
				Создать резервную копию страницы
			</button> */}

			<button className='admin-panel__button' onClick={() => {
				openModal(DataModalListBackup.type)
			}}>
				Выбрать резервную копию
			</button>

			<button className='admin-panel__button' onClick={() => {
				dispatch(openPanelEditor());
			}}>
				Загрузка файла sitemap.xml
			</button>

		</div>
	)
}