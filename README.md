# Reactive Subject

Standalone RxJS [Behaviour Subject](https://www.learnrxjs.io/subjects/) implementation but simpler (for now). Emits its value to multiple subscribers.

### Installation

```
 npm install reactive-subject
```

or

```
 yarn add reactive-subject
```

### Usage

```ts
import { createSubject } from 'reactive-subject';

const subject = createSubject(0);

const subscriber1 = subject.subscribe(value =>
  console.log('subscriber 1 -> ', value)
);
const subscriber2 = subject.subscribe(value =>
  console.log('subscriber 2 -> ', value)
);

subject.next(1);

/*
    Output:

    subscriber 1 -> 1
    subscriber 2 -> 1
    
  */

subscriber1.unsubscribe();

subject.next(2);

/*
    Output:

    subscriber 2 -> 2
  */
```
