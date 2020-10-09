import Swal from 'sweetalert2';


export const messageLoadingSwal = () => {
    Swal.fire({
        title: 'Cargando...',
        text: 'Espere un momento...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
};

export const messageErrorSwal = (message) => {
    Swal.fire('Error', message, 'error');
};

export const messageSuccessSwal = (message) => {
    Swal.fire('Éxito', message, 'success');
}

export const messageCloseSwal = () => {
    Swal.close();
};  