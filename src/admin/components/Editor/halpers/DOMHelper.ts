import axios, {AxiosResponse} from 'axios';

export class DOMHelper {

	static parserStrToDom = (str: string) => {
		const parser = new DOMParser();
		return parser.parseFromString(str, 'text/html')
	}

	static wrappTextNode = (dom: Document): Document => {

		const body = dom.body;

		let editorTextNodes: HTMLElement[] = [];

		function enumeration(element) {
			element.childNodes.forEach((node) => {

				if (node.dataset && node.dataset.editorType === 'text') {
					editorTextNodes.push(node)
				} else {
					enumeration(node)
				}
			})
		}

		enumeration(body);

		editorTextNodes.forEach((node, i) => {
			node.setAttribute('nodeid', `${i}`)
		});
		return dom
	}

	static serializeDomToString = (dom: Document | Element): string => {
		const serializer = new XMLSerializer();
		return serializer.serializeToString(dom)
	}

	static addedStyleHead = async (iframe: HTMLIFrameElement): Promise<void> => {
		const headFile = iframe.contentDocument!.head;
		const linkTag = document.createElement('link');
		linkTag.rel = 'stylesheet';
		linkTag.href = "/index.admin.min.css";
		headFile.appendChild(linkTag)
	}

	static cleaningAttr(dom: Document) {
		const body = dom.body;
		function enumeration(element) {
			element.childNodes.forEach((node) => {
				if (node.style) {
					node.removeAttribute('style');
				}
				if (node.dataset && node.dataset.editorType === 'text') {
					node.removeAttribute('nodeid');
				}
				enumeration(node)
			})
		}
		enumeration(body);
	}

	static createBackup = async (dom: Document, pathPage: string): Promise<void> => {

		return new Promise(async (res, rej) => {

			try {
				DOMHelper.cleaningAttr(dom);

				const html = DOMHelper.serializeDomToString(dom);

				const date = new Date().toLocaleString();

				await axios
					.post('/pages/createBackup', { pathPage, html, date })
					.then(() => res())
					.catch(() => {
						throw new Error
					})
			} catch(e) {
				console.log(e);
				rej();
			}
		});
	}

	static selectBackup = async (activeItemList: string): Promise<AxiosResponse> => {
		return new Promise((res, rej) => {
			const date = new Date().toLocaleString();
			axios
				.post(`/pages/selectBackup?fileName=${activeItemList}&date=${date}`)
				.then(file => {
					res(file)
				})
				.catch(() => rej());
		})
		
	}

	static save = async (dom: Document): Promise<void> => {

		const saveFileEdit = async (nameFile: string, html: string): Promise<void> => {
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

		const saveTempFile = async (dom: Document): Promise<void> => {
			const html = DOMHelper.serializeDomToString(dom);
			return new Promise((res, rej) => {
				axios.post('/temp/createTempHtml', { html })
					.then(() => {
						res();
					})
					.catch(() => {
						rej();
					})
			})
		}

		return new Promise(async (res, rej) => {

			try {

				await saveTempFile(dom)

				DOMHelper.cleaningAttr(dom);

				const allFileEditor = dom.body.querySelectorAll('[data-file-edit]');

				for (let i = 0; i < allFileEditor.length; i++) {
					const nameFile = allFileEditor[i].getAttribute("data-file-edit") as string;
					const html = DOMHelper.serializeDomToString(allFileEditor[i]);
					await saveFileEdit(nameFile, html)
						.catch(() => {
							throw new Error();
						});
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