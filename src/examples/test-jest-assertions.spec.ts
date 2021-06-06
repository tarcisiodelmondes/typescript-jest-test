describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 15;

    expect(number).toBe(15);
    expect(number).toEqual(15);
    expect(number).not.toBeFalsy();
    expect(number).toBeTruthy();

    expect(number).toBeGreaterThanOrEqual(15);
    expect(number).toBeGreaterThan(14);
    expect(number).toBeLessThanOrEqual(15);
    expect(number).toBeLessThan(16);

    expect(number).toBeCloseTo(14.96, 1);
    expect(number).not.toBeNull();
    expect(number).toHaveProperty('toString');
  });
});

describe('objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Tarcisio', age: 18 };
    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson);
    expect(person).not.toBe(anotherPerson);

    expect(person).toHaveProperty('age');
    expect(person).toHaveProperty('age', 18);
  });
});
