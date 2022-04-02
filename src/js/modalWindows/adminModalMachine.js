import { showModal } from "./modalShowFind";

export default function adminModalMachines() {
    const btnMachineAdd = document.querySelector('.catalog-admin__add-machine');

    function modalAddedMachine(listHtml, listHtmlRentTerms, actionPath) {
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST">
							Поля которые должны остаться пустыми, пусть остаються пустыми, не заполняйте их.

                            <label for="nameMachine" class="modal-admin__label">Название машины:</label>
                            <textarea required class="modal-admin__textarea" name="nameMachine" type="text"></textarea>

                            <label for="price" class="modal-admin__label">Цена:</label>
                            <textarea class="modal-admin__textarea" name="price" placeholder="Вводите цифры или оставьте поле пустым" type="text"></textarea>

                            <label for="availability" class="modal-admin__label">Наличие:</label>
                            
                            <div class="modal-admin__radio-box">
                                <div class="modal-admin__radio-item">
                                    <input required class="modal-admin__radio" name="availability" value=true type="radio">
                                    <span>В наличии</span>
                                </div>
                                
                                <div class="modal-admin__radio-item">
                                    <input required class="modal-admin__radio" name="availability" value=false type="radio">
                                    <span>Под заказ</span>
                                </div>
                                
                            </div>

							<span class="modal-admin__title">Условия рассрочки:</span>

							${listHtmlRentTerms}
                            
                            <span class="modal-admin__title">Характеристики машины:</span>

                            ${listHtml}

                            <button class="btn modal-admin__btn">Добавить машину</button>
                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `;
    }

    function itemFormAdded(specification) {
        return `
            <div class="modal-admin__item">
                <label for="specifications" class="modal-admin__label">${specification}</label>
                <textarea class="modal-admin__textarea" name="specificationsValue" type="text"></textarea>
                <input type="hidden" value="${specification}" name="specificationsName"/>
            </div>
        `
    }

	function itemRentTermFormAdded(rentTerm) {
        return `
            <div class="modal-admin__item">
                <label for="rentTerms" class="modal-admin__label">${rentTerm}</label>
                <textarea class="modal-admin__textarea" placeholder="Полная сумма выплаты." name="rentTermsFullValue" type="text"></textarea>
				<textarea class="modal-admin__textarea" placeholder="Месячная сумма выплаты." name="rentTermsMonthlyValue" type="text"></textarea>
                <input type="hidden" value="${rentTerm}" name="rentTermsName"/>
            </div>
        `
    }

    btnMachineAdd.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];

        let actionPath = null;
        let urlSpecifications = null;
		const getUrlRentTerms = '/rent-terms';

        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/add-machine';
                urlSpecifications = '/catalog/personal/specifications';
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/add-machine';
                urlSpecifications = '/catalog/commercial/specifications';
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/add-machine';
                urlSpecifications = '/catalog/special/specifications';
                break;
            default:
                actionPath = null;
                urlSpecifications = null;
                break;
        }
        
        let specifications = null;
		let rentTerms = null;

        await fetch(urlSpecifications)
            .then(data => data.json())
            .then(data => {
                data.sort((a,b) => +a.priority - +b.priority);
                specifications = data;
        });
		
		await fetch(getUrlRentTerms)
			.then(data => data.json())
			.then(data => {
				data.sort((a,b) => +a.priority - +b.priority);
                rentTerms = data;
			})

        let listHtml = specifications.map(specification => {
            return itemFormAdded(specification.specification);
        });

		let listHtmlRentTerms = rentTerms.map(rentTerm => {
			return itemRentTermFormAdded(rentTerm.rentTerm)
		});
        
        listHtml = listHtml.join('');
		listHtmlRentTerms = listHtmlRentTerms.join('');
        const modal = modalAddedMachine(listHtml, listHtmlRentTerms, actionPath);

        showModal(modal, e.target);
    });
}



