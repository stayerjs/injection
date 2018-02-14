import Injection from '../src/injection';

import RootSync from './root-sync';

@Injection()
export default class BranchSync {
  constructor(public dependency: RootSync) {}
}
