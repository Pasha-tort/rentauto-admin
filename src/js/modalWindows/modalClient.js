import { showModal } from "./modalShowFind";
import submitForm from '../submitForm';
import forms from '../forms';
import maskPhone from '../maskPhone';

export default function modalClient(e, urlMailer) {

    function modalClientWindow(img, imgCloseOutput, imgCloseInput, imgModalMobile) { 
        return `
            <div class="modal-client__wrapper">
                <div class="modal-client__wrapper_second">
                    <div class="modal-client__box">
                        <div class="catalog__feedback__wrapper">
							${imgModalMobile}
                            <div class="catalog__feedback__info modal-client-ovh-y">

                                <h4 class="catalog__feedback__title">Выбрали автомобиль? Мы вам позвоним!</h4>

                                <form action="" class="catalog__feedback__form modal-form-client" method="POST">

                                    <div class="catalog__feedback__data">
                                        <div class="catalog__feedback__input__block">
                                            <label for="name" class="form__label catalog__feedback__input__label">ФИО</label>
                                            <input name="name" value="" class="form__input catalog__feedback__input input-name"/>
                                        </div>
                                        <div class="catalog__feedback__input__block">
                                            <label for="phone" class="form__label catalog__feedback__input__label">Номер телефона</label>
                                            <input name="phone"  value="" class="form__input catalog__feedback__input input-tel"/>
                                        </div>
                                        <div class="catalog__feedback__input__block">
                                            <label for="email" class="form__label catalog__feedback__input__label">E-mail</label>
                                            <input name="email" value="" class="form__input catalog__feedback__input input-email"/>
                                        </div>
                                    </div>
                                    
                                    <div class="catalog__feedback__comments__block">
                                        <label for="comments" class="catalog__feedback__comments__label">Коментарий</label>
                                        <textarea name="comments" placeholder="Здесь вы можете уточнить ваши пожелания" class="catalog__feedback__comments"></textarea>
                                    </div>

                                    <div class="catalog__feedback__submit">
                                        <button class="btn catalog__feedback__btn btn__form-submit">Отправить</button>
                                        <span class="catalog__feedback__agreement">Нажимая на кнопку «Отправить», вы даёте <a href="/privacy.html" target="_blank">согласие</a> на обработку своих персональных данных</span>
                                    </div>
                                </form>

                            </div>
                            ${imgCloseInput}
							${img}
                        </div>
                    </div>
                    ${imgCloseOutput}
                </div>
            </div>
        `;
    }

    let img;
	let imgCloseOutput;
	let imgCloseInput;
	let imgModalMobile;
    
	if(document.documentElement.clientWidth < 576) {
		imgCloseInput = '<img src="/icons/close.svg" class="modal-admin__close"></img>';
		imgModalMobile = '<img class="catalog__feedback__img_mobile modal-client__img" src="/img/modalImgMobile.jpg">';
		imgCloseOutput = '';
		img = ''
	} else if (document.documentElement.clientWidth < 992 && document.documentElement.clientWidth >= 576) {
		imgCloseInput = '<img src="/icons/closeBlack.svg" class="modal-admin__close"></img>';
		imgCloseOutput = '';
		imgModalMobile = '';
		img = ''
	} else {
		imgCloseOutput = '<img src="/icons/close.svg" class="modal-admin__close"></img>';
		imgCloseInput = '';
		imgModalMobile = '';
		img = '<img class="catalog__feedback__img modal-client__img" src="/img/modalImg.webp">';
	}

    const modal = modalClientWindow(img, imgCloseOutput, imgCloseInput, imgModalMobile);
    showModal(modal, e.target);
    forms();

    maskPhone('.input-tel');
    submitForm('.modal-form-client', urlMailer, e.target);
}

