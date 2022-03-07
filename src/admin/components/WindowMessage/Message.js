import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//actions
import { removeMessage } from '../../redux/actions/actionsMessage';

//styles
import './window-message.scss';

//data
import { dataMessage } from './dataMessage';

//icons
import closeIcon from '../../assets/icons/closeMessage.svg';

export const Message = ({ type, text, id }) => {

	const [timeoutFlag, setTimeoutFlag] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		const timeout = setTimeout(() => {
			onClickClose(id);
		}, 10000);

		return () => {
			clearTimeout(timeout);
		}
	}, [timeoutFlag]);

	const onClickClose = (id) => {
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