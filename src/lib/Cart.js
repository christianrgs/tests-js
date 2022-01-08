import find from 'lodash/find'
import remove from 'lodash/remove'

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
      const itemTotal = item.quantity * item.sku.price

      return total + itemTotal
    }

    const total = this.items.reduce(totalizer, 0)

    return total
  }

  getSummary() {
    const total = this.getTotal()
    const items = this.items

    return {
      items,
      total
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
