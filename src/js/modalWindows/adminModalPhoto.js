import { showModal } from "./modalShowFind";

export default function adminModalPhoto() {
    const btnMachineAddPhoto = document.querySelector('.details__added-photo');
    const btnMachineDeletePhoto = document.querySelector('.details__delete-photo');
    const btnMachineAvatarPhoto = document.querySelector('.details__avatar-photo');
    const btnMachineEditSpecifications = document.querySelector('.details__edit-specifications');
	const btnMachineEditDesc = document.querySelector('.details__edit-desc');

    function modalAddedPhoto(actionPath, id) {
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST" enctype="multipart/form-data">

                            <span class="modal-admin__title">Добавьте фоторафии:</span>

                            <input type="file" name="photo" id="photo" multiple accept="image/*" />

                            <input type="hidden" name="id" value="${id}"/>

                            <button class="btn modal-admin__btn">Добавить фото</button>
                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `;
    }

    function modalDeleteAndAvatarPhoto(actionPath, listHtml) {
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST" enctype="multipart/form-data">

                            ${listHtml}
                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `
    }

    function  modalEditSpecifications(actionPath, listHtml, listHtmlRentTerms, info) {
        return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST">
							Поля которые должны остаться пустыми, пусть остаються пустыми, не заполняйте их.

                            <label for="nameMachine" class="modal-admin__label">Название машины:</label>
                            <textarea class="modal-admin__textarea" name="nameMachine" value="${info.nameMachine}" type="text">${info.nameMachine}</textarea>

                            <label for="price" class="modal-admin__label">Цена:</label>
                            <textarea class="modal-admin__textarea" name="price" placeholder="Вводите цифры или оставьте поле пустым" value="${info.price}" type="text">${info.price}</textarea>

                            <label for="availability" class="modal-admin__label">Наличие:</label>
                            <div class="modal-admin__radio-box">

                                <div class="modal-admin__radio-item">
                                    <input required class="modal-admin__radio" id="availability_true" name="availability" checked=false value=true type="radio">
                                    <span>В наличии</span>
                                </div>
                                
                                <div class="modal-admin__radio-item">
                                    <input required class="modal-admin__radio" id="availability_false" name="availability" checked=false value=false type="radio">
                                    <span>Под заказ</span>
                                </div>
                                
                            </div>

							<span class="modal-admin__title">Условия аренды:</span>

							${listHtmlRentTerms}

                            <span class="modal-admin__title">Характеристики:</span>

                            ${listHtml}

                            <button class="btn modal-admin__btn">Принять изменения</button>
                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `
    }

	function modalRentTermsEditItem(rentTermsName, rentTermsFullValue, rentTermsMonthlyValue) {
		return `
				<div class="modal-admin__item">
					<label for="rentTermsNewValue" class="modal-admin__label">${rentTermsName}</label>
					<textarea wrap="soft" name="rentTermsFullValue" type="text" placeholder="Полная сумма платежа" value="${rentTermsFullValue}" class="modal-admin__textarea">${rentTermsFullValue}</textarea>
					<textarea wrap="soft" name="rentTermsMonthlyValue" type="text" placeholder="Месячная сумма платежа" value="${rentTermsMonthlyValue}" class="modal-admin__textarea">${rentTermsMonthlyValue}</textarea>
					<input type="hidden" name="rentTermsName" value="${rentTermsName}"/>
				</div> 
		`
	}

    function modalDeletePhotoItem(src, filename, id) {
        return `
            <div class="modal-admin__item-photo">
                <span class="modal-admin__title">Фото:</span>
                <img src="${src}/${filename}"/>
                <a class="btn-admin btn-admin__delete-photo" data-filename="${filename}" id="${id}">Удалить фото</a>
            </div>
        `
    }

    function modalAvatarPhotoItem(src, filename, id) {
        return `
            <div class="modal-admin__item-photo">
                <span class="modal-admin__title">Фото:</span>
                <img src="${src}/${filename}"/>
                <a class="btn-admin btn-admin__avatar-select-photo" data-filename="${filename}" id="${id}">Установить фото</a>
            </div>
        `
    }

    function modalEditSpecificationsItem(specification, valueSpecification) {
        return `
        <div class="modal-admin__item">
            <label for="specifications" class="modal-admin__label">${specification}</label>
            <textarea wrap="soft" name="specificationsNewValue" type="text" value="${valueSpecification}" class="modal-admin__textarea">${valueSpecification}</textarea>
            <input type="hidden" name="specificationsName" value="${specification}"/>
        </div> 
        `
    }

	function modalEditDesc(actionPath, desc, id) {
		return `
            <div class="modal-admin__wrapper">
                <div class="modal-admin__wrapper_second">
                    <div class="modal-admin__box">
                    
                        <form class="modal-admin__form" action="${actionPath}" method="POST" enctype="multipart/form-data">

							<label for="desc" class="modal-admin__label">Описание:</label>
							<textarea wrap="soft" name="desc" type="text" value="${desc}" class="modal-admin__textarea_extend modal-admin__textarea">${desc}</textarea>
							<input type="hidden" name="id" value="${id}"/>

							<button class="btn modal-admin__btn">Изменить описание</button>
                        </form>

                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close">
                </div>
            </div>
        `;
	}

    btnMachineAddPhoto.addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true);
        const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];
        const id = e.target.getAttribute('id');
        
        let actionPath = null;

        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/add-photo';
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/add-photo';
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/add-photo';
                break;
            default:
                actionPath = null;
                break;
        }

        const modal = modalAddedPhoto(actionPath, id);

        showModal(modal, e.target);
    });

    btnMachineDeletePhoto.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];
        const id = e.target.getAttribute('id');

        let actionPath = null;
        let removePhotoUrl = null;
        let getPhotoUrl = null;
        
        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/delete-photo';
                removePhotoUrl = '/catalog/personal/delete-photo';
                getPhotoUrl = '/catalog/personal/photo'+'/'+id;
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/delete-photo';
                removePhotoUrl = '/catalog/commercial/delete-photo';
                getPhotoUrl = '/catalog/commercial/photo'+'/'+id;
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/delete-photo';
                removePhotoUrl = '/catalog/special/delete-photo';
                getPhotoUrl = '/catalog/special/photo'+'/'+id;
                break;
            default:
                actionPath = null;
                removePhotoUrl = null;
        }

        let listPhoto = null;

        await fetch(getPhotoUrl)
            .then(data => data.json())
            .then(photo => {
                listPhoto = photo.photo;
            });

        let listHtml = null;

        if (!listPhoto.length) {
            listHtml = '<span class="modal-admin__title">Фото пока нет</span>';
        } else {
            listHtml = listPhoto.map((photo, i) => {
                const {destination, filename} = photo;
                return modalDeletePhotoItem(destination, filename, id)
            });

            listHtml = listHtml.join('');
        }

        const modal = await modalDeleteAndAvatarPhoto(actionPath, listHtml);
        showModal(modal, e.target);

        const btnDelete = await document.querySelectorAll('.btn-admin__delete-photo');

        await btnDelete.forEach(btn => {

            btn.addEventListener('click', async(e) => {
                e.target.setAttribute('disabled', true);
                const id = e.target.getAttribute('id');
                const fileName = e.target.dataset.filename;

                await fetch(`${removePhotoUrl+'/'+id+'/'+fileName}`, {
                    method: 'DELETE',
                }).then(() => window.location.reload());
            });
        }); 
    });
    
    btnMachineAvatarPhoto.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];
        const id = e.target.getAttribute('id');

        let actionPath = null;
        let getPhotoUrl = null;

        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/avatar-photo';
                getPhotoUrl = '/catalog/personal/photo'+'/'+id;
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/avatar-photo';
                getPhotoUrl = '/catalog/commercial/photo'+'/'+id;
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/avatar-photo';
                getPhotoUrl = '/catalog/special/photo'+'/'+id;
                break;
            default:
                actionPath = null;
                getPhotoUrl = null;
                break;
        }

        let listPhoto = null;

        await fetch(getPhotoUrl)
            .then(data => data.json())
            .then(photo => {
                listPhoto = photo.photo;
            });

        let listHtml = null;

        if (!listPhoto.length) {
            listHtml = '<span class="modal-admin__title">Фото пока нет</span>';
        } else {
            listHtml = listPhoto.map((photo, i) => {
                const {destination, filename} = photo;
                return modalAvatarPhotoItem(destination, filename, id)
            });

            listHtml = listHtml.join('');
        }

        const modal = await modalDeleteAndAvatarPhoto(actionPath, listHtml);
        showModal(modal, e.target);

        const btnAvatarSelect = await document.querySelectorAll('.btn-admin__avatar-select-photo');

        await btnAvatarSelect.forEach(btn => {

            btn.addEventListener('click', async(e) => {
                e.target.setAttribute('disabled', true);
                const id = e.target.getAttribute('id');
                const fileName = e.target.dataset.filename;

                await fetch(`${actionPath+'/'+id+'/'+fileName}`, {
                    method: 'POST',
                }).then(() => window.location.reload());
            });
        }); 
    });

    btnMachineEditSpecifications.addEventListener('click', async(e) => {
        e.target.setAttribute('disabled', true);
        const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];
        const id = e.target.getAttribute('id');

        let actionPath = null;
        let urlAllSpecifications = null;
        let urlCurrentMachineSpecifications = null;
		let urlCurrentMachineRentTerms = null;
		const urlAllRentTerms = '/rent-terms';

        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/edit-specifications/'+id;
                urlAllSpecifications = '/catalog/personal/specifications';
                urlCurrentMachineSpecifications = '/catalog/personal/specifications/'+id;
				urlCurrentMachineRentTerms = '/catalog/personal/rent-terms/' + id
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/edit-specifications/'+id;
                urlAllSpecifications = '/catalog/commercial/specifications';
                urlCurrentMachineSpecifications = '/catalog/commercial/specifications/'+id;
				urlCurrentMachineRentTerms = '/catalog/commercial/rent-terms/' + id
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/edit-specifications/'+id;
                urlAllSpecifications = '/catalog/special/specifications';
                urlCurrentMachineSpecifications = '/catalog/special/specifications/'+id;
				urlCurrentMachineRentTerms = '/catalog/special/rent-terms/' + id
                break;
            default:
                actionPath = null;
                urlAllSpecifications = null;
                urlCurrentMachineSpecifications = null;
                break;
        }

        let allSpecifications;
        let currentMachineSpecifications;
		let currentRentTerms;
		let allRentTerms;

        await fetch(urlAllSpecifications)
            .then(data => data.json())
            .then(specifications => {
                allSpecifications = specifications;
            });

        await fetch(urlCurrentMachineSpecifications)
            .then(data => data.json())
            .then(data => {
                currentMachineSpecifications = data.specifications;
            });
		
		await fetch(urlCurrentMachineRentTerms)
		.then(data => data.json())
		.then(data => {
			currentRentTerms = data.rentTerms;
		});

		await fetch(urlAllRentTerms)
		.then(data => data.json())
		.then(data => {
			allRentTerms = data;
		});

        allSpecifications.sort((a,b) => +a.priority - +b.priority);

        let listHtml = null;
		let listHtmlRentTerms = null;

        if (!allSpecifications.length) {
            return '<span class="modal-admin__title">Характеристик пока нет</span>'
        } else {
            listHtml = allSpecifications.map(itemAll => {
                let coincidences = 0;

                const listHtml2 = currentMachineSpecifications.map(itemCur => {
                    
                    if (itemAll.specification === itemCur.specificationName) {
                        coincidences += 1;
                        return modalEditSpecificationsItem(itemAll.specification, itemCur.specificationValue)
                    } 
                });

                if (coincidences === 0) {
                    return modalEditSpecificationsItem(itemAll.specification, '');
                }
    
                return listHtml2.join('')
            });

            listHtml = listHtml.join('');
        }

		listHtmlRentTerms = allRentTerms.map(itemAll => {
			let coincidences = 0;
			
			const listHtml2 = currentRentTerms.map(itemRentTerm => {
				
				if (itemAll.rentTerm === itemRentTerm.rentTermsName) {
					coincidences += 1;
					
					return modalRentTermsEditItem(itemRentTerm.rentTermsName, 
												itemRentTerm.rentTermsFullValue.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '), 
												itemRentTerm.rentTermsMonthlyValue.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
				}
			});

			if (coincidences === 0) {
				return modalRentTermsEditItem(itemAll.rentTerm, '', '');
			}

			return listHtml2.join('');
		});

		listHtmlRentTerms = listHtmlRentTerms.join('');

        const nameMachine = document.querySelector('.details__name-machine').innerText;
        const price = document.querySelector('.details__price').getAttribute('value');
        const availability = document.querySelector('.details__availability').innerText;
		
        const info = {
            nameMachine,
            price,
        }
        const modal = modalEditSpecifications(actionPath, listHtml, listHtmlRentTerms, info);
        showModal(modal, e.target);

        if (availability === 'В наличии') {
            document.querySelector('#availability_true').checked = true;
        } else {
            document.querySelector('#availability_false').checked = true;
        }
    }); 

	btnMachineEditDesc.addEventListener('click', async(e) => {
		e.target.setAttribute('disabled', true);
		const pathUrl = document.location.pathname.match(/\/\w+\/\w+\//g)[0];
        const id = e.target.getAttribute('id');
        
        let actionPath = null;

        switch (pathUrl) {
            case '/catalog/personal/':
                actionPath = '/catalog/personal/edit-desc';
                break;
            case '/catalog/commercial/':
                actionPath = '/catalog/commercial/edit-desc';
                break;
            case '/catalog/special/':
                actionPath = '/catalog/special/edit-desc';
                break;
            default:
                actionPath = null;
                break;
        }

		const descTextCurrent = document.querySelector('.details__desc').innerText;

		const modal = modalEditDesc(actionPath, descTextCurrent, id);
		showModal(modal, e.target);
	});
}