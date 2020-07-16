export function deepFilter(
  node,
  callback,
  onFoundParent = null,
  deepProp = "children"
) {
  return [...node].reduce((acc, item) => {
    if (item[deepProp] && item[deepProp].length) {
      const children = deepFilter(
        item[deepProp],
        callback,
        onFoundParent,
        deepProp
      );
      if (children && children.length) {
        const foundParent = { ...item, children };
        onFoundParent && onFoundParent(foundParent);
        return acc.concat(foundParent);
      }
    }

    const isCoincided = callback(item);

    return isCoincided ? acc.concat(item) : acc;
  }, []);
}
