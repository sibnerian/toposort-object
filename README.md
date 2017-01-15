# toposort-object

## Install
Install with [npm](https://npmjs.org/package/toposort-object)
```sh
npm install --save toposort-object
```

## Example

```js
import toposort from 'toposort-object';

const graph = {
  1: ['2', '3'],
  2: ['3'],
  3: ['4'],
};

console.log(toposort(graph)); // ['1', '2', '3', '4']
console.log(toposort(graph), true); // ['1', '2', '3', '4']
```

## Usage
### `toposort(graph, reverse = false)`
Arguments:
* `graph` - The graph to sort topologically. It should be in directed adjacency list format - each
key is a vertex, and the associated value is a list of all connected vertices. Note that these
must be strings, since ojects in JavaScript have string keys.
* `reverse` - Return a reverse topological ordering (i.e. [a topological ordering of the reverse graph](https://www.quora.com/Is-a-topological-order-on-the-reverse-graph-the-same-as-a-topological-order-reversed)).
  - By default, it is assumed that if there is an edge `a -> b`, then `b` depends
    on `a`. For example, if the vertices are jobs, then an `a -> b` edge means that job `a` must be
    completed before `b` can be started. However, at times it is convenient to reverse this convention -
    e.g. for source code dependencies - which is why this flag is provided. If `reverse = true`, then
    the presence of an `a -> b` edge means that `a` depends on `b` (`b` must be completed before `a` is
    started).

## Motivation

It was really bugging me that all the packages for topological sort took edge lists as their args.
I *always* use adjacency lists to represent graphs! Now I realize that it's easy enough to
convert them, but sometimes it's fun to reinvent the wheel a little bit. Thus was this package born.

## License
Published under the [MIT License](http://opensource.org/licenses/MIT).
