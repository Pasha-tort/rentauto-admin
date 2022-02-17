import { showModal } from "./modalShowFind"
export default function showThanksModal() {
    const modalThanks = (imgCloseInput, imgCloseOutput) => {
		return `
				<div class="modal-client__wrapper modal-client__thanks">
					<div class="modal-client__wrapper_second">
						<div class="modal-client__box">

							<div class="modal-client__info">
								<span class="modal-client__thanks__message">Заявка успешно отправлена. Нам менеджер свяжется с вами в ближайшее время.</span>
								${imgCloseOutput}
							</div>

						</div>
						${imgCloseInput}
					</div>
				</div>
				`
	}

	let imgCloseOutput;
	let imgCloseInput;
    
	if(document.documentElement.clientWidth < 576) {
		imgCloseInput = '<img src="/icons/closeBlack.svg" class="modal-admin__close"></img>';
		imgCloseOutput = '';
	} else {
		imgCloseOutput = '<img src="/icons/close.svg" class="modal-admin__close"></img>';
		imgCloseInput = '';
	}

	const modal = modalThanks(imgCloseInput, imgCloseOutput)

    showModal(modal, null, true);
}