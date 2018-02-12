import { BehaviorSubject, Observable } from 'rxjs';
import { Injector as InjectorInterface } from '@stayer/interfaces';

import InjectionRegister from './interfaces/injection-register';
import InjectionOptions from './interfaces/injection-options';

export default class Injector implements InjectorInterface {
  constructor(private register: InjectionRegister) {}

  inject(constructor: Function, dependencies: Function[]): void {
    if (dependencies.length === 0) {
      this.injectSync(constructor);
    } else {
      this.injectWithDependencies(constructor, dependencies);
    }
  }

  private injectWithDependencies(constructor: Function, dependencies: Function[]): void {
    const fisrtDepObs: Observable<object>[] = [];
    for (const depType of dependencies) {
      const dep: Observable<object>  = this.getInstanceObs(depType);
      fisrtDepObs.push(dep.first());
    }
    const instance$: Observable<object> = Observable.forkJoin(...fisrtDepObs)
      .mergeMap((deps: any[]) => {
        const instance = new (constructor as any)(...deps);
        return new BehaviorSubject(instance).asObservable();
      });
    this.register.set(constructor, instance$);
  }

  private injectSync(constructor: Function): void {
    const instance = new (constructor as any)();
    const instance$ = (new BehaviorSubject(instance)).asObservable();
    this.register.set(constructor, instance$);
  }

  injectAsync(constructor: Function, options: InjectionOptions): void {
    const instance$: Observable<object> = Observable.from(options.factory())
      .mergeMap(instance => (new BehaviorSubject(instance)).asObservable());
    this.register.set(constructor, instance$);
  }

  getInstanceObs(constructor: Function): Observable<object> {
    const instance$ = this.register.get(constructor);
    if (!instance$) {
      throw new Error(`An instance of ${constructor.name} doesn't exist.`);
    }
    return instance$;
  }

  getInstance(constructor: Function): Promise<object> {
    const instance$ = this.getInstanceObs(constructor);
    return new Promise((resolve, reject) => {
      instance$.subscribe(instance => resolve(instance));
    });
  }
}
