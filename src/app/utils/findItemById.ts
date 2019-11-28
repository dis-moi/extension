export const findItemById = <Item extends { id: number }>(id: number) => (
  items: Item[]
): Item | undefined => items.find(item => id === item.id);
