import Set from 'es6-set';

export default function toposort(graph, reverse = false) {
  const nodes = new Set(Object.keys(graph));
  Object.keys(graph).forEach((n1) => {
    if (!Array.isArray(graph[n1])) {
      throw new Error(`Non-array value associated with key "${n1}"`);
    }
    graph[n1].forEach(n2 => nodes.add(n2));
  });
  const gray = new Set();
  const black = new Set();
  const list = [];
  nodes.forEach(node => visit(node, nodes, gray, black, graph, list));
  return reverse ? list.reverse() : list;
}

function visit(node, nodes, gray, black, graph, list) {
  if (gray.has(node)) {
    throw new Error('Cyclical reference found - the graph is not a DAG.');
  }
  if (!black.has(node)) {
    gray.add(node);
    (graph[node] || []).forEach(neighbor => visit(neighbor, nodes, gray, black, graph, list));
    gray.delete(node);
    black.add(node);
    list.unshift(node);
  }
}
