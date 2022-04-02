export default function headerBackground() {
	const headerBackground = document.querySelector('.catalog__header');

	const widthClient = document.documentElement.clientWidth;
	let nav;

	if (widthClient < 576) {
		nav = document.querySelector('.nav__wrapper_mobile');
	} else {
		nav = document.querySelector('.nav__wrapper');
	}

	headerBackground.style.height = document.documentElement.clientHeight - +window.getComputedStyle(nav).height.match(/\d+/g)[0] + 'px';
}