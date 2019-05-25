import { createSubject } from '../src';

describe('createSubject()', () => {
  it('initializes', () => {
    const subject = createSubject(0);
    expect(subject).toBeTruthy();
    expect(subject.getValue()).toEqual(0);
  });

  it('handles subscription', () => {
    const subject = createSubject(0);
    const subscription = subject.subscribe((_: any) => {});
    expect(subscription.unsubscribe).toBeTruthy();
  });

  it('calls subscribers on next', () => {
    const subject = createSubject(0);
    const sub1 = jest.fn();
    const sub2 = jest.fn();
    const sub3 = jest.fn();
    subject.subscribe(sub1);
    subject.subscribe(sub2);
    subject.subscribe(sub3);
    subject.next(1);
    expect(sub1).toHaveBeenCalledWith(1);
    expect(sub2).toHaveBeenCalledWith(1);
    expect(sub3).toHaveBeenCalledWith(1);
  });

  it('handles unsubscribe', () => {
    const subject = createSubject(0);
    const sub1 = jest.fn();

    const s1 = subject.subscribe(sub1);

    subject.next(1);
    expect(sub1).toHaveBeenCalledWith(1);

    s1.unsubscribe();

    setTimeout(() => {
      subject.next(2);
      expect(sub1).not.toHaveBeenCalled();
    }, 0);
  });
});
