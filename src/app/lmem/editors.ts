export interface Editor {
  id: number;
  isExcluded?: boolean;
  label: string;
  url: string;
}

export const excludeEditor = (editor: Editor): Editor => ({
  ...editor,
  isExcluded: true
});
export const includeEditor = (editor: Editor): Editor => ({
  ...editor,
  isExcluded: false
});
