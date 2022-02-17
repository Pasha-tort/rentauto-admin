import validator from 'validator';
import { hideModal } from './modalWindows/modalShowFind';
import showThanksModal from './modalWindows/showThanksModal';

export default function submitForm(elementSelector, urlMailer, btnTarget) {
    const modalForm = document.querySelector(elementSelector);

    let error = false;

    modalForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = new FormData(modalForm);
        
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (urlMailer === '/mailer/machine') {
            data.idMachine = btnTarget.getAttribute('id');
        }

        if (btnTarget && btnTarget.dataset.type) {
            data.type = btnTarget.dataset.type;
        }

        const inputEmail = document.querySelector('.input-email');
        const inputName = document.querySelector('.input-name');
        const inputPhone = document.querySelector('.input-tel');

        function validatorInputs() {
            if (!validator.isEmail(data.email.trim())) {
                inputEmail.classList.add('form-input_error');
                error = true;
                checkInputEmail(inputEmail);
            }

            if (!data.name) {
                inputName.classList.add('form-input_error');
                error = true;
                checkInput(inputName);
            }

            if (!data.phone) {
                inputPhone.classList.add('form-input_error');
                error = true;
                checkInput(inputPhone);
            }
        }

        function checkInputEmail(input) {
            input.addEventListener('change', () => {
                
                if (validator.isEmail(input.value.trim())) {
                    input.classList.add('form-input_complete');
                    input.classList.remove('fomr-input_error')
                    error = false;
                }

                if (!validator.isEmail(input.value.trim())) {
                    input.classList.add('form-input_error');
                    input.classList.remove('form-input_complete')
                    error = true;
                }
            })
        }

        function checkInput(input) {
            input.addEventListener('change', () => {
                if (input.value) {
                    input.classList.add('form-input_complete');
                    input.classList.remove('form-input_error')
                    error = false;
                }

                if (!input.value || input.value === '+7 ') {
                    input.classList.add('form-input_error');
                    input.classList.remove('form-input_complete')
                    error = true;
                }
            });
        }

        validatorInputs();

        if (error) {
            return;
        }

        await fetch(urlMailer, {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(() => {
            if(btnTarget) {
                hideModal(btnTarget)
            } else {
                inputPhone.value = "";
                inputName.value = "";
                inputEmail.value = "";
                const commentsInput = document.querySelector('.catalog__feedback__comments');
                commentsInput.value = "";

                const labelsForm = document.querySelectorAll('.form__label');
                labelsForm.forEach(label => {
                    label.classList.remove('catalog__feedback__input__label_active');
                })
            }

            showThanksModal();
        })
        
    });
}