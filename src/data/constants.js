export const WINDOW_OBJ = {
  // TODO, add focused, add checking for only one focused
  /* [
      open (show button), 
      active (show window), 
      focused (is active window, button pressed) TODO
    ] */
  profile: [true, true],
  about: [false, false],
};

// Query schema
export const GET_USER_DETAILS = `
query UserDetails($username: String!) {
  user(login: $username) {
    name
    login
    email
    url
    bio
    status {
      message
    }
    location
    createdAt
    avatarUrl(size: 100)
    gists {
      totalCount
    }
    followers {
      totalCount
    }
    repositories {
      totalCount
    }
    pinnedItems(first: 6) {
      edges {
        node {
          ... on Repository {
            name
            url
            description
            languages(first: 10) {
              edges {
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
    contributionsCollection {
      startedAt
      endedAt
      contributionCalendar {
        totalContributions
      }
    }
  }
}
`;
