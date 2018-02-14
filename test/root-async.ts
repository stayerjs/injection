import Injection from '../src/injection';

@Injection({
  factory: () => {
    return Promise.resolve(new RootAsync());
  }
})
export default class RootAsync {}
