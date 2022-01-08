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
})
