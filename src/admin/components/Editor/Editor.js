import axios from 'axios';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import { connect } from 'react-redux';

//components
import {ContextMenu} from '../ContextMenu';
import { WindowMessage} from '../WindowMessage';
import {SpinnerPanel} from '../SpinnerPanel';

//lib
import cn from 'classnames';

//halpers
import './halpers/iframeLoader.js';
import { DOMHelper } from './halpers/DOMHelper';
import { EditorText } from './halpers/EditorText';
import { messageHelper } from '../WindowMessage/messageHelper';

//actions
import {loadingEditor, loadingFinishEditor, reloadPage, setCurrentPage} from '../../redux/actions/actionsEditor';
import { addedMessage } from '../../redux/actions/actionsMessage';
import { clickShow, clickHide } from '../../redux/actions/actionsContextMenu';

import './editor.scss'

class EditorComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			reload: false,
		}
		this.init = this.init.bind(this)
		this.enableEditing = this.enableEditing.bind(this);
		this.onHandlerSave = this.onHandlerSave.bind(this);
		this.onReloadPage = this.onReloadPage.bind(this);
	}

	componentDidMount() {
		this.init(this.props.currentPage);
	}

	componentDidUpdate(_, prevState) {
		if (prevState.reload !== this.state.reload) {
			this.init(this.props.currentPage);
			this.setState({reload: false})
		}
	}

	init(page) {
		this.open(page)
	}

	open(page) {
		const urlPage = `${page}?rnd=${Math.random()}`;
		this.iframe = document.querySelector('iframe');
		this.props.loadingEditor();
		axios
			.get(urlPage)
			.then(res => DOMHelper.parserStrToDom(res.data))
			.then(dom => DOMHelper.wrappTextNode(dom))
			.then((dom) => {
				this.virtualDom = dom;
				this.initialVirtualDomString = DOMHelper.serializeDomToString(dom);
				return dom;
			})
			.then(DOMHelper.serializeDomToString)
			.then(html => {
				axios.post('/temp/createTempHtml', {html})
			})
			.then(() => this.iframe.load(`/temp.html`))
			.then(() => {
				this.props.loadingFinishEditor();
				DOMHelper.addedStyleHead(this.iframe.contentDocument)
			})
			.then(() => this.enableEditing())
	}

	enableEditing() {
		this.iframe.contentDocument.body.querySelectorAll('[data-editor="text"]').forEach(element => {

			element.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				this.props.clickShow(e);
				this.iframe.contentDocument.body.addEventListener('click', (event) => {
					if (event.target && ( !event.target.matches('.context-menu__wrapper') && !event.target.matches('.context-menu__item') ) ) {
						this.props.clickHide();
					}
				})
			});

			const nodeid = element.getAttribute('nodeid');
			const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${nodeid}"]`);

			new EditorText(element, virtualElement);
		});
	}

	async onHandlerSave() {
		if (DOMHelper.serializeDomToString(this.virtualDom) === this.initialVirtualDomString) {
			const newMessage = messageHelper.crMsNoEdits();
			this.props.addedMessage(newMessage);
			
			return null;
		}

		this.props.loadingEditor();
		
		await DOMHelper.save(this.virtualDom)
			.then(() => {
				const newMessage = messageHelper.crMsSaveEdit();
				this.props.addedMessage(newMessage);
				this.initialVirtualDomString = DOMHelper.serializeDomToString(this.virtualDom)
			})

		this.props.loadingFinishEditor();
	}

	onReloadPage() {
		this.setState({reload: true})
	}

	render() {
		const classNameModalTransparent = cn('modal__transparent', {modal__transparent_active: this.props.loading});
		
		return (
			<div className='admin-panel'>
				<SpinnerPanel loading={this.props.loading}/>
				<div className='wrapper-panel'>
					<button className='admin-panel__button' onClick={() => this.onReloadPage()}>
						Перезагрузить страницу
					</button>
					<button className='admin-panel__button' onClick={() => this.onHandlerSave()}>
						Сохранить
					</button>
				</div>
				<div className='wrapper-iframe'>
					<iframe frameBorder="0" className='iframe-main'/>
					<ContextMenu iframe={this.iframe}/>
					<WindowMessage/>
				</div>
				<div className={classNameModalTransparent}></div>
			</div>
		)
	}
}

const mapStateToProps = ({reducerEditor}) => {
	return {
		loading: reducerEditor.loading,
		reloadPage: reducerEditor.reloadPage,
		currentPage: reducerEditor.currentPage,
	}
}

const mapDispatchToProps = {
	loadingEditor, 
	loadingFinishEditor,
	reloadPage, 
	setCurrentPage,
	addedMessage,
	clickHide,
	clickShow,
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorComponent);

export {
	Editor
}

// export const ditor = () => {

// 	const [currentPage, setCurrentPage] = useState('/');
// 	const [virtualDom, setVirtualDom] = useState(null);
// 	const [eventClickContextMenu, setEventClickContextMenu] = useState(null);

// 	const iframeRef = useRef();

// 	useEffect(() => {
// 		init(currentPage)
// 	}, []);

// 	const init = (page) => {
// 		open(page);
// 	}


// 	const open = (page) => {
// 		setCurrentPage(`${page}?rnd=${Math.random()}`)
// 		const iframe = iframeRef.current;
// 		axios
// 			.get(page)
// 			.then(res => DOMHelper.parserStrToDom(res.data))
// 			// .then(dom => wrappTextNode(dom))
// 			.then((dom) => {
// 				setVirtualDom(dom)
// 				return dom;
// 			})
// 			.then(DOMHelper.serializeDomToString)
// 			.then(html => {
// 				axios.post('/temp/createTempHtml', {html})
// 			})
// 			.then(() => iframe.load('/temp.html'))
// 			.then(() => enableEditing())
// 	}

// 	const enableEditing = () => {
// 		const iframe = iframeRef.current;
// 		iframe.contentDocument.body.querySelectorAll('[data-editor="text"]').forEach(element => {

// 			element.classList.add('text-editor');

// 			element.addEventListener('contextmenu', (e) => {
// 				e.preventDefault();
// 				setEventClickContextMenu(e);
// 				iframe.contentDocument.body.addEventListener('click', function hideContextMenu(event) {
// 					if (event.target && ( !event.target.matches('.context-menu__wrapper') && !event.target.matches('.context-menu__item') ) ) {
// 						setEventClickContextMenu(null)
// 					}
// 				})
// 			});
			
// 			// element.addEventListener('input', () => {
// 			// 	onTextEdit(element)
// 			// });
// 		});
// 	}

// 	// const onTextEdit = (element) => {
// 	// 	const id = element.getAttribute('nodeid');
// 	// 	console.log(virtualDom)
// 	// 	// virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML; 
// 	// }

// 	const onHandlerEditorText = (e) => {
// 		// const textEl = e.target.innerText;
// 		// console.log(textEl)
// 		// e.target.innerHtml = `
// 		// 	<div>
// 		// 		${textEl}
// 		// 	</div>
// 		// `
// 		e.target.contentEditable = 'true';
// 		e.target.focus();
// 		e.target.classList.add('text-editor_input');
// 		setEventClickContextMenu(null);

// 		const nodeid = e.target.getAttribute('nodeid');

// 		const iframe = iframeRef.current;

// 		iframe.contentDocument.body.addEventListener('click', function hideFocusElement(event) {
// 			if (event.target && !event.target.matches(`[data-editor="text"]`) ) {
// 				e.target.contentEditable = 'false';
// 				e.target.blur();
// 				e.target.classList.remove('text-editor_input');
// 				iframe.contentDocument.body.removeEventListener('click', hideFocusElement);
// 			}
// 		});
// 	}

// 	const handlers = {
// 		onHandlerEditorText,
// 	}
	
// 	return(
// 		<div className='admin-panel'>
// 			<div className='wrapper-panel'>
// 				<button onClick={() => DOMHelper.save(iframeRef.current.contentDocument)}>
// 					Save
// 				</button>
// 			</div>
// 			<div className='wrapper-iframe'>
// 				<iframe ref={iframeRef} frameBorder="0" className='iframe-main'/>
// 				<ContextMenu 
// 					eventClick={eventClickContextMenu} 
// 					iframe={iframeRef.current}
// 					handlers={handlers}
// 				/>
// 			</div>
			
// 		</div>
// 	)
// }