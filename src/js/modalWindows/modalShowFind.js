const bodyEl = document.querySelector('body');

export function hideModal(btnTarget) {
    const modal = document.querySelector('.modal-admin__background');
    if (modal) {
        bodyEl.removeChild(modal);
		bodyEl.classList.remove('body-ovh');
        if (btnTarget) {
            btnTarget.removeAttribute('disabled');
        }
    }
}

export function showModal(modalWindow, btnTarget, autoClose) {
    const modal = document.createElement('div');
    modal.classList.add('modal-admin__background');
    modal.innerHTML = modalWindow; 
	bodyEl.classList.add('body-ovh');
    bodyEl.insertAdjacentElement('afterbegin', modal);

    const close = document.querySelector('.modal-admin__close') || document.querySelector('.modal-admin__close-zoom-photo');

	let closeThanks;

	if (autoClose) {
		closeThanks = setTimeout(() => {
			hideModal();
		}, 5000);
	}

    close.addEventListener('click', () => {
		hideModal(btnTarget);
		clearTimeout(closeThanks);
	});
    
    modal.addEventListener('click', (e) => {
        
        if (e.target && e.target.matches('.modal-admin__background')) {
            hideModal(btnTarget);
			clearTimeout(closeThanks);
        }
    });
}