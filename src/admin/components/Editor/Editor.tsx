import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Outlet, Routes, Route } from 'react-router-dom';

//components
import { ContextMenu } from '../ContextMenu';
import { WindowMessage } from '../WindowMessage';
import { SpinnerPanel } from '../Spinners/SpinnerPanel';
import { SpinnerIframe } from '../Spinners/SpinnerIframe';
import { Modal } from '../Modal';
import { ModalTransparent } from '../ModalTransparent/ModalTransparent';
import { Panel } from '../Panel';
import { PanelEdit } from '../PanelEdit';
import { Iframe } from '../Iframe';

//lib
import cn from 'classnames';

//data
import { DataModalWarningNoSaveEdit } from '../Modal/dataModal';

//halpers
import { iframeLoad } from './halpers/iframeLoader';
import { DOMHelper } from './halpers/DOMHelper';
import { EditorText } from './halpers/EditorText';
import { messageHelper } from '../WindowMessage/messageHelper';
import { Context } from './halpers/Context';

//actions
import { loadingEditor, loadingFinishEditor, setCurrentPage } from '../../redux/actions/actionsEditor';
import { addedMessage } from '../../redux/actions/actionsMessage';
import { clickShowContextMenu, clickHideContextMenu } from '../../redux/actions/actionsContextMenu';
import { modalOpen, modalClose, modalSetType } from '../../redux/actions/actionsModal';

import './editor.scss'

//types
interface EditorProps {
	currentPage: string,
	loading: boolean,
	reloadPage: boolean,
	activeItemList: string | null,
	loadingEditor,
	loadingFinishEditor,
	setCurrentPage,
	addedMessage,
	clickHideContextMenu,
	clickShowContextMenu,
	modalOpen,
	modalClose,
	modalSetType,
}

interface EditorState {
	currentPage: string,
}

export interface Handlers {
	onReloadPage: EditorComponent["onReloadPage"],
	openModal: EditorComponent["openModal"],
	onHandlerCreateBackup: EditorComponent["onHandlerCreateBackup"],
	onHandlerSave: EditorComponent["onHandlerSave"],
	onHandlerSelectBackup: EditorComponent["onHandlerSelectBackup"],
}
export type HandlersItem = (() => void | null) | ((skipCreateBackup?: boolean) => Promise<void | null>) | ((type: string) => void) | (Promise<void>) | (Promise<void | null>);


class EditorComponent extends React.Component<EditorProps, EditorState> {

	handlers: Handlers;
	iframeLoad: any;
	initialVirtualDomString: string;

	constructor(props: EditorProps) {
		super(props);
		this.init = this.init.bind(this)
		this.enableEditing = this.enableEditing.bind(this);
		this.onHandlerSave = this.onHandlerSave.bind(this);
		this.onReloadPage = this.onReloadPage.bind(this);
		this.openModal = this.openModal.bind(this);
		this.iframeLoad = iframeLoad;
		this.initialVirtualDomString = '';
		this.handlers = {
			onReloadPage: this.onReloadPage.bind(this),
			openModal: this.openModal.bind(this),
			onHandlerSave: this.onHandlerSave.bind(this),
			onHandlerCreateBackup: this.onHandlerCreateBackup.bind(this),
			onHandlerSelectBackup: this.onHandlerSelectBackup.bind(this),
		}
	}

	private iframeRef = React.createRef<HTMLIFrameElement>();
	public virtualDom = this.iframeRef.current?.contentDocument!;

	isAxiosResponce(page: string | AxiosResponse): page is AxiosResponse {
		return (page as AxiosResponse).data !== undefined;
	}

	async init(page: AxiosResponse | string) {
		this.props.loadingEditor();
		if (this.isAxiosResponce(page)) {
			await this.load(page);
		} else {
			await this.loadPage(page);
		}
	}

	async load(res: AxiosResponse) {
		new Promise<string>((responce) => {
			responce(res.data);
		})
			.then(res => DOMHelper.parserStrToDom(res))
			.then(dom => DOMHelper.wrappTextNode(dom))
			.then(async (dom) => {
				this.virtualDom = dom;
				this.initialVirtualDomString = DOMHelper.serializeDomToString(dom);
				return dom;
			})
			.then(DOMHelper.serializeDomToString)
			.then(async (html) => {
				await axios.post('/temp/createTempHtml', { html })
			})
			.then(async () => {
				await this.iframeLoad(`/temp.html`, this.iframeRef.current)
			})
			.then(async () => {
				await DOMHelper.addedStyleHead(this.iframeRef.current!);
				this.props.loadingFinishEditor();
			})
			.then(() => {
				this.enableEditing();
			})
	}

	async loadPage(page: string) {
		const urlPage = `${page}?rnd=${Math.random()}`;
		await axios
			.get(urlPage)
			.then((res) => this.load(res));
	}

	enableEditing(): void | null {

		this.iframeRef.current?.contentDocument!.body.querySelectorAll<HTMLAnchorElement>('[data-editor-type="anchor-page"]').forEach((element) => {
			const reqExp = /(https|http):\/\/((\w+)|(\-|\:|\.))+/g;
			const reqExp2 = /\//g;

			const onClickAnchorPage = (e) => {

				e.preventDefault();
				let pageStr = element.href;

				pageStr = pageStr.replace(reqExp, '');
				const slashOccurrencesFirst = this.props.currentPage.match(reqExp2)?.join('');
				const slashOccurrencesSecond = pageStr.match(reqExp2)?.join('');

				if (this.props.currentPage.includes(pageStr) || slashOccurrencesFirst === slashOccurrencesSecond) {
					this.props.setCurrentPage(pageStr);
				} else {
					pageStr = this.props.currentPage + pageStr;
					pageStr = pageStr.replace(/\/\//g, '/');
					this.props.setCurrentPage(pageStr);
				}

				element.removeEventListener('click', onClickAnchorPage);
			}

			element.addEventListener('click', onClickAnchorPage);
		})

		this.iframeRef.current?.contentDocument!.body.querySelectorAll('[data-editor-type="text"]').forEach((element) => {
			const openContextMenu = (e): null | void => {
				if (e.target && e.target.contentEditable === 'true') {
					return null;
				}

				e.preventDefault();
				this.props.clickShowContextMenu(e);

				const closeContextMenu = (event) => {
					if (event.target && (!event.target.matches('.context-menu__wrapper') && !event.target.matches('.context-menu__item'))) {
						this.props.clickHideContextMenu();
						this.iframeRef.current?.contentDocument!.body.removeEventListener('click', closeContextMenu)
					}
				}
				this.iframeRef.current?.contentDocument!.body.addEventListener('click', closeContextMenu);
			}

			element.addEventListener('contextmenu', openContextMenu);

			const nodeid = element.getAttribute('nodeid');
			const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${nodeid}"]`) as Element;

			new EditorText(element, virtualElement);
		});
	}

	openModal(type: string): void {
		this.props.modalSetType(type);
		this.props.modalOpen();
	}

	async onHandlerSave(skipCreateBackup?: boolean, skipAssignmentDOM?: boolean): Promise<void | null> {
		if (DOMHelper.serializeDomToString(this.virtualDom) === this.initialVirtualDomString) {
			const newMessage = messageHelper.crMsNoEdits();
			this.props.addedMessage(newMessage);

			return null;
		}

		if (!skipCreateBackup) {
			this.props.loadingEditor();
			await this.onHandlerCreateBackup();
		}

		await DOMHelper.save(this.virtualDom)
			.then(async () => {
				const newMessage = messageHelper.crMsSaveEdit();
				this.props.addedMessage(newMessage);
			})
			.catch(() => {
				const newMessage = messageHelper.crMsErrorSaveFile();
				this.props.addedMessage(newMessage);
			})
			.finally(() => {
				if (!skipAssignmentDOM) {
					this.initialVirtualDomString = DOMHelper.serializeDomToString(this.virtualDom);
				}
				if (!skipCreateBackup) {
					this.props.loadingFinishEditor();
				}
			})
	}

	async onHandlerCreateBackup(): Promise<void> {
		const pathPage = this.props.currentPage;
		const virtualDom = this.virtualDom as Document;

		await DOMHelper.createBackup(virtualDom, pathPage)
			.then(() => {
				const newMessage = messageHelper.crMsCreateBackup();
				this.props.addedMessage(newMessage);
			})
			.catch(() => {
				const newMessage = messageHelper.crMsErrorCreateBackup();
				this.props.addedMessage(newMessage);
			});
	}

	async onHandlerSelectBackup() {
		const { activeItemList } = this.props;
		this.props.loadingEditor();

		await DOMHelper.selectBackup(activeItemList as string)
			.then(async (file) => {
				this.props.setCurrentPage(this.props.currentPage);
				await this.init(file);
				const newMessage = messageHelper.crMsSelectBackup();
				this.props.addedMessage(newMessage);
			})
			.catch(() => {
				const newMessage = messageHelper.crMsErrorSelectBackup();
				this.props.addedMessage(newMessage);
				this.props.loadingFinishEditor();
			})
	}

	onReloadPage(skipCheck = false): void | null {
		if (!this.iframeRef.current || !this.iframeRef.current.contentWindow || !this.iframeRef.current.contentDocument) {
			return null;
		}

		this.props.modalClose();

		if (!skipCheck) {
			if (DOMHelper.serializeDomToString(this.virtualDom) !== this.initialVirtualDomString) {
				this.openModal(DataModalWarningNoSaveEdit.type);
				return null;
			}
		}

		this.props.setCurrentPage(this.props.currentPage);
		this.init(this.props.currentPage);
	}

	render() {

		return (
			<div className='admin-panel'>
				<SpinnerPanel />
				<Panel handlers={this.handlers} />
				<div className='wrapper-iframe'>
					<Iframe refProp={this.iframeRef} init={this.init} />
					<ContextMenu iframe={this.iframeRef.current!} />
					<WindowMessage />
					<Context.Provider value={this.handlers} >
						<Modal />
					</Context.Provider>
					<SpinnerIframe />
					<PanelEdit />
				</div>
				<ModalTransparent />
			</div>
		)
	}
}

const mapStateToProps = ({ reducerEditor, reducerModal }) => {
	return {
		loading: reducerEditor.loading,
		reloadPage: reducerEditor.reloadPage,
		currentPage: reducerEditor.currentPage,
		activeItemList: reducerModal.activeItemList,
	}
}

const mapDispatchToProps = {
	loadingEditor,
	loadingFinishEditor,
	setCurrentPage,
	addedMessage,
	clickHideContextMenu,
	clickShowContextMenu,
	modalOpen,
	modalClose,
	modalSetType,
	iframeLoad,
}

export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorComponent);
