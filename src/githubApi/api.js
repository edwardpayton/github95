import {
  GET_USER_SEARCH,
  GET_USER_DETAILS,
  GET_USER_REPOS,
  GET_USER_ACTIVITY,
  GET_USER_STARS,
  GET_USER_FOLLOWS,
  GET_USER_GISTS,
  GET_REPOS_SEARCH,
} from "./queries";

const gitHubAPIGraphQL = (body) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

export const apiGetUserSearchResults = async (username) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_SEARCH,
      variables: { username },
    });
    let json = await resp.json();
    json = json.data.search.nodes;

    return [...json];
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserProfile = async (username) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_DETAILS,
      variables: { username },
    });
    let json = await resp.json();

    if (json.message === "Not Found") {
      json.error = "Not found";
      return json;
    }

    json = json.data.user;

    return json;
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserActivity = async (username, numRepos) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_ACTIVITY,
      variables: { username, numRepos },
    });
    let json = await resp.json();

    if (json.errors) {
      json.error = "Not found";
      return json;
    }

    json = {
      contributions: json.data.user.contributionsCollection,
      newRepos: json.data.user.repositories.nodes,
    };

    return json;
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserRepos = async (username, cursor) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_REPOS,
      variables: { username, cursor },
    });
    let json = await resp.json();
    json = json.data.user.repositories.edges;

    return json;
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserStars = async (username, cursor) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_STARS,
      variables: { username, cursor },
    });
    let json = await resp.json();
    json = json.data.user.starredRepositories.edges;

    return [...json];
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserGists = async (username, cursor) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_GISTS,
      variables: { username, cursor },
    });
    let json = await resp.json();
    json = json.data.user.gists.edges;

    return [...json];
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserFollows = async (username) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_FOLLOWS,
      variables: { username, cursor: null },
    });
    const json = await resp.json();
    const followers = json.data.user.followers.nodes;
    const following = json.data.user.following.nodes;

    return { followers, following };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetRepoSearchResults = async (query, cursor) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_REPOS_SEARCH,
      variables: { query, cursor },
    });
    let json = await resp.json();
    json = json.data.repositories.nodes;

    return [...json];
  } catch (error) {
    return new Error(error);
  }
};
