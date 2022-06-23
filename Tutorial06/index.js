import { el, mount } from './node_modules/redom/dist/redom.es.js';
import { checkCardHolder, checkCardNumber, checkCVV } from './validate.js';

const wrapper =
    el('div', { className: 'wrapper' },
        el('div', { className: 'card' },
            el('p', { className: 'secure' }, 'Secure Checkout'),
            el('div', { className: 'credit-card' },
                el('span', { className: 'card__number' }, ''),
                el('div', { className: 'card__personal' },
                    el('span', { className: 'card__name' }, 'John Doe'),
                    el('span', { className: 'card__date' }, '04/24'))),
            el('form', { className: 'form', id: 'form' },
                el('div', { className: 'form__input-wrap form__input-wrap_holder' },
                    el('label', { className: 'form__label form__holder-label' }, 'Card Holder'),
                    el('input', { className: 'input input__holder', type: 'text' })),
                el('div', { className: 'form__input-wrap form__input-wrap_number' },
                    el('label', { className: 'form__label form__number-label' }, 'Card Number'),
                    el('input', { className: 'input input__number', id: 'cardNumber' })),
                el('div', { className: 'form__input-wrap form__input-wrap_date' },
                    el('label', { className: 'form__label form__date-label' }, 'Card Expiry'),
                    el('input', { className: 'input input__date', type: 'date' })),
                el('div', { className: 'form__input-wrap form__input-wrap_cvv' },
                    el('label', { className: 'form__label form__cvv-label' }, 'CVV'),
                    el('input', { className: 'input input__cvv', type: 'number', max: 999, min: 1 })),
                el('button', { className: 'form__button' }, 'отправить'),
                el('h2', { className: 'formValidHide', id: 'isValid' }, '')
            )
        )
    );

mount(document.body, wrapper);



const inValid = () => {
    const isValid = document.querySelector('#isValid');
    isValid.className = 'formInValid';
    isValid.textContent = 'не валидный';
    setTimeout(() => {
        isValid.className = 'formValidHide';
    }, 2000);
};

const valid = () => {
    const isValid = document.querySelector('#isValid');
    isValid.className = 'formValid';
    isValid.textContent = 'валидный';
    setTimeout(() => {
        isValid.className = 'formValidHide';
    }, 2000);
};

const formButton = document.querySelector('.form__button');
formButton.addEventListener('click', e => {
    e.preventDefault();
    const inputHolder = document.querySelector('.input__holder');
    const cardHolder = document.querySelector('.input__number');
    const input__cvv = document.querySelector('.input__cvv');

    const isValid = (checkCardHolder(inputHolder.value) && checkCardNumber(cardHolder.value) && checkCVV(input__cvv.value));

    if (isValid)
        valid();
    else inValid();
})

const cardName = document.querySelector('.card__name');
const cardNumber = document.querySelector('.card__number');
const cardDate = document.querySelector('.card__date');

const inputHolder = document.querySelector('.input__holder');
inputHolder.addEventListener('input', () => {

    inputHolder.value = inputHolder.value.replace(/[^a-z\s]/iu, '');
    if (inputHolder.value.length > 25) {
        inputHolder.value = inputHolder.value.slice(0, 25);
    }
    cardName.textContent = inputHolder.value;
});

const inputDate = document.querySelector('.input__date');
inputDate.addEventListener('change', () => {
    const getLikeTwoNumber = num => num < 10 ? '0' + num : num;
    const date = new Date(inputDate.value);
    const month = getLikeTwoNumber(date.getMonth() + 1);
    const year = date.getFullYear() - 2000;
    const cardTerm = `${month}/${year}`;
    cardDate.textContent = cardTerm;
});

const setSpace = numbers => {
    const length = numbers.length;
    if (length < 5)
        return numbers;

    let nums = numbers;
    let temp = [];
    const b = length / 4;

    for (let i = 0; i < b; i++) {
        temp.push(nums.slice(0, 4));
        nums = nums.slice(4, nums.length);
    }

    let result = '';
    temp.forEach(item => {
        result += item + ' ';
    });
    result = result.slice(0, result.length - 1);
    return result;
};

const inputNumber = document.querySelector('.input__number');
inputNumber.addEventListener('input', () => {
    if (inputNumber.value.length > 19) {
        inputNumber.value = inputNumber.value.slice(0, 19);
    }
    else {
        let a = inputNumber.value.replace(/\D/g, '');
        a = a.replace(/\s/g, '');
        inputNumber.value = cardNumber.textContent = setSpace(a);
    }

});

const inputCvv = document.querySelector('.input__cvv');
inputCvv.addEventListener('input', () => {
    inputCvv.value = inputCvv.value.replace(/e/g, '')
    if (inputCvv.value.length > 3)
        inputCvv.value = inputCvv.value.slice(0, 3);
});