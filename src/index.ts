export type Subscriber<T> = (value: T) => void;

export type Subscribers<T> = { [key: number]: Subscriber<T> };

export function createSubject<T>(initialValue: T) {
  let value: T = initialValue;
  let subscribers: Subscribers<T> = {};
  let index = 0;

  function next(nextValue: T) {
    value = nextValue;
    for (let i = 0, n = Object.values(subscribers).length; i < n; i++) {
      let subscriber: Subscriber<T>;
      subscriber = subscribers[i];
      subscriber(value);
    }
  }
  function subscribe(subscriber: Subscriber<T>) {
    const idx = index++;
    subscribers[idx] = subscriber;
    return {
      unsubscribe: () => {
        delete subscribers[idx];
      },
    };
  }

  function getValue() {
    return value;
  }
  return {
    subscribe,
    next,
    getValue,
  };
}
