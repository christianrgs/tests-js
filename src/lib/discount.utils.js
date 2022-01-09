import Money from 'dinero.js'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

const calculatePercentageDiscount = ({ amount, quantity, condition }) => {
  if (quantity > condition.minimum) {
    return amount.percentage(condition.percentage)
  }

  return Money({ amount: 0 })
}

const calculateQuantityDiscount = ({ amount, quantity, condition }) => {
  const isEven = quantity % 2 === 0
  const percentageOfDiscount = isEven ? 50 : 40

  if (quantity > condition.quantity) {
    return amount.percentage(percentageOfDiscount)
  }

  return Money({ amount: 0 })
}

export const calculateDiscount = (amount, { condition, quantity }) => {
  const conditionsList = Array.isArray(condition) ? condition : [condition]

  const discounts = conditionsList.map(mapCondition => {
    if (mapCondition.percentage) {
      return calculatePercentageDiscount({ amount, quantity, condition: mapCondition }).getAmount()
    } else if (mapCondition.quantity) {
      return calculateQuantityDiscount({ amount, quantity, condition: mapCondition }).getAmount()
    }
  })

  const sortDiscountsByHigher = (discount1, discount2) => discount2 - discount1
  const [higherDiscount] = discounts.sort(sortDiscountsByHigher)

  return Money({ amount: higherDiscount })
}
