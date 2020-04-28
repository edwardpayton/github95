export function mergeObjects(original, updates) {
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
    if (typeof original[key] !== typeof updates[key])
      throw new Error(
        `type of "${key}" was transformed from "${typeof original[
          key
        ]}" to "${typeof updates[
          key
        ]}". If this was intentional add true as a second argument to your setState function`
      );
    return (original[key] = updates[key]);
  });
  return original;
}
