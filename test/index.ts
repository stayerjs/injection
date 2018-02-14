import { expect } from 'chai';
import { Injector } from '@stayer/interfaces';

import injector from '../src/bin/injector';

import RootSync from './root-sync';
import RootAsync from './root-async';
import BranchSync from './branch-sync';
import BranchAsync from './branch-async';
import BranchDual from './branch-dual';
import LeafSync from './leaf-sync';
import LeafAsync from './leaf-async';


describe('Stayer Injection module', () => {
  let sut: Injector;
  beforeEach(() => {
    sut = injector;
  });

  it('should instantiate a sync injection (root)', done => {
    const targetClass = RootSync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then(instance => {
        expect(instance).to.be.an.instanceof(targetClass);
        done();
      })
      .catch(done);
  });

  it('should instantiate an async injection (root)', done => {
    const targetClass = RootAsync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then(instance => {
        expect(instance).to.be.an.instanceof(targetClass);
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with sync dependency', done => {
    const dependency = RootSync;
    const targetClass = BranchSync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then((instance: any) => {
        expect(instance).to.be.an.instanceof(targetClass);
        expect(instance.dependency).to.be.an.instanceof(dependency);
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with async dependency', done => {
    const dependency = RootAsync;
    const targetClass = BranchAsync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then((instance: any) => {
        expect(instance).to.be.an.instanceof(targetClass);
        expect(instance.dependency).to.be.an.instanceof(dependency);
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with 1 sync and 1 async dependencies', done => {
    const targetClass = BranchDual;
    const dependencySync = RootSync;
    const dependencyAsync = RootAsync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then((instance: any) => {
        expect(instance).to.be.an.instanceof(targetClass);
        expect(instance.dependencySync).to.be.an.instanceof(dependencySync);
        expect(instance.dependencyAsync).to.be.an.instanceof(dependencyAsync);
        done();
      })
      .catch(done);
  });

  it('should instantiate 2 injections with common sync dependency', done => {
    const targetClass1 = BranchSync;
    const targetClass2 = BranchDual;
    const instance1$ = sut.getInstance(targetClass1);
    const instance2$ = sut.getInstance(targetClass2);
    Promise.all([instance1$, instance2$])
      .then((instances: any[]) => {
        const instance1 = instances[0];
        const instance2 = instances[1];
        expect(instance1.dependency).to.be.equal(instance2.dependencySync,
          'Both dependencies should be the same object.');
        done();
      })
      .catch(done);
  });

  it('should instantiate 2 injections with common async dependency', done => {
    const targetClass1 = BranchAsync;
    const targetClass2 = BranchDual;
    const instance1$ = sut.getInstance(targetClass1);
    const instance2$ = sut.getInstance(targetClass2);
    Promise.all([instance1$, instance2$])
      .then((instances: any[]) => {
        const instance1 = instances[0];
        const instance2 = instances[1];
        expect(instance1.dependency).to.be.equal(instance2.dependencyAsync,
          'Both dependencies should be the same object.');
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with transitive dependency (sync root)', done => {
    const targetClass = LeafSync;
    const dependency = BranchSync;
    const rootDependency = RootSync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then((instance: any) => {
        expect(instance).to.be.an.instanceof(targetClass);
        expect(instance.dependency).to.be.an.instanceof(dependency);
        expect(instance.dependency.dependency)
          .to.be.an.instanceof(rootDependency);
        done();
      })
      .catch(done);
  });

  it('should instantiate an injection with transitive dependency (async root)', done => {
    const targetClass = LeafAsync;
    const dependency = BranchAsync;
    const rootDependency = RootAsync;
    const instance$ = sut.getInstance(targetClass);
    instance$
      .then((instance: any) => {
        expect(instance).to.be.an.instanceof(targetClass);
        expect(instance.dependency).to.be.an.instanceof(dependency);
        expect(instance.dependency.dependency)
          .to.be.an.instanceof(rootDependency);
        done();
      })
      .catch(done);
  });
});
