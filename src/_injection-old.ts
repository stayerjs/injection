import 'reflect-metadata';
import { BehaviorSubject, Observable } from 'rxjs';

import injectionRegister from './injection-register';
import InjectionOptions from './interfaces/injection-options';

function getInstancesObs(
  constructor: Function,
  depsObs: Observable<object>[],
): Observable<object> {
  const firstDepsObs: Observable<object>[] = [];
  for (const obs$ of depsObs) {
    firstDepsObs.push(obs$.first());
  }
  return Observable.forkJoin(...firstDepsObs)
    .mergeMap((deps: any[]) => {
      const instance = new (constructor as any)(...deps);
      return new BehaviorSubject(instance).asObservable();
    });
}

export default function Injection(options?: InjectionOptions) {
  return (constructor: Function) => {
    const dependencyTypes: Function[] = 
      Reflect.getMetadata('design:paramtypes', constructor) || [];
    let instance$: Observable<object>;
    if (options) {
      const factoryRes = options.factory();
      instance$ = Observable.from(factoryRes)
        .mergeMap(instance => (new BehaviorSubject(instance)).asObservable());
    } else {
      if (dependencyTypes.length === 0) {
        const instance = new (constructor as any)();
        instance$ = (new BehaviorSubject(instance)).asObservable();
      } else {
        const dependencies: Observable<object>[] = [];
        for (const depType of dependencyTypes) {
          const dep = injectionRegister.get(depType);
          dep && dependencies.push(dep);
        }
        instance$ = getInstancesObs(constructor, dependencies);
      }
    }
    injectionRegister.set(constructor, instance$);
  }
}
