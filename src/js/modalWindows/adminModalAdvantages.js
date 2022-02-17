import { showModal } from "./modalShowFind";

export default function adminModalAdvantages() {
    const advantagesBtnsAdminEdit = document.querySelectorAll('.advantages__btn_admin_edit');
    const advantagesBtnsAdminAdd = document.querySelectorAll('.advantages__btn_admin_add');

   


    function modalFieldEdit(title, field, id) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/other/advantages/edit" method="POST">

                        <div class="modal-admin__item">
                            <label for="" class="modal-admin__label">Введите заголовок:</label>
                            <textarea wrap="soft" name="title" type="text" value="${title}" required class="modal-admin__textarea"/>${title}</textarea>
                        </div>
        
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

    advantagesBtnsAdminEdit.forEach(item => {
        const id = item.getAttribute('id');
        const parentNode = item.parentElement;
        const title = parentNode.querySelector('.advantage__item-title').innerText;
        const field = parentNode.querySelector('.advantage__desc').innerText;

        item.addEventListener('click', (e) => {
            e.target.setAttribute('disabled', true);
            const modal = modalFieldEdit(title, field, id);
            showModal(modal, e.target)
        })
    })
}