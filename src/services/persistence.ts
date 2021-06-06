import { PersistenceProtocol } from '../class/interfaces/persistenceProtocol';

export class SaveOrder implements PersistenceProtocol {
  saveOrder(): void {
    console.log('Order saved successfully');
  }
}
