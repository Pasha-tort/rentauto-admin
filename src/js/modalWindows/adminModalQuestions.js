import { showModal } from "./modalShowFind";

export default function adminModalQuestions() {
    const questionsBtnAdminAdd = document.querySelector('.questions__btn_admin_add'),
          questionsBtnsAdminEdit = document.querySelectorAll('.questions__btn_admin_edit'),
          questionsBtnsAdminDelete = document.querySelectorAll('.questions__btn_admin_delete');

    const modalQuestionsAdd = `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/questions/add" method="POST">

                        <div class="modal-admin__item">
                            <label for="title" class="modal-admin__label">Введите вопрос:</label>
                            <textarea wrap="soft" id="title" name="title" type="text" required class="modal-admin__textarea"/></textarea>
                        </div>

                        <div class="modal-admin__item">
                            <label for="answer" class="modal-admin__label">Введите ответ:</label>
                            <textarea wrap="soft" id="answer" name="answer" type="text" required class="modal-admin__textarea"/></textarea>
                        </div>
                    
                        <button class="btn modal-admin__btn">Добавить</button>

                    </form>

                </div>
                <img src="/icons/close.svg" class="modal-admin__close">
            </div>
        </div>
    `;

    function modalQuestionEdit(title, answer, id) {
        return `
        <div class="modal-admin__wrapper">
            <div class="modal-admin__wrapper_second">
                <div class="modal-admin__box">
                
                    <form class="modal-admin__form" action="/questions/edit" method="POST">

                        <div class="modal-admin__item">
                            <label for="title" class="modal-admin__label">Введите вопрос:</label>
                            <textarea wrap="soft" id="title" name="title" type="text" required class="modal-admin__textarea" value="${title}"/>${title}</textarea>
                        </div>

                        <div class="modal-admin__item">
                            <label for="answer" class="modal-admin__label">Введите ответ:</label>
                            <textarea wrap="soft" id="answer" name="answer" type="text" required class="modal-admin__textarea" value="${answer}"/>${answer}</textarea>
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

    questionsBtnAdminAdd.addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true);
        showModal(modalQuestionsAdd, e.target);
    })

    questionsBtnsAdminEdit.forEach(item => {
        const id = item.getAttribute('id');
        const parentNode = item.parentElement.parentElement;
        const title = parentNode.querySelector('.questions__text').innerText;
        const answer = parentNode.querySelector('.questions__answer').innerText;

        item.addEventListener('click', (e) => {
            e.target.setAttribute('disabled', true);
            const modal = modalQuestionEdit(title, answer, id)
            showModal(modal, e.target)
        })
    })

    questionsBtnsAdminDelete.forEach(item => {
        const id = item.getAttribute('id');
        
        item.addEventListener('click', async(e) => {
            e.target.setAttribute('disabled', true);
            await fetch(`/questions/delete/${id}`, {
                method: 'DELETE'
            })
            .then(() => window.location.reload())
        })
    })
}



