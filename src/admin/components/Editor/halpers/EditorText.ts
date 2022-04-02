import e from 'connect-flash';

export class EditorText {
	element: Element;
	virtualElement: Element;
	constructor(element: Element, virtualElement: Element) {
		this.element = element;
		this.virtualElement = virtualElement;
		// this.element.addEventListener('keyup', (e) => this.onKeyPress(e));
		this.element.addEventListener('input', () => this.onTextEdit());
	}

	onTextEdit() {
		this.virtualElement.innerHTML = this.element.innerHTML;
	}

	onKeyPress(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			let str = e.target.innerHTML;
			str = str.replace(/[<div><br><\/div>]+/, '<br/>');
			e.target.innerHTML = str;
		}
	}
}