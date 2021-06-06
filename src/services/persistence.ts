import { PersistenceProtocol } from '../class/interfaces/persistenceProtocol';

export class Persistence implements PersistenceProtocol {
  saveOrder(): void {
    console.log('Order saved successfully');
  }
}
