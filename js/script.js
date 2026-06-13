// Atualização dos seletores para corresponder ao HTML
const form = document.getElementById('age-form');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const errorDay = document.getElementById('error-day');
const errorMonth = document.getElementById('error-month');
const errorYear = document.getElementById('error-year');

const resultYears = document.getElementById('result-years');
const resultMonths = document.getElementById('result-months');
const resultDays = document.getElementById('result-days');

const setError = (input, errorEl, message) => {
    input.classList.add('calculator__input--error');
    input.previousElementSibling.classList.add('calculator__label--error');
    errorEl.textContent = message;
};

const clearError = (input, errorEl) => {
    input.classList.remove('calculator__input--error');
    input.previousElementSibling.classList.remove('calculator__label--error');
    errorEl.textContent = '';
};

const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

const validateInputs = (day, month, year) => {
    let isValid = true;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = currentYear - 120;

    clearError(dayInput, errorDay);
    clearError(monthInput, errorMonth);
    clearError(yearInput, errorYear);

    if (!dayInput.value) {
        setError(dayInput, errorDay, 'This field is required');
        isValid = false;
    } else if (day < 1 || day > 31) {
        setError(dayInput, errorDay, 'Must be a valid day');
        isValid = false;
    }

    if (!monthInput.value) {
        setError(monthInput, errorMonth, 'This field is required');
        isValid = false;
    } else if (month < 1 || month > 12) {
        setError(monthInput, errorMonth, 'Must be a valid month');
        isValid = false;
    }

    if (!yearInput.value) {
        setError(yearInput, errorYear, 'This field is required');
        isValid = false;
    } else if (year > currentYear) {
        setError(yearInput, errorYear, 'Must be in the past');
        isValid = false;
    } else if (year < minYear) {
        setError(yearInput, errorYear, 'Must be a realistic year');
        isValid = false;
    }

    if (dayInput.value && monthInput.value && yearInput.value && !isValidDate(day, month, year)) {
        setError(dayInput, errorDay, 'Must be a valid date');
        isValid = false;
    }

    return isValid;
};

const calculateAge = (day, month, year) => {
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    return { years, months, days };
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    if (validateInputs(day, month, year)) {
        const age = calculateAge(day, month, year);
        animateValue(resultYears, 0, age.years, 1000);
        animateValue(resultMonths, 0, age.months, 1000);
        animateValue(resultDays, 0, age.days, 1000);
    } else {
        resultYears.innerText = '--';
        resultMonths.innerText = '--';
        resultDays.innerText = '--';
    }
});
