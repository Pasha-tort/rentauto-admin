export default function questions() {
    const questionsItem = document.querySelectorAll('.questions__item');
    const questionsText = document.querySelectorAll('.questions__text');
    const questionsPlus = document.querySelectorAll('.questions__plus');
    const questionsAnswer = document.querySelectorAll('.questions__answer');

    function mouseoverItem(i) {
        if (clickIndex !== i) {
            questionsText[i].classList.add('questions__text_active');
            questionsPlus[i].classList.add('questions__plus_active');
        }
    }

    function mouseoutItem(i) {
        if (clickIndex !== i) {
            questionsText[i].classList.remove('questions__text_active');
            questionsPlus[i].classList.remove('questions__plus_active');
        }
    }

    let clickIndex = null;

    questionsItem.forEach((item, i) => {
        item.addEventListener('mouseover', () => {mouseoverItem(i)});
        item.addEventListener('mouseout', () => {mouseoutItem(i)});

        item.addEventListener('click', () => {
            if (window.getComputedStyle(questionsAnswer[i]).height === '0px') {

                clickIndex = i;

                //Здесь перебираются ответы, но обрабатывается, и плюс и текст вопроса.
                questionsAnswer.forEach((item, i) => {
                    item.classList.remove('questions__answer_active');
                    questionsText[i].classList.remove('questions__text_active');
                    questionsPlus[i].childNodes[2].style.transform = 'rotate(90deg)'
                })
    
                questionsAnswer[i].classList.add('questions__answer_active');

                questionsText[i].classList.add('questions__text_active');
                questionsPlus[i].classList.add('questions__plus_active');

                questionsPlus[i].childNodes[2].style.transform = 'rotate(0deg)'

                item.removeEventListener('mouseover', () => {mouseoverItem(i)});
                item.removeEventListener('mouseout', () => {mouseoutItem(i)});

            } else {
                clickIndex = null;

                questionsAnswer[i].classList.remove('questions__answer_active');
                questionsText[i].classList.remove('questions__text_active');
                questionsPlus[i].classList.remove('questions__plus_active');
                
                questionsPlus[i].childNodes[2].style.transform = 'rotate(90deg)'
            }
            
        })
    })
}