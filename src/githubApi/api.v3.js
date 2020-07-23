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

export const apiGetUserEvents = async (user) => {
  try {
    const resp = await fetch(
      `https://api.github.com/users/${user}/events/public`,
      {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      }
    );
    const json = await resp.json();

    if (json.message === "Not Found") {
      // TODO
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
