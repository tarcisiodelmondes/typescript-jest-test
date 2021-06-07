/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartItem } from './interfaces/cartItem';
import { CustomerOrder } from './interfaces/customerProtocol';
import { MessageProtocol } from './interfaces/messageProtocol';
import { PersistenceProtocol } from './interfaces/persistenceProtocol';
import { ShoppingCartProtocol } from './interfaces/shoppingCartProtocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }

  addItem(item: CartItem): void {}
  removeItem(index: number): void {}

  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 1;
  }
  isEmptyCart(): boolean {
    return false;
  }
  clearCart(): void {}
}

class MessageMock implements MessageProtocol {
  sendMessage() {
    console.log('');
  }
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder() {
    console.log('');
  }
}

class CustomerMock implements CustomerOrder {
  getName() {
    return '';
  }

  getIDN() {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messageMock = new MessageMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();

  const sut = new Order(
    shoppingCartMock,
    messageMock,
    persistenceMock,
    customerMock,
  );

  return { sut, shoppingCartMock, messageMock, persistenceMock, customerMock };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const ShoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmptyCart')
      .mockReturnValue(true);
    sut.checkout();

    expect(ShoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const ShoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmptyCart')
      .mockReturnValue(false);

    sut.checkout();

    expect(ShoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send message', () => {
    const { sut, messageMock } = createSut();
    const MessageMockSpy = jest.spyOn(messageMock, 'sendMessage');

    sut.checkout();

    expect(MessageMockSpy).toBeCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistenceMock } = createSut();

    const PersistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');

    sut.checkout();

    expect(PersistenceMockSpy).toBeCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock, persistenceMock, messageMock } = createSut();
    const ShoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clearCart');

    sut.checkout();
    expect(ShoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
