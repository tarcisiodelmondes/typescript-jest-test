import { EnterpriseCustomer, IndividualCostumer } from './customer';
import { IndividualCustomerProtocol } from './interfaces/customerProtocol';

const createIndividualCustomer = (
  name: string,
  lastName: string,
  cpf: string,
) => {
  return new IndividualCostumer(name, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCostumer', () => {
  it('should have name, lastName and cpf', () => {
    const sut = createIndividualCustomer(
      'Tarcisio',
      'Delmondes',
      '111.111.111-11',
    );

    expect(sut).toHaveProperty('name', 'Tarcisio');
    expect(sut).toHaveProperty('lastName', 'Delmondes');
    expect(sut).toHaveProperty('cpf', '111.111.111-11');
  });

  it('should have methods to get name and idn for IndividualCustomer', () => {
    const sut = createIndividualCustomer(
      'Tarcisio',
      'Delmondes',
      '111.111.111-11',
    );

    expect(sut.getName()).toBe(`${sut.name} ${sut.lastName}`);
    expect(sut.getIDN()).toBe(`${sut.cpf}`);
  });
});

describe('Enterprise', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('Enterprise', '1111-11111-1111-11');

    expect(sut).toHaveProperty('name', 'Enterprise');
    expect(sut).toHaveProperty('cnpj', '1111-11111-1111-11');
  });

  it('should have methods to get name and idn for EnterpriseCustomer', () => {
    const sut = createEnterpriseCustomer('Enterprise', '1111-11111-1111-11');

    expect(sut.getName()).toBe(sut.name);
    expect(sut.getIDN()).toBe(sut.cnpj);
  });
});
