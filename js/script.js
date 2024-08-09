const formEl = document.querySelector('.calculator__form');
const billInputEl = document.getElementById('bill');
const tipContainerEl = document.querySelector('.calculator__tip');
const tipCustomInputEl = document.getElementById('custom-tip');
const numPeopleInputEl = document.getElementById('num-people');
const tipAmountEl = document.querySelector('.calulator__tip-amount h2');
const totalAmountEl = document.querySelector('.calculator__total h2');
const resetBtnEl = document.querySelector('.calulator__reset-btn');

const initialState = {
    bill: null,
    tip: null,
    numPeople: null,
    touched: false,
};

const state = { ...initialState };

const calcTip = (bill, tip) => bill * (tip / 100);

const handleCalculation = function () {
    const { bill, tip, numPeople } = state;
    if (!bill || !tip || !numPeople) return;

    const totalTip = calcTip(bill, tip);
    const tipPerPerson = totalTip / numPeople;
    const totalPerPerson = bill / numPeople + tipPerPerson;

    tipAmountEl.textContent = (Math.floor(tipPerPerson * 100) / 100).toFixed(2);
    totalAmountEl.textContent = (Math.round(totalPerPerson * 100) / 100).toFixed(2);
};

const renderError = function (message, element) {
    const parentEl = element.parentElement;
    clearValidation(element);
    parentEl.classList.add('invalid');

    const validationMessageEl = parentEl.querySelector('.calculator__validation-message');
    if (validationMessageEl) {
        validationMessageEl.textContent = message;
    }
};

const renderValid = function (element) {
    const parentEl = element.parentElement;
    clearValidation(element);
    parentEl.classList.add("'valid");
};

const clearValidation = function (element) {
    const parentEl = element.parentElement;
    const validationMessageEl = parentEl.querySelector('.calculator__validation-message');
    if (validationMessageEl) {
        validationMessageEl.textContent = '';
    }

    parentEl.classList.remove('invalid');
    parentEl.classList.remove('valid');
};

const validateNumberInput = function (value, element) {
    state.touched = true;
    resetBtnEl.removeAttribute('disabled');

    if (isNaN(value)) {
        renderError('Not a number', element);
        return false;
    }

    if (value <= 0) {
        renderError("Can't be zero", element);
        return false;
    }

    renderValid(element);
    return true;
};

const handleBillInput = function () {
    const value = billInputEl.value;

    if (!validateNumberInput(value, billInputEl)) {
        state.bill = null;
        return;
    }

    state.bill = value;
    handleCalculation();
};

const handleTipButtonDeselect = function () {
    tipContainerEl.querySelectorAll('.calculator__tip-button').forEach(btn => btn.classList.remove('calculator__tip-button--active'));
};

const handleTipInputBtns = function (e) {
    const clickedButton = e.target.closest('.calculator__tip-button');
    if (!clickedButton) return;

    handleTipButtonDeselect();

    clickedButton.classList.add('calculator__tip-button--active');

    state.touched = true;
    resetBtnEl.removeAttribute('disabled');

    state.tip = clickedButton.value;
    handleCalculation();
};

const handleTipInputText = function () {
    const value = tipCustomInputEl.value;

    if (!validateNumberInput(value, tipCustomInputEl)) {
        state.tip = null;
        return;
    }

    handleTipButtonDeselect();

    state.tip = value;
    handleCalculation();
};

const handleNumPeopleInput = function () {
    const value = numPeopleInputEl.value;

    if (!validateNumberInput(value, numPeopleInputEl)) {
        state.numPeople = null;
        return;
    }

    state.numPeople = value;
    handleCalculation();
};

const handleReset = function () {
    if (!state.touched) return;

    Object.keys(state).forEach(key => {
        state[key] = initialState[key];
    });

    billInputEl.value = '';
    clearValidation(billInputEl);

    handleTipButtonDeselect();

    numPeopleInputEl.value = '';
    clearValidation(numPeopleInputEl);

    tipCustomInputEl.value = '';
    clearValidation(tipCustomInputEl);

    tipAmountEl.textContent = '0';
    totalAmountEl.textContent = '0';

    resetBtnEl.setAttribute('disabled', true);

    document.activeElement.blur();
};

const handleFormSubmit = function (e) {
    e.preventDefault();
    document.activeElement.blur();

    handleBillInput();
    handleNumPeopleInput();

    handleCalculation();
};

formEl.addEventListener('submit', handleFormSubmit);
billInputEl.addEventListener('input', handleBillInput);
tipContainerEl.addEventListener('click', handleTipInputBtns);
tipCustomInputEl.addEventListener('input', handleTipInputText);
numPeopleInputEl.addEventListener('input', handleNumPeopleInput);
resetBtnEl.addEventListener('click', handleReset);
