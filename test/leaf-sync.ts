import Injection from '../src/injection';

import BranchSync from './branch-sync';

@Injection()
export default class LeafSync {
  constructor(public dependency: BranchSync) {}
}
