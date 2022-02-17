import { showModal } from "./modalShowFind";

export default function adminModalExchange() {
    const exchangeBtnsAdminEdit = document.querySelector('.exchange-auto__btn-admin_edit');

    function modalFieldEdit(field, id) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/other/exchange/edit" method="POST">
        
                        <div class="modal-admin__item">
                            <label for="" class="modal-admin__label">Введите текст:</label>
                            <textarea wrap="soft" name="field" type="text" value="${field}" required class="modal-admin__textarea"/>${field}</textarea>
                        </div>

                        <input type="hidden" name="id" value="${id}"/>
                    
                        <button class="btn modal-admin__btn">Добавить</button>
        
                    </form>
                </div>
                <img src="/icons/close.svg" class="modal-admin__close">
            </div>
        </div>
        `
    } 

    const id = exchangeBtnsAdminEdit.getAttribute('id');
    const parentNode = exchangeBtnsAdminEdit.parentElement;
    const field = parentNode.querySelector('.exchange-auto__desc').innerText;

    exchangeBtnsAdminEdit.addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true);
        const modal = modalFieldEdit(field, id);
        showModal(modal, e.target)
    })
    
}