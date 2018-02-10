import { Observable } from 'rxjs';

import injectionRegister from './injection-register';

/**
 * @deprecated
 * @param root 
 */
function initInjections(root: Function|Function[]): WeakMap<object, Observable<object>> {
  return injectionRegister;
}

export default initInjections;
