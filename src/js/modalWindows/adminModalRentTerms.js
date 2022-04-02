import { showModal } from "./modalShowFind";

export default function adminModalRentTerms() {
    const catalogAddSpecification = document.querySelector('.catalog-admin__add-rent-term');
    const catalogEditSpecification = document.querySelector('.catalog-admin__edit-rent-terms');


    function modalRentTermAdd(actionPath, urlCurrent) { 
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST">

                            <div class="modal-admin__item">
                                <label for="specification" class="modal-admin__label">Введите срок аренды:</label>
                                <textarea wrap="soft" name="rentTerm" type="text" required class="modal-admin__textarea"/></textarea>
                            </div>

                            <div class="modal-admin__item">
                                <label for="priority" class="modal-admin__label">Введите приоритетность:</label>
                                <textarea wrap="soft" name="priority" type="number" required class="modal-admin__textarea"/></textarea>
                            </div>

                            <input type="hidden" name="urlPrev" value="${urlCurrent}"/>
                        
                            <button class="btn modal-admin__btn">Добавить</button>

                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `
    }

    function modalRentTermsEdit(listHtml, actionPath, urlCurrent) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">

                    <span class="modal-admin__title">Условия аренды:</span>
                
                    <form class="modal-admin__form" action="${actionPath}" method="POST">

                        ${listHtml}

                        <input type="hidden" name="urlPrev" value="${urlCurrent}"/>
                    
                        <button class="btn modal-admin__btn">Изменить</button>

                    </form>

                    

                </div>
                <img src="/icons/close.svg" class="modal-admin__close">
            </div>
        </div>
        `
    } 

    function rentTermItem(id, rentTerm, priority) {
        return `
            <div class="modal-admin__item">
                <label for="specifications" class="modal-admin__label">${rentTerm}</label>
                <textarea wrap="soft" name="rentTerms" type="text" value="${rentTerm}" required class="modal-admin__textarea">${rentTerm}</textarea>
                <label for="prioritys" class="modal-admin__label">Приоритетность характеристики:</label>
                <textarea wrap="soft" name="prioritys" type="number" value="${priority}" required class="modal-admin__textarea">${priority}</textarea>
                <input type="hidden" name="id" value="${id}"/>
                <a class="btn-admin remove-rent-term" id="${id}">Удалить пункт условия</a>
            </div> 
        `
    }

    catalogAddSpecification.addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true);
        const urlCurrent = document.location.pathname;

    	const actionPath = '/rent-terms/add-rent-term';

        const modal = modalRentTermAdd(actionPath, urlCurrent);
        showModal(modal, e.target)
    })

    catalogEditSpecification.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const urlCurrent = document.location.pathname;

        let actionPath = '/rent-terms/edit-rent-terms';
        let getUrl = '/rent-terms';
        let removeUrl = '/rent-terms/remove';

        let rentTerms = null;

        await fetch(getUrl)
            .then(data => data.json())
            .then(data => {
                data.sort((a,b) => +a.priority - +b.priority);
                rentTerms = data;
            });


        let listHtml = rentTerms.map(item => {
            return rentTermItem(item._id, item.rentTerm, item.priority);
        });
        
        listHtml = await listHtml.join('');
        const modal = modalRentTermsEdit(listHtml, actionPath, urlCurrent);
        showModal(modal, e.target);
        
        const btnDelete = document.querySelectorAll('.remove-rent-term');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', async(e) => {
                e.target.setAttribute('disabled', true);
                const id = e.target.getAttribute('id');

                await fetch(`${removeUrl+'/'+id}`, {
                    method: 'DELETE',
                }).then(() => window.location.reload());
            });
        });
    });
}