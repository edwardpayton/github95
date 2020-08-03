/**
 * _______GENERAL_______
 */

/**
 * get the remaining api allowance
 * returns the number of api calls left (max 5000) & reset time
 */
export const GET_RATE_LIMIT = `
query RateLimit {
  rateLimit {
    remaining
    resetAt
  }
}

`;

/**
 * _______USERS_______
 */

/**
 * get list of users from search query
 * returns 20 results with name, login (username)
 * $username - string the login (username)
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
 * TODO - consider adding in user readme if it exists:
    repository(name: $username) {
      object(expression: "HEAD:README.md") {
        ... on Blob {
          id
          text
        }
      }
    }
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
        isArchived     
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
    repositories(privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: ASC}, last: 20, before: $cursor) {
      edges {
        cursor
        node {
          name
          description
          updatedAt
          url
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
    starredRepositories(last: 20, before: $cursor) {
      edges {
        cursor
        node {
          name
          description
          owner {
            login
          }
          updatedAt
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          primaryLanguage {
            name
            color
          } 
        }
      }
    }
  }
}
`;

/**
 *
 */
export const GET_USER_GISTS = `
query UserGists($username: String!, $cursor: String) {
  user(login: $username) {
    gists(last: 10, before:  $cursor) {
      edges {
        node {
          url
          isFork
          updatedAt
          stargazers {
            totalCount
          }
          files {
            name
            extension
            text
          }
        }
        cursor
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
    followers(last: 20, before: $cursor) {
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
    following(last: 20, before: $cursor) {
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
 * _______Repos_______
 */

/**
 * get Github repos from search
 * returns 20 repos per page
 * $query: string - the package name
 * $cursor: string - the id of the repo to start after
 */
export const GET_REPOS_SEARCH = `
query RepoSearch($query: String! $cursor: String) {
  search(query: $query, type: REPOSITORY, last: 20, after: $cursor) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      ... on Repository {
        name
        owner {
          login
        }
        description
        url
        id
        pushedAt
        isFork
        primaryLanguage {
          color
          name
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}
`;

/**
 * get Github repo details
 * returns the name & other details, forks & watchers counts, topic list, (root) file list, last 5 commit messages, latest release
 * $name: string - the repo name
 * $owner: string - the repo owner
 */
export const GET_REPO_DETAILS = `
query RepoDetails($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    name
    description
    owner {
      login
    }
    url
    homepageUrl
    sshUrl
    pushedAt
    isFork
    watchers {
      totalCount
    }
    stargazers {
      totalCount
    }
    forks {
      totalCount
    }
    languages(orderBy: {field: SIZE, direction: DESC}, first: 5) {
      totalCount
      edges {
        node {
          color
          name
        }
      }
    }
    repositoryTopics(first: 10) {
      edges {
        node {
          topic {
            name
          }
        }
      }
    }
    object(expression: "HEAD:") {
      ... on Tree {
        entries {
          name
          type
          object {
            abbreviatedOid
            ... on Tree {
              id
              entries {
                name
                type
                object {
                  abbreviatedOid
                }
              }
            }
          }
        }
      }
    }
    commits:object(expression:"HEAD") {
      ... on Commit {
        history {
          totalCount
        }
      }
    }
    branches:refs(first: 0, refPrefix: "refs/heads/") {
      totalCount
    }
    tags:refs(first: 0, refPrefix: "refs/tags/") {
      totalCount
    }
    issues(first: 0, states: OPEN) {
      totalCount
    }
    releases(last: 1) {
      edges {
        node {
          name
          description
          url
          publishedAt
        }
      }
      totalCount
    }
    licenseInfo {
      spdxId
      description
    }
  }
}
`;

export const GET_REPO_FILE_TREE = `
query RepoFileTree($name: String!, $owner: String!, $file: String!) {
  repository(name: $name, owner: $owner) {
    object(expression: $file) {
      ... on Tree {
        entries {
          name
          type
          object {
            abbreviatedOid
          }
        }
      }
    }
  }
}
`;

/**
 * get Github repo issues
 * returns:
 * latest 10 issues
 * most commented in last 7 days
 * $name: string - the repo name
 * $owner: string - the repo owner
 * $since: UTC date string - eg "2020-07-27T00:00:00.000Z" - date.toISOString()
 */
export const GET_REPO_ISSUES = `
query RepoIssues($name: String!, $owner: String!, $since: DateTime!) {
  repository(name: $name, owner: $owner) {
    latest: issues(first: 10, states: OPEN, orderBy: {direction: DESC, field: CREATED_AT}) {
      edges {
        node {
          id
          updatedAt
          title
          url
          author {
            login
            url
          }
          comments(last: 1) {
            totalCount
            edges {
              node {
                id
                bodyText
                updatedAt
                url
                author {
                  login
                  url
                }
              }
            }
          }
        }
      }
    }
    mostCommented7Days: issues(first: 3, orderBy: {direction: DESC, field: COMMENTS}, filterBy: {since: $since, states: OPEN}) {
      edges {
        node {
          id
          updatedAt
          title
          url
          author {
            login
            url
          }
          comments(last: 1) {
            totalCount
            edges {
              node {
                id
                bodyText
                updatedAt
                url
                author {
                  login
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_REPO_PULL_REQUESTS = `
query RepoPullRequests($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    pullRequests(states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}, first: 10) {
      totalCount
      nodes {
        title
        author {
          login
        }
        createdAt
        updatedAt
        url
        mergeable
        locked
        comments(last: 1) {
          edges {
            node {
              bodyText
              updatedAt
              url
              author {
                login
              }
            }
          }
        }
      }
    }
  }
}
`;

/**
 * get Github repo file
 * returns the file contents - used for getting the README file
 * $name: string - the repo name
 * $owner: string - the repo owner
 */
export const GET_REPO_FILE_CONTENTS = `
query RepoReadme($name: String!, $owner: String!, $file: String!) {
  repository(name: $name, owner: $owner) {
    object(expression: $file) {
      ... on Blob {
        text
      }
    }
  }
}
`;

/**
 * get Github most followed repos
 * returns 25 repos
 */

export const GET_REPO_MOST_FOLLOWED = `
query RepoSearchMostFollowed {
  search(query: "followers:>=1000", type: REPOSITORY, first: 25) {
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          stargazers {
            totalCount
          }
          primaryLanguage {
            name
          }
          pushedAt
          id
        }
      }
    }
  }
}
`;
