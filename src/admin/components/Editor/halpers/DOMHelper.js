import axios from 'axios';

export class DOMHelper {

	static parserStrToDom = (str) => {
		const parser = new DOMParser();
		return parser.parseFromString(str, 'text/html')
	}

	static wrappTextNode = (dom) => {

		const body = dom.body;

		let editorTextNodes = [];

		function enumeration(element) {
			element.childNodes.forEach(node => {

				if (node.dataset && node.dataset.editor === 'text') {
					editorTextNodes.push(node)
				} else {
					enumeration(node)
				}
			})
		}

		enumeration(body);

		editorTextNodes.forEach((node, i) => {
			node.setAttribute('nodeid', i)
		});
		return dom
	}

	static serializeDomToString = (dom) => {
		const serializer = new XMLSerializer();
		return serializer.serializeToString(dom)
	}

	static addedStyleHead = (iframe) => {
		const headFile = iframe.querySelector('head');
		const linkTag = document.createElement('link');
		linkTag.rel = 'stylesheet';
		linkTag.href = "/index.admin.min.css";
		headFile.appendChild(linkTag)
	}

	static save = async (dom) => {

		const saveFileEdit = async (nameFile, html) => {
			return new Promise((res, rej) => {
				axios
					.post('/admin/saveChanges', { nameFile, html })
					.then(() => {
						res();
					})
					.catch(() => {
						rej();
					})
			})
		}

		return new Promise(async (res, rej) => {

			const allTextEditor = dom.body.querySelectorAll('[data-editor="text"]');

			allTextEditor.forEach(item => {
				item.removeAttribute('nodeid');
			})

			try {
				const allFileEditor = dom.body.querySelectorAll('[data-file-edit]');

				for (let i = 0; i < allFileEditor.length; i++) {
					const nameFile = allFileEditor[i].getAttribute("data-file-edit");
					const html = this.serializeDomToString(allFileEditor[i]);
					await saveFileEdit(nameFile, html);
					continue;
				}

				res();
			} catch (e) {
				console.log(e);
				rej();
			}

		})
	}
}