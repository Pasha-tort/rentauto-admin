import submitForm from './submitForm';
import maskPhone from './maskPhone';

export default function forms() {
    const labels = document.querySelectorAll('.form__label');
    const inputs = document.querySelectorAll('.form__input');
    
    labels.forEach((label, i) => {

        label.addEventListener('click', () => {
            label.classList.add('catalog__feedback__input__label_active');
            inputs[i].focus();
        });
    });

    inputs.forEach((input, i) => {

        input.addEventListener('focus', () => {
            labels[i].classList.add('catalog__feedback__input__label_active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                labels[i].classList.remove('catalog__feedback__input__label_active')
            }
        });
    });

    maskPhone('.input-tel');

	
}