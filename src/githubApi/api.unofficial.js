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
