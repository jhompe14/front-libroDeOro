import moment from 'moment';

export const formatDateCalendar = (date) => validateDateCorrect(date) ? moment(date).format("DD/MM/YYYY") : undefined;

export const formatDateInput = (date) => validateDateCorrect(date)  ? moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") : undefined;

const validateDateCorrect = (date) => (date != null && date != undefined && date != "");