import { showModal } from "./modalShowFind";

export default function () {
    const phoneBtnAdminAdd = document.querySelector('.phone__btn_admin_add'),
          phoneBtnsAdminEdit = document.querySelectorAll('.phone__btn_admin_edit'),
          phoneBtnsAdminDelete = document.querySelectorAll('.phone__btn_admin_delete');


    function modalPhoneAdd(urlCurrent) { 
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="/phone/add" method="POST">

                            <div class="modal-admin__item">
                                <label for="phone" class="modal-admin__label">Введите телефон без "8":</label>
                                <textarea placeholder="Введите 10 цифр, без '8'" wrap="soft" id="phone" name="phone" type="text" required class="modal-admin__textarea"/></textarea>
                            </div>

                            <input name="urlPrev" type="hidden" value="${urlCurrent}"/>
                        
                            <button class="btn modal-admin__btn">Добавить</button>

                        </form>
                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `;
    }

    function modalPhoneEdit(id, urlCurrent) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/phone/edit" method="POST">
        
                        <div class="modal-admin__item">
                            <label for="phone" class="modal-admin__label">Введите телефон без "8":</label>
                            <textarea placeholder="Введите 10 цифр, без '8'" wrap="soft" id="${id}" name="phone" type="number" required class="modal-admin__textarea"/></textarea>
                            <input type="hidden" name="id" value="${id}"/>
                        </div>

                        <input name="urlPrev" type="hidden" value="${urlCurrent}"/>
                    
                        <button class="btn modal-admin__btn">Добавить</button>
        
                    </form>
                </div>
                <img src="/icons/close.svg" class="modal-admin__close">
            </div>
        </div>
        `
    } 
	
    phoneBtnAdminAdd.addEventListener('click', (e) => {
        const urlCurrent = document.location.pathname;
        e.target.setAttribute('disabled', true);
        const modal = modalPhoneAdd(urlCurrent)
        showModal(modal, e.target);
    });

    phoneBtnsAdminEdit.forEach(item => {
        const urlCurrent = document.location.pathname;
        const id = item.parentElement.parentElement.firstElementChild.getAttribute('id');

        item.addEventListener('click', (e) => {
            e.target.setAttribute('disabled', true);
            const modal = modalPhoneEdit(id, urlCurrent);
            showModal(modal, e.target);
        });
    });

    phoneBtnsAdminDelete.forEach(item => {
        const id = item.parentElement.parentElement.firstElementChild.getAttribute('id');
        
        item.addEventListener('click', async(e) => {
            e.target.setAttribute('disabled', true);
            await fetch(`/phone/delete/${id}`, {
                method: 'DELETE'
            })
            .then(() => window.location.reload())
        });
    });
}