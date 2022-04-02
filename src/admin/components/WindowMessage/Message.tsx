import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//actions
import { removeMessage } from '../../redux/actions/actionsMessage';

//styles
import './window-message.scss';

//icons
import closeIcon from '../../assets/icons/closeIconWhite.svg';

//types
type FieldsMessage = {
	type: string,
	text: string,
	id: string,
}

export const Message: FC<FieldsMessage> = ({ type, text, id }) => {

	const [timeoutFlag, setTimeoutFlag] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		const timeout = setTimeout(() => {
			onClickClose(id);
		}, 20000);

		return () => {
			clearTimeout(timeout);
		}
	}, [timeoutFlag]);

	const onClickClose = (id: string) => {
		setTimeoutFlag(false)
		dispatch(removeMessage(id))
	}

	const classMessageWrapper = type === 'success' ? 'message__item message__item_success' : 'message__item message__item_error';

	if (timeoutFlag) {
		return (
			<li className={classMessageWrapper}>
				<span className='message__text'>
					{text}
				</span>
				<img onClick={() => onClickClose(id)} src={closeIcon} className="message__close" alt="close" />
			</li>
		)
	} else {
		return null;
	}


}