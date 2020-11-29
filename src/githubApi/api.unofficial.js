/**
 * Get trending results from Github
 * Uses unofficial api - https://github.com/huchenme/github-trending-api
 * @param {string} type - one of 'repositories' or 'developers'
 * @param {string} time - 'one of 'daily, 'weekly', or 'monthly'
 * Returns Github trending repositories and developers
 */
export const apiGetTrending = async (type = "respositories", time) => {
  try {
    // const resp = await fetch(
    //   `https://ghapi.huchen.dev/${type}?since=${time}&s=40`
    // );
    // Temporarily replaced with below api because of issues detailed here: https://github.com/huchenme/github-trending-api/issues/130
    // Will update when the issue is resolved

    // Api: https://github.com/huchenme/github-trending-api/issues/130#issuecomment-708848154
    const resp = await fetch(
      `https://github-trending-api.waningflow.com/${type}?since=${time}`
    );

    const json = await resp.json();

    return {
      ...json,
    };
  } catch (error) {
    return new Error(error);
  }
};
