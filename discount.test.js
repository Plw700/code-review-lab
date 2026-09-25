const { getDiscount, TIER_HIGH, TIER_MID } = require('./discount');

describe('getDiscount: базовая шкала', () => {
  test('5% для суммы ниже 5000', () => {
    expect(getDiscount({}, 4000)).toBe(200);
  });

  test('10% для суммы от 5000 до 9999', () => {
    expect(getDiscount({}, 6000)).toBe(600);
  });

  test('15% для суммы от 10000', () => {
    expect(getDiscount({}, 12000)).toBe(1800);
  });
});

describe('getDiscount: граничные значения', () => {
  test('ровно 5000 — ставка 10%', () => {
    expect(getDiscount({}, TIER_MID)).toBe(500);
  });

  test('ровно 10000 — ставка 15%', () => {
    expect(getDiscount({}, TIER_HIGH)).toBe(1500);
  });

  test('4999 — ставка 5%', () => {
    expect(getDiscount({}, 4999)).toBeCloseTo(249.95);
  });

  test('9999 — ставка 10%', () => {
    expect(getDiscount({}, 9999)).toBeCloseTo(999.9);
  });

  test('0 — скидка 0', () => {
    expect(getDiscount({}, 0)).toBe(0);
  });

  test('-0 — скидка 0', () => {
    expect(getDiscount({}, -0)).toBeCloseTo(0);
  });
});

describe('getDiscount: некорректные входные данные', () => {
  test('отрицательная сумма — исключение', () => {
    expect(() => getDiscount({}, -100)).toThrow(RangeError);
  });

  test('amount не число — исключение', () => {
    expect(() => getDiscount({}, '1000')).toThrow(TypeError);
  });

  test('NaN — исключение', () => {
    expect(() => getDiscount({}, NaN)).toThrow(TypeError);
  });

  test('user отсутствует — исключение', () => {
    expect(() => getDiscount(null, 1000)).toThrow(TypeError);
  });

  test('user = Object.create(null) — допустимо', () => {
    expect(getDiscount(Object.create(null), 4000)).toBe(200);
  });
});
