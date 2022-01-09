import find from 'lodash/find'
import remove from 'lodash/remove'
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

const calculateDiscount = (amount, { condition, quantity }) => {
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

export default class Cart {
  items = []

  add(item) {
    const findItemBySkuId = cartItem => {
      return cartItem.sku.id === item.sku.id
    }

    const itemAlreadyAdded = find(this.items, findItemBySkuId)

    if (!!itemAlreadyAdded) {
      remove(this.items, findItemBySkuId)

      const itemWithQuantityUpdated = {
        ...item,
        quantity: item.quantity + itemAlreadyAdded.quantity
      }

      this.items.push(itemWithQuantityUpdated)

      return
    }

    this.items.push(item)
  }

  remove(skuId) {
    const findItemBySkuId = cartItem => {
      return cartItem.sku.id === skuId
    }

    remove(this.items, findItemBySkuId)
  }

  getTotal() {
    const totalizer = (total, item) => {
      const amount = Money({ amount: item.sku.price }).multiply(item.quantity)
      const discount = item.condition ? calculateDiscount(amount, item) : Money({ amount: 0 })

      return total.add(amount).subtract(discount)
    }

    const total = this.items.reduce(totalizer, Money({ amount: 0 }))

    return total.getAmount()
  }

  getSummary() {
    const total = this.getTotal()
    const formatted = Money({ amount: total }).toFormat()
    const items = this.items

    return {
      items,
      total,
      formatted
    }
  }

  checkout() {
    const { total, items } = this.getSummary()

    this.items = []

    return {
      items,
      total
    }
  }
}
