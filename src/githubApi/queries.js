/**
 * get Github user details
 * returns user details, pins, total repos & gists, first 10 repos
 * $username - string - the user name
 *
 */
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
    updatedAt
    avatarUrl(size: 200)
    followers {
      totalCount
    }
    following {
      totalCount
    }
    gists {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    pinnedItems(first: 6) {
      edges {
        node {
          ... on Repository {
            name
            url
            description
            languages(first: 5) {
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
    repositories(privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}, first: 10) {
      nodes {
        name
        description
        updatedAt
        url
        isPrivate
        primaryLanguage {
          name
          color
        }
        languages(first: 5) {
          edges {
            size
            node {
              color
              name
            }
          }
        }
      }
      totalCount
    }
  }
}
`;

/**
 * get Github users contributions for past year
 * returns start & end dates, daily contribution count split by week
 * $username: string - the user name
 */
export const GET_USER_CONTRIBUTIONS = `
query UserContributions($username: String!) {
  user(login: $username) {
    contributionsCollection {
      startedAt
      endedAt
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

/**
 * get list of created dates for Github user repos
 * $username: string - the user name
 * $number: int - the quanity of repos to get (found from GET_USER_DETAILS query)
 */
export const GET_USER_REPOS_CREATED_DATES = `
query UserReposCreatedDates($username: String!!, $number: Int!) {
  user(login: $username) {
    repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: $number) {
      nodes {
        createdAt
        isPrivate
      }
    }
  }
}
`;

/**
 * get Github user repos
 * returns 10 repos per page
 * $username: string - the user name
 * $cursor: string - the id of the repo to start after
 */
export const GET_USER_REPOS = `
query UserRepos($username: String!, $cursor: String) {
  user(login: $username) {
     repositories(privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}, first: 10, after: $cursor) {
      nodes {
        name
        description
        updatedAt
        url
        isPrivate
        primaryLanguage {
          name
          color
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

/**
 * get Github repos from search
 * returns 10 repos per page
 * $query: string - the package name
 * $cursor: string - the id of the repo to start after
 */
export const GET_REPOS_FROM_SEARCH = `
query RepoSearch($query: String!, $cursor: String) {
  search(query: $query, type: REPOSITORY, first: 10, after: "") {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      ... on Repository {
        id
        name
        updatedAt
      }
    }
  }
}
`;
