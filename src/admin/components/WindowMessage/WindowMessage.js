import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//components
import { Message } from './Message';

//lib
import { v4 as uuidv4 } from 'uuid';

//styles
import './window-message.scss';

export const WindowMessage = () => {

	useEffect(() => {

	}, [messages]);

	const { messages } = useSelector(state => state.reducerMessages);

	return (
		<ul className='message__list'>
			{
				messages.map(message => {
					return <Message key={message.id} id={message.id} text={message.text} type={message.type} />
				})
			}
		</ul>
	)
}

