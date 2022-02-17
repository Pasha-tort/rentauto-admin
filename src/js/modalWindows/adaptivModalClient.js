export default function adaptivModalClient() {
	if (document.documentElement.clientWidth < 1024) {
		const inputs = document.querySelectorAll('.form__input');
		const bodyEl = document.querySelector('body');

		const scrolltop = document.documentElement.scrollTop;

		inputs.forEach(input => {
			input.addEventListener('blur', (e) => {
				bodyEl.style.overflow = "visibility";
				window.scrollTo(0, scrolltop);
				bodyEl.style.overflow = "hidden";
			});
		});
	}
}