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

export const messageSuccessSwalWithFunction = (message, funcOk) => {
    Swal.fire({
      title: 'Éxito',
      text: message,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        funcOk();
      }
    })
}

export const messageCloseSwal = () => {
    Swal.close();
};

export const messageConfirmSwal = (message, funcConfirm) => {
    Swal.fire({
        title: '¿Esta seguro?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            funcConfirm();
        }
      })
}

export const messageWarningFunction = (message, funcWarning) => {   
    let timerInterval
    Swal.fire({
        title: 'Cuidado!',
        html: message,
        timer: 3000,
        timerProgressBar: true,
        willOpen: () => {
            Swal.showLoading();            
        },
        onClose: () => {
            funcWarning();
            clearInterval(timerInterval)
        }
    });
}