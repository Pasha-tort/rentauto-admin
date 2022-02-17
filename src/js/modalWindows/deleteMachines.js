export default function deleteMachines() {
    const btnsDelete = document.querySelectorAll('.catalog-admin__btn_machine_delete');
    
    const urlCurrent = document.location.pathname;

    let urlFetch;

    if (urlCurrent === '/catalog/personal' || urlCurrent === '/catalog/personal/') {
        urlFetch = '/catalog/personal/delete-machine';
    } else if (urlCurrent === '/catalog/commercial' || urlCurrent === '/catalog/commercial/') {
        urlFetch = '/catalog/commercial/delete-machine';
    } else if (urlCurrent === '/catalog/special' || urlCurrent === '/catalog/special/') {
        urlFetch = '/catalog/special/delete-machine';
    }

    btnsDelete.forEach(btn => {
        btn.addEventListener('click', async(e) => {
            const id = e.target.getAttribute('id');
            
            await fetch(urlFetch+'/'+id, {
                method: 'DELETE',
            }).then(() => {
                window.location.reload();
            })
        });
    });
}