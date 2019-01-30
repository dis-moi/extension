export const getById = (
  state,
  { id },
) => state.find(notice => notice.id === Number(id));
