import Injection from '../src/injection';

import RootAsync from './root-async';

@Injection()
export default class BranchAsync {
  constructor(public dependency: RootAsync) {}
}
