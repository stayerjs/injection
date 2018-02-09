import { Observable } from 'rxjs';
import { Injector as InjectorInterface } from '@stayer/interfaces';

import InjectionRegister from './interfaces/injection-register';

export default class Injector implements InjectorInterface {
  constructor(private register: InjectionRegister) {}

  inject(constructor: Function, dependencies: Function[]): void {}

  getInstance(constructor: Function): Promise<object> {
    const instance$ = this.register.get(constructor);
    if (instance$) {
      return instance$.toPromise();
    } else {
      return Promise.reject(
        new Error(`An instance of provided class doesn't exist.`)
      );
    }
  }
}
