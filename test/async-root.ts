import Injection from '../src/injection2';

@Injection({
  factory: () => {
    return Promise.resolve(new AsyncRoot());
  }
})
export default class AsyncRoot {
  s = 10;
  v = 5;

  t() {
    return this.s / this.v;
  }
}
