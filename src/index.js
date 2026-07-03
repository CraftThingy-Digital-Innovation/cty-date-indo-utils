/**
 * cty-date-indo-utils-web
 * Indonesian Date Formatting & Masking Helpers
 * Public-Source Corporate Royalty License (PSCRL)
 * Copyright (c) 2026 CraftThingy Digital Innovation & Alif Nurhidayat
 */

const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Converts a database date string (YYYY-MM-DD or ISO timestamp) into Indonesian DD/MM/YYYY or DD MMMM YYYY format.
 * @param {string|Date} dateVal Date input
 * @param {boolean} longFormat If true, formats as "DD MMMM YYYY" (e.g. "03 Juli 2026")
 */
export function formatDateIndo(dateVal, longFormat = false) {
  if (!dateVal) return '';
  
  let dateObj;
  if (dateVal instanceof Date) {
    dateObj = dateVal;
  } else {
    // Check if ISO format or YYYY-MM-DD
    const cleaned = dateVal.trim();
    if (!cleaned || cleaned === '-' || cleaned === '0000-00-00') return '';
    
    // Parse manually to avoid timezone shifting
    const parts = cleaned.split(/[- :T]/);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    dateObj = new Date(year, month, day);
  }

  if (isNaN(dateObj.getTime())) return '';

  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  if (longFormat) {
    const monthName = INDO_MONTHS[dateObj.getMonth()];
    return `${day} ${monthName} ${year}`;
  } else {
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
}

/**
 * Converts a string formatted as DD/MM/YYYY back into database friendly YYYY-MM-DD format.
 * @param {string} dateStr Input formatted as DD/MM/YYYY
 */
export function convertDateToDb(dateStr) {
  if (!dateStr) return '';
  
  const cleaned = dateStr.trim();
  if (cleaned === '-' || !cleaned) return '';

  const parts = cleaned.split('/');
  if (parts.length !== 3) return '';

  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];

  if (day === '00' || month === '00' || year.length !== 4) return '';

  return `${year}-${month}-${day}`;
}

/**
 * Attaches a text input mask to restrict inputs to DD/MM/YYYY format with auto-inserted slashes.
 * @param {HTMLInputElement} inputEl Target text input element
 */
export function maskDateInput(inputEl) {
  if (!inputEl) return;

  inputEl.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    let formatted = '';
    if (value.length > 0) {
      // Day
      formatted += value.substring(0, 2);
    }
    if (value.length > 2) {
      // Month
      formatted += '/' + value.substring(2, 4);
    }
    if (value.length > 4) {
      // Year
      formatted += '/' + value.substring(4, 8);
    }

    this.value = formatted;
  });

  inputEl.addEventListener('keydown', function (e) {
    // Allow standard controls: backspace, delete, tab, escape, enter, arrows
    if ([8, 9, 13, 27, 37, 39, 46].indexOf(e.keyCode) !== -1 ||
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || // Ctrl+A
        (e.keyCode >= 35 && e.keyCode <= 40)) { // home, end, left, right, down, up
      return;
    }
    
    // Prevent non-numeric key insertion
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
}

/**
 * Validates whether a date string in DD/MM/YYYY format is a valid calendar date.
 * @param {string} dateStr Input formatted as DD/MM/YYYY
 */
export function isValidDateIndo(dateStr) {
  if (!dateStr) return false;
  
  const parts = dateStr.split('/');
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1000 || year > 9999) return false;

  // Month day bounds
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // Leap year adjustment
  if (month === 2) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeap) monthDays[1] = 29;
  }

  return day >= 1 && day <= monthDays[month - 1];
}

if (typeof window !== 'undefined') {
  window.DateIndoUtils = {
    formatDateIndo,
    convertDateToDb,
    maskDateInput,
    isValidDateIndo
  };
}
