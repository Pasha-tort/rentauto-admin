import React, { useEffect, useState, useContext, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import { ModalData } from './ModalData';

//halpers
import { Context } from '../Editor/halpers/Context';

//data
import { DataModalWarningSaveEdit, DataModalWarningCreateBackup, DataModalWarningNoSaveEdit, DataModalListBackup } from './dataModal';

//actions
import { modalClose } from '../../redux/actions/actionsModal';

//styles
import './modal.scss';

//types
import { R } from '../../redux/reducers';
import { Handlers } from '../Editor/Editor';
import { HandlersItem } from '../Editor/Editor';

export const Modal: FC = () => {

	const [content, setContent] = useState<JSX.Element>();
	const { open, type } = useSelector((state: R) => state.reducerModal);
	const dispatch = useDispatch();
	const modalBackgroundRef = useRef<HTMLDivElement>(null!);

	const handlersContext = useContext(Context);

	useEffect(() => {
		setTypeModal(handlersContext);

		return () => { }
	}, [open, type]);

	const setTypeModal = (handlersContext: Handlers) => {
		const {
			onHandlerSave,
			onReloadPage,
			onHandlerCreateBackup,
			onHandlerSelectBackup,
		} = handlersContext;

		let handlers: HandlersItem[] = [];
		let handlersAlt: HandlersItem[] = [];

		switch (type) {

			case DataModalWarningSaveEdit.type:
				handlers = [onHandlerSave];
				setContent(<ModalData handlers={handlers} data={DataModalWarningSaveEdit} />);
				break;

			case DataModalWarningNoSaveEdit.type:
				handlers = [onHandlerSave, onReloadPage.bind(null, true)];
				handlersAlt = [onReloadPage.bind(null, true)];
				setContent(<ModalData handlersAlt={handlersAlt} handlers={handlers} data={DataModalWarningNoSaveEdit} />);
				break;

			case DataModalWarningCreateBackup.type:
				handlers = [onHandlerCreateBackup];
				setContent(<ModalData handlers={handlers} data={DataModalWarningCreateBackup} />);
				break;

			case DataModalListBackup.type:
				handlers = [onHandlerSelectBackup];
				setContent(<ModalData handlers={handlers} data={DataModalListBackup} />);
				break;

			default:
				break;
		}
	}

	const onHandlerModalClose = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target === modalBackgroundRef.current) {
			dispatch(modalClose());
		}
	}

	if (open) {
		return (
			<div ref={modalBackgroundRef} onClick={onHandlerModalClose} className='modal__background'>
				{content}
			</div>
		)
	} else {
		return null;
	}


}