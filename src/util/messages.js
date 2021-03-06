import Swal from 'sweetalert2';

export const messageErrorSwal = (message) => {
    Swal.fire('Error', message, 'error');
};

export const messageSuccessSwal = (message) => {
    Swal.fire('\u00C9xito', message, 'success');
}

export const messageWarningSwal = (message) => {
    Swal.fire('Cuidado!', message, 'warning');
}

export const messageCloseSwal = () => {
    Swal.close();
};

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

export const messageSuccessSwalWithFunction = (message, funcOk) => {
    Swal.fire({
      title: '\u00C9xito',
      html: message,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        funcOk();
      }
    })
}

export const messageConfirmSwal = (title, message, funcConfirm) => {
    Swal.fire({
        title: title,
        html: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
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
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading();            
        },
        onClose: () => {
            funcWarning();
            clearInterval(timerInterval)
        }
    });
}