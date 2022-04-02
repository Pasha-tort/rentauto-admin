import { showModal, hideModal } from "./modalShowFind";
import modalClient from "./modalClient";

export default function modalExchange(e) {

    function modalClientWindow(imgclose) { 
        return `
        
            <div class="modal-exchange__wrapper">
                <div class="modal-client__wrapper_second">
                    <div class="modal-client__box">
                        <div class="modal-client__info">
                            <span class="modal-exchange__title">Сервис временно недоступен</span>
                            <span class="modal-exchange__desc">
                                В данный момент сервис находится в разработке.
                                Приносим извинения за временные неудобства.
                            </span>
                            <button class="btn modal-exchange__btn">Связаться с менеджером</button>
                        </div>
                    </div>
                    ${imgClose}
                </div>
            </div>
        
        `;
    }

	let imgClose;

	if(document.documentElement.clientWidth < 576) {
		imgClose = '<img src="/icons/closeBlack.svg" class="modal-admin__close"></img>';
	} else {
		imgClose = '<img src="/icons/close.svg" class="modal-admin__close"></img>';
	}
    
    const modal = modalClientWindow(imgClose);
    showModal(modal, e.target);

    const exchangeBtn = document.querySelector('.modal-exchange__btn');
    exchangeBtn.addEventListener('click', () => {
        hideModal();
        modalClient(e, '/mailer/feedback');
    });
}