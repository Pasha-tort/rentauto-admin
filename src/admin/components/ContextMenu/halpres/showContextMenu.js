export function onContextMenu() {
	showContextMenu(menu, e.pageX, e.pageY);
}

export function showContextMenu(x, y) {
	style.left = x + 'px';
	style.top = y + 'px';
	classList.add('context-menu__wrapper_active')
}