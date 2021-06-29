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

export const unTree = tree => {
  let list = [];
  tree.forEach(item => {
    if (item) list.push(item);
    if (item.children && item.children.length) {
      list = list.concat(unTree(item.children));
    }
  });
  return list;
};

export const findItemInTreeById = (items: any, id: number) => {
  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return items[i];
      }
      const found: any = findItemInTreeById(items[i].children, id);
      if (found) return found;
    }
  }
};
