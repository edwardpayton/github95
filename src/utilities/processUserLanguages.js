export default function (repositories) {
  const languages = repositories.nodes
    .map((repo) => {
      return repo.languages.edges.map((lang) => lang);
    })
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
  languagesArr
    .sort((a, b) => {
      return a.size - b.size;
    })
    .reverse();

  return languagesArr.slice(0, 5);
}
