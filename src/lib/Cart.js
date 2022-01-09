import find from 'lodash/find'
import remove from 'lodash/remove'
import Money from 'dinero.js'
import { calculateDiscount } from './discount.utils'

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

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
