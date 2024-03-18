import { ref } from 'vue';

interface DialogHelperOptionsInterface {
    modalRef?: string | number;
    imageRef?: string | number
}

export default function useModalHelper(userParams: DialogHelperOptionsInterface = {}) {

    const params = Object.assign({
        modalRef: 'modal',
        imageRef: 'modalImage',
    }, userParams);

    const refs: any = {
        // Get the modal by id
        [params.modalRef]: ref(null),
        // Get the modal image tag
        [params.imageRef]: ref(null)
    };

    // This function is called when a small image is clicked
    function showImageModal(src: string) {
        showModal();
        refs[params.imageRef].value.src = src;
    }

    // This function is called when a small image is clicked
    function showModal() {
        console.log("Modal ref", refs[params.modalRef], refs[params.modalRef].value);
        refs[params.modalRef].value.classList.remove('hidden');
        refs[params.modalRef].value.classList.add('open');
    }

    // This function is called when the close button is clicked
    function closeModal() {
        refs[params.modalRef].value.classList.remove('open');
        refs[params.modalRef].value.classList.add('hidden');
    }

    return {
        ...refs,
        showImageModal,
        showModal,
        closeModal
    }
}