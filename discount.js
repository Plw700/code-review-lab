const TIER_HIGH = 10000;
const TIER_MID = 5000;

const RATE_HIGH = 0.15;
const RATE_MID = 0.10;
const RATE_LOW = 0.05;

/**
 * Возвращает размер скидки для пользователя по сумме заказа.
 * Ступенчатая шкала: 5% / 10% / 15%.
 */
function getDiscount(user, amount) {
  if (user === null || user === undefined) {
    throw new TypeError('user обязателен');
  }
  if (typeof user !== 'object') {
    throw new TypeError('user должен быть объектом');
  }
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('amount должен быть числом');
  }
  if (amount < 0) {
    throw new RangeError('amount не может быть отрицательным');
  }

  if (amount >= TIER_HIGH) return amount * RATE_HIGH;
  if (amount >= TIER_MID) return amount * RATE_MID;
  return amount * RATE_LOW;
}

module.exports = { getDiscount, TIER_HIGH, TIER_MID };
function brokenSyntax( {
