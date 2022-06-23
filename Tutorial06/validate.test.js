import { checkCardHolder, checkCardNumber, checkCVV } from './validate.js';

describe('валидация полей', () => {

  it('Валидация Card Holder', () => {

    expect(checkCardHolder('Yerzhan Nursultan')).toBe(true);
    expect(checkCardHolder('Yerzhan')).toBe(false);
    expect(checkCardHolder('Ержан Нурсултан')).toBe(false);
    expect(checkCardHolder('Yerzhan Nursultan1')).toBe(false);

  });

  it('Валидация Card Number', () => {
    expect(checkCardNumber('Yerzhan Nursultannn')).toBe(false);
    expect(checkCardNumber('Ержан Нурсултаннннн')).toBe(false);
    expect(checkCardNumber('!@#$%^&*()_+_)(*&^%')).toBe(false);

    expect(checkCardNumber('1234 4321 9876 7567')).toBe(true);
    expect(checkCardNumber('1234 4321 9876  567')).toBe(false);
    expect(checkCardNumber('1234943212987622567')).toBe(false);

  });

  it('Валидация CVV/CVC', () => {
    expect(checkCVV('Nur')).toBe(false);
    expect(checkCVV('Нур')).toBe(false);
    expect(checkCVV('!@#')).toBe(false);
    expect(checkCVV('1534')).toBe(false);
    expect(checkCVV('15')).toBe(false);
    expect(checkCVV('152')).toBe(true);

  });

});
