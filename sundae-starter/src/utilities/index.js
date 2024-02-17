/**
 * @function formatCurrency
 * 格式化貨幣分位數（美元）
 *
 * @param {number} currency
 * @returns {string} 格式化貨幣分位數
 *
 * @example
 *   formatCurrency(0)
 *   // => $0.00
 *
 * @example
 *   formatCurrency(1.5)
 *   // => $1.50
 *
 */
export function formatCurrency(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}

//顯示翻譯名稱
export const displaySundaeName = (option, type) => {
  const scoopFlavors = {
    'Mint chip': '薄荷巧克力',
    'Vanilla': '香草',
    'Chocolate': '巧克力',
    'Salted caramel': '海鹽焦糖'
  }
  const toppings = {
    'M&Ms': 'M&M巧克力',
    'Hot fudge': '熱熔巧克力醬',
    'Peanut butter cups': '花生醬',
    'Gummi bears': '小熊軟糖',
    'Mochi': '小麻糬',
    'Cherries': '櫻桃',

  }
  if (type === 'scoop') { return scoopFlavors[option] || option; }
  if (type === 'topping') { return toppings[option] || option; }
  return option;
};