// based on https://stackoverflow.com/a/58895906/13262705
export default function getPathToObjectKey(
  obj,
  keyName,
  val,
  currentPath = ""
) {
  if (!obj || typeof obj !== "object") return;
  if (obj[keyName] === val) return `${currentPath}.${keyName}`;

  let path;
  for (const key of Object.keys(obj)) {
    if (key !== keyName && obj[key] !== val) {
      let segment = `.${key}`;
      if (!Number.isNaN(parseInt(key, 10))) segment = `[${key}]`;
      path = getPathToObjectKey(
        obj[key],
        keyName,
        val,
        `${currentPath}${segment}`
      );
    }

    if (path) break;
  }

  return path;
}
