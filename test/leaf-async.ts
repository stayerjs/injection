import Injection from '../src/injection';

import BranchAsync from './branch-async';

@Injection()
export default class LeafAsync {
  constructor(public dependency: BranchAsync) {}
}
