export default function memoize(fn) {
  let cached = new Map();
  return (id, ...params) => {
    if (cached.has(id)) {
      return cached.get(id);
    }

    const result = fn(id, ...params);
    cached.set(id, result);

    return result;
  };
}
