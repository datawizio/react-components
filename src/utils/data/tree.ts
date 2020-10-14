export const generateTreeList = (path = "0", level = 3) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: `title ${key}`,
      key,
      value: key,
      children: []
    };

    if (level > 0) {
      treeNode.children = generateTreeList(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
};

export const unTree = (tree) => {
  let list = [];
  tree.forEach(item => {
    if (item) list.push(item);
    if (item.children && item.children.length) {
      list = list.concat(unTree(item.children));
    }
  });
  return list;
};
