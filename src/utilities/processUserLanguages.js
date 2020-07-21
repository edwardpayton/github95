export default function (repositories) {
  const languages = repositories.nodes
    .map((repo) => {
      if (repo.isPrivate || repo.isArchived) return null;
      return repo.languages.edges.map((lang) => lang);
    })
    .filter(Boolean)
    .flat();

  let languagesArr = [];
  languages.forEach(({ node, size }) => {
    const { name } = node;
    const idx = languagesArr.findIndex((item) => item.name === name);
    if (idx > -1) {
      return (languagesArr[idx].size += size);
    }
    languagesArr.push({
      name,
      size,
    });
  });
  languagesArr.sort((a, b) => a.size - b.size).reverse();

  const series = languagesArr.slice(0, 5).map(({ size }) => size);
  const labels = languagesArr.slice(0, 5).map(({ name }) => name);

  return {
    series,
    labels,
  };
}
