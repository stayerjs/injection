import { expect } from 'chai';
import { Injector } from '@stayer/interfaces';

import initInjections from '../src/init-injections';
import injector from '../src/bin/injector';

import SyncRoot from './sync-root';
import AsyncRoot from './async-root';


describe('Stayer Injection module', () => {
  let sut: Injector;
  beforeEach(() => {
    sut = injector;
  });

  it('should instantiate a sync injection', done => {
    const targetClass = SyncRoot;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then(instance => {
        expect(instance).to.be.an.instanceof(targetClass);
        done();
      })
      .catch(done);
  });

  it('should instantiate an async injection', done => {
    const targetClass = AsyncRoot;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then(instance => {
        expect(instance).to.be.an.instanceof(targetClass);
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with sync dependency');
  it('should instantiate an injection with async dependency');
});
