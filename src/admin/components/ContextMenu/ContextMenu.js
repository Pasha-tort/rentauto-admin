import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';

//lib
import cn from 'classnames';

//actions
import { clickShow, clickHide } from '../../redux/actions/actionsContextMenu';

//styles
import './context-menu.scss';

const MemoContextMenu = ({ iframe }) => {

	const dispatch = useDispatch();
	const { eventClickContextMenu } = useSelector(state => state.reducerContextMenu)
	const contextMenu = useRef();

	useEffect(() => {
		toggleState(eventClickContextMenu);

		return () => {
			return null;
		}
	}, [eventClickContextMenu]);

	const onHandlerEditorText = (e) => {
		e.target.contentEditable = 'true';
		e.target.focus();
		e.target.classList.add('text-editor_input');
		hideContextMenu();

		function hideFocusElement(target, cb) {
			target.contentEditable = 'false';
			target.blur();
			target.classList.remove('text-editor_input');
			iframe.contentDocument.body.removeEventListener('click', cb);
			document.removeEventListener('click', cb);
		}

		const cb = (event) => {
			if (event.target && event.target !== e.target) {
				hideFocusElement(e.target, cb);
			}
		}

		iframe.contentDocument.body.addEventListener('click', cb);
		document.addEventListener('click', cb);
	}

	const toggleState = (event) => {
		if (event === null) {
			hideContextMenu();
		} else {
			showContextMenu(event);
		}
	}

	const hideContextMenu = () => {
		dispatch(clickHide())
	}

	const showContextMenu = (e) => {
		contextMenu.current.style.left = e.pageX + 'px';
		contextMenu.current.style.top = e.pageY + 'px';
	}

	const onClickEdit = () => {
		hideContextMenu();
		onHandlerEditorText(eventClickContextMenu)
	}

	const classContextMenu = cn(
		'context-menu__wrapper',
		{ 'context-menu__wrapper_active': eventClickContextMenu }
	)

	if (eventClickContextMenu) {
		return ReactDOM.createPortal(
			<div ref={contextMenu} className={classContextMenu}>
				<ul className='context-menu__list'>
					<li className='context-menu__item' onClick={() => onClickEdit()}>Редактировать текст</li>
				</ul>
			</div>,
			iframe.contentDocument.body
		)
	} else {
		return null;
	}
}

export const ContextMenu = React.memo(MemoContextMenu);