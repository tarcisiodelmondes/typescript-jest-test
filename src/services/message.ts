import { MessageProtocol } from '../class/interfaces/messageProtocol';

export class Message implements MessageProtocol {
  sendMessage(msg: string): void {
    console.log('Message sent: ', msg);
  }
}
