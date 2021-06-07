import { Discount } from './discount';
import { CartItem } from './interfaces/cartItem';
import { ShoppingCart } from './shoppingCart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return {
    sut,
    discountMock,
  };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();

  const cartItem = createCartItem('Phone', 1300);

  sut.addItem(cartItem);
  sut.addItem(cartItem);

  return { sut, discountMock };
};

describe('ShoppingCart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();

    expect(sut.isEmptyCart()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts();

    expect(sut.items.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();

    expect(sut.total()).toBeCloseTo(2600);
    expect(sut.totalWithDiscount()).toBeCloseTo(2600);
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();

    expect(sut.items.length).toBe(2);

    sut.clearCart();

    expect(sut.items.length).toBe(0);
    expect(sut.isEmptyCart()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();

    expect(sut.items.length).toBe(2);

    sut.removeItem(0);

    expect(sut.items.length).toBe(1);
    sut.removeItem(0);

    expect(sut.isEmptyCart()).toBe(true);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();

    const DiscountMock = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(DiscountMock).toBeCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();

    const DiscountMock = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(DiscountMock).toHaveBeenCalledWith(2600);
  });
});
