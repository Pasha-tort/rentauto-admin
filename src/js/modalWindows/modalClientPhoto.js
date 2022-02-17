export default function modalClientPhoto(src) {
    
        return `
            <div class="modal-client__wrapper-zoom-photo">
                
                    <div class="modal-client__box-zoom-photo">
                        <img class="modal-client__details-zoom-photo" src="${src}"/>
                    </div>
                    <img src="/icons/close.svg" class="modal-admin__close-zoom-photo">
                
            </div>
        `
    
}