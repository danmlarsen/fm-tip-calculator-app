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
    activated: false,
};

const state = { ...initialState };

const calcTip = (bill, tip) => bill * (tip / 100);

const calc = function () {
    const { bill, tip, numPeople } = state;
    if (!bill || !tip || !numPeople) return;

    state.activated = true;

    const totalTip = calcTip(bill, tip);
    const tipPerPerson = totalTip / numPeople;
    const totalPerPerson = bill / numPeople + tipPerPerson;

    tipAmountEl.textContent = Math.floor(tipPerPerson * 100) / 100;
    totalAmountEl.textContent = Math.round(totalPerPerson * 100) / 100;
};

const handleBillInput = function (e) {
    console.log(this.value);

    // validation goes here

    state.bill = this.value;
    calc();
};

const handleTipButtonDeselect = function () {
    tipContainerEl.querySelectorAll('.calculator__tip-button').forEach(btn => btn.classList.remove('calculator__tip-button--active'));
};

const handleTipInputBtns = function (e) {
    const clickedButton = e.target.closest('.calculator__tip-button');
    if (!clickedButton) return;

    handleTipButtonDeselect();

    clickedButton.classList.add('calculator__tip-button--active');

    state.tip = clickedButton.value;
    calc();
};

const handleTipInputText = function (e) {
    // validation goes here

    state.tip = this.value;
};

const handleNumPeopleInput = function (e) {
    console.log(this.value);

    // validation goes here

    state.numPeople = this.value;
    calc();
};

const handleReset = function () {
    Object.keys(state).forEach(key => {
        state[key] = initialState[key];
    });

    billInputEl.value = '0';
    handleTipButtonDeselect();
    numPeopleInputEl.value = '0';
    tipAmountEl.textContent = '0';
    tipCustomInputEl.value = '';
    totalAmountEl.textContent = '0';
};

billInputEl.addEventListener('input', handleBillInput);
tipContainerEl.addEventListener('click', handleTipInputBtns);
tipCustomInputEl.addEventListener('input', handleTipInputText);
numPeopleInputEl.addEventListener('input', handleNumPeopleInput);
resetBtnEl.addEventListener('click', handleReset);
