import { Observable } from 'rxjs';

import injectionRegister from './injection-register';

function initInjections(root: Function|Function[]): WeakMap<object, Observable<object>> {
  return injectionRegister;
}

export default initInjections;
