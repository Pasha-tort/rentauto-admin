import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

//actions
import { modalSetActiveItemList, modalSetCurrentRemoveItemList, modalSetCurrentItemList } from '../../redux/actions/actionsModal';
import { addedMessage } from '../../redux/actions/actionsMessage';

//components
import { SpinnerModal } from '../Spinners/SpinnerModal';

//halpers
import { messageHelper } from '../WindowMessage/messageHelper';

//icons
import basketRemove from '../../assets/icons/basketIcon.svg';
import removeSuccess from '../../assets/icons/checkMark.svg';
import removeClose from '../../assets/icons/closeIconBlack.svg';

//types
import { R } from '../../redux/reducers';
import { DataPage } from './ModalData';

export const ModalList: FC = () => {

	const [dataPage, setDataPage] = useState<DataPage | null>(null);
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(false);
	const dispatch = useDispatch();
	const { currentPage } = useSelector((state: R) => state.reducerEditor);
	const { activeItemList, currentRemoveItemList } = useSelector((state: R) => state.reducerModal);





	useEffect(() => {

		let cleanupFunction = false;
		setLoading(true);
		axios
			.get(`/pages/backupFile?page=${currentPage}`)
			.then((filesPage) => {
				if (!cleanupFunction) setDataPage(filesPage.data);
				const lastIndex = filesPage.data.activeBackups.length - 1;
				if (!cleanupFunction) dispatch(modalSetCurrentItemList(filesPage.data.activeBackups[lastIndex].fileName))
			})
			.finally(() => {
				if (!cleanupFunction) setLoading(false)
			});

		return () => {
			cleanupFunction = true;
			dispatch(modalSetActiveItemList(null));
			dispatch(modalSetCurrentRemoveItemList(null));
			dispatch(modalSetCurrentItemList(null));
		}
	}, [reload]);

	const onHandlerRemove = (e: React.MouseEvent<HTMLImageElement>, fileName: string): void => {
		dispatch(modalSetCurrentRemoveItemList(fileName));
	}

	const onHandlerRemoveSuccess = (e: React.MouseEvent<HTMLImageElement>): void | null => {
		const lastIndex = dataPage!.activeBackups.length - 1;

		if (dataPage!.activeBackups[lastIndex].fileName === currentRemoveItemList) {
			const newMessage = messageHelper.crMsErrorRemoveCurrentBackup();
			dispatch(addedMessage(newMessage));
			return null;
		}

		setLoading(true);
		axios
			.delete(`/pages/removeBackup?backupFile=${currentRemoveItemList}`)
			.then(async () => {
				await axios
					.get(`/pages/backupFile?page=${currentPage}`)
					.then((filesPages) => {
						setDataPage(filesPages.data);
					})
					.then(() => {
						setReload(!reload);
					})
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const onHandlerRemoveClose = (e: React.MouseEvent<HTMLImageElement>): void => {
		dispatch(modalSetCurrentRemoveItemList(null));
		e.currentTarget.parentElement?.classList.remove('modal__list__icon-remove__wrapper_active');
	}

	let content: JSX.Element | JSX.Element[] = (
		<li className='modal__list__item__wrapper'>
			<span className='modal__text'>Резервных копий пока нет</span>
		</li>
	);

	if (loading) {
		return <SpinnerModal loading={loading} />;
	} else {
		if (dataPage) {

			content = dataPage.backups.map((item) => {

				let classNameModalListItem = '';
				let classNameModalIconsWrapper = '';

				const lastIndex = dataPage.activeBackups.length - 1;

				if (activeItemList === item.fileName) {
					classNameModalListItem = 'modal__list__item modal__list__item_active';
				} else if (dataPage.activeBackups[lastIndex].fileName && dataPage.activeBackups[lastIndex].fileName === item.fileName) {
					classNameModalListItem = 'modal__list__item modal__list__item_current';
				} else {
					classNameModalListItem = 'modal__list__item';
				}

				if (item.fileName === currentRemoveItemList) {
					classNameModalIconsWrapper = 'modal__list__icon-remove__wrapper modal__list__icon-remove__wrapper_active'
				} else {
					classNameModalIconsWrapper = 'modal__list__icon-remove__wrapper';
				}

				return (
					<li key={item.date} className='modal__list__item__wrapper'>
						<span className={classNameModalListItem} onClick={() => dispatch(modalSetActiveItemList(item.fileName))}>
							{item.date}
						</span>
						<img onClick={(e) => onHandlerRemove(e, item.fileName)} className='modal__list__icon-remove modal__list__icon-remove' src={basketRemove} alt='remove-backup' />
						<div className={classNameModalIconsWrapper}>
							<img onClick={onHandlerRemoveSuccess} className='modal__list__icon-remove__success modal__list__icon-remove' src={removeSuccess} alt='success-remove-backup' />
							<img onClick={onHandlerRemoveClose} className='modal__list__icon-remove__close modal__list__icon-remove' src={removeClose} alt='close-remove-backup' />
						</div>
					</li>
				);
			});
		} else {
			return null;
		}
	}

	return (
		<>
			{content}
		</>
	)
}