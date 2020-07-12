/**
 * Get Gitub topics for a repository
 * Uses v3 because this so far feature is missing from v4
 * @param {string} query - the name of the repository
 * Returns a list of topics for the repository
 */

export const apiGetTopic = async (query) => {
  try {
    const resp = await fetch(
      `https://api.github.com/search/topics?q=${query}`,
      {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      }
    );
    const json = await resp.json();

    if (json.message === "Not Found") {
      json.error = "Not found";
      return json;
    }

    return {
      ...json,
    };
  } catch (error) {
    return new Error(error);
  }
};

/**
 * Get trending results from Github
 * Uses unofficial api - https://github.com/huchenme/github-trending-api
 * @param {string} type - one of 'repositories' or 'developers'
 * @param {string} time - 'one of 'daily, 'weekly', or 'monthly'
 * Returns Github trending repositories and developers
 */
export const apiGetTrending = async (type, time) => {
  try {
    const resp = await fetch(
      `https://ghapi.huchen.dev/${type}?since=${time}&s=40`
    );

    const json = await resp.json();

    return {
      ...json,
    };
  } catch (error) {
    return new Error(error);
  }
};
