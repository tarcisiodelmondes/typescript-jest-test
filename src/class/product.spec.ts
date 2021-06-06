import { Product } from './product';

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe('Product', () => {
  it('should have property name and price', () => {
    const sut = createSut('Phone', 1300);

    expect(sut).toHaveProperty('name', 'Phone');
    expect(sut.price).toBeCloseTo(1300);
  });
});
