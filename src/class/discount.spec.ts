import {
  Discount,
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './discount';

const createSut = (className: new () => Discount) => {
  return new className();
};

describe('Discount', () => {
  it('should have no discount', () => {
    const sut = createSut(NoDiscount);

    expect(sut.calculate(10)).toBeCloseTo(10);
  });

  it('should apply 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);

    expect(sut.calculate(100)).toBeCloseTo(50);
  });

  it('should apply 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);

    expect(sut.calculate(100)).toBeCloseTo(90);
  });
});
