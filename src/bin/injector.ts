import { Observable } from 'rxjs/Observable';

import InjectionRegister from '../interfaces/injection-register';
import Injector from '../injector';

const register: InjectionRegister = new WeakMap<object, Observable<object>>();
const injector = new Injector(register);

export default injector;
