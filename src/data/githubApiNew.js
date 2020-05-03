import { GET_USER_DETAILS, GET_USER_REPOS } from "./constants";

const gitHubAPIGraphQL = (body) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

export const getUserApi = async (username) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_DETAILS,
      variables: { username },
    });
    let json = await resp.json();

    if (json.message === "Not Found") {
      json.error = "Not found";
      return json;
    } else {
      json = json.data.user;
    }

    return json;
  } catch (error) {
    return new Error(error);
  }
};

// const reposApi = async (url, pageNum = 0) => {
//   let reposCurrentPage = [];
//   let reposAll = [];
//   let pageNumCurrent = pageNum + 1;

//   do {
//     const page = pageNumCurrent >= 2 ? `&page=${pageNumCurrent}` : "";
//     const resp = await fetch(`${url}?sort=created&per_page=100${page}`);
//     reposCurrentPage.length = 0;
//     reposCurrentPage = await resp.json();
//     reposAll = [...reposAll, ...reposCurrentPage];
//     pageNumCurrent += 1;
//   } while (reposCurrentPage.length === 100);

//   return reposAll;
// };

export const getReposApi = async (username) => {
  try {
    const resp = await gitHubAPIGraphQL({
      query: GET_USER_REPOS,
      variables: { username, cursor: null },
    });
    let json = await resp.json();
    console.log("~/Sites/github95/src/data/githubApiNew >>>", json);
    json = json.data.user.repositories.nodes;

    return [...json];
  } catch (error) {
    return new Error(error);
  }
};
