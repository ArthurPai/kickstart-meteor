import moment from 'moment';

export const DateRangePickerLocale = {
  format: 'YYYY-MM-DD',
  separator: ' - ',
  applyLabel: 'Apply',
  cancelLabel: 'Clear',
  fromLabel: 'From',
  toLabel: 'To',
  customRangeLabel: 'Custom',
  weekLabel: 'W',
  daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  firstDay: 1,
};

export const formatDateTime = (date) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');

export const formatDate = (date) =>
  moment(date).format('YYYY-MM-DD');
