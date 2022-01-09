import Cart from './Cart'

const sku = { id: '123', price: 35388 }
const sku2 = { id: '321', price: 41872 }

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal', () => {
    it('should return 0 when getTotal is executed in a newly created instance', () => {
      expect(cart.getTotal()).toBe(0)
    })

    it('should add item and receive the total amount updated in getTotal', () => {
      cart.add({ sku, quantity: 2 })

      expect(cart.getTotal()).toBe(70776)
    })

    it('should sum the quantity when the product added is already in the cart', () => {
      cart.add({ sku, quantity: 2 })

      expect(cart.getTotal()).toBe(70776)

      cart.add({ sku, quantity: 1 })

      expect(cart.getTotal()).toBe(106164)
    })

    it('should remove item and receive the total amount updated in getTotal', () => {
      cart.add({ sku, quantity: 2 })
      cart.add({ sku: sku2, quantity: 1 })

      expect(cart.getTotal()).toBe(112648)

      cart.remove(sku.id)

      expect(cart.getTotal()).toBe(41872)
    })
  })

  describe('getSummary', () => {
    it('should return an object with the list of items and the total', () => {
      cart.add({ sku, quantity: 2 })
      cart.add({ sku: sku2, quantity: 1 })

      expect(cart.getSummary()).toMatchSnapshot()
      expect(cart.getTotal()).toBeGreaterThan(0)
    })
  })

  describe('checkout', () => {
    it('should return an object with the list of items and the total', () => {
      cart.add({ sku, quantity: 2 })
      cart.add({ sku: sku2, quantity: 1 })

      expect(cart.checkout()).toMatchSnapshot()
    })

    it('should reset the cart when checkout method is called', () => {
      cart.add({ sku, quantity: 3 })

      cart.checkout()

      expect(cart.getTotal()).toBe(0)
    })
  })

  describe('special conditions', () => {
    it('should apply the discount when the quantity is above the minimum quantity passed in the condition', () => {
      const condition = {
        percentage: 30,
        minimum: 2
      }

      cart.add({ sku, condition, quantity: 3 })

      expect(cart.getTotal()).toBe(74315)
    })

    it('should not apply the discount when the quantity is below or equal the minimum quantity passed in the condition', () => {
      const condition = {
        percentage: 30,
        minimum: 2
      }

      cart.add({ sku, condition, quantity: 2 })

      expect(cart.getTotal()).toBe(70776)

      cart.checkout()

      cart.add({ sku, condition, quantity: 1 })

      expect(cart.getTotal()).toBe(35388)
    })

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2
      }

      cart.add({ sku, condition, quantity: 4 })

      expect(cart.getTotal()).toBe(70776)
    })

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2
      }

      cart.add({ sku, condition, quantity: 5 })

      expect(cart.getTotal()).toBe(106164)
    })

    it('should not apply quantity discount when the quantity is below or equal the minimum quantity passed in the condition', () => {
      const condition = {
        quantity: 2
      }

      cart.add({ sku, condition, quantity: 2 })

      expect(cart.getTotal()).toBe(70776)

      cart.checkout()

      cart.add({ sku, condition, quantity: 1 })

      expect(cart.getTotal()).toBe(35388)
    })

    it('should receive two or more conditions and apply the best discount', () => {
      const percentageCondition = {
        percentage: 30,
        minimum: 2
      }

      const quantityCondition = {
        quantity: 2
      }

      cart.add({ sku, condition: [percentageCondition, quantityCondition], quantity: 5 })

      expect(cart.getTotal()).toBe(106164)
    })
  })
})
