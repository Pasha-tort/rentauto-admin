import React, { useState, useEffect, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';

//lib
import cn from 'classnames';

//actions
import { clickShowContextMenu, clickHideContextMenu } from '../../redux/actions/actionsContextMenu';

//styles
import './context-menu.scss';

//types
import { R } from '../../redux/reducers';

interface P {
	iframe: HTMLIFrameElement
}

export const ContextMenu: FC<P> = ({ iframe }: P) => {

	const dispatch = useDispatch();
	const { eventClickContextMenu } = useSelector((state: R) => state.reducerContextMenu)
	const contextMenu = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		toggleState(eventClickContextMenu);
		return () => { }
	}, [eventClickContextMenu]);

	const onHandlerEditorText = (e) => {
		e.target!.contentEditable = 'true';
		e.target.focus();
		e.target.classList.add('text-editor_input');
		hideContextMenu();

		function hideFocusElement(target, cb: (e: MouseEvent) => void | null) {
			if (!iframe || !iframe.contentDocument) {
				return null
			}

			target.contentEditable = 'false';
			target.blur();
			target.classList.remove('text-editor_input');
			iframe.contentDocument.body.removeEventListener('click', cb);
			document.removeEventListener('click', cb);
		}

		const cb = (event: MouseEvent) => {
			if (event.target && event.target !== e.target) {
				hideFocusElement(e.target, cb);
			}
		}

		iframe.contentDocument!.body.addEventListener('click', cb);
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
		dispatch(clickHideContextMenu())
	}

	const showContextMenu = (e: MouseEvent): void | null => {
		contextMenu.current.style.left = e.pageX + 'px';
		contextMenu.current.style.top = e.pageY + 'px';
	}

	const onClickEdit = (e: React.MouseEvent<HTMLLIElement>): void => {
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
					<li className='context-menu__item' onClick={onClickEdit}>Редактировать текст</li>
				</ul>
			</div>,
			iframe.contentDocument!.body
		)
	} else {
		return null;
	}
}