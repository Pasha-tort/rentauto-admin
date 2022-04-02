import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//components
import { ModalList } from './ModalList';

//styles
import './modal.scss';

//halpers
import { messageHelper } from '../WindowMessage/messageHelper';

//data
import { KindModal } from './dataModal';

//actions
import { modalClose, modalSetActiveItemList } from '../../redux/actions/actionsModal';
import { addedMessage } from '../../redux/actions/actionsMessage';

//types
import { R } from '../../redux/reducers';
import { HandlersItem } from '../Editor/Editor';
import { DataTypes } from './dataModal';

type PropsModalWarning = {
	data: DataTypes,
	handlers: HandlersItem[],
	handlersAlt?: HandlersItem[],
}

export type Backup = {
	date: string,
	fileName: string,
}

export type DataPage = {
	backups: Backup[],
	pageName: string,
	activeBackups: Backup[],
}

export const ModalData: FC<PropsModalWarning> = ({ data, handlers, handlersAlt }) => {

	const { kind } = data;
	const { activeItemList, currentItemList } = useSelector((state: R) => state.reducerModal);
	const dispatch = useDispatch();

	useEffect(() => {
	}, [data.type])

	const onHandlerSuccess = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | null> => {

		if (activeItemList !== null && currentItemList !== null && activeItemList === currentItemList) {
			const newMessage = messageHelper.crMsErrorSelectCurrentBackup();
			dispatch(addedMessage(newMessage));
			dispatch(modalSetActiveItemList(null));
			return null;
		}

		dispatch(modalClose());
		for (let i = 0; i < handlers.length; i++) {
			const f: any = handlers[i];
			await f();
			continue;
		}
	}

	const onHandlerAltSuccess = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | null> => {
		dispatch(modalClose());
		for (let i = 0; i < handlersAlt!.length; i++) {
			const f: any = handlersAlt![i];
			await f();
			continue;
		}
	}

	const onHandlerClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
		dispatch(modalClose());
	}

	if (kind === KindModal.warning) {
		const { title, text, btnClose, btnSuccess, btnAlt } = data;
		return (
			<div className='modal__wrapper modal__box'>
				<h3 className='modal__title'>{title}</h3>
				<span className='modal__text'>{text}</span>
				<div className='modal__btn-wrapper'>
					<button onClick={onHandlerSuccess} className='modal__btn modal__btn_success'>{btnSuccess}</button>
					{
						handlersAlt ? <button onClick={onHandlerAltSuccess} className='modal__btn modal__btn_success'>{btnAlt}</button> : null
					}
					<button onClick={onHandlerClose} className='modal__btn modal__btn_close'>{btnClose}</button>
				</div>
			</div>
		)
	} else if (kind === KindModal.list) {
		const { title, btnClose, btnSuccess } = data;
		return (
			<div className='modal__wrapper modal__box'>
				<h3 className='modal__title'>{title}</h3>
				<ul className='modal__list'>
					<ModalList />
				</ul>
				<div className='modal__btn-wrapper'>
					<button onClick={onHandlerSuccess} className='modal__btn modal__btn_success'>{btnSuccess}</button>
					<button onClick={onHandlerClose} className='modal__btn modal__btn_close'>{btnClose}</button>
				</div>
			</div>
		)
	} else {
		return (
			<div className='modal__wrapper modal__wrapper'>
				<h3 className='modal__title'>Ошибка</h3>
			</div>
		)
	}
}