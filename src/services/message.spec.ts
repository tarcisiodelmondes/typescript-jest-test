import { Message } from './message';

const createSut = () => {
  return new Message();
};

describe('Message', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    // System under test
    const sut = createSut();
    expect(sut.sendMessage('test')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('test');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "Message sent: " and msg', () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('test');
    expect(consoleSpy).toHaveBeenCalledWith('Message sent: ', 'test');
  });
});
