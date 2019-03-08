export default (state, item) => state.map((currentItem) => {
  if (currentItem.id === item.id) {
    return {
      ...currentItem,
      ...item
    };
  }

  return currentItem;
});
