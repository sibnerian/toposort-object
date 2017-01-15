import { expect } from 'chai';

// eslint-disable-next-line import/no-unresolved, import/extensions
import toposort from '../build/index';


describe('toposort', () => {
  it('works on an empty graph', () => {
    const result = toposort({});
    expect(result).to.eql([]);
  });
  it('works with a simple digraph', () => {
    const result = toposort({
      a: ['b'],
      b: ['c'],
      c: [],
    });
    expect(result).to.eql(['a', 'b', 'c']);
  });
  it('works with diamond graph', () => {
    const result = toposort({
      1: ['2', '3'],
      2: ['3'],
      3: ['4'],
    });
    expect(result).to.eql(['1', '2', '3', '4']);
  });
  it('throws on a circular digraph', () => {
    const doIt = () => toposort({
      a: ['b'],
      b: ['c'],
      c: ['a'],
    });
    expect(doIt).to.throw(Error, /Cyclical reference found - the graph is not a DAG/);
  });
  it('includes nodes with indegree and outdegree of zero', () => {
    const result = toposort({
      1: ['2', '3'],
      2: ['3'],
      3: ['4'],
      5: [],
    });
    expect(result).to.include('5');
    expect(result).to.include('4');
  });
  it('throws on bad graph representations', () => {
    const doIt = () => toposort({
      a: 'b',
      b: ['c'],
    });
    expect(doIt).to.throw(Error, /Non-array value associated with key/);
  });
  describe('reversed', () => {
    it('works on empty graph', () => {
      const result = toposort({}, true);
      expect(result).to.eql([]);
    });
    it('works with a simple digraph', () => {
      const result = toposort({
        a: ['b'],
        b: ['c'],
        c: [],
      }, true);
      expect(result).to.eql(['c', 'b', 'a']);
    });
    it('reverses toposort of diamond graph', () => {
      const result = toposort({
        1: ['2', '3'],
        2: ['3'],
        3: ['4'],
      }, true);
      expect(result).to.eql(['4', '3', '2', '1']);
    });
    it('still throws on a circular digraph', () => {
      const doIt = () => toposort({
        a: ['b'],
        b: ['c'],
        c: ['a'],
      }, true);
      expect(doIt).to.throw(Error, /Cyclical reference found - the graph is not a DAG/);
    });
    it('still throws on bad graph representations', () => {
      const doIt = () => toposort({
        a: 'b',
        b: ['c'],
      }, true);
      expect(doIt).to.throw(Error, /Non-array value associated with key/);
    });
    it('includes nodes with indegree and outdegree of zero', () => {
      const result = toposort({
        1: ['2', '3'],
        2: ['3'],
        3: ['4'],
        5: [],
      }, true);
      expect(result).to.include('5');
    });
  });
});
