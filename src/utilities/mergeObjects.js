export default function mergeObjects(original, updates) {
  const isObject = (obj) => obj && typeof obj === "object";
  if (!isObject(original) || !isObject(updates)) return updates;

  Object.keys(updates).forEach((key) => {
    if (Array.isArray(original[key]) && Array.isArray(updates[key])) {
      return (original[key] = updates[key]);
    } else if (isObject(original[key]) && isObject(updates[key])) {
      return (original[key] = mergeObjects(
        Object.assign({}, original[key]),
        updates[key]
      ));
    }
    return (original[key] = updates[key]);
  });
  return original;
}
