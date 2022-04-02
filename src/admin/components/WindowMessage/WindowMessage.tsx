import React, { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';

//components
import { Message } from './Message';

//styles
import './window-message.scss';

//types
import { R } from '../../redux/reducers';

export const WindowMessage: FC = () => {

	const { messages } = useSelector((state: R) => state.reducerMessages);

	useEffect(() => {
		return () => { };
	}, [messages]);

	if (messages.length) {
		return (
			<ul className='message__list'>
				{
					messages.map(message => {
						return <Message key={message.id} id={message.id} text={message.text} type={message.type} />
					})
				}
			</ul>
		)
	} else {
		return null
	}

}

