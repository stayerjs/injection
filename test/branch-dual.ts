import Injection from '../src/injection';

import RootSync from './root-sync';
import RootAsync from './root-async';

@Injection()
export default class BranchDual {
  constructor(
    public dependencySync: RootSync,
    public dependencyAsync: RootAsync
  ) {}
}
