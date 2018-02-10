import 'reflect-metadata';
import InjectionOptions from '../src/interfaces/injection-options';

import injector from './bin/injector';

export default function Injection(options?: InjectionOptions) {
  return (constructor: Function) => {
    if (options) {
      injector.injectAsync(constructor, options);
    } else {
      const dependencyTypes: Function[] = 
        Reflect.getMetadata('design:paramtypes', constructor) || [];
      injector.inject(constructor, dependencyTypes);
    }
  }
}
