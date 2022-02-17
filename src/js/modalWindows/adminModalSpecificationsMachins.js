import { showModal } from "./modalShowFind";

export default function adminModalSpecificationsMachines() {
    const catalogAddSpecification = document.querySelector('.catalog-admin__add-specification');
    const catalogEditSpecification = document.querySelector('.catalog-admin__edit-specification');


    function modalSpecificationAdd(actionPath, urlCurrent) { 
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST">

                            <div class="modal-admin__item">
                                <label for="specification" class="modal-admin__label">Введите характеристику:</label>
                                <textarea wrap="soft" name="specification" type="text" required class="modal-admin__textarea"/></textarea>
                            </div>

                            <div class="modal-admin__item">
                                <label for="priority" class="modal-admin__label">Введите приоритетность:</label>
                                <textarea wrap="soft" name="priority" type="number" required class="modal-admin__textarea"/></textarea>
                            </div>

                            <input type="hidden" name="urlPrev" value="${urlCurrent}"/>
                        
                            <button class="btn modal-admin__btn">Добавить характеристику</button>

                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `
    }

    function modalSpecificationsEdit(listHtml, actionPath, titleForm, urlCurrent) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">

                    <span class="modal-admin__title">${titleForm}</span>
                
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

    function specificationItem(id, specification, priority) {
        return `
            <div class="modal-admin__item">
                <label for="specifications" class="modal-admin__label">${specification}</label>
                <textarea wrap="soft" name="specifications" type="text" value="${specification}" required class="modal-admin__textarea">${specification}</textarea>
                <label for="prioritys" class="modal-admin__label">Приоритетность характеристики:</label>
                <textarea wrap="soft" name="prioritys" type="number" value="${priority}" required class="modal-admin__textarea">${priority}</textarea>
                <input type="hidden" name="id" value="${id}"/>
                <a class="btn-admin remove-specification" id="${id}">Удалить характеристику</a>
            </div> 
        `
    }

    catalogAddSpecification.addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true);
        const urlCurrent = document.location.pathname;

        let actionPath = null;
        const pathUrl = document.location.pathname;
        
        switch(pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/add-specification';
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/add-specification';
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/add-specification';
                break;
            default:
                actionPath = null;
                break;
        }
        
        if (actionPath === null) {
            return;
        }

        const modal = modalSpecificationAdd(actionPath, urlCurrent);
        showModal(modal, e.target)
    })

    catalogEditSpecification.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const urlCurrent = document.location.pathname;

        let actionPath = null;
        let getUrl = null;
        let titleForm = null;
        let removeUrl = null;
        const pathUrl = document.location.pathname;


        switch(pathUrl) {
            case '/catalog/personal/':
                actionPath  = '/catalog/personal/edit-specifications';
                getUrl      = '/catalog/personal/specifications';
                titleForm   = 'Характеристики личного транспорта';
                removeUrl   = '/catalog/personal/specifications/remove';
                break;
            case '/catalog/commercial/':
                actionPath  = '/catalog/commercial/edit-specifications';
                getUrl      = '/catalog/commercial/specifications';
                titleForm   = 'Характеристики коммерческого транспорта';
                removeUrl   = '/catalog/commercial/specifications/remove';
                break;
            case '/catalog/special/':
                actionPath  = '/catalog/special/edit-specifications';
                getUrl      = '/catalog/special/specifications';
                titleForm   = 'Характеристики специального транспорта';
                removeUrl   = '/catalog/special/specifications/remove';
                break;
            default:
                actionPath = null;
                getUrl = null;
                break;
        }

        let specifications = null;

        await fetch(getUrl)
            .then(data => data.json())
            .then(data => {
                data.sort((a,b) => +a.priority - +b.priority);
                specifications = data;
            });


        let listHtml = await specifications.map(item => {
            return specificationItem(item._id, item.specification, item.priority);
        });
        
        listHtml = await listHtml.join('');
        const modal = await modalSpecificationsEdit(listHtml, actionPath, titleForm, urlCurrent);
        await showModal(modal, e.target);
        
        const btnDelete = await document.querySelectorAll('.remove-specification');
        await btnDelete.forEach(btn => {
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