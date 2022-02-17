import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';

import { ContextMenu } from '../ContextMenu';

import '../../halpers/iframeLoader.js';
import {onContextMenu, showContextMenu} from './halpers/showContextMenu';

import './editor.scss'



export const Editor = () => {

	const [pageList, setPageList] = useState([]);
	const [currentPage, setCurrentPage] = useState('/');
	const [inputNewPage, setInputNewPage] = useState('');
	const [messageAlert, setMessageAlert] = useState('');
	const [virtualDom, setVirtualDom] = useState(null);

	const iframeRef = useRef();

	useEffect(() => {
		init(currentPage)
	}, []);

	const init = (page) => {
		loadPageList();
		open(page);
	}


	const open = (page) => {
		setCurrentPage(`${page}?rnd=${Math.random()}`)
		const iframe = iframeRef.current;
		console.log('gggggggggg')
		axios
			.get(page)
			.then(res => parserStrToDom(res.data))
			.then(wrappTextNode)
			.then((dom) => {
				setVirtualDom(dom)
				return dom;
			})
			.then(serializeDomToString)
			.then(html => axios.post('/temp/createTempHtml', {html}))
			.then(() => iframe.load('/temp.html'))
			.then(() => enableEditing())
	}

	const enableEditing = () => {
		const iframe = iframeRef.current;
		iframe.contentDocument.body.querySelectorAll('text-editor').forEach(element => {
			element.contentEditable = "true";
			element.classList.add('text-editor')
			element.addEventListener('focus', (e) => {
				e.target.blur()
			})
			element.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				console.log('click');
				console.log('sdfsdffsd');
				// onContextMenu(e)
			})
			
			element.addEventListener('input', () => {
				onTextEdit(element)
			})
			
		})
	}

	const onTextEdit = (element) => {
		const id = element.getAttribute('nodeid');
		virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML; 
	}

	const parserStrToDom = (str) => {
		const parser = new DOMParser();
		return parser.parseFromString(str, 'text/html')
	}

	const wrappTextNode = (dom) => {
			const body = dom.body;

			let textNodes = []

			function enumeration(element) {
				element.childNodes.forEach(node => {
					
					if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, "").length > 0) {
						textNodes.push(node)
					} else {
						enumeration(node)
					}
				})
			}

			enumeration(body);

			textNodes.forEach((node, i) => {
				const wrapper = dom.createElement('text-editor');
				node.parentNode.replaceChild(wrapper, node);
				wrapper.appendChild(node);
				wrapper.setAttribute('nodeid', i)
			});
			return dom
	}

	const serializeDomToString = (dom) => {
		const serializer = new XMLSerializer();
		return serializer.serializeToString(dom)
	}

	const loadPageList = () => {
		axios
			.get('/admin/pagesList')
			.then(res => {
				setPageList(res.data)
			})
	}

	const handlerInput = (event) => {
		setInputNewPage(event.target.value)
	}

	const handlerSubmitNewPage = (event) => {
		axios
			.post('/admin/createNewPage', {fileName: inputNewPage})
			.then((newFiel) => {
				setMessageAlert('Страница успешно созданна');
				const newListPage = [...pageList, newFiel.data];
				setPageList(newListPage);
			})
	}

	const pageListHtml = pageList.map(item => {
		return <li key={item}>{item}</li>
	})

	return(
		<div className='admin-panel'>
			<div className='wrapper-panel'>
				<span>list</span>
				<ul>
					{pageListHtml}
				</ul>
			</div>
			<div className='wrapper-iframe'>
				<iframe ref={iframeRef} frameBorder="0" className='iframe-main'/>
					{/* <input onChange={handlerInput} type="text" value={inputNewPage}/>
					<button onClick={handlerSubmitNewPage}>Создать страницу</button>
					<span>{messageAlert}</span> */}
			</div>
			
		</div>
	)
}