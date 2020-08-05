import {
  GET_RATE_LIMIT,
  GET_USER_SEARCH,
  GET_USER_DETAILS,
  GET_USER_REPOS,
  GET_USER_ACTIVITY,
  GET_USER_STARS,
  GET_USER_FOLLOWS,
  GET_USER_GISTS,
  GET_REPOS_SEARCH,
  GET_REPO_DETAILS,
  GET_REPO_FILE_TREE,
  GET_REPO_FILE_CONTENTS,
  GET_REPO_ISSUES,
  GET_REPO_PULL_REQUESTS,
  GET_REPO_MOST_FOLLOWED,
} from "./queries";

const githubApiGraphQL = (body) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

export const apiGetLimit = async () => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_RATE_LIMIT,
    });
    let json = await resp.json();

    json = json.data.rateLimit;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserSearchResults = async (username) => {
  try {
    const resp = await githubApiGraphQL({
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
    const resp = await githubApiGraphQL({
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
    const max100 = numRepos > 100 ? 100 : numRepos;
    const resp = await githubApiGraphQL({
      query: GET_USER_ACTIVITY,
      variables: { username, numRepos: max100 },
    });
    let json = await resp.json();

    if (json.errors) {
      json.error = "Not found";
      return json;
    }

    return { ...json.data.user };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetUserRepos = async (username, cursor) => {
  try {
    const resp = await githubApiGraphQL({
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
    const resp = await githubApiGraphQL({
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
    const resp = await githubApiGraphQL({
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
    const resp = await githubApiGraphQL({
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
    const resp = await githubApiGraphQL({
      query: GET_REPOS_SEARCH,
      variables: { query, cursor },
    });
    let json = await resp.json();
    json = json.data.search;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetRepoDetails = async (name, owner) => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_DETAILS,
      variables: { name, owner },
    });
    let json = await resp.json();
    json = json.data.repository;

    const readme =
      json.object &&
      json.object.entries.filter(
        (files) => files.name.split(".")[0] === "README" && files.name
      )[0];

    if (readme) {
      const respFile = await githubApiGraphQL({
        query: GET_REPO_FILE_CONTENTS,
        variables: { name, owner, file: `HEAD:${readme.name}` },
      });

      let jsonReadme = await respFile.json();

      json.apiData = {
        readme: jsonReadme.data.repository.object.text,
      };
    }

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetFileTree = async (name, owner, file) => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_FILE_TREE,
      variables: { name, owner, file: `HEAD:${file}` },
    });
    let json = await resp.json();

    json = json.data.repository.object;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetFileContents = async (name, owner, file) => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_FILE_CONTENTS,
      variables: { name, owner, file: `HEAD:${file}` },
    });

    let json = await resp.json();
    json = json.data.repository.object;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetRepoIssues = async (name, owner, since) => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_ISSUES,
      variables: { name, owner, since },
    });

    let json = await resp.json();
    json = json.data.repository;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetRepoPullRequests = async (name, owner) => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_PULL_REQUESTS,
      variables: { name, owner },
    });

    let json = await resp.json();
    json = json.data.repository.pullRequests;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};

export const apiGetRepoMostFollowed = async () => {
  try {
    const resp = await githubApiGraphQL({
      query: GET_REPO_MOST_FOLLOWED,
    });
    let json = await resp.json();
    json = json.data.search;

    return { ...json };
  } catch (error) {
    return new Error(error);
  }
};
