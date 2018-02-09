import { Observable } from 'rxjs/Observable';

type InjectionRegister = WeakMap<object, Observable<object>>;

export default InjectionRegister;
