exports.onCreatePage = ({ page, actions, getNode }) => {
  const node = getNode(page.context.id);
  const { createPage, deletePage } = actions;
  const oldPage = { ...page };
  page.context.langKey = node?.frontmatter?.locale;
  page.context.title = node?.frontmatter?.title;
  deletePage(oldPage);
  createPage(page);
};
