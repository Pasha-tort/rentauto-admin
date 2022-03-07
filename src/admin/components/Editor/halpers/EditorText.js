import e from 'connect-flash';

export class EditorText {
	constructor(element, virtualElement) {
		this.element = element;
		this.virtualElement = virtualElement;
		// this.element.addEventListener('keypress', (e) => this.onKeyPress(e));
		this.element.addEventListener('input', (e) => this.onTextEdit(e));
	}

	onTextEdit(e) {
		this.virtualElement.innerHTML = this.element.innerHTML;
	}

	onKeyPress(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	}
}