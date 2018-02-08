import { Observable } from 'rxjs';

const injectionRegister = new WeakMap<object, Observable<object>>();

export default injectionRegister;
