export const getGithubUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const json = await response.json();

    if (json.message === "Not Found") {
      json.error = "Not found";
      return json;
    }

    return {
      ...json,
      timestamp: new Date(),
    };
  } catch (error) {
    return error;
  }
};

const getRemainingRepos = async (url) => {
  let latestResponse = [];
  let allResponses = [];
  let pageCount = 2;
  do {
    const response = await fetch(
      `${url}?sort=created&per_page=100&page=${pageCount}`
    );
    latestResponse = await response.json();
    allResponses = [...allResponses, ...latestResponse];
    pageCount += 1;
  } while (latestResponse.length === 100);
  return allResponses;
};

export const getGithubUserRepos = async (url) => {
  const response = await fetch(`${url}?sort=created&per_page=100`);
  const json = await response.json();
  let remainingRepos = [];

  if (json.length === 100) {
    remainingRepos = await getRemainingRepos(url);
  }
  const allRepos = [...json, ...remainingRepos];
  const reposCleaned = allRepos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  // .map((repo) => cleanRepoData(repo));

  return reposCleaned;
};
