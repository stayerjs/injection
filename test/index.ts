import { expect } from 'chai';

import initInjections from '../src/init-injections';

import SyncRoot from './sync-root';

const sut = initInjections([SyncRoot]);

describe('Stayer Injection module', () => {
  it('should instantiate the SyncRoot injection', done => {
    const targetClass = SyncRoot;
    const instance$ = sut.get(targetClass);
    expect.fail();
    done();
  });
  it('should instantiate the AsyncRoot injection');
});
