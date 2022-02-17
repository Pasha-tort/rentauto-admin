import { showModal } from "./modalShowFind";

export default function adminModalCatalogTitle() {
    const catalogTitleBtnAdminEdit = document.querySelector('.catalog-admin__btn_edit-title');

    function modalFieldEdit(pageName, title, type, url, id) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/other/catalog-title/edit" method="POST">

                        <div class="modal-admin__item">
                            <label for="" class="modal-admin__label">Введите заголовок:</label>
                            <textarea wrap="soft" name="pageName" type="text" value="${pageName}" required class="modal-admin__textarea"/>${pageName}</textarea>
                        </div>
        
                        <div class="modal-admin__item">
                            <label for="" class="modal-admin__label">Введите текст:</label>
                            <textarea wrap="soft" name="title" type="text" value="${title}" required class="modal-admin__textarea"/>${title}</textarea>
                        </div>

                        <input type="hidden" name="type" value="${type}"/>
                        <input type="hidden" name="prevUrl" value="${url}"/>
                        <input type="hidden" name="id" value="${id}"/>
                    
                        <button class="btn modal-admin__btn">Добавить</button>
        
                    </form>
                </div>
                <img src="/icons/close.svg" class="modal-admin__close">
            </div>
        </div>
        `
    } 
    
    const pageName = document.querySelector('.catalog__header__main-title').innerText;
    const title = document.querySelector('.catalog__header__desc').innerText;

    const url = document.location.pathname;
    let type = null;

    if (url === '/catalog/personal/' || url === '/catalog/personal') {
        type = 'personal';
    } else if ( url === '/catalog/commercial/' || url === '/catalog/commercial') {
        type = 'commercial';
    } else if ( url === '/catalog/special/' || url === '/catalog/special') {
        type = 'special';
    }

    catalogTitleBtnAdminEdit.addEventListener('click', (e) => {
        const id = e.target.getAttribute('id');
        e.target.setAttribute('disabled', true);
        const modal = modalFieldEdit(pageName, title, type, url, id);
        showModal(modal, e.target);
    });
}