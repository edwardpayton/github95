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
