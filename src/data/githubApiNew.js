import { GET_USER_DETAILS } from "./constants";

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
