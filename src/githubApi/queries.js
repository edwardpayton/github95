/**
 *
 */
export const GET_USER_SEARCH = `
query UserSearch($username: String!) {
  search(query: $username, type: USER, first: 20) {
    nodes {
      ... on User {
        name
        login
      }
    }
  }
}
`;

/**
 * get Github user details
 * returns user details, pins, total repos, gists, & stars, first 10 repos
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
      updatedAt
    }
    location
    createdAt
    updatedAt
    avatarUrl(size: 90)
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
            primaryLanguage {
              name
              color
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
 * and their repo creation dates since they joined
 * returns start & end dates, daily contribution count split by week
 * and the created date & name of their repos
 * $username: string - the user name
 * $numRepos: int - the quanity of repos to get (found from GET_USER_DETAILS query)
 */
export const GET_USER_ACTIVITY = `
query UserActivity($username: String!, $numRepos: Int!) {
  user(login: $username) {
    repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: $numRepos) {
      nodes {
        name
        createdAt
        isPrivate
      }
    }
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
 * get Github user repos
 * returns 10 repos per page
 * $username: string - the user name
 * $cursor: string - the id of the repo to start after
 */
export const GET_USER_REPOS = `
query UserRepos($username: String!, $cursor: String) {
  user(login: $username) {
    repositories(privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}, last: 20, before: $cursor) {
      nodes {
        name
        description
        updatedAt
        url
        isPrivate
        isFork
        primaryLanguage {
          name
          color
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
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
 *
 */
export const GET_USER_STARS = `
query UserStars($username: String!, $cursor: String) {
  user(login: $username) {
    starredRepositories(after: $cursor, orderBy: {field: STARRED_AT, direction: DESC}, first: 20) {
      nodes {
        name
        stargazers {
          totalCount
        }
        forks {
          totalCount
        }
        url
        description
        primaryLanguage {
          name
          color
        }
        updatedAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

/**
 *
 */
export const GET_USER_FOLLOWS = `
query UserFollows($username: String!, $cursor: String) {
  user(login: $username) {
    followers(first: 20, after: $cursor) {
      totalCount
      pageInfo {
        endCursor
        hasPreviousPage
      }
      nodes {
        name
        avatarUrl(size: 40)
        login
        url
      }
    }
    following(first: 20, after: $cursor) {
      totalCount
      pageInfo {
        endCursor
        hasPreviousPage
      }
      nodes {
        avatarUrl(size: 40)
        name
        login
        url
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
  search(query: $query, type: REPOSITORY, last: 20, before: $cursor) {
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
