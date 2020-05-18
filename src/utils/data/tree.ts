export const generateTreeList = (path = "0", level = 3) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: `title ${key}`,
      key,
      children: []
    };

    if (level > 0) {
      treeNode.children = generateTreeList(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
};
