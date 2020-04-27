export const callApiForUser = async (username) => {
  try {
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const json = await resp.json();

    if (json.message === "Not Found") {
      json.error = "Not found";
      return json;
    }

    return {
      ...json,
      timestamp: new Date(),
    };
  } catch (error) {
    return new Error(error);
  }
};

const getRepos = async (url, pageNum = 0) => {
  let reposCurrentPage = [];
  let reposAll = [];
  let pageNumCurrent = pageNum + 1;

  do {
    const page = pageNumCurrent >= 2 ? `&page=${pageNumCurrent}` : "";
    const resp = await fetch(`${url}?sort=created&per_page=100${page}`);
    reposCurrentPage.length = 0;
    reposCurrentPage = await resp.json();
    reposAll = [...reposAll, ...reposCurrentPage];
    pageNumCurrent += 1;
  } while (reposCurrentPage.length === 100);

  return reposAll;
};

export const callApiForRepos = async (url) => {
  const reposFirstPage = await getRepos(url);
  let reposAdditional = [];

  if (reposFirstPage.length === 100) reposAdditional = await getRepos(url, 1);
  const reposCleaned = [...reposFirstPage, ...reposAdditional].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  return reposCleaned;
};
